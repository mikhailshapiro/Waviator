var previousCode = 0;
var oct = 0;
document.addEventListener('keydown', function(event) {
    
	if(event.keyCode == 88) {
			if (oct<2)
			{
			oct++;
			}
		}
	if(event.keyCode == 90) {
			if (oct>-2)
			{
			oct--;
			}
		}
	
	if(event.keyCode != previousCode)
	{	
		//White Keys
		previousCode = event.keyCode;
		if(event.keyCode == 65) {
			//console.log('A');
			A.pressed = true;
			A.press();
		}
		else if(event.keyCode == 83) {
			//console.log('S');
			S.pressed = true;
			S.press();
		}
		else if(event.keyCode == 68) {
			//console.log('D');
			
			D.pressed = true;
			D.press();
		}
		else if(event.keyCode == 70) {
			//console.log('F');
			F.pressed = true;
			F.press();
		}
		else if(event.keyCode == 71) {
			//console.log('G');
			G.pressed = true;
			G.press();
		}
		else if(event.keyCode == 72) {
			//console.log('H');
			H.pressed = true;
			H.press();
		}
		else if(event.keyCode == 74) {
			//console.log('J');
			J.pressed = true;
			J.press();
		}
		else if(event.keyCode == 75) {
			//console.log('K');
			K.pressed = true;
			K.press();
		}
		else if(event.keyCode == 76) {
			//console.log('L');
			L.pressed = true;
			L.press();
		}
		else if(event.keyCode == 186) {
			//console.log(';');
			semi.pressed = true;
			semi.press();
		}
		else if(event.keyCode == 222) {
			//console.log('ap');
			apostrophe.pressed = true;
			apostrophe.press();
		}
		
		//Black Keys
		else if(event.keyCode == 87) {
			//console.log('W');
			W.pressed = true;
			W.press();
		}
		else if(event.keyCode == 69) {
			//console.log('E');
			E.pressed = true;
			E.press();
		}
		else if(event.keyCode == 84) {
			//console.log('T');
			T.pressed = true;
			T.press();
		}
		else if(event.keyCode == 89) {
			//console.log('Y');
			Y.pressed = true;
			Y.press();
		}
		else if(event.keyCode == 85) {
			//console.log('U');
			U.pressed = true;
			U.press();
		}
		else if(event.keyCode == 79) {
			//console.log('O');
			O.pressed = true;
			O.press();
		}
		else if(event.keyCode == 80) {
			//console.log('P');
			P.pressed = true;
			P.press();
		}	
		
		play();
	}

});


document.addEventListener('keyup', function(event) {


		if(event.keyCode == 65) {
			//console.log('A');
			A.pressed = false;
			
		}
		else if(event.keyCode == 83) {
			//console.log('S');
			S.pressed = false;
		}
		else if(event.keyCode == 68) {
			//console.log('D');
			D.pressed = false;
		}
		else if(event.keyCode == 70) {
			//console.log('F');
			F.pressed = false;
		}
		else if(event.keyCode == 71) {
			//console.log('G');
			G.pressed = false;
		}
		else if(event.keyCode == 72) {
			//console.log('H');
			H.pressed = false;
		}
		else if(event.keyCode == 74) {
			//console.log('J');
			J.pressed = false;
		}
		else if(event.keyCode == 75) {
			//console.log('K');
			K.pressed = false;
		}
		else if(event.keyCode == 76) {
			//console.log('L');
			L.pressed = false;
		}	
		else if(event.keyCode == 186) {
			//console.log(';');
			semi.pressed = false
		}
		else if(event.keyCode == 222) {
			//console.log('ap');
			apostrophe.pressed = false;
		}
		
		//Black Keys
		else if(event.keyCode == 87) {
			//console.log('W');
			W.pressed = false;
		}
		else if(event.keyCode == 69) {
			//console.log('E');
			E.pressed = false;
		}
		else if(event.keyCode == 84) {
			//console.log('T');
			T.pressed = false;
		}
		else if(event.keyCode == 89) {
			//console.log('Y');
			Y.pressed = false;
		}
		else if(event.keyCode == 85) {
			//console.log('U');
			U.pressed = false;
		}
		else if(event.keyCode == 79) {
			//console.log('O');
			O.pressed = false;
		}
		else if(event.keyCode == 80) {
			//console.log('P');
			P.pressed = false;
		}

		if((keyDown[keyDown.length-1] != null)&&(keyDown[keyDown.length-1].keyNumber == event.keyCode))
		{
			//console.log('release');
			previousCode = 0;
			letGo();
		}

		
});


var keyDown = new Array();

function key(pressed,frequency,keyNumber,colorNumber) {
  this.pressed = pressed;
  this.frequency = frequency;
  this.keyNumber = keyNumber;
  this.colorNumber = colorNumber;
};

key.prototype.press = function () {

	//console.log('press entered');
	keyDown.push(this);
	//console.log(keyDown);
};

play = function()
{
	if(keyDown[keyDown.length-1] != null)
	{
		//console.log('changeFreq');
		changeFreqKeys(Math.pow(2,oct)*keyDown[keyDown.length-1].frequency,50);
		global.changeColor(keyDown[keyDown.length-1].colorNumber-5+12*(oct+1));
	}
	else
	{
		off();
		global.changeColor(-8);
	}
};

letGo = function () { //trims keyDown array 
  
  if(keyDown[keyDown.length-1].pressed == false)
  {
	  keyDown.pop();
	  //console.log(keyDown);

	  if(keyDown[keyDown.length-1] != undefined)
	  {
		//console.log('entered if');
		letGo();
	  }
  }
  play();
};

var A = new key(false,261.626,65,12);
var S = new key(false,293.665,83,14);
var D = new key(false,329.628,68,16);
var F = new key(false,349.228,70,17);
var G = new key(false,391.995,71,19);
var H = new key(false,440,72,21,21);
var J = new key(false,493.883,74,23);
var K = new key(false,523.251,75,24);
var L = new key(false,587.330,76,26);
var semi = new key(false,659.255,186,28);
var apostrophe = new key(false,698.456,222,29);

var W = new key(false,277.183,87,13);
var E = new key(false,311.127,69,15);
var T = new key(false,369.994,84,18);
var Y = new key(false,415.305,89,20);
var U = new key(false,466.164,85,22);
var O = new key(false,554.365,79,25);
var P = new key(false,622.254,80,27);



