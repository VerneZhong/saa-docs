from pathlib import Path
import shutil


ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / ".site-docs"


def main() -> None:
    if DEST.exists():
        shutil.rmtree(DEST)
    DEST.mkdir()

    for source in sorted(ROOT.glob("*.md")):
        if source.name == "README.md":
            continue
        shutil.copy2(source, DEST / source.name)

    for name in ("index.md", "manifest.webmanifest", "service-worker.js"):
        source = ROOT / name
        if source.exists():
            shutil.copy2(source, DEST / name)

    shutil.copytree(ROOT / "assets", DEST / "assets")


if __name__ == "__main__":
    main()
