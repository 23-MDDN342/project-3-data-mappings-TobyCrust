/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */

// remove this or set to false to enable full program (load will be slower)
var DEBUG_MODE = false;

// this can be used to set the number of sliders to show
var NUM_SLIDERS = 9;

function segment_average(segment) {
  let sum_x = 0;
  let sum_y = 0;
  let s_len = segment.length;
  for (let i = 0; i < s_len; i++) {
    sum_x = sum_x + segment[i][0];
    sum_y = sum_y + segment[i][1];
  }
  return [sum_x / s_len, sum_y / s_len];
}

// This where you define your own face object
function Face() {
  const stroke_color = color(95, 52, 8);
  const snakeskin = color(154, 189, 68);
  const snakeEyes = [239, 219, 63];


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
  this.tongueFill = 0;

  this.facecolor = 4;
  this.browcolor = 1;
  this.tonguecolor = 1;

  this.scaleColourArray = [color(195, 179, 104), color(105, 183, 212), color(195, 99, 85), color(219,186,34), color(53,62,60), color(228,229,231), color(140, 185, 96), color(108, 93, 78), color(138, 117, 97), color(158, 107, 67)]

  this.browColourArray = [color(5, 209, 240), color(239, 219, 63), color(198, 174, 130), color(86, 53, 30)]

  this.draw = function (positions) {

    noFill();
    //-------------------------------------------------------------------snake chin-------------------------------------
    //goes from 0-16
    push()

    beginShape()

    fill(this.scaleColourArray[this.facecolor]);
    stroke(this.scaleColourArray[this.facecolor]);

    curveVertex(positions.chin[0][0], positions.chin[0][1]) // anchor point
    curveVertex(positions.chin[0][0], positions.chin[0][1])
    curveVertex(positions.chin[1][0], positions.chin[1][1])
    curveVertex(positions.chin[2][0], positions.chin[2][1])
    curveVertex(positions.chin[3][0], positions.chin[3][1])
    curveVertex(positions.chin[4][0], positions.chin[4][1])
    curveVertex(positions.chin[5][0], positions.chin[5][1])
    curveVertex(positions.chin[6][0], positions.chin[6][1])
    curveVertex(positions.chin[7][0], positions.chin[7][1])
    curveVertex(positions.chin[8][0], positions.chin[8][1])
    curveVertex(positions.chin[9][0], positions.chin[9][1])
    curveVertex(positions.chin[10][0], positions.chin[10][1])
    curveVertex(positions.chin[11][0], positions.chin[11][1])
    curveVertex(positions.chin[12][0], positions.chin[12][1])
    curveVertex(positions.chin[13][0], positions.chin[13][1])
    curveVertex(positions.chin[14][0], positions.chin[14][1])
    curveVertex(positions.chin[15][0], positions.chin[15][1])
    curveVertex(positions.chin[16][0], positions.chin[16][1])
    curveVertex(positions.right_eyebrow[4][0], positions.right_eyebrow[4][1] - 0.2)
    curveVertex(positions.right_eyebrow[3][0], positions.right_eyebrow[3][1] - 0.2)
    curveVertex(positions.right_eyebrow[2][0], positions.right_eyebrow[2][1] - 0.2)
    curveVertex(positions.right_eyebrow[1][0], positions.right_eyebrow[1][1] - 0.2)
    curveVertex(positions.right_eyebrow[0][0] - 0.2, positions.right_eyebrow[0][1] - 0.2)
    curveVertex(positions.left_eyebrow[4][0] + 0.2, positions.left_eyebrow[4][1] - 0.2)
    curveVertex(positions.left_eyebrow[3][0], positions.left_eyebrow[3][1] - 0.2)
    curveVertex(positions.left_eyebrow[2][0], positions.left_eyebrow[2][1] - 0.2)
    curveVertex(positions.left_eyebrow[1][0], positions.left_eyebrow[1][1] - 0.2)
    curveVertex(positions.left_eyebrow[0][0], positions.left_eyebrow[0][1] - 0.2)

    curveVertex(positions.chin[0][0], positions.chin[0][1])
    curveVertex(positions.chin[0][0], positions.chin[0][1])

    endShape()

    pop()
   
    //-----------------------------------------------------------------snake tongue----------------------------------------------------------------------------------

    if (positions.bottom_lip > 0.01) {
      positions.bottom_lip = 0;
    }

   
    this.middleTongue = segment_average([positions.bottom_lip[8], positions.bottom_lip[10]])

    this.tongueFill = 0
    

    if (this.eyebrowSpike > 0.35) {

      this.tongueFill = -255
    }

    if (this.tongueLength > 0.43) {
      this.tongueFill = -255
     
    }

    this.tongueColourArray = [color(235, 0, 255, this.tongueFill + 255), color(239, 9, 3, this.tongueFill + 255)]
  

    push()
    fill(this.tongueColourArray[this.tonguecolor])
    strokeWeight(0)
    beginShape()
    vertex(positions.bottom_lip[8][0] + 0 + this.slim, positions.bottom_lip[8][1] + 0)
    vertex(positions.bottom_lip[8][0] + 0 + this.slim, positions.bottom_lip[8][1] + 0.4 - this.tongueLength)
    vertex(positions.bottom_lip[8][0] + -0.1 + this.slim, positions.bottom_lip[8][1] + 0.6 - this.tongueLength)
    vertex(positions.bottom_lip[9][0], positions.bottom_lip[8][1]+ 0.4 - this.tongueLength)
    vertex(positions.bottom_lip[10][0] + 0.1 - this.slim, positions.bottom_lip[10][1] + 0.6 - this.tongueLength)
    vertex(positions.bottom_lip[10][0] - this.slim, positions.bottom_lip[10][1]  + 0.4 - this.tongueLength)
    vertex(positions.bottom_lip[10][0] - this.slim, positions.bottom_lip[10][1] + 0)
    endShape()
    pop()

    //--------------------------------------------------------left eyebrow-----------------------------------------------------------------------------------

    this.leftmostEyebrowL = segment_average([positions.left_eyebrow[0], positions.left_eyebrow[1]])
    this.middleEyebrowLL = segment_average([positions.left_eyebrow[1], positions.left_eyebrow[2]])
    this.middleEyebrowRL = segment_average([positions.left_eyebrow[2], positions.left_eyebrow[3]])
    this.rightmostEyebrowL = segment_average([positions.left_eyebrow[3], positions.left_eyebrow[4]])

    noFill();
    stroke(this.browColourArray[this.browcolor]);
    beginShape();
    vertex(positions.left_eyebrow[0][0], positions.left_eyebrow[0][1]);
    vertex(positions.left_eyebrow[0][0], positions.left_eyebrow[0][1])

    vertex(this.leftmostEyebrowL[0], this.leftmostEyebrowL[1] + this.eyebrowSpike / 2)
    

    vertex(positions.left_eyebrow[1][0], positions.left_eyebrow[1][1])
    

    vertex(this.middleEyebrowLL[0], this.middleEyebrowLL[1] + this.eyebrowSpike / 2)
    

    vertex(positions.left_eyebrow[2][0], positions.left_eyebrow[2][1])
    

    vertex(this.middleEyebrowRL[0], this.middleEyebrowRL[1] + this.eyebrowSpike / 2)
    

    vertex(positions.left_eyebrow[3][0], positions.left_eyebrow[3][1])
    
    vertex(this.rightmostEyebrowL[0], this.rightmostEyebrowL[1] + this.eyebrowSpike / 2)
    

    vertex(positions.left_eyebrow[4][0], positions.left_eyebrow[4][1])
    vertex(positions.left_eyebrow[4][0], positions.left_eyebrow[4][1])
    endShape();

    //------------------------------------------------------------right eyebrow-------------------------------------------------------------------------------

    this.leftmostEyebrow = segment_average([positions.right_eyebrow[0], positions.right_eyebrow[1]])
    this.middleEyebrowL = segment_average([positions.right_eyebrow[1], positions.right_eyebrow[2]])
    this.middleEyebrowR = segment_average([positions.right_eyebrow[2], positions.right_eyebrow[3]])
    this.rightmostEyebrow = segment_average([positions.right_eyebrow[3], positions.right_eyebrow[4]])

    beginShape();
    vertex(positions.right_eyebrow[0][0], positions.right_eyebrow[0][1]);
    vertex(positions.right_eyebrow[0][0], positions.right_eyebrow[0][1])

    
    vertex(this.leftmostEyebrow[0], this.leftmostEyebrow[1] + this.eyebrowSpike / 2)

    vertex(positions.right_eyebrow[1][0], positions.right_eyebrow[1][1])

    vertex(this.middleEyebrowL[0], this.middleEyebrowL[1] + this.eyebrowSpike / 2)

    vertex(positions.right_eyebrow[2][0], positions.right_eyebrow[2][1])

    vertex(this.middleEyebrowR[0], this.middleEyebrowR[1] + this.eyebrowSpike / 2)

    vertex(positions.right_eyebrow[3][0], positions.right_eyebrow[3][1])

    vertex(this.rightmostEyebrow[0], this.rightmostEyebrow[1] + this.eyebrowSpike / 2)

    vertex(positions.right_eyebrow[4][0], positions.right_eyebrow[4][1])
    vertex(positions.right_eyebrow[4][0], positions.right_eyebrow[4][1])
    endShape();
    //  
    //--------------------------------------------------------------snake mouth--------------------------------------------------------------------------------
    this.mouthColour = 255
    if (this.toothy < 0.1) {
      this.mouthColour = 0
    }
    push();
    strokeWeight(0);
    fill(this.mouthColour, 50, 50);
    beginShape();
    curveVertex(positions.bottom_lip[7][0], positions.bottom_lip[7][1]); //curve point
    curveVertex(positions.bottom_lip[7][0], positions.bottom_lip[7][1]); // first point

    curveVertex(positions.bottom_lip[8][0], positions.bottom_lip[8][1]); //middle left curve point

    curveVertex(positions.bottom_lip[10][0], positions.bottom_lip[10][1]); //middle point

    curveVertex(positions.bottom_lip[0][0], positions.bottom_lip[0][1]); //third point

    curveVertex(positions.top_lip[7][0], positions.top_lip[7][1]); //third point

    curveVertex(positions.top_lip[8][0], positions.top_lip[8][1]); //middle point

    curveVertex(positions.top_lip[9][0], positions.top_lip[9][1]); //middle point

    curveVertex(positions.top_lip[10][0], positions.top_lip[10][1]); //middle left curve point

    curveVertex(positions.top_lip[0][0], positions.top_lip[0][1]); //curve point
    curveVertex(positions.top_lip[0][0], positions.top_lip[0][1]); // first point
    endShape();
    pop();

    this.toothhide = 250
    this.toothy = positions.bottom_lip[8][1] - positions.top_lip[10][1]
    if (this.toothy < 0.1) {
      this.toothy = 0
      this.toothhide = 0
      this.mouthColour = 0
    }

    strokeWeight(0);
    fill(255, 255, 255, this.toothhide);
    push(); // right fang
    this.rightMostPoint_RF = segment_average([positions.top_lip[7], positions.top_lip[8]])
    this.middlePoint_RF = segment_average([this.rightMostPoint_RF, positions.top_lip[8]])
    this.toothpoint = segment_average([positions.top_lip[8], positions.top_lip[9]])

    //---------------------------------------------------------------------right fang-------------------------------------------------------------------------------------
    this.smallTeethR = segment_average([positions.bottom_lip[9], positions.bottom_lip[10]])

    beginShape();
    vertex(positions.top_lip[8][0], positions.top_lip[8][1]);// left point
    // vertex(segment_average(positions.top_lip)[0], segment_average(positions.chin)[1]+0.5); // fang tip
    vertex(this.middlePoint_RF[0], 0.75 + this.toothy * 1.5); // left fang tip
    vertex(this.rightMostPoint_RF[0], this.rightMostPoint_RF[1]);//right point
    endShape();

    //positions. chin = the width of the chin
    pop();

    beginShape();
    vertex(positions.bottom_lip[9][0] + 0.1, positions.bottom_lip[10][1])
    vertex(this.smallTeethR[0] + 0.05, this.smallTeethR[1] - this.toothy / 2)
    vertex(positions.bottom_lip[10][0], positions.bottom_lip[10][1])
    endShape();

    push(); // left fang

    // ellipse(positions.top_lip[11][0], positions.top_lip[11][1], 0.2, 0.2)
    //---------------------------------------------------------------------right fang-------------------------------------------------------------------------------------
    this.leftMostPoint_LF = segment_average([positions.top_lip[10], positions.top_lip[11]])
    this.middlePoint_LF = segment_average([this.leftMostPoint_LF, positions.top_lip[10]])
    this.smallTeeth = segment_average([positions.bottom_lip[8], positions.bottom_lip[9]])

    beginShape();
    vertex(this.leftMostPoint_LF[0], this.leftMostPoint_LF[1]);// left point
    vertex(this.middlePoint_LF[0], 0.75 + this.toothy * 1.5); // fang tip
    vertex(positions.top_lip[10][0], positions.top_lip[10][1]); //right point
    endShape();

    beginShape();
    vertex(positions.bottom_lip[8][0], positions.bottom_lip[8][1])
    vertex(this.smallTeeth[0] - 0.05, this.smallTeeth[1] - this.toothy / 2)
    vertex(positions.bottom_lip[9][0] - 0.1, positions.bottom_lip[8][1])
    endShape();
    pop();
    //----------------------------------------------------nose holes---------------------------------------------------------------------------

    this.holeSize = segment_average([positions.nose_tip[0], positions.nose_tip[2]]);
    this.nose_hole = positions.nose_tip[2][0]
    this.nose_hole2 = positions.nose_tip[0][1]
    strokeWeight
    fill(183, 183, 51)
    ellipse(positions.nose_tip[1][0], this.nose_hole2, 0.1, 0.1);
    ellipse(positions.nose_tip[3][0], this.nose_hole2, 0.1, 0.1);

    // -----------------------------------------------------------------eyes---------------------------------------------------------

    this.smallTeeth = segment_average([positions.bottom_lip[8], positions.bottom_lip[9]])

    let left_eye_pos = segment_average(positions.left_eye);
    let right_eye_pos = segment_average(positions.right_eye);
    this.slit_height = positions.right_eye[0][1]
    this.slit_bottom = positions.right_eye[0][1]
    this.eyeMiddleTop = segment_average([positions.left_eye[1], positions.left_eye[2]])
    this.eyeMiddleDown = segment_average([positions.left_eye[4], positions.left_eye[5]])

  
    this.eyeHeight = segment_average([positions.left_eye[4], positions.left_eye[2]])

    // eyes
    noStroke();
    let curEyeShift = 0.04 * this.eye_shift;
    if (this.num_eyes == 2) {
      fill(snakeEyes);
      ellipse(left_eye_pos[0], left_eye_pos[1], 0.5, (positions.left_eye[1][1] - positions.left_eye[5][1]) * 7 + 0.9); //eyes
      ellipse(right_eye_pos[0], right_eye_pos[1], 0.5, (positions.left_eye[1][1] - positions.left_eye[5][1]) * 7 + 0.9);
      fill(this.pupilColour);

      ellipse(left_eye_pos[0], left_eye_pos[1], this.pupilsize, (positions.left_eye[1][1] - positions.left_eye[5][1]) * 7 + 0.9); //left pupil
      ellipse(right_eye_pos[0], right_eye_pos[1], this.pupilsize, (positions.left_eye[1][1] - positions.left_eye[5][1]) * 7 + 0.9);// right eyes

    }

   
    else {
      let eyePosX = (right_eye_pos[0]/4 - left_eye_pos[0]/4);
      let eyePosY = (left_eye_pos[1]);

      fill(this.detailColour);
      // ellipse(eyePosX, eyePosY, 0.45, 0.27);

      fill(snakeEyes)
      ellipse(eyePosX - 0.3 + curEyeShift, eyePosY, 0.5, this.slit_height * 2 + 2.2);
      fill(this.pupilColour);
      ellipse(eyePosX - 0.3 + curEyeShift, eyePosY, this.pupilsize, this.slit_height * 2 + 2.2);
    }

  }


  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function (settings) {
    this.num_eyes = int(map(settings[0], 0, 100, 1, 2));
    this.browcolor = int(map(settings[1], 0, 100, 3, 0));
    this.tonguecolor = int(map(settings[2], 0, 100, 1, 0));
    this.pupilsize = map(settings[3], 0, 100, 0, 0.35);
    this.fangLength = map(settings[4], 0, 100, 1.4, 0.8);
    this.tongueLength = map(settings[5], 0, 100, 0, 0.6);
    this.eyebrowSpike = map(settings[6], 0, 100, 0, -0.2);
    this.slim = map(settings[7], 0, 100, 0, 0.1);
    this.facecolor = int(map(settings[8], 0, 100, 9, 0));
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function () {
    let settings = new Array(9);
    settings[0] = map(this.num_eyes, 1, 2, 0, 100);
    settings[1] = int(map(this.browcolor, 0, 3, 0, 100));
    settings[2] = int(map(this.tonguecolor, 0, 1, 0, 100));
    settings[3] = map(this.pupilsize, 0, 0.35, 0, 100);
    settings[4] = map(this.fangLength, 0.8, 1.4, 0, 100);
    settings[5] = map(this.tongueLength, 0.6, 0, 0, 100);
    settings[6] = map(this.eyebrowSpike, 0, -0.2, 0, 100);
    settings[7] = map(this.slim, 0.1, 0, 0, 100);
    settings[8] = int(map(this.facecolor, 0, 9, 0, 100));

    return settings;
  }
}
