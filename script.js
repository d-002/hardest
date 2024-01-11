let messages = ["boo loser", "you don't know what you're doing", "don't even try", "go back noob", "alt f4", "this one is ez", "why u keep trying", "azertyuiop", "qwertyuiop", "centered text", "now for an easy one", "this level is possible.", "go in the corners", "grab less coins", "avoid coins", "coins = bad trust me"];
let levels = [
"17;12;0.65;1.9,2.2,2.3,13.8;10.8,14.1,6.3;5.1,6.1,8.3;;111111111111111111111222222111111111222222221111111112222332211111111122223322111111111222222221111111112222211111111111111111111111111111111111110000011100111000000000111000111000000111111111111111111111",
"14;12;0.5;6.5;13.11,13.0,0.0,0.11,6.5;8.3,8.7,4.7,4.3;;000000000000000000000000000000000111100000000012222100000001233332100000012333321000000123333210000001233332100000001222210000000001111000000000000000000000000000000000",
"17;12;0.6;2.2,2.3,2.4,2.5,2.6,3.3,4.4,5.5,5.6,5.4,5.2,7.3,7.4,8.6,9.6,7.5,10.5,10.4,10.3,9.2,8.2;16.10,16.1;8.3,8.4,9.5,9.4,7.7,9.7,10.6,6.6,6.7,6.4,6.5,6.2,11.7,6.1,11.6,12.7,15.9,13.10,13.11,11.9,11.10,9.10,9.11,7.10,5.10,5.11,3.10,3.9,1.10,1.9,16.9,13.2,14.4,13.5,12.3,15.7,16.4,13.0,10.0,3.0,0.1,1.4,0.7,4.6,7.9;;111111111111111111000000000000000110000000000000001100000000000000011000000000000000110000000000000001100000000000000011000000000000000111112222222222211000000000000000000000000000000000000000000000000000",
"15;12;0.5;2.11,14.0,10.4,9.4,10.5,9.5,5.0;12.6,14.11,10.10;10.1,8.2,6.4,5.6,8.9,10.9,9.11,11.11,11.10,14.10,1.0;2.6,2.7,2.5,2.4,2.3,2.2,2.1,11.2,10.2,10.3,9.4,11.3,12.3,12.5,11.6,10.4,12.4,10.5,11.5,11.4,9.6,9.5,8.4,9.3,10.6,8.3,7.5,9.2,7.4,8.5,8.6,7.3,9.10;000001111001111000001100000111000000000000011000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001111000222220011111100222220001111110",
"17;12;0.5;0.11,9.7,10.8,11.8,12.8,13.7,12.4,12.5,10.4,10.5;0.0,16.0;4.11,3.11,2.10,2.11,5.10,5.11,5.7,5.6,2.2,2.3,2.6,2.7,6.0,6.1,6.8,6.9,5.2,5.3,11.7,11.4,8.6,13.9,14.6,9.3,9.9;;000101000000000000000100000000000000010100000000000000010000000000000001010000000000000001000010100000000101000000010000000100000100000000010100000001100000010000001000000001010000000000000001000000000000",
"20;12;0.5;0.11,9.11,5.9,11.9,10.1,11.0,7.3,3.1,1.1,3.3,3.4,1.3,2.4,1.4,8.8,6.0,13.8,15.0,19.11,19.5,14.5,14.11,17.7,16.7,16.8,17.8,17.9,19.0,17.0;4.7,6.7,6.0,16.9;6.9,6.10,9.8,1.11,8.11,12.9,12.6,12.7,9.7,12.4,12.5,12.3,10.0,10.2,12.0,11.11,10.5,5.7,6.5,8.5,7.5,9.5,6.6,6.4,6.1,6.2,6.3,7.8,12.10,12.11,5.0,2.7,1.7,15.1,15.2,15.10,18.0,16.0,19.2;;111111111112112222211000011111211122222110000111111111222222100001111211112222221000011111111122222210000110122111333333111111111111113333331111222211111133000311112222111111330003111111111212213300031111001111122133000322211111121221333333",
"15;12;0.3;0.4,8.4,5.5,13.3,14.11,4.10;2.10,7.5,10.10,1.10;3.9,3.8,3.7,3.5,2.5,0.1,1.1,2.1,3.1,4.1,5.1,6.1,6.0,5.0,4.0,3.0,2.0,1.0,0.0,0.6,1.6,7.8,6.8,7.11,6.11,9.6,8.6,7.6,9.5,9.4,9.3,9.2,7.2,7.3,7.4,8.0,9.0,10.0,11.0,13.0,13.1,14.3,14.10,12.11,13.9,11.10,9.9,9.11,3.10,3.11;;222222222222222222222222111112222222222222222444443322222233444443322222233332223322122222222223322222222222222222222222222222000222222222222000333333222222000333333333332000333333",
"17;12;0.5;13.2,13.4,13.6,13.8,0.0,1.11,13.0;16.10,16.8,16.6,16.4,16.2;0.1,1.3,2.5,3.6,2.8,1.9,5.3,5.4,4.8,4.4,5.6,5.9,3.11,2.11,9.9,7.6,7.8,7.10,11.9,11.5,11.3,8.4,6.3,4.0,5.2,8.0,8.2,6.0,9.1,12.7,10.11,6.11,10.9,6.7,4.5,3.10,4.7,0.7,1.5,3.1,2.3,0.2,2.1,9.4,10.6,9.6,10.1,15.3,15.5,15.7,8.8,12.8,10.7,11.2;;444444444444444444444444444444522244444444444445211444444444444452104444444444443321044444444444435210444444444444452104444444444444521044444444444445210444444444444452114444444444443322144444444444433221",
"18;11;0.5;6.4,9.0,17.1,12.10,9.10,6.10,2.6,16.10;2.2,5.4,14.1;5.2,9.3,8.5,7.5,6.5,5.5,4.5,4.4,17.6,16.8,17.10,4.10,4.3,9.4,9.5,13.2,8.2;2.3,2.4,2.5,2.6,2.7,3.7,5.7,6.7,4.7,6.8,6.9,6.10,9.10,12.10,13.10,16.10,16.9,17.9,17.8,17.7,16.7,16.6,15.6,14.6,13.6,12.6,11.1,10.1,9.1,15.1,16.1,17.1,2.2;111111111111111111111110033323313333113310033333313333113310033115311111113311322113311111113311111113311111113311111113333333113333331113333333113333331111111133111111331111111122111111331331333122",
"17;12;0.47;8.0,2.11,16.1,4.7,5.6,6.4,10.11,13.11,5.3;10.5,5.3,0.11,15.11;1.11,1.10,1.9,1.8,1.7,1.6,1.5,1.4,1.3,1.2,1.1,3.0,3.1,3.2,3.3,3.4,3.7,3.8,3.9,3.11,4.6,5.5,5.4,5.2,5.1,7.0,6.3,8.1,9.1,10.1,11.1,4.9,5.10,3.6,6.2,7.3,8.3,9.3,10.3,11.3,12.3,13.3,13.2,13.0,14.0,15.0,16.0,15.1,15.2,15.3,16.5,15.5,6.10,7.10,5.7,6.7,7.8,6.8,6.5,7.5,8.5,9.6,8.6,9.7,9.8,9.9,9.10,9.11,9.5,11.5,12.5,13.5,14.5,11.6,11.7,11.8,11.9,11.11,14.10,14.9,14.11,14.8,16.11,16.10,16.9,16.8,16.7;;000000000000000000000000000000000000000000000000000000000000000000000000000011000000000000000110000000000000000000000000000000000000111100000000000001111000000000000011110011100000000111100111100000001111",
"17;9;1.0;4.2,16.0,15.2,16.4,8.4,6.5,3.5,0.8,9.2;1.2,13.5,7.7;9.3,8.3,7.3,6.3,5.3,4.3,3.3,2.3,1.3,0.3,8.1,9.1,13.0,13.1,11.3,10.3,3.2,3.1,0.0,6.0,6.1,8.2,11.0,11.1,10.4,8.5,6.4,4.5,2.5,0.4,15.0,16.2,15.4,1.7,11.6;;33322111110000111333221111100001113332211111000011133322111110000111111111111111101111111111111111011111211111111111111112222222222222221111111122222222211111111111111111",
"17;12;0.4;8.7,11.4,5.4,8.1,14.1,14.7,2.1,2.7,11.10,5.10;2.10,14.10;8.10,11.7,14.4,11.1,8.4,5.1,5.7,2.4;;111111111111111110122100122100122101221001221001221111111111111111112100122100122100121001221001221001111111111111111110122100122100122101221001221001221111111111111111112100122100122100121001221001221001"
];

class TexHandler {
	constructor() {
		let names = ["coin", "cpInactive", "cpActive", "water"];
		for (let i = 0; i < 16; i++) {
			let name = "0".repeat(4-i.toString(2).length) + i.toString(2);
			if (i < 15) names.push(name);
			names.push("l"+name);
		}
		this.tex = {};
		for (let i = 0; i < names.length; i++) {
			let img = new Image("img");
			img.src = "images/name.png".replace("name", names[i]);
			this.tex[names[i]] = img;
		}
	}

	checkTextures() {
		// check if all textures are loaded
		let keys = Object.keys(this.tex);
		for (let i = 0; i < keys.length; i++) if (!this.tex[keys[i]].complete) return false;
		return true;
	}
}

class Map {
	constructor(data) {
		// width; height; slope multiplier; coins; checkpoints; lava; level data
		data = data.split(";");
		let mult = parseFloat(data[2]); // slopes force multiplier
		this.min = this.max = parseInt(data[7][0])*mult;
		this.terrain = [];
		this.objects = [];

		// generate terrain
		let i = 0;
		for (let y = 0; y < parseInt(data[1]); y++) {
			this.terrain.push([]);
			this.objects.push([]);
			for (let x = 0; x < parseInt(data[0]); x++) {
				let value = parseInt(data[7][i])*mult;
				if (this.min > value) this.min = value;
				if (this.max < value) this.max = value;
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
		let objects = [data[3].split(","), data[4].split(","), data[5].split(","), data[6].split(",")];
		let names = ["coin", "cp", "lava", "water"];
		for (let i = 0; i < objects.length; i++) {
			if (objects[i][0] != "") { // make sure there are items of this type
				for (let j = 0; j < objects[i].length; j++) {
					// push in [name, id]

					let pos = objects[i][j].split(".");
					let x = parseInt(pos[0]);
					let y = parseInt(pos[1]);
					let name = names[i];
					if (name == "lava") {
						// connected lava textures
						let top = y > 0 && objects[i].includes(x+"."+(y-1)) ? "1" : "0";
						let right = x < this.w-1 && objects[i].includes((x+1)+"."+y) ? "1" : "0";
						let bottom = y < this.h-1 && objects[i].includes(x+"."+(y+1)) ? "1" : "0";
						let left = x > 0 && objects[i].includes((x-1)+"."+y) ? "1" : "0";
						name = "l"+top+right+bottom+left;
					}
					this.objects[y][x].push([name, j]);
					if (name == "coin") this.totalCoins++;
					if (name == "cp") {
						if (this.totalCp == 0) this.firstCp = [x, y];
						this.totalCp++;
					}
				}
			}
		}
		
		this.mapDrawn = false;
	}

	draw() {
		if (!this.mapDrawn) {
			// inital, full map drawing
			if (!tex.checkTextures()) return;
			this.mapDrawn = true;
			for (let x = 0; x < this.w; x++) for (let y = 0; y < this.h; y++) this._draw(x, y);
		}
		else {
			// only refresh in a 2x2 grid around the player
			let X = Math.round(player.x/50) - 1;
			let Y = Math.round(player.y/50) - 1;
			for (let x = X; x < X+2; x++) for (let y = Y; y < Y+2; y++) if (0 <= x && x < this.w && 0 <= y && y < this.h) this._draw(x, y);
		}
	}

	_draw(x, y) {
		let o, points, min, max, name;
		// draw tile at coordinates
		// draw ground
		points = this.getPoints(x, y);
		min = Math.min(points[0], points[1], points[2], points[3]);
		max = Math.max(points[0], points[1], points[2], points[3]);
		if (min == max) ctx.drawImage(tex.tex["0000"], x * 50, y * 50);
		else {
			name = "";
			for (let i = 0; i < 4; i++) {
				name += Math.round((points[i]-min) / (max-min) + 0.1);
			}
			if (tex.tex[name] == undefined) ctx.drawImage(tex.tex["error"], x * 50, y * 50);
			else ctx.drawImage(tex.tex[name], x * 50, y * 50);
		}

		// draw objects
		for (let i = this.objects[y][x].length-1; i >= 0; i--) {
			o = this.objects[y][x][i];
			if (o[0] == "coin") {
				if (!player.coins.includes(o[1])) ctx.drawImage(tex.tex["coin"], x * 50, y * 50);
			} else if (o[0] == "cp") {
				// draw checkpoint
				if (player.cpId < o[1]) ctx.drawImage(tex.tex["cpInactive"], x * 50, y * 50);
				else ctx.drawImage(tex.tex["cpActive"], x * 50, y * 50);
			} else if (o[0][0] == "l") ctx.drawImage(tex.tex[o[0]], x * 50, y * 50);
			else if (o[0] == "water") ctx.drawImage(tex.tex["water"], x * 50, y * 50);
		}
	}

	getPoints(x, y) {
		let x_, y_;
		if (x == this.w - 1) x_ = x;
		else x_ = x + 1;
		if (y == this.h - 1) y_ = y;
		else y_ = y + 1;
		return [this.terrain[y][x], this.terrain[y][x_], this.terrain[y_][x], this.terrain[y_][x_]];
	}

	slope(x, y) {
		if (Math.abs(x%50 - 25) > 20 && Math.abs(y%50 - 25) > 20) return [0, 0];
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
		this.factor = 0.93;
		this.hasDied = 0; // will be a timestamp
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

				if (dx > (size[0]/2 + 16) || dy > (size[1]/2 + 16)) return false; // too far apart
				if (dx <= (size[0]/2) || dy <= (size[1]/2)) return true; // close enough

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
		if (this.hasDied != 0) {
			let t = (Date.now()-this.hasDied) * 0.002;
			if (t > 1) {
				this.hasDied = 0;
				this.respawn();
				deathCount += 1;
				updateTopDiv();
				map.mapDrawn = false; // refresh the screen for non-taken coins
			}
			else this.draw(t);
		}
		else {
			this.move();
			this.interact();
			this.draw();
		}
	}

	move() {
		let dxy = map.slope(this.x, this.y);
		this.dx -= dxy[0];
		this.dy -= dxy[1];

		let v = [0, 0]; // movement vector
		if (pressed["ArrowLeft"] || pressed["aq"[keys]]) v[0] -= 1;
		if (pressed["ArrowRight"] || pressed["d"]) v[0] += 1;
		if (pressed["ArrowUp"] || pressed["wz"[keys]]) v[1] -= 1;
		if (pressed["ArrowDown"] || pressed["s"]) v[1] += 1;
		// avoid moving sqrt(2) times faster diagonally
		let length = Math.sqrt(v[0]*v[0] + v[1]*v[1]);
		if (length) {
			this.dx += v[0] * this.speed / length;
			this.dy += v[1] * this.speed / length;
		}		
		this.collideWall(); // possibly bounce off the walls

		this.x += this.dx;
		this.y += this.dy;
		this.dx *= this.factor;
		this.dy *= this.factor;
	}

	collideWall() {
		let X = map.w*50 - 16;
		let Y = map.h*50 - 16;
		if (this.x < 16) {
			this.x = 16;
			this.dx = Math.abs(this.dx)/2;
		} else if (this.x > X) {
			this.x = X;
			this.dx = -Math.abs(this.dx)/2;
		} if (this.y < 16) {
			this.y = 16;
			this.dy = Math.abs(this.dy)/2;
		} else if (this.y > Y) {
			this.y = Y;
			this.dy = -Math.abs(this.dy)/2;
		}
	}

	interact() {
		let pos = [parseInt(this.x/50), parseInt(this.y/50)];
		this.factor = 0.93;

		// check collision with every object in the map
		for (let x = 0; x < map.w; x++)
			for (let y = 0; y < map.h; y++)
				for (let i = 0; i < map.objects[y][x].length; i++) {
					let o = map.objects[y][x][i];
					if (o[0] == "coin") {
						if (eq(pos, [x, y]) && !this.coins.includes(o[1])) this.coins.push(o[1]);
					} else if (o[0] == "cp") {
						if (eq(pos, [x, y]) && this.cpId < o[1]) {
							if (o[1] == map.totalCp - 1) {
								// end checkpoint: requires all coins to finish the level
								if (this.coins.length == map.totalCoins) {
									level += 1;
									updateTopDiv();
									clearInterval(interval);
									window.setTimeout(newLevel, 0); // next level
									return;
								}
							} else {
								this.cpId = o[1];
								this.cp = [x, y];
								this.coinsSave = [...this.coins];
							}
						}
					} else if (o[0][0] == "l") {
						if (this.collideObject(x * 50, y * 50, [50, 50], "rect")) {
							this.hasDied = Date.now();
							return;
						}
					}
					else if (o[0] == "water") {
						if (this.collideObject(x * 50, y * 50, [50, 50], "rect")) this.factor = 0.955;
					}
				}
	}

	draw(fade=0) {
		let g = 38*Math.sqrt(this.dx*this.dx + this.dy*this.dy);
		let a = 1-fade;
		ctx.strokeStyle = "rgb(0, 0, 127, "+a+")";
		ctx.fillStyle = "rgb(0, "+g+", 255, "+a+")";
		ctx.beginPath();
		ctx.arc(this.x, this.y, 15, 0, 2 * Math.PI);
		ctx.fill();
		ctx.stroke();
	}
}

function eq(l1, l2) {
	// checks if two lists are equal
	if (l1.length != l2.length) return false;
	for (let i = 0; i < l1.length; i++) if (l1[i] != l2[i]) return false;
	return true;
}

function updateTopDiv() {
	infoDiv.innerHTML = "Death count: "+deathCount+" - Level: "+(level+1)+"/"+levels.length;
}

function newLevel() {
	// show a message on screen
	msgDiv.innerHTML = messages[parseInt(Math.random()*messages.length)];
	msgDiv.className = "";

	window.setTimeout(() => {
		msgDiv.className = "animation";
		window.setTimeout(() => { msgDiv.className = "hidden"; }, 1000);

		if (level == levels.length) {
			window.clearInterval(interval);
			divs[1].className = "hidden";
			divs[2].className = "";
			document.getElementById("time-result").innerHTML = "You lost "+timer.innerHTML+" of your life in the process.";
		} else {
			map = new Map(levels[level]);
			player = new Player();
			initCanvas();
		}
	}, 1000);
}

function initCanvas() {
	canvas = document.getElementById("canvas");
	canvas.width = W = map.w * 50;
	canvas.height = H = map.h * 50;
	ctx = canvas.getContext("2d");
	
	interval = setInterval(mainLoop, 1000/60);
}

function changeKeys(change=true) {
	if (change) keys = 1-keys;
	keysSpan.innerHTML = ["wasd", "zqsd"][keys];
}

function sum(l) {
	let x = 0;
	for (let i = 0; i < l.length; i++) x += l[i];
	return x;
}

function mainLoop() {
	let t = Date.now()-startTime;
	let ms = t%1000;
	let s = parseInt(t/1000)%60;
	let m = parseInt(t/60000)%60;
	let h = parseInt(t/3600000);
	ms = parseInt(ms/100)+""+parseInt(ms/10)%10+""+ms%10;
	s = parseInt(s/10)+""+s%10;
	m = parseInt(m/10)+""+m%10;
	timer.innerHTML = h+":"+m+":"+s+"."+ms;
	map.draw();
	player.update();
	
	// try to start music once loaded
	if (musicReady == 1) {
		music.play();
		musicReady = 2;
	}
	if (prevTime == null) deltaTime = 0;
	else deltaTime = (Date.now()-prev) / 1000;
	prevTime = Date.now();
}

function startGame() {
	if (!hasStarted) startTime = Date.now();
	hasStarted = true;
	divs[0].className = "hidden";
	divs[1].className = "";
	updateTopDiv();
	newLevel();
}

function stopGame() {
	// back to menu
	window.clearInterval(interval);
	divs[0].className = "";
	divs[1].className = "hidden";
	
	// stop music
	music.pause();
	music.currentTime = 0;
	musicReady = 1;
	prevTime = null;
}

function init() {
	gameDiv = document.getElementById("game");
	infoDiv = document.getElementById("top-info");
	msgDiv = document.getElementById("message");
	timer = document.getElementById("timer");
	keysSpan = document.getElementById("keys");
	changeKeys(false);
	divs = [];
	["menu", "game", "win"].forEach((id) => { divs.push(document.getElementById(id)); });
	
	// handle music
	music = document.createElement("audio");
	music.src = "Around.mp3";
	music.loop = true;
	document.body.appendChild(music);
	music.addEventListener("canplaythrough", () => {musicReady = 1});
	
	// add links to github profiles
	Array.from(document.getElementsByTagName("a")).forEach((a) => {
		if (a.href == "") {
			let value = a.innerHTML;
			a.href = "https://github.com/"+value;
		}
	});

	// add random button animation
	let style = document.createElement("style");
	let animations = ["translateY(200%)", "translateX(100%)", "translateY(-200%)", "translateX(50%) rotate(90deg)", "translate(50%, 300%) rotate(-180deg)"];
	let setStyle = function() {
		let i = parseInt(Math.random() * (animations.length+1));
		if (i == animations.length) style.innerHTML = "a.button:hover { opacity: 0; transform: translateX(-100%) rotate(-360deg); }";
		else style.innerHTML = "a.button:hover { transform: "+animations[i]+"; }";
	};
	document.head.appendChild(style);
	setStyle();
	window.setInterval(setStyle, 1000);
}

window.onkeyup = (e) => {pressed[e.key] = false};
window.onkeydown = (e) => {pressed[e.key] = true};

let ctx, W, H, gameDiv, infoDiv, msgDiv, divs, timer, keysSpan;
let map, player, interval;
let tex = new TexHandler();

let pressed = {};
let keys = 0; // 0: wasd, 1: zqsd

let startTime, hasStarted;
let prevTime, deltaTime = 0;
let level = 0;
let deathCount = 0;

let music;
let musicReady = 0;
