var song;
var noise;
var typedText = "";
var targetWord = "TELOS";
var displayDiv;
var correctOsc;
var wrongOsc;

function preload() {
  song = loadSound("05 I_VE BEEN GONE FOR SO LONG MIX7.mp3");
  noise = loadSound("white.mp3");
}

function setup() {
  createCanvas(1, 1);
  noise.play();
  noise.setVolume(0.1);
  
  // Setup sound feedback oscillators
  correctOsc = new p5.Oscillator('sine');
  wrongOsc = new p5.Oscillator('sawtooth');
  
  // Create display for typed letters
  displayDiv = createDiv("");
  displayDiv.id("typed-display");
  updateDisplay();
}

function playCorrectSound() {
  correctOsc.freq(880);
  correctOsc.amp(0.3);
  correctOsc.start();
  setTimeout(() => correctOsc.stop(), 100);
}

function playWrongSound() {
  wrongOsc.freq(220);
  wrongOsc.amp(0.3);
  wrongOsc.start();
  setTimeout(() => wrongOsc.stop(), 200);
}

function keyPressed() {
  if (song.isPlaying()) return;
  
  // Ignore non-letter keys
  if (key.length !== 1 || !/[a-zA-Z]/.test(key)) return;
  
  var pressedKey = key.toUpperCase();
  var expectedChar = targetWord[typedText.length];
  
  if (pressedKey === expectedChar) {
    typedText = typedText + pressedKey;
    playCorrectSound();
    updateDisplay();
    
    if (typedText === targetWord) {
      // Success! Play the song
      noise.stop();
      noise.setVolume(0);
      song.play();
      song.setVolume(0.5);
      document.getElementById('tooltip').innerHTML = "You found the way back";
      successAnimation();
    }
  } else {
    // Wrong key - reset
    typedText = "";
    playWrongSound();
    updateDisplay();
    shakeDisplay();
  }
  
  return false;
}

function updateDisplay() {
  var html = "";
  for (var i = 0; i < typedText.length; i++) {
    html += "<span class='typed-letter filled'>" + typedText[i] + "</span>";
  }
  // Add underscore for next letter if not complete
  if (typedText.length < targetWord.length) {
    html += "<span class='typed-letter empty'>_</span>";
  }
  document.getElementById('typed-display').innerHTML = html;
}

function shakeDisplay() {
  displayDiv.addClass("shake");
  setTimeout(() => displayDiv.removeClass("shake"), 300);
}

function successAnimation() {
  var display = document.getElementById('typed-display');
  display.classList.add('success');
}
