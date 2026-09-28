#!/usr/bin/env python3
"""Build the enterprise organization avatar set from compact SVG marks."""

from pathlib import Path
import subprocess
from xml.etree import ElementTree as ET

ROOT = Path(__file__).resolve().parent
PRODUCTS = ROOT.parent / "PRODUCTS"
NS = "{http://www.w3.org/2000/svg}"

PRODUCT_MARKS = {
    "aesthete-robotics": "aesthete",
    "anycam-app": "anycam",
    "anysiteonearth": "anysiteonearth",
    "compocv": "compocv",
    "lizhang-ledger": "lizhang-ledger",
    "phonaid": "phonaid",
}

# All marks are original simple geometry, with a 96 px safe margin for GitHub's circular crop.
MARKS = {
    "artchais-studio": '<path d="M256 111 390 367H122Z" fill="#8b5cf6" stroke="white" stroke-width="18" stroke-linejoin="round"/><circle cx="256" cy="279" r="42" fill="#ffd619"/><path d="M256 111v91M122 367l78-47m190 47-78-47" stroke="#00b559" stroke-width="17" stroke-linecap="round"/>',
    "baozou-ppt-studio": '<rect x="119" y="133" width="274" height="225" rx="30" fill="#2563eb" stroke="white" stroke-width="16"/><path d="M168 305h176M184 182v78l66-39Z" fill="#ffd619" stroke="white" stroke-width="13" stroke-linejoin="round"/><path d="M215 378h82" stroke="#00b559" stroke-width="18" stroke-linecap="round"/>',
    "bifurcate-systems": '<path d="M256 109v112M256 221 150 326m106-105 106 105" stroke="white" stroke-width="30" stroke-linecap="round"/><circle cx="256" cy="111" r="31" fill="#2563eb"/><circle cx="144" cy="335" r="35" fill="#f81018"/><circle cx="368" cy="335" r="35" fill="#00b559"/><circle cx="256" cy="221" r="34" fill="#ffd619"/>',
    "farseer-video": '<rect x="117" y="152" width="278" height="208" rx="32" fill="#16456b" stroke="white" stroke-width="16"/><path d="m217 190 105 66-105 66Z" fill="#f81018"/><path d="M146 133v40m220-40v40M146 340v40m220-40v40" stroke="#ffd619" stroke-width="17" stroke-linecap="round"/>',
    "garageband-mcp": '<path d="M126 303c53-122 112-122 159 0 33-80 67-80 101 0" fill="none" stroke="#00b559" stroke-width="30" stroke-linecap="round"/><circle cx="165" cy="192" r="25" fill="#2563eb"/><circle cx="347" cy="192" r="25" fill="#f81018"/><path d="M165 216v126m182-126v126M150 342h30m152 0h30" stroke="white" stroke-width="15" stroke-linecap="round"/>',
    "jjklive": '<path d="M158 140v171q0 54 52 54 49 0 49-54V140" fill="none" stroke="#2563eb" stroke-width="34" stroke-linecap="round"/><path d="M287 140v224m0-103 88-110m-88 110 89 104" fill="none" stroke="#00b559" stroke-width="34" stroke-linecap="round" stroke-linejoin="round"/><circle cx="158" cy="140" r="20" fill="#ffd619"/>',
    "lizhang-accounting": '<rect x="119" y="118" width="274" height="276" rx="32" fill="#0a7fbe" stroke="white" stroke-width="16"/><path d="M175 186h163M175 244h163M175 302h93" stroke="white" stroke-width="19" stroke-linecap="round"/><path d="m282 313 27 27 45-53" fill="none" stroke="#ffd619" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>',
    "motor-muscle-sim": '<path d="M125 300c53-27 71-93 130-93s76 66 132 93" fill="none" stroke="#f81018" stroke-width="35" stroke-linecap="round"/><path d="M127 319h260" stroke="white" stroke-width="17" stroke-linecap="round"/><circle cx="155" cy="343" r="31" fill="#2563eb"/><circle cx="357" cy="343" r="31" fill="#00b559"/><path d="m243 132 35 46-35 44" fill="none" stroke="#ffd619" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>',
    "rover-apps": '<circle cx="256" cy="256" r="145" fill="none" stroke="#2563eb" stroke-width="22"/><path d="m256 122 65 133-65 135-65-135Z" fill="#00b559" stroke="white" stroke-width="14" stroke-linejoin="round"/><circle cx="256" cy="256" r="30" fill="#ffd619"/><path d="M256 83v36m0 274v36M83 256h36m274 0h36" stroke="#f81018" stroke-width="18" stroke-linecap="round"/>',
    "space-mining-stage": '<path d="m256 106 140 103-53 171H169l-53-171Z" fill="#16456b" stroke="white" stroke-width="16" stroke-linejoin="round"/><path d="m256 138 91 80-91 129-91-129Z" fill="#8b5cf6"/><path d="m256 138 91 80-91 29-91-29Z" fill="#2563eb"/><path d="m256 347-91-129 91 29 91-29Z" fill="#00b559"/><circle cx="256" cy="247" r="21" fill="#ffd619"/>',
    "thinking-machine-labs": '<rect x="139" y="139" width="234" height="234" rx="34" fill="#8b5cf6" stroke="white" stroke-width="17"/><path d="M194 222c0-45 61-61 80-20 39-25 76 23 44 54 26 36-4 78-47 61-25 29-76 10-76-30-34-13-33-52-1-65Z" fill="#07111f" stroke="#ffd619" stroke-width="13" stroke-linejoin="round"/><path d="M256 208v97m-43-53h86" stroke="#00b559" stroke-width="11"/><path d="M256 104v35m0 234v35M104 256h35m234 0h35" stroke="#2563eb" stroke-width="15" stroke-linecap="round"/>',
}

DUPLICATES = {
    "jjk-live-app": "jjklive",
    "motor-muscle-lab": "motor-muscle-sim",
}

def product_mark(slug: str) -> str:
    source = PRODUCTS / PRODUCT_MARKS[slug] / "SVG" / "icon.svg"
    root = ET.parse(source).getroot()
    box = [float(x) for x in root.attrib["viewBox"].split()]
    scale = 300 / max(box[2], box[3])
    x = 256 - box[2] * scale / 2
    y = 256 - box[3] * scale / 2
    children = "".join(ET.tostring(child, encoding="unicode") for child in root if child.tag not in {NS + "title", NS + "desc"})
    return f'<circle cx="256" cy="256" r="176" fill="#f8fafc"/><g transform="translate({x:g} {y:g}) scale({scale:g})">{children}</g>'

def render(slug: str, mark: str, *, duplicate: bool = False):
    directory = ROOT / slug
    directory.mkdir(exist_ok=True)
    border = '<circle cx="256" cy="256" r="207" fill="none" stroke="#ffd619" stroke-width="11" stroke-dasharray="20 15"/><circle cx="380" cy="135" r="30" fill="#ffd619" stroke="white" stroke-width="7"/>' if duplicate else ""
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" aria-label="{slug} organization avatar">
  <rect width="512" height="512" rx="112" fill="#07111f"/>
  {mark}
  {border}
</svg>\n'''
    source = directory / "avatar.svg"
    source.write_text(svg)
    subprocess.run(["rsvg-convert", "-w", "512", "-h", "512", str(source), "-o", str(directory / "avatar.png")], check=True)

def main():
    for slug in PRODUCT_MARKS:
        render(slug, product_mark(slug))
    for slug, mark in MARKS.items():
        render(slug, mark, duplicate=(slug == "lizhang-accounting"))
    for slug, sibling in DUPLICATES.items():
        render(slug, MARKS[sibling], duplicate=True)

if __name__ == "__main__":
    main()
