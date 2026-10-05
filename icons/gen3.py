# -*- coding: utf-8 -*-
"""生成 5 号图标（墨滴+纸）——水滴用参数曲线一体成型，日夜两版。"""
from PIL import Image, ImageDraw, ImageFilter
import math

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


def teardrop_pts(cx, top, bottom, half_w, n=360):
    """一体成型水滴：上尖下圆，用两段贝塞尔平滑衔接。
    参数 t in [0,1]，0=顶点，1=底部最宽处。
    """
    pts = []
    H = bottom - top
    # 右半边轮廓：从顶点向下，宽度按 sqrt 曲线张开（自然水滴）
    for i in range(n + 1):
        t = i / n
        # 宽度：顶点为0，用 sin 曲线张开到 half_w
        w = half_w * math.sin(t * math.pi / 2) ** 0.85
        y = top + H * t
        pts.append((cx + w, y))
    # 底部半圆
    for i in range(1, n):
        ang = math.pi * i / n
        pts.append((cx + half_w * math.cos(ang - math.pi) if False else cx - half_w * math.cos(ang), bottom))
    return pts


def draw_drop(size, P, color, hi=True):
    """画水滴图层。"""
    layer = Image.new('RGBA', size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    cx = P(502)
    top = P(300)
    bottom = P(600)
    half_w = P(118)
    H = bottom - top
    n = 200
    # 右半：宽度从0张开
    right = []
    for i in range(n + 1):
        t = i / n
        w = half_w * (math.sin(t * math.pi / 2) ** 0.8)
        y = top + H * t
        right.append((cx + w, y))
    # 底部圆弧（从右到左）
    for i in range(1, n):
        a = math.pi * i / n
        right.append((cx + half_w * math.cos(a), bottom + half_w * math.sin(a) * 0.0))
    # 左半：镜像回顶点
    left = []
    for i in range(n, -1, -1):
        t = i / n
        w = half_w * (math.sin(t * math.pi / 2) ** 0.8)
        y = top + H * t
        left.append((cx - w, y))
    poly = right + left
    d.polygon(poly, fill=color + (255,))
    if hi:
        d.ellipse([cx - P(52), P(455), cx - P(14), P(500)], fill=(255, 255, 255, 160))
    return layer


def make(S, dark=False, drop_color=(0x4a, 0x86, 0xff)):
    s = S
    img = Image.new('RGBA', (s, s), (0, 0, 0, 0))

    def P(x):
        return int(x * s / 1024)

    if dark:
        bg = vgrad((s, s), (0x1c, 0x22, 0x33), (0x27, 0x2e, 0x44)).convert('RGBA')
    else:
        bg = vgrad((s, s), (0xdc, 0xe6, 0xf6), (0xc6, 0xd6, 0xec)).convert('RGBA')
    img.alpha_composite(bg)

    if dark:
        glow(img, (P(210), P(210)), P(300), (0x5b, 0x93, 0xff), 90, P(200))
        glow(img, (P(830), P(850)), P(320), (0x3a, 0x5a, 0xa8), 90, P(220))
    else:
        glow(img, (P(210), P(210)), P(300), (255, 255, 255), 120, P(200))
        glow(img, (P(830), P(850)), P(320), (0x8e, 0xc5, 0xfc), 110, P(220))

    # 纸张阴影
    sh = Image.new('RGBA', (s, s), (0, 0, 0, 0))
    ImageDraw.Draw(sh).rounded_rectangle([P(250), P(230), P(774), P(820)], radius=P(70), fill=(0, 0, 0, 90 if dark else 70))
    sh = sh.filter(ImageFilter.GaussianBlur(P(30)))
    img.alpha_composite(sh)

    # 纸张
    paper = Image.new('RGBA', (s, s), (0, 0, 0, 0))
    d = ImageDraw.Draw(paper)
    if dark:
        fillc = (0x3a, 0x42, 0x5c, 235)
        outc = (0x6a, 0x78, 0xa0, 255)
    else:
        fillc = (255, 255, 255, 215)
        outc = (255, 255, 255, 255)
    d.rounded_rectangle([P(240), P(220), P(764), P(810)], radius=P(68), fill=fillc)
    d.rounded_rectangle([P(240), P(220), P(764), P(810)], radius=P(68), outline=outc, width=P(6))
    img.alpha_composite(paper)

    # 水滴
    drop = draw_drop((s, s), P, drop_color)
    drop = drop.filter(ImageFilter.GaussianBlur(P(2)))
    img.alpha_composite(drop)

    # 文字线
    gd = ImageDraw.Draw(img)
    if dark:
        line_c = (0xa8, 0xb6, 0xd4)
    else:
        line_c = (0x5a, 0x66, 0x78)
    for i, (y_, w_) in enumerate([(P(650), P(380)), (P(700), P(330)), (P(750), P(270))]):
        x0 = P(300)
        a = [190, 160, 120][i]
        gd.rounded_rectangle([x0, y_, x0 + w_, y_ + P(16)], radius=P(8), fill=line_c + (a,))
    return img


for tag, dark, dc in [('light', False, (0x4a, 0x86, 0xff)), ('dark', True, (0x6a, 0xa6, 0xff))]:
    base = make(S, dark=dark, drop_color=dc)
    rm = rmask((S, S), int(S * 0.225))
    base.putalpha(rm)
    final = base.resize((512, 512), Image.LANCZOS)
    final.save('icon5_%s.png' % tag)
    print('icon5_%s.png' % tag)

# 日/夜对比预览
l = Image.open('icon5_light.png').resize((300, 300), Image.LANCZOS)
d = Image.open('icon5_dark.png').resize((300, 300), Image.LANCZOS)
prev = Image.new('RGB', (760, 380), (235, 237, 242))
prev.paste(l, (50, 40), l.split()[-1])
prev.paste(d, (410, 40), d.split()[-1])
prev.save('preview5_v2.png')
print('OK')
