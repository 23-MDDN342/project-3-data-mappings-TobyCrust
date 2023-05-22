/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

// remove this or set to false to enable full program (load will be slower)
var DEBUG_MODE = true;

// this can be used to set the number of sliders to show
var NUM_SLIDERS = 6;

// other variables can be in here too
// here's some examples for colors used


const stroke_color = [95, 52, 8];
const snakeskin = [154,189,68];
const snakeEyes = [239,219,63];


// example of a global function
// given a segment, this returns the average point [x, y]
function segment_average(segment) {
  let sum_x = 0;
  let sum_y = 0;
  let s_len = segment.length;
  for (let i=0; i<s_len; i++) {
    sum_x = sum_x + segment[i][0];
    sum_y = sum_y + segment[i][1];
  }
  return [sum_x / s_len , sum_y / s_len ];
}

// This where you define your own face object
function Face() {
  // these are state variables for a face
  // (your variables should be different!)
  this.detailColour = [204, 136, 17];
  this.mainColour = [51, 119, 153];
  this.num_eyes = 2;    // can be either 1 (cyclops) or 2 (two eyes)
  this.eye_shift = -1;   // range is -10 to 10
  this.mouth_size = 1;  // range is 0.5 to 8

  this.chinColour = [153, 153, 51]
  this.lipColour = [136, 68, 68]
  this.eyebrowColour = [319, 85, 17]
  this.pupilColour = [11, 235, 17]
 
  this.pupilsize = 0.1;
  this.fangLength = 0.5;
  this.fangWidth = 0;

  /*
   * Draw the face with position lists that include:nos
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge, 
   */  
  this.draw = function(positions) {
    
    // head
    ellipseMode(CENTER);
    stroke(stroke_color);
    fill(snakeskin);
    ellipse(segment_average(positions.chin)[0], 0, 3, 4);
    noStroke();


    // mouth
    fill(this.detailColour);
    // ellipse(segment_average(positions.bottom_lip)[0], segment_average(positions.bottom_lip)[1], 1.36, 0.25 * this.mouth_size);// ellipse mouth
    noFill();
    strokeWeight(0.08);
    stroke(0);
    // arc(segment_average(positions.bottom_lip)[0], segment_average(positions.bottom_lip)[1]-1, 2, 2, 40, 145); // mouth
    strokeWeight(0.04);
    // triangle(segment_average(positions.bottom_lip)[0]+0.1, segment_average(positions.bottom_lip)[1], segment_average(positions.bottom_lip)[0]+0.4, segment_average(positions.bottom_lip)[1], segment_average(positions.bottom_lip)[0]+0.15, segment_average(positions.bottom_lip)[1]+0.5);
    // triangle(segment_average(positions.bottom_lip)[0]-0.5, segment_average(positions.bottom_lip)[1], segment_average(positions.bottom_lip)[0]+0.3-0.5, segment_average(positions.bottom_lip)[1], segment_average(positions.bottom_lip)[0]-0.35, segment_average(positions.bottom_lip)[1]+0.5);


    // console.log(segment_average(positions.bottom_lip));

    if (positions.bottom_lip > 0.01){
      positions.bottom_lip = 0;
    }



    


    push();
    strokeWeight(0.05);
    fill(255,100,100);
    beginShape();
    curveVertex(positions.top_lip[0][0],positions.top_lip[0][1]); //curve point
    
    curveVertex(positions.top_lip[0][0],positions.top_lip[0][1]); // first point
    

    
     //middle point


    curveVertex(positions.bottom_lip[4][0],positions.bottom_lip[4][1]); //middle left point

    vertex(positions.bottom_lip[2][0],positions.bottom_lip[2][1]);

    curveVertex(positions.bottom_lip[2][0],positions.bottom_lip[2][1]); //middle point

    vertex(positions.bottom_lip[2][0],positions.bottom_lip[2][1]);

    curveVertex(positions.bottom_lip[0][0],positions.bottom_lip[0][1]); //third point


    curveVertex(positions.bottom_lip[0][0],positions.bottom_lip[0][1]); //end curve point

    
    
    
    endShape();
    pop();





    strokeWeight(0.03);
    fill(255);
    push(); // right fang
    beginShape();
  
    vertex(segment_average(positions.bottom_lip)[0]+0.1+this.fangWidth, segment_average(positions.bottom_lip)[1]+0.05);// left point
    vertex(segment_average(positions.bottom_lip)[0]+0.2, segment_average(positions.chin)[1]+0.5); // fang tip
    vertex(segment_average(positions.bottom_lip)[0]+0.4, segment_average(positions.bottom_lip)[1]-0.04);//right point
    endShape();

//positions. chin = the width of the chin


    pop();



    push(); // left fang
    beginShape();
  
    vertex(positions.top_lip[0][0]+0.2, positions.top_lip[0][1]);// left point
    vertex(segment_average(positions.top_lip)[0]-0.35, segment_average(positions.chin)[1]+0.5); // fang tip
    vertex(positions.top_lip[10][0], segment_average(positions.top_lip)[1]); //right point
    endShape();
  

    pop();


    

    

    let holeSize = 0.1;
    this.nose_hole = positions.nose_tip[2][0]
    this.nose_hole2 = positions.nose_tip[0][1]

    ellipse(positions.nose_tip[1][0],this.nose_hole2,holeSize,holeSize);
     ellipse(positions.nose_tip[3][0],this.nose_hole2,holeSize,holeSize);


    // eyebrows
    fill( this.eyebrowColour);
    stroke( this.eyebrowColour);
    strokeWeight(0.08);
    this.draw_segment(positions.left_eyebrow);
    this.draw_segment(positions.right_eyebrow);

    // draw the chin segment using points
    fill(this.chinColour);
    stroke(this.chinColour);
    this.draw_segment(positions.chin);

    fill(100, 0, 100);
    stroke(100, 0, 100);
    this.draw_segment(positions.nose_bridge);
    this.draw_segment(positions.nose_tip);

    strokeWeight(0.03);

    fill(this.lipColour);
    stroke(this.lipColour);
    this.draw_segment(positions.top_lip);
    this.draw_segment(positions.bottom_lip);

    let left_eye_pos = segment_average(positions.left_eye);
    let right_eye_pos = segment_average(positions.right_eye);
    this.slit_height = positions.right_eye[0][1]
    this.slit_bottom = positions.right_eye[0][1]
    

    
  //  console.log(this.slit_height);


    // eyes
    noStroke();
    let curEyeShift = 0.04 * this.eye_shift;
    if(this.num_eyes == 2) {
      fill(snakeEyes);
      ellipse(left_eye_pos[0], left_eye_pos[1], 0.5, this.slit_height*2+2.1); //eyes
      ellipse(right_eye_pos[0], right_eye_pos[1], 0.5, this.slit_height*2+2.1);
      fill(this.pupilColour);
      ellipse(right_eye_pos[0], right_eye_pos[1], this.pupilsize, this.slit_height*2+2.1);// cat eyes
      ellipse(left_eye_pos[0], left_eye_pos[1], this.pupilsize, this.slit_height*2+2.1);
      
      

      // fill(this.mainColour);
      // ellipse(left_eye_pos[0] + curEyeShift, left_eye_pos[1], 0.18);
      // ellipse(right_eye_pos[0] + curEyeShift, right_eye_pos[1], 0.18);
    }
    else {
      let eyePosX = (left_eye_pos[0] + right_eye_pos[0]) / 2;
      let eyePosY = (left_eye_pos[1] + right_eye_pos[1]) / 2;

      fill(this.detailColour);
      ellipse(eyePosX, eyePosY, 0.45, 0.27);

      fill(this.pupilColour);
      ellipse(eyePosX - 0.1 + curEyeShift, eyePosY, 0.18);
      ellipse(eyePosX - 0.7 + curEyeShift, eyePosY, 0.18);
    }
   // fill(0)
   //ellipse(0,0, 0.5,0.5) center point
   //rect(-2,-2,4.5,4) sizing debug 
  }

  // example of a function *inside* the face object.
  // this draws a segment, and do_loop will connect the ends if true
  this.draw_segment = function(segment, do_loop) {
    for(let i=0; i<segment.length; i++) {
        let px = segment[i][0];
        let py = segment[i][1];
        ellipse(px, py, 0.1);
        if(i < segment.length - 1) {
          let nx = segment[i+1][0];
          let ny = segment[i+1][1];
          line(px, py, nx, ny);
        }
        else if(do_loop) {
          let nx = segment[0][0];
          let ny = segment[0][1];
          line(px, py, nx, ny);
        }
    }
  };

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.num_eyes = int(map(settings[0], 0, 100, 1, 2));
    this.eye_shift = map(settings[1], 0, 100, -2, 6);
    this.mouth_size = map(settings[2], 0, 100, 0.5, 8);
    this.pupilsize = map(settings[3], 0, 100, 0, 0.25);
    this.fangLength = map(settings[4], 0, 100, 0, 0.5);
    this.fangWidth = map(settings[5], 0, 100, 0.2, -0.2);
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(6);
    settings[0] = map(this.num_eyes, 1, 2, 0, 100);
    settings[1] = map(this.eye_shift, -2, 2, 0, 100);
    settings[2] = map(this.mouth_size, 0.5, 8, 0, 100);
    settings[3] = map(this.pupilsize, 0, 0.25, 0, 100);
    settings[4] = map(this.fangLength, 0, 0.5, 0, 100);
    settings[5] = map(this.fangWidth, -0.2, 0.2, 0, 100);
    
    return settings;
  }
}
