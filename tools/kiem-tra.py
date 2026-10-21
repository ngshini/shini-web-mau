#!/usr/bin/env python3
"""Kiểm tra tự động cho dự án Shini Web Mẫu.
Chạy: ~/workspace/pwenv/bin/python tools/kiem-tra.py
Phục vụ ~/workspace qua http://127.0.0.1:8902, dự án ở /shini-web-mau/.
Kiểm tra mỗi mẫu đã tích hợp: lỗi JS, request hỏng (404), desktop + mobile,
chụp ảnh đại diện từ bản đã tích hợp. Thêm test trình chỉnh sửa: nhập liệu -> xem trước,
XSS, tải ảnh, link chia sẻ, QR.
"""
import asyncio, json, sys
from playwright.async_api import async_playwright

BASE = "http://127.0.0.1:8902/shini-web-mau"
TEMPLATES = [
    ("bo-hoa-dem-sao", "/templates/bo-hoa-dem-sao/"),
    ("bo-hoa-dem-sao-hoa", "/templates/bo-hoa-dem-sao/flower.html"),
    ("sinh-nhat-phao-hoa", "/templates/sinh-nhat-phao-hoa/"),
    ("thiep-cuoi-co-dien", "/templates/thiep-cuoi-co-dien/"),
    ("cafe-nang", "/templates/cafe-nang/"),
    ("cafe-nang-about", "/templates/cafe-nang/about.html"),
    ("cafe-nang-products", "/templates/cafe-nang/products.html"),
    ("cafe-nang-store", "/templates/cafe-nang/store.html"),
    ("bo-suu-tap", "/"),
]
THUMB_IDS = {"bo-hoa-dem-sao", "sinh-nhat-phao-hoa", "thiep-cuoi-co-dien", "cafe-nang"}

async def check_page(browser, name, path, results):
    for label, vp in [("desktop", {"width": 1280, "height": 800}), ("mobile", {"width": 390, "height": 844})]:
        ctx = await browser.new_context(viewport=vp)
        page = await ctx.new_page()
        errors, bad, ext = [], [], []
        page.on("pageerror", lambda e: errors.append(str(e)))
        page.on("console", lambda m: errors.append(m.text) if (m.type == "error" and "ERR_TUNNEL" not in m.text and "Failed to load resource" not in m.text) else None)
        page.on("response", lambda r: bad.append(f"{r.status} {r.url}") if (r.status >= 400 and "127.0.0.1" in r.url) else None)
        page.on("requestfailed", lambda r: bad.append(f"FAILED {r.url} {r.failure}") if "127.0.0.1" in r.url else ext.append(f"NGOAI {r.url}"))
        try:
            await page.goto(BASE + path, wait_until="networkidle", timeout=30000)
        except Exception as e:
            errors.append(f"goto: {e}")
        await page.wait_for_timeout(1600)
        overflow = await page.evaluate("document.documentElement.scrollWidth > window.innerWidth + 2")
        if label == "desktop" and name in THUMB_IDS:
            await page.screenshot(path=f"assets/thumb/{name}.jpg", type="jpeg", quality=72)
        results.append({"mau": name, "thietBi": label, "loiJS": errors, "requestHong": bad, "chanMangNgoai": ext, "tranNgang": overflow})
        await ctx.close()

async def editor_tests(browser, results):
    ctx = await browser.new_context(viewport={"width": 1280, "height": 900})
    page = await ctx.new_page()
    errors = []
    page.on("pageerror", lambda e: errors.append(str(e)))
    # --- Test 1: nhập liệu + XSS + link chia sẻ (thiệp cưới) ---
    await page.goto(BASE + "/chinh-sua.html?mau=thiep-cuoi-co-dien", wait_until="networkidle")
    await page.wait_for_timeout(1200)
    payload = '<img src=x onerror="window.__xss=1">'
    await page.fill("#f-coDau", payload)
    await page.fill("#f-chuRe", "Tuấn Kiểm Tra")
    hero = ""
    for _ in range(12):  # chờ iframe nạp lại với cấu hình mới (tối đa ~6 giây)
        await page.wait_for_timeout(500)
        frame = next((f for f in page.frames if "/templates/thiep-cuoi-co-dien" in f.url), None)
        if not frame: continue
        hero = await frame.evaluate("document.querySelector('h2.title') ? document.querySelector('h2.title').textContent : ''")
        if "Tuấn Kiểm Tra" in hero: break
    xss = await frame.evaluate("window.__xss === 1")
    qr = await page.evaluate("document.querySelector('#qrBox svg') !== null")
    link = await page.input_value("#shareLink")
    page2 = await ctx.new_page()
    await page2.goto(link, wait_until="networkidle")
    await page2.wait_for_timeout(1200)
    hero2 = await page2.evaluate("document.querySelector('h2.title').textContent")
    results.append({"test": "chinh-sua + XSS + link chia se (thiep cuoi)",
                    "heroTrongIframe": hero.strip()[:80], "xssChay": xss,
                    "coQR": qr, "linkMoDungTen": "Tuấn Kiểm Tra" in hero2, "loiJS": errors})
    # --- Test 2: tải ảnh (café) ---
    await page.goto(BASE + "/chinh-sua.html?mau=cafe-nang", wait_until="networkidle")
    await page.wait_for_timeout(1000)
    import struct, zlib
    def png_rgb(w, h, rgb):
        def chunk(t, d):
            c = struct.pack(">I", len(d)) + t + d
            return c + struct.pack(">I", zlib.crc32(t + d) & 0xffffffff)
        raw = b"".join(b"\x00" + bytes(rgb) * w for _ in range(h))
        return (b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", struct.pack(">IIBBBBB", w, h, 8, 2, 0, 0, 0))
                + chunk(b"IDAT", zlib.compress(raw)) + chunk(b"IEND", b""))
    with open("/tmp/anh-test.png", "wb") as f:
        f.write(png_rgb(80, 60, (200, 60, 90)))
    await page.set_input_files("#photo-0", "/tmp/anh-test.png")
    await page.wait_for_timeout(1800)
    stored = await page.evaluate("!!localStorage.getItem('shini.mau.cafe-nang.photo.0')")
    frame = next((f for f in page.frames if "/templates/cafe-nang" in f.url), page.frames[-1])
    src = await frame.evaluate("document.querySelector('img[data-photo=\"0\"]').getAttribute('src')")
    results.append({"test": "tai anh (cafe)", "daLuuLocalStorage": stored,
                    "anhHienTrongXemTruoc": str(src).startswith("data:image")})
    # Xóa ảnh
    await page.click(".photo-slot button:text('Xóa ảnh') >> nth=0")
    await page.wait_for_timeout(600)
    stored2 = await page.evaluate("!!localStorage.getItem('shini.mau.cafe-nang.photo.0')")
    results.append({"test": "xoa anh (cafe)", "daXoaKhoiLocalStorage": not stored2})
    await ctx.close()

async def main():
    results = []
    async with async_playwright() as pw:
        browser = await pw.chromium.launch()
        for name, path in TEMPLATES:
            await check_page(browser, name, path, results)
        await editor_tests(browser, results)
        await browser.close()
    print(json.dumps(results, ensure_ascii=False, indent=1))
    bad = [r for r in results if r.get("loiJS") or r.get("requestHong") or r.get("xssChay")]
    print("\n== TONG KET ==")
    for r in results:
        tag = r.get("mau") or r.get("test")
        issues = []
        if r.get("loiJS"): issues.append(f"loiJS={len(r['loiJS'])}")
        if r.get("requestHong"): issues.append(f"reqHong={len(r['requestHong'])}")
        if r.get("tranNgang"): issues.append("TRAN-NGANG")
        if r.get("xssChay"): issues.append("XSS!")
        print(tag, r.get("thietBi", ""), "->", ", ".join(issues) if issues else "OK")
    sys.exit(1 if bad else 0)

asyncio.run(main())
