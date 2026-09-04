#!/usr/bin/env python3
"""Renders a cached reference DOM as an indented structural outline
(tag, classes, attrs, text) so components can be authored from observed structure."""
import sys, re
from html.parser import HTMLParser

SKIP = {'script','style','noscript','svg','path','circle','line','polyline','rect','defs','g','meta','link','head'}

class Outline(HTMLParser):
    def __init__(self, start=None, maxdepth=99):
        super().__init__(convert_charrefs=True)
        self.d = 0; self.out = []; self.skip = 0
        self.start = start; self.active = start is None; self.startdepth = None
        self.maxdepth = maxdepth
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag in SKIP:
            if tag not in ('meta','link'): self.skip += 1
            return
        if self.skip: return
        if not self.active and self.start and a.get('id') == self.start:
            self.active = True; self.startdepth = self.d
        if self.active and self.d - (self.startdepth or 0) <= self.maxdepth:
            cls = a.get('class','')
            bits = []
            for k in ('id','href','src','alt','aria-label','type','data-state','style'):
                if a.get(k): bits.append(f'{k}="{a[k][:90]}"')
            self.out.append(('tag', self.d, tag, cls, ' '.join(bits)))
        if tag not in ('img','br','input','hr'): self.d += 1
    def handle_endtag(self, tag):
        if tag in SKIP:
            if tag not in ('meta','link'): self.skip = max(0, self.skip-1)
            return
        if self.skip: return
        if tag not in ('img','br','input','hr'): self.d -= 1
        if self.active and self.startdepth is not None and self.d < self.startdepth:
            self.active = False
    def handle_data(self, data):
        if self.skip or not self.active: return
        t = ' '.join(data.split())
        if t: self.out.append(('txt', self.d, t, '', ''))

src = open(sys.argv[1], encoding='utf8').read()
start = sys.argv[2] if len(sys.argv) > 2 and sys.argv[2] != '-' else None
maxd = int(sys.argv[3]) if len(sys.argv) > 3 else 99
p = Outline(start, maxd); p.feed(src)
for kind, d, a, b, c in p.out:
    ind = '  ' * min(d, 30)
    if kind == 'txt':
        print(f'{ind}· {a[:1200]}')
    else:
        cls = f' .{b}' if b else ''
        print(f'{ind}<{a}{cls}{(" " + c) if c else ""}>')
