# -*- coding: utf-8 -*-
"""把 512 成品缩成 Android 各密度 ic_launcher.png 并写入 res/mipmap-*。"""
from PIL import Image
import os

SRC = 'icon5_light.png'
RES = '/sdcard/A_XXZZu/android/res'
SIZES = {
    'mipmap-mdpi': 48,
    'mipmap-hdpi': 72,
    'mipmap-xhdpi': 96,
    'mipmap-xxhdpi': 144,
}

base = Image.open(SRC).convert('RGBA')
assert base.size == (512, 512), base.size

for d, px in SIZES.items():
    out_dir = os.path.join(RES, d)
    os.makedirs(out_dir, exist_ok=True)
    img = base.resize((px, px), Image.LANCZOS)
    out = os.path.join(out_dir, 'ic_launcher.png')
    img.save(out)
    print(out, px, os.path.getsize(out), 'bytes')
print('DONE')
