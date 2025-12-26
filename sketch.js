let song;
let noise;

function preload() {
song = loadSound("02 BASTION MIX7.mp3");
noise = loadSound("white.mp3");
}

function setup() {
createCanvas(1300, 1);
song.loop();
noise.loop();
noise.setVolume(0.2);
}

function draw() {
  background(200);
  let volume = map(mouseX, 0, width, 0, 1);
  volume = constrain(volume, 0, 1);
  song.amp(volume); 
  let volume1 = map(mouseX, 0, width, 1, 0);
  volume = constrain(volume1, 0, 1);
  noise.amp(volume1);
}