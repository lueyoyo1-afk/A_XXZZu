# -*- coding: utf-8 -*-
from PIL import Image, ImageDraw, ImageFilter
import math

S = 512  # 主尺寸

def vgrad(size, c1, c2, diag=True):
    w,h = size
    img = Image.new('RGB',(w,h))
    px = img.load()
    for y in range(h):
        for x in range(w):
            t = (x+y)/(w+h-2) if diag else y/(h-1)
            r = int(c1[0]+(c2[0]-c1[0])*t)
            g = int(c1[1]+(c2[1]-c1[1])*t)
            b = int(c1[2]+(c2[2]-c1[2])*t)
            px[x,y]=(r,g,b)
    return img

def rounded_mask(size, radius):
    m = Image.new('L', size, 0)
    d = ImageDraw.Draw(m)
    d.rounded_rectangle([0,0,size[0]-1,size[1]-1], radius=radius, fill=255)
    return m

def paste_rgba(base, layer, mask=None):
    base.paste(layer, (0,0), mask if mask else layer)

def circle_glow(img, center, rad, color, alpha=120, blur=60):
    g = Image.new('RGBA', img.size, (0,0,0,0))
    d = ImageDraw.Draw(g)
    d.ellipse([center[0]-rad,center[1]-rad,center[0]+rad,center[1]+rad], fill=color+(alpha,))
    g = g.filter(ImageFilter.GaussianBlur(blur))
    img.alpha_composite(g)

# ---------- 1) 玻璃书页 ----------
def icon1():
    img = Image.new('RGBA',(S,S),(0,0,0,0))
    bg = vgrad((S,S),(0x4a,0x86,0xff),(0x8a,0x6b,0xff)).convert('RGBA')
    img.alpha_composite(bg)
    # 玻璃卡片
    card = Image.new('RGBA',(S,S),(0,0,0,0))
    d = ImageDraw.Draw(card)
    d.rounded_rectangle([110,120,402,392], radius=42, fill=(255,255,255,70), outline=(255,255,255,170), width=3)
    img.alpha_composite(card)
    # 书页折角（白）
    d2 = ImageDraw.Draw(img)
    d2.polygon([(230,180),(300,180),(300,250)], fill=(255,255,255,235))
    # 三条蓝线
    for i,y in enumerate([290,330,370]):
        d2.rounded_rectangle([150,y,362,y+10], radius=5, fill=(255,255,255,150))
    return img

# ---------- 2) 渐变字母 Z ----------
def icon2():
    img = Image.new('RGBA',(S,S),(0,0,0,0))
    bg = vgrad((S,S),(0x4a,0x86,0xff),(0x8a,0x6b,0xff)).convert('RGBA')
    img.alpha_composite(bg)
    circle_glow(img,(150,150),120,(255,255,255),90,70)
    d = ImageDraw.Draw(img)
    # 大 Z
    d.polygon([(150,150),(362,150),(362,190),(232,190),(362,322),(362,362),(150,362),(150,322),(280,322),(150,190)], fill=(255,255,255,245))
    return img

# ---------- 3) 羽毛笔 ----------
def icon3():
    img = Image.new('RGBA',(S,S),(0,0,0,0))
    bg = vgrad((S,S),(0x2f,0x6b,0xe6),(0x5b,0x9b,0xff)).convert('RGBA')
    img.alpha_composite(bg)
    d = ImageDraw.Draw(img)
    # 笔杆
    d.line([(200,340),(320,170)], fill=(255,255,255,240), width=14)
    # 羽毛体
    d.polygon([(320,170),(360,120),(352,180),(330,200)], fill=(255,255,255,225))
    d.polygon([(300,200),(250,140),(270,205),(292,215)], fill=(255,255,255,200))
    # 墨点
    d.ellipse([188,352,214,378], fill=(255,255,255,220))
    return img

# ---------- 4) 展开的书 ----------
def icon4():
    img = Image.new('RGBA',(S,S),(0,0,0,0))
    bg = vgrad((S,S),(0x4a,0x86,0xff),(0x7a,0x9b,0xff)).convert('RGBA')
    img.alpha_composite(bg)
    d = ImageDraw.Draw(img)
    # 左右两页
    d.polygon([(150,200),(248,180),(248,340),(150,360)], fill=(255,255,255,235))
    d.polygon([(264,180),(362,200),(362,360),(264,340)], fill=(255,255,255,215))
    # 中缝
    d.line([(256,178),(256,342)], fill=(0x4a,0x86,0xff,200), width=6)
    # 文字线
    for y in [230,260,290]:
        d.rounded_rectangle([168,y,232,y+7], radius=3, fill=(0x4a,0x86,0xff,120))
    for y in [230,260,290]:
        d.rounded_rectangle([280,y,344,y+7], radius=3, fill=(0x4a,0x86,0xff,110))
    return img

# ---------- 5) 墨滴+纸 ----------
def icon5():
    img = Image.new('RGBA',(S,S),(0,0,0,0))
    # 浅玻璃底
    bg = vgrad((S,S),(0xd6,0xe2,0xf5),(0xc3,0xd2,0xea)).convert('RGBA')
    img.alpha_composite(bg)
    # 纸张卡片
    card = Image.new('RGBA',(S,S),(0,0,0,0))
    d = ImageDraw.Draw(card)
    d.rounded_rectangle([120,110,392,402], radius=36, fill=(255,255,255,180))
    img.alpha_composite(card)
    d = ImageDraw.Draw(img)
    # 墨滴（蓝色水滴形）
    d.polygon([(256,150),(300,230),(256,290),(212,230)], fill=(0x4a,0x86,0xff,240))
    d.ellipse([232,205,280,253], fill=(0x4a,0x86,0xff,240))
    # 写字线
    for y in [310,340,370]:
        d.rounded_rectangle([160,y,352,y+8], radius=4, fill=(0x8a,0x92,0xa0,120))
    return img

# ---------- 6) 光斑+悬浮封面 ----------
def icon6():
    img = Image.new('RGBA',(S,S),(0,0,0,0))
    bg = vgrad((S,S),(0xb9,0xcb,0xe8),(0xd8,0xdc,0xee)).convert('RGBA')
    img.alpha_composite(bg)
    circle_glow(img,(140,140),110,(255,255,255),150,60)
    circle_glow(img,(390,400),130,(0x8e,0xc5,0xfc),140,70)
    # 悬浮封面（蓝渐变卡）
    cover = vgrad((200,260),(0x4a,0x86,0xff),(0x8a,0x6b,0xff)).convert('RGBA')
    cm = Image.new('L',(200,260),0)
    ImageDraw.Draw(cm).rounded_rectangle([0,0,199,259],radius=22,fill=255)
    # 阴影
    sh = Image.new('RGBA',(S,S),(0,0,0,0))
    ImageDraw.Draw(sh).rounded_rectangle([156+8,126+10,356+8,386+10],radius=22,fill=(20,40,80,90))
    sh = sh.filter(ImageFilter.GaussianBlur(18))
    img.alpha_composite(sh)
    img.paste(cover,(156,126),cm)
    # 封面上白色装饰
    d = ImageDraw.Draw(img)
    d.line([(210,180),(300,180)], fill=(255,255,255,230), width=8)
    d.line([(210,215),(280,215)], fill=(255,255,255,170), width=8)
    return img

icons = [icon1,icon2,icon3,icon4,icon5,icon6]
imgs = []
for i,fn in enumerate(icons,1):
    im = fn()
    # 圆角裁切
    im.putalpha(rounded_mask((S,S), int(S*0.225)))
    im.save('icon%d.png'%i)
    imgs.append(im)
    print('saved icon%d.png'%i)

# 预览拼接 3x2
pad=40; cell=S
W=cell*3+pad*4; H=cell*2+pad*3
sheet=Image.new('RGB',(W,H),(245,246,250))
for idx,im in enumerate(imgs):
    r=idx//3; c=idx%3
    x=pad+c*(cell+pad); y=pad+r*(cell+pad)
    sheet.paste(im,(x,y),im)
sheet.save('preview.png')
print('preview.png', sheet.size)
