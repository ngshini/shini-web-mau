#!/usr/bin/env python3
"""Tạo bộ ảnh + video mẫu cho template sinh-nhat-hoa-anh-dao bằng PIL/ffmpeg.
Ảnh trừu tượng (gradient + cánh hoa + đốm sáng) do máy vẽ — không dùng ảnh của bên thứ ba,
nên không vướng quyền hình ảnh. Người dùng thay bằng ảnh thật trong trình chỉnh sửa.
Chạy: ~/workspace/pwenv/bin/python tools/tao-anh-mau-sinh-nhat.py
"""
import math, os, random, subprocess, sys
from PIL import Image, ImageDraw, ImageFilter

OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
                   "templates", "sinh-nhat-hoa-anh-dao", "img")
os.makedirs(OUT, exist_ok=True)
random.seed(42)

PALETTES = [
    ((255, 183, 197), (255, 218, 233)), ((168, 216, 234), (255, 243, 224)),
    ((255, 236, 170), (255, 183, 197)), ((196, 181, 253), (255, 218, 233)),
    ((167, 243, 208), (224, 242, 254)), ((254, 215, 170), (255, 183, 197)),
]

def gradient(w, h, top, bottom):
    img = Image.new("RGB", (w, h))
    px = img.load()
    for y in range(h):
        t = y / max(1, h - 1)
        px_row = tuple(int(top[i] + (bottom[i] - top[i]) * t) for i in range(3))
        for x in range(w):
            px[x, y] = px_row
    return img

def decorate(img, n_petals=26, n_dots=40):
    w, h = img.size
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    for _ in range(n_dots):
        x, y = random.uniform(0, w), random.uniform(0, h)
        r = random.uniform(2, 7)
        d.ellipse([x - r, y - r, x + r, y + r], fill=(255, 255, 255, random.randint(50, 120)))
    for _ in range(n_petals):
        x, y = random.uniform(0, w), random.uniform(0, h)
        s = random.uniform(9, 22)
        ang = random.uniform(0, 360)
        d.ellipse([x - s, y - s * 0.62, x + s, y + s * 0.62], fill=(255, 140, 170, random.randint(90, 160)))
    layer = layer.rotate(0)
    return Image.alpha_composite(img.convert("RGBA"), layer).convert("RGB")

def make(name, w, h, pi):
    top, bottom = PALETTES[pi % len(PALETTES)]
    img = decorate(gradient(w, h, top, bottom))
    img.save(os.path.join(OUT, name), quality=88)
    print(name, img.size)

for i in range(1, 5):
    make(f"img{i}.png", 880, 620, i)          # dòng thời gian
for i in range(1, 7):
    make(f"image{i}.png", 620, 780, i + 2)    # khoảnh khắc nổi bật
for i in range(1, 9):
    make(f"{i}.png", 640, 640, i + 4)         # bộ sưu tập

# --- Video đầu trang: trời hoàng hôn + cánh hoa rơi (6 giây, 15fps) ---
W, H, FPS, SEC = 960, 540, 15, 6
base = gradient(W, H, (255, 170, 190), (135, 170, 235))
petals = [{"x": random.uniform(0, W), "y": random.uniform(-H, 0), "s": random.uniform(7, 15),
           "v": random.uniform(28, 60), "ph": random.uniform(0, 6.28)} for _ in range(46)]
frames_dir = "/tmp/sa_frames"; os.makedirs(frames_dir, exist_ok=True)
for f in range(FPS * SEC):
    img = base.copy()
    d = ImageDraw.Draw(img, "RGBA")
    t = f / FPS
    for p in petals:
        y = (p["y"] + p["v"] * t) % (H + 40) - 20
        x = p["x"] + math.sin(t * 1.4 + p["ph"]) * 22
        s = p["s"]
        d.ellipse([x - s, y - s * 0.62, x + s, y + s * 0.62], fill=(255, 150, 180, 190))
    img.save(os.path.join(frames_dir, f"f{f:03d}.png"))
cmd = ["ffmpeg", "-y", "-framerate", str(FPS), "-i", os.path.join(frames_dir, "f%03d.png"),
       "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "27", "-movflags", "+faststart",
       os.path.join(OUT, "sa.mp4")]
r = subprocess.run(cmd, capture_output=True, text=True)
print("ffmpeg:", "OK" if r.returncode == 0 else r.stderr[-400:])
print("done ->", OUT)
