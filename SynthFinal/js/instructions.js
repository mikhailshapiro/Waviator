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

var back = new Rectangle(new Point(20, 20), new Point(980, 480));
var background = new Path.RoundRectangle(back, new Size(20, 20));
background.fillColor = '#F68A26';
background.opacity = .5;

var layer2 = new Rectangle(new Point(30, 28), new Point(970, 470));
var layer2fill = new Path.RoundRectangle(layer2, new Size(20, 20));
layer2fill.fillColor = '#2C97B4';
layer2fill.opacity = .97;


var raster3 = new Raster('CUSTOM');
raster3.position = new Point(700, 250);
raster3.scale(0.4);

var raster4 = new Raster('CUSTOM1');
raster4.position = new Point(200, 250);
raster4.scale(0.4);


var arrow = new Path();
arrow.fillColor = '#F68A26';
arrow.opacity = .7;
arrow.add(new Point(290, 250));
arrow.add(new Point(370, 285));
arrow.add(new Point(290, 320));
arrow.add(new Point(290, 300));
arrow.add(new Point(250, 300));
arrow.add(new Point(250, 270));
arrow.add(new Point(290, 270));
arrow.add(new Point(290, 250));

arrow.position.y += -35
arrow.position.x += 90;


var Text = new PointText(new Point(500, 110));
Text.content = 'Draw a line in the grid. \r\n This creates a periodic wave. \r\n\r\n\r\n\r\n\r\n\r\n Then, touch the keyboard to play';
Text.style = {
    fontWeight: 'bold',
    fontSize: 30,
    fillColor: '#99F9F7',
    justification: 'center'
};


var ok = new Path.RoundRectangle(new Point(450, 450), new Point(550, 410), 5);
ok.style = {
    fillColor: '#0B4030',
    strokeColor: '#A9A9A9',
    strokeWidth: 2
};
var okText = new PointText(new Point(500, 435));
okText.content = 'OK';
okText.style = {
    fontWeight: 'bold',
    fontSize: 18,
    fillColor: '#A9A9A9',
    justification: 'center'
};
var okGroup = new Group([ok, okText]);

okGroup.onMouseDown = function () {
    var drawing1 = document.getElementById('instructions');
    drawing1.style.display = 'none';
    start();
}
