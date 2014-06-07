/* Copyright 2014 Mikhail Shapiro

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

var key = new Array();




var rectangle = new Rectangle(new Point(0, 0), new Point((1000), 200));
var keyboardBack = new Path.RoundRectangle(rectangle, 2);
keyboardBack.fillColor = 'black';
var spacing = -24;



var numKeys = 39;
var keys = new Group();
for (var k = 5; k < numKeys + 7; k++) {
    var white = new Rectangle(new Point(13 + spacing, 2), new Point((((1000) / numKeys) + 8) + spacing, 198));
    key[k] = new Path.Rectangle(white);
    if ((k % 12 == 1) || (k % 12 == 3) || (k % 12 == 6) || (k % 12 == 8) || (k % 12 == 10)) {
        key[k].fillColor = "grey";
    }
    else {
        key[k].fillColor = "#ffefd5";
        //key[k].opacity = .5;
    }
    spacing += (1000- 30) / numKeys;
}

function onMouseDown(event) {
    changeFreq(event.point.x, event.point.y);
    circle.position = event.point;
    num = Math.round(event.point.x / 28) + 7;
}
var num = 8
function onMouseDrag(event) {
    changeFreq(event.point.x, event.point.y);
    //text.content = Math.round(source.playbackRate.value*(44100/500));
    circle.position = event.point;
    num = Math.round(event.point.x / 28) + 7;



    //	for(var k=5;k<46;k++)
    //	{
    //			key[k].segments[1].point.y += .5;
    //			key[k].segments[2].point.y += .5;		
    //	}
}
function onMouseUp(event) {
    circle.position = (-20, -20);
    off();
}


window.global = {};

global.changeColor = function(whichKey)
{
	mover.position.x = whichKey*((1000- 30)/ numKeys);
	
	view.draw();
}
var white = new Rectangle(new Point(13 + spacing, 2), new Point((((1000) / numKeys) + 8) + spacing, 198));
var mover = new Path.Rectangle(white);
mover.fillColor = "#2C97B4";

var border = new Path(new Point(0, 0), new Point(0, controller.height));
border.strokeWidth = 4;
border.strokeColor = 'black';
var endborder = new Path(new Point(1000, 0), new Point(1000, controller.height));
endborder.strokeWidth = 4;
endborder.strokeColor = 'black';

var circle = new Path.Circle(new Point(10, 10), 27);
circle.fillColor = '#F68A26';
circle.opacity = .3;