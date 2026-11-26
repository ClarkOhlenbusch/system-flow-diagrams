const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const files = ['system-flow-diagrams/assets/starter.html', 'how-it-works.html', 'examples/webhook-delivery.html'];
const componentPrefix = source => source.slice(source.indexOf('    function AcademicCanvasApp()'), source.indexOf('      return (\n        <div'));

// Exercise the HTML's actual handlers with small hook/element stand-ins. No build or dependencies.
function harness(file) {
  const source = fs.readFileSync(file, 'utf8'), slots = [], captures = new Map();
  let cursor = 0;
  const canvas = {
    getBoundingClientRect: () => ({ left: 20, top: 30, width: 390, height: 844 }),
    querySelector: () => ({ getBoundingClientRect: () => ({ top: 810 }) }),
    setPointerCapture: id => captures.set(id, 'canvas'),
    hasPointerCapture: id => captures.get(id) === 'canvas'
  };
  const useState = initial => {
    const i = cursor++;
    if (!(i in slots)) slots[i] = initial;
    return [slots[i], value => { slots[i] = typeof value === 'function' ? value(slots[i]) : value; }];
  };
  const useRef = initial => {
    const i = cursor++;
    if (!(i in slots)) slots[i] = { current: initial };
    return slots[i];
  };
  const data = source.slice(source.indexOf('const INITIAL_NODES ='), source.indexOf('    function AcademicCanvasApp()'));
  const expose = 'return { nodes, envelopes, viewState, touchPoints, pinchState, dragState, canvasElement, applyView, startDrag, handleTouchStart, handleTouchMove, handleTouchEnd, handleLostCapture, handleMouseMove, handleMouseUp, fitView }; } AcademicCanvasApp;';
  const renderFunction = vm.runInNewContext(data + componentPrefix(source) + expose, { useState, useRef, useEffect() {} });
  const render = () => { cursor = 0; const api = renderFunction(); api.canvasElement.current = canvas; return api; };
  const event = (id, x, y, pointerType = 'touch') => ({
    pointerId: id, pointerType, button: 0, clientX: x, clientY: y, stopped: false,
    target: { closest: () => null }, currentTarget: canvas,
    stopPropagation() { this.stopped = true; }, preventDefault() {}
  });
  const down = (id, x, y, mode = 'pan') => {
    const e = event(id, x, y), api = render(); api.handleTouchStart(e);
    if (!e.stopped) api.startDrag(e, mode, mode === 'node' ? api.nodes[0] : mode === 'resize' ? api.envelopes[0] : null);
  };
  const move = (id, x, y) => { const e = event(id, x, y), api = render(); api.handleTouchMove(e); if (!e.stopped) api.handleMouseMove(e); };
  const end = id => { const e = event(id, 0, 0), api = render(); api.handleTouchEnd(e); if (!e.stopped) api.handleMouseUp(e); captures.delete(id); };
  return { render, down, move, end, event, captures };
}

const near = (a, b) => assert.ok(Math.abs(a - b) < 1e-8, `${a} != ${b}`);

for (const file of files) {
  test(`${file}: pinch preserves its world anchor and does not move a card`, () => {
    const h = harness(file); h.render().applyView(.18, { x: 16, y: 200 });
    const original = structuredClone(h.render().nodes);
    h.down(1, 100, 250, 'node'); h.down(2, 200, 250);
    near(h.render().viewState.current.zoom, .18);
    const anchor = { ...h.render().pinchState.current.anchor };
    h.move(2, 300, 250);
    const view = h.render().viewState.current;
    near(view.zoom, .36);
    near(anchor.x * view.zoom + view.pan.x, 180); // midpoint minus canvas left
    near(anchor.y * view.zoom + view.pan.y, 220); // midpoint minus canvas top
    assert.deepEqual(structuredClone(h.render().nodes), original);
  });

  test(`${file}: lifting one finger continues as a smooth pan`, () => {
    const h = harness(file);
    h.down(1, 100, 250, 'node'); h.down(2, 200, 250); h.move(2, 250, 250);
    const before = structuredClone(h.render().viewState.current);
    h.end(2); h.move(1, 124, 270);
    const after = h.render().viewState.current;
    near(after.zoom, before.zoom); near(after.pan.x, before.pan.x + 24); near(after.pan.y, before.pan.y + 20);
    h.end(1);
    assert.equal(h.render().dragState.current, null); assert.equal(h.render().touchPoints.current.size, 0);
  });

  test(`${file}: an extra touch and capture transfer do not reset the pinch`, () => {
    const h = harness(file);
    h.down(1, 100, 250); h.down(2, 200, 250); h.move(2, 220, 250);
    const before = structuredClone(h.render().viewState.current);
    h.down(3, 300, 350);
    h.render().handleLostCapture(h.event(2, 220, 250)); // root already owns capture
    assert.equal(h.render().touchPoints.current.size, 3);
    h.end(1); // rebase the remaining pair without a view jump
    assert.deepEqual(structuredClone(h.render().viewState.current), before);
    h.end(2); h.end(3);
    assert.equal(h.render().pinchState.current, null); assert.equal(h.render().dragState.current, null);
  });

  test(`${file}: pinch clamps safely and Fit supports small phone scales`, () => {
    const h = harness(file);
    h.down(1, 100, 250); h.down(2, 200, 250);
    h.move(2, 10000, 250); near(h.render().viewState.current.zoom, 4);
    h.move(2, 100, 250); near(h.render().viewState.current.zoom, .05);
    h.render().fitView();
    const api = h.render(), view = api.viewState.current;
    assert.ok(view.zoom > 0 && view.zoom < .3);
    assert.ok(Number.isFinite(view.pan.x) && Number.isFinite(view.pan.y));
    assert.equal(api.touchPoints.current.size, 0); assert.equal(api.pinchState.current, null);
  });
}

test('desktop dragging remains scale-aware and ignores another pointer', () => {
  const h = harness(files[0]); h.render().applyView(2, { x: 0, y: 0 });
  const original = { ...h.render().nodes[0] };
  const start = h.event(9, 100, 100, 'mouse'); h.render().startDrag(start, 'node', h.render().nodes[0]);
  h.render().handleMouseMove(h.event(10, 160, 140, 'mouse'));
  near(h.render().nodes[0].x, original.x);
  h.render().handleMouseMove(h.event(9, 160, 140, 'mouse'));
  near(h.render().nodes[0].x, original.x + 30); near(h.render().nodes[0].y, original.y + 20);
});

test('the starter and public demos use the same gesture implementation', () => {
  const implementations = files.map(file => componentPrefix(fs.readFileSync(file, 'utf8')));
  assert.equal(implementations[0], implementations[1]); assert.equal(implementations[0], implementations[2]);
});
