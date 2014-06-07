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

var back = new Rectangle(new Point(0, 0), new Point(1000, 300));
var background = new Path.RoundRectangle(back, new Size(20, 20));
background.fillColor = '#2C97B4';
background.strokeColor = 'black';

var screen = new Rectangle(new Point(10, 10), new Point(600, (300) - 10));
var screen = new Path.RoundRectangle(screen, new Size(20, 20));
screen.fillColor = '#0B4030';
screen.strokeColor = '#A9A9A9';
screen.strokeWidth = 2;

var group = new Group();
xVal = 0;

//create vertical lines that become samples
var myLines = new Array();
spacing = 70;
for (var k = 0; k < (500) ; k++) //"32" value can be set to as many samples as desired
{
    myLines[k] = new Path();
    myLines[k].strokeColor = '#1C574B';
    myLines[k].add(new Point(spacing, 0), new Point(spacing, 400));
    myLines[k].strokeWidth = 1;
    spacing += 470 / (500);
    myLines[k].opacity = 0;
    group.addChild(myLines[k]);
}

//draws horizontal lines that help guide drawing
var gridLines = new Array();
spacing = 10 + (300 - 20) / 10;
for (var l = 0; l < 9; l++) {
    gridLines[l] = new Path();
    gridLines[l].strokeColor = '#A9A9A9';
    gridLines[l].opacity = .5;
    gridLines[l].add(new Point(10, spacing), new Point(600, spacing));
    gridLines[l].strokeWidth = 2;
    spacing += (300 - 20) / 10;
}
var gridLinesv = new Array();
spacing = 10 + 59;
for (var l = 0; l < 9; l++) {
    gridLinesv[l] = new Path()
    gridLinesv[l].strokeColor = '#A9A9A9';
    gridLinesv[l].opacity = .5;
    gridLinesv[l].add(new Point(spacing, 10), new Point(spacing, (300) - 10));
    gridLinesv[l].strokeWidth = 2;
    spacing += 59;
}

//var startGroup = new Group();
var startRRect = new Path.RoundRectangle(new Point(10, 10), new Point(70, 300 - 10), 20);
startRRect.fillColor = '#F68A26';
startRRect.opacity = .5;
//startGroup.addChild(startRRect);
var endRRect = new Path.RoundRectangle(new Point(540, 10), new Point(600, 300 - 10), 20);
endRRect.fillColor = '#F68A26';
endRRect.opacity = .5;
//startGroup.addChild(endRRect);


var newPath = new Path();
newPath.strokeColor = '#99F9F7';
newPath.strokeWidth = 3;
newPath.strokeCap = 'round';

var started = false;
var holoPath = new Path();
holoPath.strokeColor = '#26F2B3';
holoPath.strokeWidth = 10;
holoPath.opacity = .4;
holoPath.strokeCap = 'round';

//sinPoints = new Path();
//for (var i = 0; i < 473; i++){
//sinPoints.add(new Point(i+69,130*Math.sin(Math.PI*4*i/940)+150));
//}


var button0 = new Path.RoundRectangle(new Point(620, 30), new Point(670, 90), 5);
button0.style = {
    fillColor: '#0B4030',
    strokeColor: '#A9A9A9',
    strokeWidth: 2,
    content: 'clear'
}
points0 = new Path();
for (var i = 0; i <= 500; i++) {
    points0.add(new Point(i / 16.66666666666666 + 630, 20 * Math.sin(Math.PI * 4 * i / 1000) + 60));
}
points0.strokeColor = '#99F9F7';
points0.strokeWidth = 2;

group0 = new Group([button0, points0]);

group0.onMouseDown = function (event) {
    if (saveToggle == true) {
        setPath(points0, 0, 0);
    }
    else if (saveToggle == false) {
        getPath(points0, 0, 0);
    }
}

var button1 = button0.clone();
button1.position.x += 60;
var line1 = new Path(points1);
var points1;
points1 = new Path([new Point(688, 40), new Point(705, 40), new Point(705, 80), new Point(722, 80)]);
points1.strokeColor = '#99F9F7';
points1.strokeWidth = 2;


var group1 = new Group([button1, points1]);

group1.onMouseDown = function (event) {
    if (saveToggle == true) {
        setPath(points1, 1, 0);
    }
    else if (saveToggle == false) {
        getPath(points1, 1, 0);
    }
}

var button2 = button0.clone();
button2.position.x += 60;
button2.position.x += 60;


button2.style = {
    fillColor: '#0B4030',
    strokeColor: '#A9A9A9',
    strokeWidth: 2,
    content: 'clear'
}
points2 = new Path();
points2.add(new Point(750, 60), new Point(780, 60));

points2.strokeColor = '#99F9F7';
points2.strokeWidth = 2;

group2 = new Group([button2, points2]);

group2.onMouseDown = function (event) {
    if (saveToggle == true) {
        setPath(points2, 2, 0);
    }
    else if (saveToggle == false) {
        getPath(points2, 2, 0);
    }
}



var button3 = button0.clone();
button3.position.y += 70;

var points3;
points3 = new Path([new Point(630, 150), new Point(645, 110), new Point(660, 150)]);
points3.strokeColor = '#99F9F7';
points3.strokeWidth = 2;

group3 = new Group([button3, points3]);

group3.onMouseDown = function (event) {
    if (saveToggle == true) {
        setPath(points3, 0, 1);
    }
    else if (saveToggle == false) {
        getPath(points3, 0, 1);
    }
}

var button4 = button0.clone();
button4.position.x += 60;
button4.position.y += 70;

var points4;
points4 = new Path([new Point(688, 150), new Point(722, 110), new Point(722, 150)]);
points4.strokeColor = '#99F9F7';
points4.strokeWidth = 2;
group4 = new Group([button4, points4]);

group4.onMouseDown = function (event) {
    if (saveToggle == true) {
        setPath(points4, 1, 1);
    }
    else if (saveToggle == false) {
        getPath(points4, 1, 1);
    }
}

var button5 = button0.clone();
button5.position.x += 60;
button5.position.x += 60;
button5.position.y += 70;

var points5;
points5 = new Path([new Point(750, 130), new Point(780, 130)]);
points5.strokeColor = '#99F9F7';
points5.strokeWidth = 2;
group5 = new Group([button5, points5]);

group5.onMouseDown = function (event) {
    if (saveToggle == true) {
        setPath(points5, 2, 1);
    }
    else if (saveToggle == false) {
        getPath(points5, 2, 1);
    }
}

function setPath(path, x, y) { // take lines 0-6 and set them to newPath

    clearPath();

    var xOffset = 60;
    var yOffset = 70;

    {
        newPath = path.clone();
        for (i = 0; i < path.segments.length; i++) {
            newPath.segments[i].point.x = (newPath.segments[i].point.x - 630 - (x * xOffset)) * (470 / 30) + 70;
            newPath.segments[i].point.y = (newPath.segments[i].point.y - 40 - (y * yOffset)) * 6.3 + 23;
        }

    }
    //console.log(path.segments.length);


    holoPath = newPath.clone();
    holoPath.strokeColor = '#26F2B3';
    holoPath.strokeWidth = 10;
    holoPath.opacity = .4;
    newPath.strokeColor = '#99F9F7';
    newPath.strokeWidth = 3;


    started = true;
    xVal = 600;
}

function getPath(path, x, y) //take newpath and set it to lines 0-6
{
    var xOffset = 60;
    var yOffset = 70;
    path.removeSegments();

    for (var k = 0; k < 500; k++) {
        path.add(new Point(((k) / 500) * 30 + 630 + (x * xOffset), ((samplesArray[k] * 350 + 150) - 23) / 6.3 + 40 + (y) * yOffset));
       // console.log(k);
    }
    //console.log(samplesArray.length);
    path.strokeColor = '#99F9F7';

    toggleSave();

}


startRRect.onMouseDown = function (event) {
    if (started == false) {
        started = true;
        newPath.add(new Point(event.point.x, event.point.y));
        holoPath.add(new Point(event.point.x, event.point.y));
    }
}

var hitOptions = {
    segments: true,
    stroke: true,
    fill: true,
    tolerance: 5
};


//path is drawn once screen clicked
tool.onMouseDown = function (event) {
    var hitResult = project.hitTest(event.point, hitOptions);
    if (!hitResult)
        return;

    hitPath = hitResult.item;

    if ((event.point.x > 10) && (event.point.x < 600)) {
        if (started == false) {
            holoPath.add(new Point(30, 150));
            holoPath.add(event.point);
            newPath.add(new Point(30, 150));
            newPath.add(event.point);
            started = true;
        }

        if (started == true) {
            if (xVal < event.point.x) {
                if (event.point.y <= 10) {
                    holoPath.add(new Point(event.point.x, 10));
                    newPath.add(new Point(event.point.x, 10));
                    xVal = event.point.x;
                }
                if (event.point.y >= 290) {
                    holoPath.add(new Point(event.point.x, 290));
                    newPath.add(new Point(event.point.x, 290));
                    xVal = event.point.x;
                }
                if ((event.point.y > 10) && (event.point.y < 290)) {
                    holoPath.add(event.point);
                    newPath.add(event.point);
                    xVal = event.point.x;
                }
            }
        }

    }

}

//knobs
var delayBack = new Path.RoundRectangle(new Point(850, 300 / 5 - 8), new Point(950, 300 / 5 + 8), 5);
delayBack.style = {
    fillColor: '#0B4030',
    strokeColor: '#A9A9A9',
    strokeWidth: 2
};
var delayPointer = new Path.RoundRectangle(new Point(900, 300 / 5 - 15), new Point(910, 300 / 5 + 15), 2);
delayPointer.style = {
    fillColor: '#A9A9A9'
};
var delaySpace2 = new Path.RoundRectangle(new Point(820, 300 / 5 - 20), new Point(970, 300 / 5 + 20), 2);
delaySpace2.style = {
    fillColor: 'red'
};

delaySpace2.opacity = .0;

//var delayGroup = new Group([delayPointer, delaySpace1]);

var delayTimeText = new PointText(new Point(900, 85));
delayTimeText.justification = 'center';
delayTimeText.fillColor = 'black';
delayTimeText.content = 'Delay Time = ' + 3 * (delayPointer.position.x - 866) / .3 + ' ms';


var moveDelay = function (event) {
    if ((event.point.x > 860) && (event.point.x < 940)) {
        delayPointer.position.x = event.point.x;
        if (3 * (delayPointer.position.x - 866) / .3 >= 0) {
            delayTimeText.content = 'Delay Time = ' + 3 * (delayPointer.position.x - 866) / .3 + ' ms';
        }
        else {
            delayTimeText.content = 'Delay Time = ' + 0 + ' ms';
        }
    }
    if (event.point.x <= 860) {
        delayPointer.position.x = 860;
        delayTimeText.content = 'Delay Time = ' + 0 + ' ms';
    }
    if (event.point.x >= 940) {
        delayPointer.position.x = 940;
        delayTimeText.content = 'Delay Time = ' + 735 + ' ms';
    }

}

delaySpace2.onMouseDrag = moveDelay;
delaySpace2.onMouseDown = moveDelay;

var volumeBack = new Path.RoundRectangle(new Point(850, 2 * 300 / 5 - 8), new Point(950, 2 * 300 / 5 + 8), 5);
volumeBack.style = {
    fillColor: '#0B4030',
    strokeColor: '#A9A9A9',
    strokeWidth: 2
};
var delayFeed = new Path.RoundRectangle(new Point(900, 2 * 300 / 5 - 15), new Point(910, 2 * 300 / 5 + 15), 2);
delayFeed.style = {
    fillColor: '#A9A9A9',
};

var volumeSpace2 = new Path.RoundRectangle(new Point(820, 2 * 300 / 5 - 23), new Point(970, 2 * 300 / 5 + 23), 2);
volumeSpace2.style = {
    fillColor: 'red'
};
volumeSpace2.opacity = .0;

var FeedVol = new PointText(new Point(900, 145));
FeedVol.justification = 'center';
FeedVol.fillColor = 'black';
FeedVol.content = 'Delay Gain = ' + Math.round(100 * (delayFeed.position.x - 860) / 90) / 100;

var moveVol = function (event) {
    if ((event.point.x > 860) && (event.point.x < 940)) {
        delayFeed.position.x = event.point.x;
        if ((delayFeed.position.x - 860) / 90 >= 0) {
            FeedVol.content = 'Delay Gain = ' + Math.round(100 * (delayFeed.position.x - 860) / 90) / 100;
        }
        else {
            FeedVol.content = 'Delay Gain = 0.0';
        }
    }
    if ((event.point.x <= 860)) {
        delayFeed.position.x = 860
        FeedVol.content = 'Delay Gain = 0.0';
    }
    if ((event.point.x >= 940)) {
        delayFeed.position.x = 940
        FeedVol.content = 'Delay Gain = ' + Math.round(100 * (940 - 860) / 90) / 100;
    }
}

volumeSpace2.onMouseDown = moveVol;
volumeSpace2.onMouseDrag = moveVol;



var mainBack = new Path.RoundRectangle(new Point(850, 3 * 300 / 5 - 8), new Point(950, 3 * 300 / 5 + 8), 5);
mainBack.style = {
    fillColor: '#0B4030',
    strokeColor: '#A9A9A9',
    strokeWidth: 2
};
var mainPoint = new Path.RoundRectangle(new Point(895, 3 * 300 / 5 - 15), new Point(905, 3 * 300 / 5 + 15), 2);
mainPoint.style = {
    fillColor: '#A9A9A9',
};

var mainPointSpace = new Path.RoundRectangle(new Point(820, 3 * 300 / 5 - 23), new Point(970, 3 * 300 / 5 + 23), 2);
mainPointSpace.style = {
    fillColor: 'red'
};
mainPointSpace.opacity = .0;


var MainVol = new PointText(new Point(900, 210));
MainVol.justification = 'center';
MainVol.fillColor = 'black';
MainVol.content = 'Volume = ' + Math.round((mainPoint.position.x - 860) / 8);

var moveMain = function (event) {
    if ((event.point.x > 860) && (event.point.x < 940)) {
        mainPoint.position.x = event.point.x;
        if ((mainPoint.position.x - 860) / 90 >= 0) {
            MainVol.content = 'Volume = ' + Math.round(((mainPoint.position.x - 860) / 8) * 10) / 10;
        }
        else {
            MainVol.content = 'Volume = 0';
        }
    }
    if ((event.point.x <= 860)) {
        mainPoint.position.x = 860
        MainVol.content = 'Volume = ' + 0;
    }
    if ((event.point.x >= 940)) {
        mainPoint.position.x = 940
        MainVol.content = 'Volume = ' + 10;
    }
}

mainPointSpace.onMouseDown = moveMain;
mainPointSpace.onMouseDrag = moveMain;

var detSemBack = new Path.RoundRectangle(new Point(740, 260 - 8), new Point(990, 260 + 8), 5);
detSemBack.style = {
    fillColor: '#0B4030',
    strokeColor: '#A9A9A9',
    strokeWidth: 2
};
var detSem = new Path.RoundRectangle(new Point(760, 260 - 15), new Point(770, 260 + 15), 2);
detSem.style = {
    fillColor: '#A9A9A9',
};
var detSemSpace = new Path.RoundRectangle(new Point(735, 260 - 23), new Point(995, 260 + 23), 2);
detSemSpace.style = {
    fillColor: 'Red',
};

detSemSpace.opacity = .0;

var numSemitones = new PointText(new Point(((740 + 990) / 2), 287));
numSemitones.justification = 'center';
numSemitones.fillColor = 'black';
numSemitones.content = '0 Semitones';

var semTitle = new PointText(new Point(((740 + 990) / 2), 240));
semTitle.justification = 'center';
semTitle.fillColor = 'black';
semTitle.content = 'Counterpoint';


var moveSem = function (event) {
    var place = event.point.x
    if ((event.point.x >= 760) && (event.point.x < 970)) {
        place = event.point.x;
    }
    if (event.point.x < 760) {
        place = 760;
    }

    if (event.point.x > 970) {
        place = 970;
    }
    detSem.position.x = place;
    numSemitones.content = Math.round((detSem.position.x - 760) / 17.5) + ' Semitones';
}


detSemSpace.onMouseDown = moveSem;
detSemSpace.onMouseDrag = moveSem;






window.globals = {};
globals.drawPath = function () {
    if (samplesArray.length != 0) {
        for (i = 0; i < 500; i++) {
            newPath.add(new Point(i * 473 / 500 + 69, 350 * samplesArray[i] + 150));
            holoPath.add(new Point(i * 473 / 500 + 69, 350 * samplesArray[i] + 150));
        }
        started = true;
        xVal = 600;
    }
};

globals.setParameters = function () {
    changeDelay();
    changeInterval(roundSem);
    delayPointer.position.x = (delay / 3.0) + 866;
    moveDelay({ point: { x: delayPointer.position.x } });
    //delay = 3*(delayPointer.position.x-866);

    delayFeed.position.x = (decayVol * 87) + 860;
    moveVol({ point: { x: delayFeed.position.x } });
    //decayVol = (delayFeed.position.x-860)/87;

    detSem.position.x = (roundSem * 17.5) + 760;
    moveSem({ point: { x: detSem.position.x } });
    //(detSem.position.x-700)/22.5)
};

//logic to only allow path from left to right, allowing only one 
//intersection with the sample lines
tool.onMouseDrag = function (event) {

    if (started == true) {

        if ((event.point.x > 10) && (event.point.x < 600)) {
            if (xVal < event.point.x) {
                if (event.point.y <= 10) {
                    holoPath.add(new Point(event.point.x, 10));
                    newPath.add(new Point(event.point.x, 10));
                    xVal = event.point.x;
                }
                if (event.point.y >= 290) {
                    holoPath.add(new Point(event.point.x, 290));
                    newPath.add(new Point(event.point.x, 290));

                    xVal = event.point.x;
                }
                if ((event.point.y > 10) && (event.point.y < 290)) {
                    holoPath.add(event.point);
                    newPath.add(event.point);
                    xVal = event.point.x;
                }
            }
        }
    }
}

//line sampled upon mouse-up event
function onMouseUp(event) {
    setEverything();

}

var setEverything = function () {
    for (var i = 0; i < group.children.length; i++) {
        showIntersections(newPath, group.children[i], i)
    }

    delay = 3 * (delayPointer.position.x - 866);
    volume = ((mainPoint.position.x - 860) / 40);
    roundSem = Math.round((detSem.position.x - 760) / 17.5);


    if ((delayFeed.position.x - 860) / 87 >= 0) {
        decayVol = (delayFeed.position.x - 860) / 87;
    }
    else {
        decayVol = 0;
    }
    changeDelay();
    changeInterval(roundSem);
}


var clear = new Path.RoundRectangle(new Point(620, 220), new Point(670, 180), 5);
clear.style = {
    fillColor: '#0B4030',
    strokeColor: '#A9A9A9',
    strokeWidth: 2
};
var clearText = new PointText(new Point(645, 205));
clearText.content = 'CLEAR';
clearText.style = {
    fontWeight: 'bold',
    fontSize: 14,
    fillColor: '#A9A9A9',
    justification: 'center'
};

var clearGroup = new Group([clear, clearText]);

clearGroup.onMouseDown = function () {
    clearPath();
}


var help = new Path.RoundRectangle(new Point(620, 280), new Point(670, 240), 5);
help.style = {
    fillColor: '#0B4030',
    strokeColor: '#A9A9A9',
    strokeWidth: 2
};
var helpText = new PointText(new Point(645, 265));
helpText.content = 'HELP';
helpText.style = {
    fontWeight: 'bold',
    fontSize: 14,
    fillColor: '#A9A9A9',
    justification: 'center'
};

var helpGroup = new Group([help, helpText]);
helpGroup.onMouseDown = function () {

    var drawing1 = document.getElementById('instructions');
    //console.log(drawing1.style.display);
    if ((drawing1.style.display == 'none') || (drawing1.style.display == '')) {
        drawing1.style.display = 'inline';
    }
    else {
        drawing1.style.display = 'none';
    }
}


function clearPath() {
    holoPath.removeSegments();
    newPath.removeSegments();
    xVal = 0;
    started = false;
}

var save = new Path.RoundRectangle(new Point(740, 220), new Point(790, 180), 5);
save.style = {
    fillColor: '#0B4030',
    strokeColor: '#A9A9A9',
    strokeWidth: 2
};
var saveText = new PointText(new Point(765, 205));
saveText.content = 'SAVE';
saveText.style = {
    fontWeight: 'bold',
    fontSize: 14,
    fillColor: '#A9A9A9',
    justification: 'center'
};

var saveGroup = new Group([save, saveText]);
var color1 = 'blue';
var color2 = '#0B4030';
var saveToggle = true;

saveGroup.onMouseDown = function () {
    toggleSave();
}

var toggleSave = function () {
    if (saveToggle == true) {
        button0.fillColor = color1;
        button1.fillColor = color1;
        button2.fillColor = color1;
        button3.fillColor = color1;
        button4.fillColor = color1;
        button5.fillColor = color1;
        saveToggle = false;
    }
    else if (saveToggle == false) {
        button0.fillColor = color2;
        button1.fillColor = color2;
        button2.fillColor = color2;
        button3.fillColor = color2;
        button4.fillColor = color2;
        button5.fillColor = color2;
        saveToggle = true;
    }
}



var share = new Path.RoundRectangle(new Point(680, 220), new Point(730, 180), 5);
share.style = {
    fillColor: '#0B4030',
    strokeColor: '#A9A9A9',
    strokeWidth: 2
};
var shareText = new PointText(new Point(705, 205));
shareText.content = 'SHARE';
shareText.style = {
    fontWeight: 'bold',
    fontSize: 14,
    fillColor: '#A9A9A9',
    justification: 'center'
};

var shareGroup = new Group([share, shareText]);

shareGroup.onMouseDown = function () {
    SoundStudio.app.share();
}

var record = new Path.RoundRectangle(new Point(680, 280), new Point(730, 240), 5);
record.style = {
    fillColor: '#0B4030',
    strokeColor: '#A9A9A9',
    strokeWidth: 2
};
var recordText = new PointText(new Point(705, 265));
recordText.content = 'REC';
recordText.style = {
    fontWeight: 'bold',
    fontSize: 14,
    fillColor: '#A9A9A9',
    justification: 'center'
};

var recordGroup = new Group([record, recordText]);
var recording = false;
recordGroup.onMouseDown = function () {
    if (recording == false) {
        record.fillColor = 'Red';
        recording = true;
    }
    else {
        record.fillColor = '#0B4030';
        recording = false;
    }

    toggleRecording();
}




//samples stored in samplesArray to be accessed by audio portion
function showIntersections(path1, path2, sample) {
    var intersections = path1.getIntersections(path2);
    for (var j = 0; j < intersections.length; j++) {
        //  new Path.Circle({
        //         center: intersections[j].point,
        //         radius: 2,
        //         fillColor: 'white',
        //		 opacity: .2
        //  });
        samplesArray[sample] = (intersections[j].point.y - 150) / 350;
        setBuffer();
    }

}

