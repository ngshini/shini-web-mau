#!/usr/bin/env python3
"""Tải font Google Fonts (subset vietnamese + latin) về vendor/ của từng mẫu để mẫu tự chứa hoàn toàn.
Dùng: python3 tools/tai-font.py  — cần mạng tới fonts.googleapis.com (curl UA trình duyệt)."""
import re, subprocess, sys, os

UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"
JOBS = [
    # (thư mục mẫu, css2 query)
    ("templates/sinh-nhat-phao-hoa", "family=Pacifico&family=Poppins:wght@300;400;700&family=Great+Vibes"),
    ("templates/thiep-cuoi-co-dien", "family=Great+Vibes&family=Lato:wght@400;700&family=Raleway:wght@400;600;700"),
    ("templates/cafe-nang", "family=Raleway:ital,wght@0,400;0,600;0,700;0,800;0,900;1,400&family=Lora:ital,wght@0,400;0,700;1,400;1,700"),
]
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def fetch(url, out=None):
    cmd = ["curl", "-sL", "-A", UA, url]
    if out: cmd += ["-o", out]
    r = subprocess.run(cmd, capture_output=True)
    if r.returncode != 0: raise RuntimeError(f"curl fail {url}")
    return r.stdout.decode("utf-8", "ignore") if not out else None

for folder, query in JOBS:
    css = fetch(f"https://fonts.googleapis.com/css2?{query}&display=swap")
    blocks = re.findall(r"/\*\s*(\S+)\s*\*/\s*@font-face\s*{([^}]+)}", css)
    kept = []
    fonts_dir = os.path.join(ROOT, folder, "vendor", "fonts")
    os.makedirs(fonts_dir, exist_ok=True)
    for subset, body in blocks:
        if subset not in ("vietnamese", "latin", "latin-ext"): continue
        fam = re.search(r"font-family:\s*'([^']+)'", body).group(1).replace(" ", "")
        style = re.search(r"font-style:\s*(\w+)", body).group(1)
        weight = re.search(r"font-weight:\s*(\d+)", body).group(1)
        url = re.search(r"url\((https://[^)]+\.woff2)\)", body).group(1)
        name = f"{fam}-{weight}{'i' if style=='italic' else ''}-{subset}.woff2"
        fetch(url, os.path.join(fonts_dir, name))
        kept.append(body.replace(url, f"fonts/{name}"))
    out_css = "\n".join(f"@font-face {{{b}}}" for b in kept)
    with open(os.path.join(ROOT, folder, "vendor", "fonts.css"), "w") as f:
        f.write("/* Font tự chứa (Google Fonts, giấy phép OFL) — subset vietnamese + latin. Tải bằng tools/tai-font.py */\n" + out_css + "\n")
    print(folder, "->", len(kept), "font-face")
