#!/usr/bin/env python3
"""Small static checks for the GitHub Pages resume site."""

from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote


ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "index.html"
REQUIRED_FILES = [
    ROOT / "styles.css",
    ROOT / "script.js",
    ROOT / "reference" / "Sabari_Jaikrishnan_StaffAIEngineer_EA_Resume.pdf",
    ROOT / "reference" / "Vish Potrait.png",
]
REQUIRED_TEXT = [
    "Staff AI / ML Engineer",
    "40+ hrs",
    "80%",
    "16%",
    "~$12M",
    "jsvishnuj@gmail.com",
    "linkedin.com/in/jsvj",
    "Research publications",
    "Confidential",
    "High-contrast",
    "automating machine learning development and deployment",
    "International Journal of Advanced Science and Technology",
    "http://sersc.org/journals/index.php/IJAST/article/view/6552",
    "https://ieeexplore.ieee.org/abstract/document/8929977",
    "https://github.com/JSVJ/adviser-model",
    "https://ieeexplore.ieee.org/document/9268381",
]


class LinkParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.links: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attributes = dict(attrs)
        if tag == "a" and attributes.get("href"):
            self.links.append(attributes["href"] or "")
        if tag == "link" and attributes.get("href"):
            self.links.append(attributes["href"] or "")
        if tag == "script" and attributes.get("src"):
            self.links.append(attributes["src"] or "")
        if tag == "img" and attributes.get("src"):
            self.links.append(attributes["src"] or "")


def main() -> None:
    problems: list[str] = []

    if not INDEX.exists():
        problems.append("index.html is missing")
        raise SystemExit("\n".join(problems))

    html = INDEX.read_text(encoding="utf-8")

    for path in REQUIRED_FILES:
        if not path.exists():
            problems.append(f"Missing required file: {path.relative_to(ROOT)}")

    for text in REQUIRED_TEXT:
        if text not in html:
            problems.append(f"Missing required text: {text}")

    parser = LinkParser()
    parser.feed(html)

    for href in parser.links:
        if href.startswith(("http://", "https://", "mailto:", "#")):
            continue
        target = ROOT / unquote(href.split("#", 1)[0])
        if not target.exists():
            problems.append(f"Broken local link: {href}")

    if problems:
        print("Static checks failed:")
        for problem in problems:
            print(f"- {problem}")
        raise SystemExit(1)

    print("Static checks passed.")


if __name__ == "__main__":
    main()
