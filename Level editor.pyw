import pyperclip
import pygame
from pygame.locals import *
from pygame.math import Vector2
from math import ceil, sqrt, cos

class Player:
    def __init__(self):
        self.x = W*25
        self.y = H*25
        self.dx = self.dy = 0
        self.speed = 0.5

    def update(self):
        self.move()
        self.draw()

    def slope(self):
        if abs(self.x%50 - 25) > 20 and abs(self.y%50 - 25) > 20:
            return 0, 0
        points = get_points(int(self.x/50), int(self.y/50))
        dx0 = points[1]-points[0]
        dx1 = points[3]-points[2]
        dy0 = points[2]-points[0]
        dy1 = points[3]-points[1]
        return dx0 + (dx1-dx0) * (self.y%50) / 50 * mult, dy0 + (dy1-dy0) * (self.x%50) / 50 * mult

    def move(self):
        dx, dy = self.slope()
        self.dx -= dx
        self.dy -= dy

        v = Vector2() # movement vector
        pressed = pygame.key.get_pressed()
        if pressed[K_LEFT]:
            v.x -= 1
        if pressed[K_RIGHT]:
            v.x += 1
        if pressed[K_UP]:
            v.y -= 1
        if pressed[K_DOWN]:
            v.y += 1
        if v.length():
            v = v.normalize()*self.speed
            self.dx += v.x
            self.dy += v.y

        self.x = min(max(self.x+self.dx, 16), W*50 - 16)
        self.y = min(max(self.y+self.dy, 16), H*50 - 16)
        self.dx *= 0.93
        self.dy *= 0.93

    def draw(self):
        speed = sqrt(self.dx*self.dx + self.dy*self.dy)
        pygame.draw.circle(screen, (0, 0, 255), (self.x + 52, self.y), 16, 2)
        pygame.draw.circle(screen, (0, min(int(speed*38), 255), 255), (self.x + 52, self.y), 15)

class Inputbox:
    def __init__(self, x, y, value, text, action):
        self.x = x
        self.y = y
        self.text = text
        self.action = action
        self.value = str(value)

        self.active = 0

    def update(self, events):
        text = font.render(self.text, 1, white)
        w = text.get_width() + 5
        rect = Rect((self.x+w, self.y), (52-w, 16))

        for event in events:
            if event.type == MOUSEBUTTONDOWN:
                if rect.collidepoint(event.pos):
                    self.active = True
                else:
                    self.active = False
            elif self.active and event.type == KEYDOWN:
                if event.unicode in '0123456789-.':
                    self.value += event.unicode
                elif event.key == K_BACKSPACE:
                    self.value = self.value[:-1]
                elif event.key == K_RETURN:
                    self.action(float(self.value))
                    self.active = False

        value = self.value
        if self.active and cos(pygame.time.get_ticks()/100) > 0:
            value += '_'
        screen.blit(text, (self.x, self.y))
        pygame.draw.rect(screen, grey, rect)
        screen.blit(font.render(value, 1, white), (self.x+w, self.y))

def round_(n):
    if n%1 < 0.5:
        return int(n)
    return int(n)+1

def resize(w, h, firstTime=False):
    global W, H, SCREENW, SCREENH, terrain, objects, screen
    W = int(max(w, 1))
    H = int(max(h, 1))

    if not firstTime: # put the player in the center of the terrain
        player.x = W*25
        player.y = H*25

    terrain = []
    for y in range(H):
        terrain.append([])
        for x in range(W):
            terrain[-1].append(0)
    objects = [[], [], []] # corresponding to all object lists, in the order of menu

    pygame.display.quit()
    pygame.display.init()
    SCREENW = W*50 + 52
    SCREENH = max(H*50, (52*len(menu) + 256))
    screen = pygame.display.set_mode((SCREENW, SCREENH))

def show(msg):
    screen.fill(black)
    y = 10
    for line in msg.split('\n'):
        screen.blit(font.render(line, 1, white), (10, y))
        y += 16
    screen.blit(font.render('[click or press a key to close]', 1, white), (10, y+16))
    pygame.display.flip()
    while 1:
        for event in pygame.event.get():
            if event.type == QUIT:
                pygame.quit()
                quit()
            elif event.type == MOUSEBUTTONDOWN:
                return
            elif event.type == KEYDOWN:
                return

def show_help():
    show("""Too lazy to make this prettier sry

Select a menu item on the left to place it in the main area in the middle.
When the first item is selected, you can use left and right click to raise or lower the ground.
The Export button will copy something to your clipboard.
Just paste this code on Discord for me to review your level.
The debug button allows you do see the terrain height and the checkpoints order.

Inputs at the bottom:
- W sets the width
- H sets the height
- * sets the slope strength multiplier
Warning: resizing loses all your progress!

You can press the middle mouse button to move the player to the mouse position.
You can also move the player like in game with the arrows.
Didn't bother adding all the collisions and stuff, not really useful here.

You need at least one checkpoint for your level to be valid.
In order to reach the last checkpoint and finish the level,
  the player must be able to collect all coins.""")

def get_tex():
    global images
    names = '0000 0001 0010 0011 0100 0101 0111 1000 1010 1011 1100 1101 1110 coin cpInactive cpActive lava error'.split(' ')
    images = {name: pygame.image.load('../images/%s.png' %name) for name in names}

def get_points(x, y):
    if x == W - 1:
        x_ = x
    else:
        x_ = x+1
    if y == H - 1:
        y_ = y
    else:
        y_ = y+1
    return [terrain[y][x], terrain[y][x_], terrain[y_][x], terrain[y_][x_]]

def change_mult(m):
    global mult
    mult = m

def export():
    # print and copy to clipboard in a format readable by the js file

    if len(objects[1]) == 0:
        show('Your level needs at least one checkpoint.')
        return
    if len(objects[1]) == 1:
        # add another checkpoint if start = finish
        remove = True
        objects[1].append(objects[1][0])
    else:
        remove = False

    obj = ';'.join([','.join(['%d.%d'%(x, y) for x, y in l]) for l in objects])
    data = ''.join([''.join([str(x) for x in line]) for line in terrain])
    data = '%d;%d;%d;%s;%s' %(W, H, mult, obj, data)

    if remove:
        objects[1].pop() # remove the added checkpoint

    print(data)
    pyperclip.copy('"%s"' %data)

def draw_ui(events):
    global selected
    def erase(): # select eraser
        global selected
        selected = len(menu)
    def debug():
        global show_debug
        show_debug = not show_debug

    click = None
    for event in events:
        if event.type == MOUSEBUTTONDOWN and event.pos[0] < 52:
            click = event.pos[1]

    for i in range(len(menu)+1): # these menu items can have a selection box around
        if i < len(menu):
            screen.blit(images[menu[i]], (1, i*52 + 1))

        if selected == i:
            pygame.draw.rect(screen, (255, 255, 0), Rect((0, i*52), (52, 52)), 1)
        if click is not None and i*52 <= click < (i+1) * 52:
            selected = i

    y = i*52
    for text, action in [('Erase', erase), ('Export', export), ('Debug', debug), ('Help', show_help)]:
        text = font.render(text, 1, white)
        w, h = text.get_size()
        screen.blit(text, (26 - w//2, y + 26 - h//2))

        if click is not None and y <= click < y+52:
            action()
        y += 52

def draw_map():
    # draw terrain tiles
    for x in range(W):
        for y in range(H):
            pos = (x*50 + 52, y*50)
            points = get_points(x, y)
            min_ = min(points)
            max_ = max(points)
            if min_ == max_:
                screen.blit(images['0000'], pos)
            else:
                name = ''.join([str(round_((p-min_) / (max_-min_))) for p in points])
                if name in images:
                    screen.blit(images[name], pos)
                else:
                    screen.blit(images['error'], pos)

    # draw objects
    for i in range(len(objects)):
        for j in range(len(objects[i])):
            x, y = objects[i][j]
            name = menu[i+1]
            screen.blit(images[name], (x*50 + 52, y*50))
            if show_debug and name not in ['coin']: # show id of indexed objects
                text = font.render(str(j), 1, white)
                w, h = text.get_size()
                screen.blit(text, (x*50 + 77 - w//2, y*50 + 25 - h//2))

    if show_debug: # show terrain height
        i = 0
        for value in sum(terrain, []):
            screen.blit(font.render(str(value), 1, white), (i%W*50 + 52, i//W*50))
            i += 1

def fix_height():
    # make the min height 0
    offset = min(sum(terrain, []))
    for y in range(H):
        terrain[y] = [height-offset for height in terrain[y]]

def edit_map(events):
    x, y = pygame.mouse.get_pos()
    if x < 52:
        return

    if selected == 0: # select points around tiles
        x, y = (x - 27) // 50, (y + 25)//50
        pygame.draw.rect(screen, (255, 255, 0), Rect((x*50 + 42, y*50 - 10), (20, 20)), 1)
    else: # select tiles
        x, y = (x - 52) // 50, y//50
        pygame.draw.rect(screen, (255, 255, 0), Rect((x*50 + 52, y*50), (50, 50)), 1)
    if x >= W or y >= H:
        return # can't edit out of bounds

    if selected == len(menu): # erase tiles objects when mouse pressed
        if pygame.mouse.get_pressed()[0]:
            for obj in objects:
                if (x, y) in obj:
                    obj.remove((x, y))
    elif selected == 0: # edit map when mouse clicked
        for event in events:
            if event.type == MOUSEBUTTONDOWN:
                if selected == 0: # change terrain height
                    if event.button == 1:
                        terrain[y][x] += 1
                    elif event.button == 3:
                        terrain[y][x] -= 1
                    fix_height()
    else: # add object
        if pygame.mouse.get_pressed()[0]:
            l = objects[selected-1]
            if (x, y) not in l:
                l.append((x, y))

pygame.init()

pygame.display.set_caption('Level editor')
font = pygame.font.SysFont('consolas', 16)
clock = pygame.time.Clock()

white = (255, 255, 255)
grey = (127, 127, 127)
black = (0, 0, 0)
get_tex()
menu = ['0000', 'coin', 'cpInactive', 'lava']
selected = 0
mult = 1 # slope strength multiplier
show_debug = False

resize(17, 12, True)
player = Player()
inputs = [Inputbox(0, 416, W, 'W', lambda W: resize(W, H)),
          Inputbox(0, 432, H, 'H', lambda H: resize(W, H)),
          Inputbox(0, 448, mult, '*', change_mult)]

while True:
    events = pygame.event.get()
    for event in events:
        if event.type == QUIT:
            pygame.quit()
            quit()
        elif event.type == MOUSEBUTTONDOWN and event.button == 2:
            player.x, player.y = event.pos
            player.x -= 52
            player.dx = player.dy = 0

    screen.fill(black)

    draw_map()
    draw_ui(events)
    edit_map(events)
    player.update()
    for box in inputs:
        box.update(events)

    pygame.display.flip()
    clock.tick(60)
