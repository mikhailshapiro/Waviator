/* Copyright 2013 Chris Wilson
   Modified 2014 Mikhail Shapiro

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


window.AudioContext = window.AudioContext || window.webkitAudioContext;

//initialize variables
var frequencyArray = [];
var delay=0;
var samplesArray = [];
var emptyArray = [];
var source = null;
var rate = 1;
var sourceNum = true;
var audioContext = new AudioContext();
var audioInput = null,
    realAudioInput = null,
    inputPoint = null,
    audioRecorder = null;
var analyserContext = null;
var k = 0;
var freq = 0;
var freqCorrect = 1;
var l = 0;
var interval = 1;
var roundSem = 0;
var detune = 1;
var decayVol = .2;
var octaveJ = 1;
var audioBuffer;
var volume = 1;
var rafID = null;
var canvasWidth, canvasHeight;
var recIndex = 0;
var isRecording = false;


//identifies getUserMedia and animation properties for specific browsers.
function initAudio() {
		if (!navigator.cancelAnimationFrame)
            navigator.cancelAnimationFrame = navigator.webkitCancelAnimationFrame || navigator.mozCancelAnimationFrame;
        if (!navigator.requestAnimationFrame)
            navigator.requestAnimationFrame = navigator.webkitRequestAnimationFrame || navigator.mozRequestAnimationFrame;
			
gotStream();
}

function setBuffer(){
		audioBuffer.getChannelData(0).set(samplesArray);
}


function gotStream() {

		inputPoint = audioContext.createGain(); //create gain node for custom Waveform
		//audioBuffer created from sampled custom waveform
        audioBuffer = audioContext.createBuffer(1, 500, 44100);
        
		audioBuffer.getChannelData(0).set(samplesArray);
		
		//buffer assigned to source node
        source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.loop = true;
        source.connect(inputPoint);
	
	//create delayNode
	delayNode = audioContext.createDelay();
	delayNode.delayTime.value= 0;
	
	//create analyser
    analyserNode = audioContext.createAnalyser(); 	//create an AnalyserNode
    analyserNode.fftSize = 2048;
	analyserNode.smoothingTimeConstant = .8;

	//sensorPoint.connect( analyserNode ); //connect sensorPoint to analyserNode
		gainChanger2 = audioContext.createGain();
        gainChanger2.gain.value = 0;
		
		source2 = audioContext.createBufferSource();
        source2.buffer = audioBuffer;
        source2.loop = true;
        source2.connect(gainChanger2);
		
		gainChanger2.connect(inputPoint);
		inputPoint.gain.value = 1;
		
		//gainChanger is gainNode that controls volume of source
        gainChanger = audioContext.createGain();
        gainChanger.gain.value = 0;
		finalGain = audioContext.createGain();
        finalGain.gain.value = volume;
		
		decay = audioContext.createGain();
        decay.gain.value = decayVol;

        inputPoint.connect(gainChanger)
        gainChanger.connect(finalGain);
		//gainChanger2.connect(audioContext.destination);
        gainChanger.connect(decay);
		gainChanger.connect(analyserNode);
		delayNode.connect(decay);
		delayNode.connect(analyserNode);
		decay.connect(delayNode);
		delayNode.connect(finalGain);
		finalGain.connect(analyserNode);
		finalGain.connect(audioContext.destination);
		//filterNode.connect(audioContext.destination);
		
		//source.noteOn(0);
		//source2.noteOn(0);

		audioRecorder = new Recorder (finalGain);
		console.log(audioRecorder);
		
		//source2.start(0);
		//source playback rate set to an initial value of 1
		source.playbackRate.value = 1;
		source2.playbackRate.value = 1;
		updateAnalysers();

		

}
function start() {
    source.start(0);
    source2.start(0);
}

function changeDelay()
{
	if ((delay <= 0)||(decayVol<=0))
	{
		delayNode.delayTime.value= 0;
		decay.gain.value = 0;
		
	}
	else{
		delayNode.delayTime.value= delay/300;
		decay.gain.value = decayVol;
	}
	
	finalGain.gain.value = volume;
}

function changeInterval(detune)
{
	switch(detune)
	{
    case 0:
	    gainChanger2.gain.value = 0;
		interval = 1;
		break;
    case 1:
	    gainChanger2.gain.value = 1;
		interval = 1/0.94387382981;
		break;
    case 2:
	        gainChanger2.gain.value = 1;
		interval = 1/0.89089926156;
		break;
    case 3:
	        gainChanger2.gain.value = 1;
		interval = 1/0.84089662513
		break;
    case 4:
	        gainChanger2.gain.value = 1;
		interval = 1/0.79369981098;
		break;
    case 5:
	        gainChanger2.gain.value = 1;
		interval = 1/0.74919121403;
		break;
    case 6:
	        gainChanger2.gain.value = 1;
		interval = 1/0.70710674419;
		break;
    case 7:
	        gainChanger2.gain.value = 1;
		interval = 1/0.66742004232;
		break;
    case 8:
	        gainChanger2.gain.value = 1;
		interval = 1/0.62996094242;
		break;
    case 9:
	        gainChanger2.gain.value = 1;
		interval = 1/0.59460343329;
		break;
    case 10:
	        gainChanger2.gain.value = 1;
		interval = 1/0.56123093249;
		break;
    case 11:
	        gainChanger2.gain.value = 1;
		interval = 1/0.52973179919;
		break;
    case 12:
	        gainChanger2.gain.value = 1;
		interval = 1/0.5;
		break;			
	default:
	}
}

function updateAnalysers(time) {
    if (!analyserContext) {
        var canvas = document.getElementById('ana');
        canvasWidth = canvas.width;
        canvasHeight = canvas.height;
        analyserContext = canvas.getContext('2d');
    }
    // analyzer draw code here
    {
        var SPACING = 3;
        var BAR_WIDTH = 1;
        var numBars = Math.round(canvasWidth / SPACING);
        var freqByteData = new Uint8Array(analyserNode.frequencyBinCount);

        analyserNode.getByteFrequencyData(freqByteData); 

        analyserContext.clearRect(0, 0, canvasWidth, canvasHeight);
        analyserContext.fillStyle = '#F6D565';//'#168764';//'#A9A9A9';//'#80652B';//
        analyserContext.lineCap = 'round';
        var multiplier = analyserNode.frequencyBinCount / numBars;

        // Draw rectangle for each frequency bin.
        for (var i = 0; i < numBars; ++i) {
            var magnitude = 0;
            var offset = Math.floor( i * multiplier );
            // gotta sum/average the block, or we miss narrow-bandwidth spikes
            for (var j = 0; j< multiplier; j++)
                magnitude += freqByteData[offset + j];
            magnitude = magnitude / multiplier;
            var magnitude2 = freqByteData[i * multiplier];
            //frequencyArray[i] = 300 - magnitude2;
			//analyserContext.fillStyle = "hsl( " + Math.round((i*360)/numBars) + ", 100%, 50%)";
            analyserContext.fillRect(i * SPACING, canvasHeight, BAR_WIDTH, -magnitude);
        }
    }
    
    rafID = window.requestAnimationFrame( updateAnalysers );
	
}

function changeFreq(x,y)
{
	source.playbackRate.value = (Math.pow(2,(x)/300));
	source2.playbackRate.value = (interval)*(Math.pow(2,(x)/300))*(octaveJ); //0.7937 for thirds
	//source2.playbackRate.value = (Math.pow(2,(x-300)/400));
	gainChanger.gain.value = ((200-y)/300);
	//gainChanger2.gain.value = ((y)/600);
	//filterNode.frequency.value = (400-y)*20;
}

function changeFreqKeys(x,y)
{
	var initialtone = x/88.2;
	source.playbackRate.value = initialtone;
	source2.playbackRate.value = (interval)*initialtone*(octaveJ); //0.7937 for thirds
	//source2.playbackRate.value = (Math.pow(2,(x-300)/400));
	gainChanger.gain.value = ((200-y)/300);
	//gainChanger2.gain.value = ((y)/600);
	//filterNode.frequency.value = (400-y)*20;
}

function off(x,y)
{
		gainChanger.gain.value = 0;
		//gainChanger2.gain.value = 0;
}
 
function saveAudio() {

    console.log('savaaudio');
    audioRecorder.exportWAV( doneEncoding );
    // could get mono instead by saying
    // audioRecorder.exportMonoWAV( doneEncoding );
}

function gotBuffers(buffers) {

    console.log('gotbuffers');
    //var canvas = document.getElementById( "wavedisplay" );

    //drawBuffer( canvas.width, canvas.height, canvas.getContext('2d'), buffers[0] );

    // the ONLY time gotBuffers is called is right after a new recording is completed - 
    // so here's where we should set up the download.
    audioRecorder.exportWAV( doneEncoding );
}

function doneEncoding(blob) {

    console.log('doneencoding');
    Recorder.forceDownload( blob, "myRecording" + ((recIndex<10)?"0":"") + recIndex + ".wav" );
    recIndex++;
}

function toggleRecording() {
    console.log('togglerecording');
    if (isRecording == true) {
        // stop recording
        audioRecorder.stop();
        isRecording = false;
        audioRecorder.getBuffers( gotBuffers );
    } else {
        // start recording
        if (!audioRecorder)
            return;
        isRecording = true;
        audioRecorder.clear();
        audioRecorder.record();
    }
}

function convertToMono(input) {

    console.log('converttomono');
    var splitter = audioContext.createChannelSplitter(2);
    var merger = audioContext.createChannelMerger(2);

    input.connect( splitter );
    splitter.connect( merger, 0, 0 );
    splitter.connect( merger, 0, 1 );
    return merger;
}

function cancelAnalyserUpdates() {
    window.cancelAnimationFrame( rafID );
    rafID = null;
}

function toggleMono() {

    console.log('togglemono');
    if (audioInput != realAudioInput) {
        audioInput.disconnect();
        realAudioInput.disconnect();
        audioInput = realAudioInput;
    } else {
        realAudioInput.disconnect();
        audioInput = convertToMono( realAudioInput );
    }

    audioInput.connect(inputPoint);
}

 
 
 
 
 
 
 
window.addEventListener('load', initAudio );
//window.addEventListener('load', playSound);