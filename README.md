# System Flow Diagrams

An open-source Agent Skill that turns system descriptions into interactive HTML diagrams. Drag services around, follow labeled arrows, and step through API requests and event-driven workflows.

[Try the webhook demo](https://clarkohlenbusch.github.io/system-flow-diagrams/examples/webhook-delivery.html) · [Read the skill](system-flow-diagrams/SKILL.md) · [Contribute](#contributing)

## Quick start

1. Run this from your project directory and select your agent if prompted.

   ```sh
   npx skills add ClarkOhlenbusch/system-flow-diagrams --skill system-flow-diagrams
   ```

2. Ask your agent to use `system-flow-diagrams`. In Codex, type `$system-flow-diagrams` to select it.

   > Create an interactive HTML diagram showing a webhook receiver validating a signed event, queuing it before returning HTTP 202, and handing it off to a worker.

3. Open the generated HTML in a browser. Use the bottom buttons or arrow keys to step through the flow. Drag cards to move them, press **F** to fit the diagram, or press **R** to reset the layout. The page needs an internet connection for its libraries and fonts.

For manual setup, [download the repository](https://github.com/ClarkOhlenbusch/system-flow-diagrams/archive/refs/heads/main.zip) and ask your agent to read `system-flow-diagrams/SKILL.md`. Keep the skill folder together so the starter and layout guide are available.

## Examples

### Webhook delivery

Follow a signed event from the public receiver through a queue to a background worker. [Live demo](https://clarkohlenbusch.github.io/system-flow-diagrams/examples/webhook-delivery.html) · [HTML source](examples/webhook-delivery.html)

![Webhook processing diagram with labeled arrows from the delivery queue to the worker and event store](examples/screenshots/webhook-processing.png)

### Order checkout

Follow a checkout through identity verification, order creation, payment, and receipt delivery. [Live demo](https://clarkohlenbusch.github.io/system-flow-diagrams/system-flow-diagrams/assets/starter.html) · [HTML source](system-flow-diagrams/assets/starter.html)

![Checkout diagram showing payment authorization and approval arrows between the order service and payment provider](examples/screenshots/checkout-payment.png)

## Contributing

Bug reports, skill and starter improvements, docs fixes, and new example diagrams are welcome.

- [Open an issue](https://github.com/ClarkOhlenbusch/system-flow-diagrams/issues/new) to report a bug or suggest an improvement.
- To submit a change, see the [contributing guide](CONTRIBUTING.md) for where to edit and what to check before opening a pull request.

## License

[MIT](LICENSE). Libraries and fonts loaded from CDNs retain their own licenses.
