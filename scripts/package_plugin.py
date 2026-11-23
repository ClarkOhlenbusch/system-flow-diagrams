"""Build the Codex and ChatGPT skills-only ZIP from the public skill files."""

import argparse
import json
from pathlib import Path
import subprocess
import zipfile


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("output", type=Path, help="Path to the output ZIP")
    output = parser.parse_args().output.resolve()

    root = Path(__file__).resolve().parents[1]
    claude = json.loads((root / ".claude-plugin/plugin.json").read_text(encoding="utf-8"))
    skill_dir = Path(claude["skills"])
    icon = claude["icon"]
    codex = {key: claude[key] for key in (
        "name", "version", "description", "author", "homepage",
        "repository", "license", "keywords",
    )}
    codex["skills"] = "./skills/"
    codex["interface"] = {
        "displayName": claude["displayName"],
        "shortDescription": "Interactive HTML flow diagrams",
        "longDescription": (
            f"{claude['description']} Use it for onboarding and architecture "
            "walkthroughs. Open the generated HTML in a browser with internet "
            "access to load its libraries and fonts."
        ),
        "developerName": claude["author"]["name"],
        "category": "Developer Tools",
        "capabilities": [],
        "websiteURL": claude["homepage"],
        "supportURL": claude["supportUrl"],
        "defaultPrompt": "Create an interactive diagram of a webhook being validated, queued, and processed by a worker.",
        "brandColor": "#5142A8",
        "composerIcon": icon,
        "logo": icon,
    }

    tracked = subprocess.check_output(
        ["git", "ls-files", "-z", "--", skill_dir.as_posix()],
        cwd=root,
    ).decode("utf-8").split("\0")
    paths = [Path(name) for name in tracked if name]
    if skill_dir / "SKILL.md" not in paths:
        parser.error(f"{skill_dir}/SKILL.md must be tracked in Git")

    with zipfile.ZipFile(output, "w", compression=zipfile.ZIP_DEFLATED) as archive:
        archive.writestr(".codex-plugin/plugin.json", json.dumps(codex, indent=2) + "\n")
        archive.write(root / icon, Path(icon).as_posix())
        archive.write(root / "LICENSE", "LICENSE")
        for path in paths:
            archive.write(root / path, (Path("skills") / path).as_posix())

    print(output)


if __name__ == "__main__":
    main()
