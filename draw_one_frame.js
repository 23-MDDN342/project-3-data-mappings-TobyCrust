let yoff = 0.0;
let particles = [];
var num = 0;
const noiseScale = 0.015;
let speed = 6; // speed particals are moving
let timer = 0;
let strokeSize = 4;
let purple = 0;
let NS = 1; // NS means noise scale, times noiseScale by a variable as noiseScale has to be a constant

const ease = new p5.Ease();

function draw_one_frame(cur_frac) {

	//--------------------------------------------gradient background--------------------------------------
	setGradient(0, 0, width, height, color(147, 0, 179), color(0, 0, 0), color(255, 0, 255));   // vertical gradient using three colors

	function setGradient(x, y, w, h, c1, c2, c3) {

		for (let i = y; i <= y + h; i++) {
			let inter1 = map(i, y, y + h, 0, 5);
			let inter2 = map(i, y, y + h, 0.5, 1);
			let inter3 = map(i, y, y + h, 0, 0.5); // change values to draw how far up it goes
			let c = lerpColor(lerpColor(c1, c2, inter1), c3, inter3);
			stroke(c);
			line(x, i, x + w, i);
		}
	}

	//---------------------------------------------points-----------------------------------------------

	noiseSeed(timer / 5); //periodically changes what noise map there is

	strokeWeight(strokeSize);

	fill(250);

	timer += 0.01;

	if (canvasWidth <= 960) { //change the stroke size depending on the canvas size
		num = 1500;
		strokeSize = 4;
		speed = 1;
	}

	if (canvasWidth >= 1919) {
		num = 1500;
		strokeSize = 8;
		NS = 2
		speed = 2
	}

	if (canvasWidth >= 2250) {
		num = 1500;
		strokeSize = 9;
		NS = 2.34375; // 2250 / 960 = 2.34375
		speed = 2.34375
	}

	for (let i = 0; i < num; i++) {
		particles.push(createVector(random(width), random(height)));
	}

	stroke(0, 0, 255);// partical colour

	for (let i = 0; i < num; i++) { // p = point
		let p = particles[i];
		point(p.x, p.y + height / 3);
		let n = noise(p.y * noiseScale / NS, p.x * noiseScale / NS);
		let a = TAU * n;  //TAU is 2pi
		p.x += sin(a) * speed;
		p.y -= cos(a) * speed;

		if (!onScreen(p)) {  // this recognises if the points are off screen and respawns them inside of the canvas at a random location
			p.x = random(width + 100);
			p.y = random(height / 1.5);
		}
		function onScreen(v) { // applys a 
			return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height / 1.5;

		}

	}

	//---------------------------------------------------waves----------------------------------------------------

	stroke(50, 0, 255); // wave line
	fill(0, 10, 255, 50); // water area

	beginShape();
	let xoff = 0;

	for (let x = 0; x <= width; x += 10) {

		let wavey = getNoiseValue(x, yoff, timer / 10, "w", height / 2.4, height / 2, width / 4);

		// Set the vertex
		vertex(x, wavey/2 - height / 7);

		// Increment x dimension for noise
		xoff += 0.05;
	}
	// increment y dimension for noise
	yoff += 0.001; //how fast the wave is moving 
	vertex(width, height);
	vertex(0, height-50); // sets the box of the drawn waves
	endShape(CLOSE);

	//-----------------------------------------moon/sun--------------------------------
	let going_up = true;
	let amount_down = 0;
	if (cur_frac < 0.5) {

		going_up = true;
		amount_down = cur_frac * 2;
	}
	else {
		going_up = false;
		amount_down = (cur_frac - 0.5) * 2;
		purple = 255;
	}
	if (cur_frac > 0) {
		purple = 247;
	}
	if (cur_frac > 0.25) {
		purple = 0;
	}
	if (cur_frac > 0.75) {
		purple = 247;
	}

	let ellipse_radius = int(0.08 * height);
	const up_y = int(0.14 * height); // how far down it goes
	const down_y = int(0.18 * height); // how far down it goes
	const up_y2 = int(0.135 * height); // how far up it goes
	const down_y2 = int(0.19 * height);
	const ease_amount_down = ease.circularInOut(amount_down);

	if (going_up) {
		cur_y = map(ease_amount_down, 0, 1, up_y, down_y);
	}
	else {
		cur_y = map(ease_amount_down, 0, 1, down_y, up_y)
	}
	if (going_up) {  // made a second map that goes down slightly further to have the outline peek out
		cur_y2 = map(ease_amount_down, 0, 1, up_y2, down_y2);
	}
	else {
		cur_y2 = map(ease_amount_down, 0, 1, down_y2, up_y2)
	}

	let ellipse_xPos = int(0.5 * width);

	stroke(purple, 0, 255, 200); // outline 255, 150, 25,
	fill(255); //sun = 255, 255, 0, 255
	ellipse(ellipse_xPos, cur_y2, ellipse_radius * 1.9); // circle behind

	noStroke();
	ellipse(ellipse_xPos, cur_y, ellipse_radius * 2);

	fill(purple, 0, 255, 200);
	ellipse(ellipse_xPos - height / 11, cur_y2 - width / 30, ellipse_radius * 0.45); // small behind

	fill(255);
	ellipse(ellipse_xPos - height / 11, cur_y - width / 30, ellipse_radius * 0.5);
}