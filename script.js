class Map {
	constructor(grid, coins, cp, lava) {
		grid = grid.split(";");
		this.w = parseInt(grid[0]);
		this.h = parseInt(grid[1]);
		let offset = parseInt(grid[2]);
		this.mult = parseFloat(grid[3]); // slopes force multiplier
		
		this.coins = coins;
		this.cp = cp;
		this.lava = lava;
		
		this.min = this.max = parseInt(grid[4][0]);
		this.grid = [];
		let value;
		for (let i = 0; i < this.w * this.h; i++) {
			value = parseInt(grid[4][i]);
			if (this.min > value) {
				this.min = value;
			}
			if (this.max < value) {
				this.max = value;
			}
			this.grid.push(value);
		}
		// add invisible blocks for slope calculation
		for (let i = 0; i < this.w; i++) {
			this.grid.push(this.grid[this.w + i]);
		}
		this.grid.push(this.grid[this.grid.length - 1]);
		
		this.min -= offset;
		this.max -= offset;
		
		this.createImages();
	}
	
	createImages() {
		let names = ["0000", "0001", "0010", "0011", "0100", "0101", "0111", "1000", "1010", "1011", "1100", "1101", "1110", "coin", "cpInactive", "cpActive", "lava"];
		let img;
		this.images = {};
		for (let i = 0; i < names.length; i++) {
			img = new Image("img");
			img.src = "images/name.png".replace("name", names[i]);
			this.images[names[i]] = img;
		}
	}
	
	draw() {
		let o, points, min, max, name;
		for (let X = 0; X < this.w; X++) {
			for (let Y = 0; Y < this.h; Y++) {
				o = this.getObject(X, Y);
				if (o[0] == 3) {
					// draw lava
					/* ctx.fillStyle = "rgba(255, G, 0)".replace("G", 63 + 63*Math.sin(Date.now()/1000));
					ctx.fillRect(X*50, Y*50, 50, 50); */
					ctx.drawImage(this.images["lava"], X * 50, Y * 50);
				} else {
					// draw ground
					points = []
					let x, y;
					for (let i = 0; i < 4; i++) {
						if (X == this.w - 1) {
							x = this.w - 1;
						} else {
							x = X + i%2;
						}
						if (Y == this.h - 1) {
							y = this.h - 1;
						} else {
							y = Y + parseInt(i/2);
						}
						points.push(this.grid[x + this.w * y]);
					}
					if (points[0] == points[1] && points[0] == points[2] && points[0] == points[3]) {
						/* ctx.fillStyle = "rgb(x, x, x)".replaceAll("x", 255 * (points[0]-this.min)/(this.max-this.min));
						ctx.fillRect(X*50, Y*50, 50, 50); */
						ctx.drawImage(this.images["0000"], X * 50, Y * 50);
					} else {
						/* let data = new Uint8ClampedArray(10000); // 50*50 rgba pixels
						for (let x = 0; x < 50; x++) {
							for (let y = 0; y < 50; y++) {
								let a = points[0] + (points[1]-points[0]) * x / 50;
								let b = points[2] + (points[3]-points[2]) * x / 50;
								let c = 255 * (a + (b-a) * y / 50 - this.min) / (this.max-this.min);
								data[x*4 + y*200] = c;
								data[x*4 + y*200 + 1] = c;
								data[x*4 + y*200 + 2] = c;
								data[x*4 + y*200 + 3] = 255;
							}
						}
						ctx.putImageData(new ImageData(data, 50, 50), X * 50, Y * 50); */
						min = Math.min(points[0], points[1], points[2], points[3]);
						max = Math.max(points[0], points[1], points[2], points[3]);
						name = "";
						for (let i = 0; i < 4; i++) {
							name += Math.round((points[i]-min) / (max-min));
						}
						ctx.drawImage(this.images[name], X * 50, Y * 50);
					}

					if (o[0] == 1) {
						// draw coin
						/* ctx.strokeStyle = "#cc0";
						ctx.fillStyle = "yellow";
						ctx.beginPath();
						ctx.arc(X*50 + 25, Y*50 + 25, 10, 0, 2 * Math.PI);
						ctx.fill();
						ctx.moveTo(X*50 + 25, Y*50 + 20);
						ctx.lineTo(X*50 + 25, Y*50 + 30);
						ctx.stroke(); */
						ctx.drawImage(this.images["coin"], X * 50, Y * 50);
					} else if (o[0] == 2) {
						// draw checkpoint
						if (player.cpId < o[1]) {
							ctx.drawImage(this.images["cpInactive"], X * 50, Y * 50);
						} else {
							ctx.drawImage(this.images["cpActive"], X * 50, Y * 50);
						}
					}
				}
			}
		}
	}
	
	getObject(x, y) {
		// 0 = none, 1 = coin, 2 = cp, 3 = lava
		for (let i = 0; i < this.coins.length; i++) {
			if (eq(this.coins[i], [x, y]) && !player.coins.includes(i)) {
				return [1, i];
			}
		}
		for (let i = 0; i < this.cp.length; i++) {
			if (eq(this.cp[i], [x, y])) {
				return [2, i];
			}
		}
		for (let i = 0; i < this.lava.length; i++) {
			if (eq(this.lava[i], [x, y])) {
				return [3, i];
			}
		}
		return [0, -1];
	}
	
	slope(x, y) {
		if (Math.abs(x%50 - 25) > 20 && Math.abs(y%50 - 25) > 20) {
			return [0, 0];
		}
		let points = [];
		for (let i = 0; i < 4; i++) {
			points.push(this.grid[parseInt(x/50 + i%2 + (parseInt(y/50) + parseInt(i/2)) * this.w)] * this.mult);
		}
		let dx0 = points[1]-points[0];
		let dx1 = points[3]-points[2];
		let dy0 = points[2]-points[0];
		let dy1 = points[3]-points[1];
		return [dx0 + (dx1-dx0) * (y%50) / 50, dy0 + (dy1-dy0) * (x%50) / 50];
	}
}

class Player {
	constructor() {
		this.cp = map.cp[0];
		this.cpId = 0;
		this.coinsSave = []; // coins picked up last checkpoint
		this.respawn();
		this.speed = 0.5;
		this.dx = this.dy = 0;
	}
	
	respawn() {
		this.x = this.cp[0]*50 + 25;
		this.y = this.cp[1]*50 + 25;
		this.coins = [...this.coinsSave];
	}
	
	collideElement(x, y, size, shape) {
		let inX, inY;
		if (shape == "rect") {
			inX = (this.x + 16 >= x) && (this.x - 16 <= x + size[0]);
			inY = (this.y + 16 >= y) && (this.y - 16 <= y + size[1]);
		} else if (shape == "circle") {
			inX = (this.x + 16 >= x - size) && (this.x - 16 <= x + size);
			inY = (this.y + 16 >= y - size) && (this.y - 16 <= y + size);
		}
		if (inX && inY) {
			// more accurate collision detection
			if (shape == "rect") {
				let dx = Math.abs(this.x - (x + size[0]/2));
				let dy = Math.abs(this.y - (y + size[1]/2));

				if (dx > (size[0]/2 + 16) || dy > (size[1]/2 + 16)) {
					return false; // too far apart
				}
				if (dx <= (size[0]/2) || dy <= (size[1]/2)) {
					return true; // close enough
				}
				
				// check collision at a corner
				dx -= size[0]/2;
				dy -= size[1]/2;
				return (dx*dx + dy*dy <= 256);
			} else if (shape == "circle") {
				let r = 16 + size;
				let dx = x - this.x;
				let dy = y - this.y;
				return (dx*dx + dy*dy <= r*r);
			}
		}
		return false;
	}
	
	update() {
		this.move();
		this.interact();
		this.draw();
	}
	
	move() {
		let dxy = map.slope(this.x, this.y);
		this.dx -= dxy[0];
		this.dy -= dxy[1];
		
		let v = [0, 0];
		if (pressed["ArrowLeft"]) {
			v[0] -= 1;
		}
		if (pressed["ArrowRight"]) {
			v[0] += 1;
		}
		if (pressed["ArrowUp"]) {
			v[1] -= 1;
		}
		if (pressed["ArrowDown"]) {
			v[1] += 1;
		}
		// avoid moving sqrt(2) times faster diagonally
		let length = Math.sqrt(v[0]*v[0] + v[1]*v[1]);
		if (length) {
			this.dx += v[0] * this.speed / length;
			this.dy += v[1] * this.speed / length;
		}		
		this.collideWall(); // eventually stop moving
		
		this.x = Math.min(Math.max(this.x + this.dx, 16), map.w * 50 - 16);
		this.y = Math.min(Math.max(this.y + this.dy, 16), map.h * 50 - 16);
		this.dx *= 0.93;
		this.dy *= 0.93;
	}
	
	collideWall() {
	}
	
	interact() {
		let pos = [parseInt(this.x/50), parseInt(this.y/50)];
		
		// coins
		for (let i = 0; i < map.coins.length; i++) {
			if (eq(pos, map.coins[i]) && !this.coins.includes(i)) {
				this.coins.push(i);
			}
		}
		
		// checkpoints
		for (let i = 0; i < map.cp.length; i++) {
			if (eq(pos, map.cp[i])) {
				if (this.cpId < i) {
					if (i == map.cp.length - 1) {
						// end checkpoint: requires all coins to finish the level
						if (this.coins.length == map.coins.length) {
							clearInterval(interval);
						}
					} else {
						this.cpId = i;
						this.cp = map.cp[i];
						this.coinsSave = [...this.coins];
					}
				}
			}
		}
		
		// lava: more accurate collision detection
		for (let i = 0; i < map.lava.length; i++) {
			if (this.collideElement(map.lava[i][0] * 50, map.lava[i][1] * 50, [50, 50], "rect")) {
				this.respawn();
				return;
			}
		}
	}
	
	draw() {
		ctx.strokeStyle = "#007";
		ctx.fillStyle = "rgb(0, G, 255)".replace("G", 38*Math.sqrt(this.dx*this.dx + this.dy*this.dy));
		ctx.beginPath();
		ctx.arc(this.x, this.y, 15, 0, 2 * Math.PI);
		ctx.fill();
		ctx.stroke();
	}
}

function eq(l1, l2) {
	// checks if two lists are equal
	if (l1.length != l2.length) {
		return false;
	}
	for (let i = 0; i < l1.length; i++) {
		if (l1[i] != l2[i]) {
			return false;
		}
	}
	return true;
}

function init() {
	let grid = "17;12;1;0.65;111111111111111111111222222111111111222222221111111112222332211111111122223322111111111222222221111111112222211111111111111111111111111111111111110000011100111000000000111000111000000111111111111111111111";
	let coins = [[1, 9], [2, 2], [2, 3], [13, 8]];
	let cp = [[10, 8], [14, 1], [6, 3]];
	let lava = [[5, 1], [6, 1], [8, 3]];
	map = new Map(grid, coins, cp, lava);
	player = new Player();
	initCanvas();
}

function initCanvas() {
	canvas = document.getElementById("game");
	if (canvas != undefined) {
		document.body.removeChild(canvas);
	}
	canvas = document.createElement("canvas");
	canvas.id = "game";
	canvas.width = W = map.w * 50;
	canvas.height = H = map.h * 50;
	document.body.appendChild(canvas);
	ctx = canvas.getContext("2d");
	
	interval = setInterval(mainLoop, 1000/60);
}

function sum(l) {
	let x = 0;
	for (let i = 0; i < l.length; i++) {
		x += l[i];
	}
	return x;
}

function mainLoop() {
	let prevTime = Date.now();
	map.draw();
	player.update();
	timePassed = (Date.now()-prevTime) / 1000;
}

//window.addEventListener("resize", initCanvas);
window.onkeyup = (e) => {pressed[e.key] = false};
window.onkeydown = (e) => {pressed[e.key] = true};

let ctx, W, H;
let map, player, levels, level, interval;
let pressed = {};
let timePassed = 0;
let prevTime = Date.now();
