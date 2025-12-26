let input;
let song;
let noise;
let volumeMeter;
let volumeFill;

function preload() {
  song = loadSound("03 NEVER ME MIX7.wav");
  noise = loadSound("white.mp3");
}

function setup() {
  createCanvas(1, 1);
  noise.play();
  noise.setVolume(0.1);
  input = new p5.AudioIn();
  input.start();
  
  // Create volume meter
  volumeMeter = createDiv('');
  volumeMeter.id('volume-meter');
  
  volumeFill = createDiv('');
  volumeFill.id('volume-fill');
  volumeFill.parent(volumeMeter);
  
  // Add threshold line
  let thresholdLine = createDiv('');
  thresholdLine.id('threshold-line');
  thresholdLine.parent(volumeMeter);
}

function draw() {
  let volume = input.getLevel();
  let threshold = 0.3;
  
  // Update volume meter (scale volume for better visibility)
  let meterHeight = Math.min(volume * 300, 100);
  document.getElementById('volume-fill').style.height = meterHeight + '%';
  
  // Change color based on volume
  if (volume > threshold) {
    document.getElementById('volume-fill').style.background = '#ff3333';
  } else {
    document.getElementById('volume-fill').style.background = '#ffffff';
  }
  
  if (song.isPlaying()) return;
  
  if (volume > threshold) {
    song.play();
    song.setVolume(0.5);
    noise.stop();
    
    // Change tooltip
    document.getElementById('tooltip').innerHTML = "You found your voice";
    
    // Success animation
    document.getElementById('volume-meter').classList.add('success');
  }
}
