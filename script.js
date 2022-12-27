class Map {
	constructor(data) {
		// width; height; slope multiplier; coins; checkpoints; lava; level data
		data = data.split(";");
		let mult = parseFloat(data[2]); // slopes force multiplier
		this.min = this.max = parseInt(data[6][0])*mult;
		this.terrain = [];
		this.objects = [];
		
		// generate terrain
		let i = 0;
		for (let y = 0; y < parseInt(data[1]); y++) {
			this.terrain.push([]);
			this.objects.push([]);
			for (let x = 0; x < parseInt(data[0]); x++) {
				let value = parseInt(data[6][i])*mult;
				if (this.min > value) {
					this.min = value;
				}
				if (this.max < value) {
					this.max = value;
				}
				this.terrain[this.terrain.length - 1].push(value);
				this.objects[this.objects.length - 1].push([]);
				i++;
			}
		}
		this.w = this.terrain[0].length;
		this.h = this.terrain.length;
		
		// add objects
		this.totalCoins = 0;
		this.totalCp = 0;
		let objects = [data[3].split(","), data[4].split(","), data[5].split(",")];
		let names = ["coin", "cp", "lava"];
		for (let i = 0; i < objects.length; i++) {
			if (objects[i][0].length != 0) { // make sure there are items of this type
				for (let j = 0; j < objects[i].length; j++) {
					let pos = objects[i][j].split(".");
					// push in [name, id]
					this.objects[parseInt(pos[1])][parseInt(pos[0])].push([names[i], j]);
					if (names[i] == "coin") {
						this.totalCoins++;
					}
					if (names[i] == "cp") {
						if (this.totalCp == 0) {
							this.firstCp = [parseInt(pos[0]), parseInt(pos[1])];
						}
						this.totalCp++;
					}
				}
			}
		}
		
		this.createImages();
	}
	
	createImages() {
		let names = ["0000", "0001", "0010", "0011", "0100", "0101", "0111", "1000", "1010", "1011", "1100", "1101", "1110", "coin", "cpInactive", "cpActive", "lava", "error"];
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
		for (let x = 0; x < this.w; x++) {
			for (let y = 0; y < this.h; y++) {
				// draw ground
				points = this.getPoints(x, y);
				if (points[0] == points[1] && points[0] == points[2] && points[0] == points[3]) {
					ctx.drawImage(this.images["0000"], x * 50, y * 50);
				} else {
					min = Math.min(points[0], points[1], points[2], points[3]);
					max = Math.max(points[0], points[1], points[2], points[3]);
					name = "";
					for (let i = 0; i < 4; i++) {
						name += Math.round((points[i]-min) / (max-min));
					}
					if (this.images[name] == undefined) {
						ctx.drawImage(this.images["error"], x * 50, y * 50);
					} else {
						ctx.drawImage(this.images[name], x * 50, y * 50);
					}
				}
				
				// draw objects
				for (let i = 0; i < this.objects[y][x].length; i++) {
					o = this.objects[y][x][i];
					if (o[0] == "coin") {
						if (!player.coins.includes(o[1])) {
							ctx.drawImage(this.images["coin"], x * 50, y * 50);
						}
					} else if (o[0] == "cp") {
						// draw checkpoint
						if (player.cpId < o[1]) {
							ctx.drawImage(this.images["cpInactive"], x * 50, y * 50);
						} else {
							ctx.drawImage(this.images["cpActive"], x * 50, y * 50);
						}
					} else if (o[0] == "lava") {
						ctx.drawImage(this.images["lava"], x * 50, y * 50);
					}
				}
			}
		}
	}
	
	getPoints(x, y) {
		let x_, y_;
		if (x == this.w - 1) {
			x_ = x;
		} else {
			x_ = x + 1;
		}
		if (y == this.h - 1) {
			y_ = y;
		} else {
			y_ = y + 1;
		}
		return [this.terrain[y][x], this.terrain[y][x_], this.terrain[y_][x], this.terrain[y_][x_]];
	}
	
	slope(x, y) {
		if (Math.abs(x%50 - 25) > 20 && Math.abs(y%50 - 25) > 20) {
			return [0, 0];
		}
		let points = this.getPoints(parseInt(x / 50), parseInt(y / 50));
		let dx0 = points[1]-points[0];
		let dx1 = points[3]-points[2];
		let dy0 = points[2]-points[0];
		let dy1 = points[3]-points[1];
		return [dx0 + (dx1-dx0) * (y%50) / 50, dy0 + (dy1-dy0) * (x%50) / 50];
	}
}

class Player {
	constructor() {
		this.cp = map.firstCp;
		this.cpId = 0;
		this.coinsSave = []; // coins picked up last checkpoint
		this.respawn();
		this.speed = 0.5;
	}
	
	respawn() {
		this.x = this.cp[0]*50 + 25;
		this.y = this.cp[1]*50 + 25;
		this.dx = this.dy = 0;
		this.coins = [...this.coinsSave];
	}
	
	collideObject(x, y, size, shape) {
		// first, check if in range
		let inX, inY;
		if (shape == "rect") {
			inX = (this.x + 16 >= x) && (this.x - 16 <= x + size[0]);
			inY = (this.y + 16 >= y) && (this.y - 16 <= y + size[1]);
		} else if (shape == "circle") {
			inX = (this.x + 16 >= x - size) && (this.x - 16 <= x + size);
			inY = (this.y + 16 >= y - size) && (this.y - 16 <= y + size);
		}
		
		// then, more accurate collision detection
		if (inX && inY) {
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
		
		let v = [0, 0]; // movement vector
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
		
		// check collision with every object in the map
		for (let x = 0; x < map.w; x++) {
			for (let y = 0; y < map.h; y++) {
				for (let i = 0; i < map.objects[y][x].length; i++) {
					let o = map.objects[y][x][i];
					if (o[0] == "coin") {
						if (eq(pos, [x, y]) && !this.coins.includes(o[1])) {
							this.coins.push(o[1]);
						}
					} else if (o[0] == "cp") {
						if (eq(pos, [x, y]) && this.cpId < o[1]) {
							if (o[1] == map.totalCp - 1) {
								// end checkpoint: requires all coins to finish the level
								if (this.coins.length == map.totalCoins) {
									console.log("u win ez");
									clearInterval(interval);
									return;
								}
							} else {
								this.cpId = o[1];
								this.cp = [x, y];
								this.coinsSave = [...this.coins];
							}
						}
					} else if (o[0] == "lava") {
						if (this.collideObject(x * 50, y * 50, [50, 50], "rect")) {
							this.respawn();
							return;
						}
					}
				}
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
	// width; height; slope multiplier; coins; checkpoints; lava; level data
	let data = "17;12;0.65;1.9,2.2,2.3,13.8;10.8,14.1,6.3;5.1,6.1,8.3;111111111111111111111222222111111111222222221111111112222332211111111122223322111111111222222221111111112222211111111111111111111111111111111111110000011100111000000000111000111000000111111111111111111111";
	data = "15;12;0.3;0.4,8.4,5.5,13.3,14.11;2.10,7.5,1.10;3.9,3.8,3.7,3.5,2.5,0.1,1.1,2.1,3.1,4.1,5.1,6.1,6.0,5.0,4.0,3.0,2.0,1.0,0.0,0.6,1.6,7.8,6.8,7.11,6.11,9.6,8.6,7.6,9.5,9.4,9.3,9.2,7.2,7.3,7.4,8.0,9.0,10.0,11.0,13.0,13.1,14.3,14.10,12.11,13.9,11.10,9.9,9.11;222222222222222222222222111112222222222222222444443321222233444443322222233332223322122222222223322222222222222222222222222222000222222222222000333333222222000333333333332000333333";
	map = new Map(data);
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
