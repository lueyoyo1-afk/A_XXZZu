# -*- coding: utf-8 -*-
from PIL import Image, ImageDraw, ImageFilter

S = 1024


def vgrad(size, c1, c2, diag=True):
    w, h = size
    img = Image.new('RGB', (w, h))
    px = img.load()
    for y in range(h):
        for x in range(w):
            t = (x + y) / (w + h - 2) if diag else y / (h - 1)
            px[x, y] = (int(c1[0] + (c2[0] - c1[0]) * t),
                        int(c1[1] + (c2[1] - c1[1]) * t),
                        int(c1[2] + (c2[2] - c1[2]) * t))
    return img


def rmask(size, radius):
    m = Image.new('L', size, 0)
    ImageDraw.Draw(m).rounded_rectangle([0, 0, size[0] - 1, size[1] - 1], radius=radius, fill=255)
    return m


def glow(img, center, rad, color, alpha, blur):
    g = Image.new('RGBA', img.size, (0, 0, 0, 0))
    ImageDraw.Draw(g).ellipse([center[0] - rad, center[1] - rad, center[0] + rad, center[1] + rad], fill=color + (alpha,))
    g = g.filter(ImageFilter.GaussianBlur(blur))
    img.alpha_composite(g)


def make(S):
    s = S
    img = Image.new('RGBA', (s, s), (0, 0, 0, 0))
    bg = vgrad((s, s), (0xdc, 0xe6, 0xf6), (0xc6, 0xd6, 0xec)).convert('RGBA')
    img.alpha_composite(bg)

    def P(x):
        return int(x * s / 1024)

    glow(img, (P(210), P(210)), P(300), (255, 255, 255), 120, P(200))
    glow(img, (P(830), P(850)), P(320), (0x8e, 0xc5, 0xfc), 110, P(220))

    sh = Image.new('RGBA', (s, s), (0, 0, 0, 0))
    ImageDraw.Draw(sh).rounded_rectangle([P(250), P(230), P(774), P(820)], radius=P(70), fill=(20, 40, 80, 70))
    sh = sh.filter(ImageFilter.GaussianBlur(P(30)))
    img.alpha_composite(sh)

    paper = Image.new('RGBA', (s, s), (0, 0, 0, 0))
    d = ImageDraw.Draw(paper)
    d.rounded_rectangle([P(240), P(220), P(764), P(810)], radius=P(68), fill=(255, 255, 255, 215))
    d.rounded_rectangle([P(240), P(220), P(764), P(810)], radius=P(68), outline=(255, 255, 255, 255), width=P(6))
    img.alpha_composite(paper)

    drop = Image.new('RGBA', (s, s), (0, 0, 0, 0))
    dd = ImageDraw.Draw(drop)
    cx = P(502)
    top = P(300)
    bot = P(600)
    dd.ellipse([cx - P(118), P(400), cx + P(118), bot], fill=(0x4a, 0x86, 0xff, 255))
    dd.polygon([(cx, top), (cx + P(118), P(430)), (cx - P(118), P(430))], fill=(0x4a, 0x86, 0xff, 255))
    drop = drop.filter(ImageFilter.GaussianBlur(P(2)))
    img.alpha_composite(drop)

    gd = ImageDraw.Draw(img)
    gd.ellipse([cx - P(52), P(455), cx - P(14), P(500)], fill=(255, 255, 255, 150))

    for i, (y_, w_) in enumerate([(P(650), P(380)), (P(700), P(330)), (P(750), P(270))]):
        x0 = P(300)
        x1 = x0 + w_
        a = [180, 150, 110][i]
        gd.rounded_rectangle([x0, y_, x1, y_ + P(16)], radius=P(8), fill=(0x5a, 0x66, 0x78, a))
    return img


base = make(S)
rm = rmask((S, S), int(S * 0.225))
base.putalpha(rm)
final = base.resize((512, 512), Image.LANCZOS)
final.save('final5.png')

big = final.resize((384, 384), Image.LANCZOS)
prev = Image.new('RGB', (1024, 512), (245, 246, 250))
prev.paste(big, (80, 64), big.split()[-1])
prev.paste(big, (560, 64), big.split()[-1])
prev.save('preview5.png')
print('OK final5.png preview5.png')