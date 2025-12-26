var song;
var correctButton;
var noise;
var resetButton;

// Ozkavosh demon language words from Dota 2
var ozkavoshWords = [
  "Ozh", "Izh", "Ozkavosh", "Doq", "RoQ", "Acha", "Ucha", 
  "Hahsh", "Ashm", "Vohl", "Keth", "Mahl", "Nesh", "Thraka",
  "Kozh", "Lazh", "Vosh", "Rekh", "Soloz", "Kavash", "Nethol",
  "Azrath", "Morkh", "Vishk", "Domosh", "Kralos", "Skorn", "Vexal",
  "Zhrak", "Moloth", "Nekros", "Abyzh", "Hellok", "Demnok"
];

function preload(){
  song = loadSound("10 THRONE MIX7.mp3");
  noise = loadSound("white.mp3");
}

function getRandomWord() {
  return ozkavoshWords[Math.floor(Math.random() * ozkavoshWords.length)];
}

function setup() {
  noise.play();
  noise.setVolume(0.1);
  
  // Pick a random position for the correct button (1-20)
  var correctPosition = Math.floor(Math.random() * 20);
  
  // Create 20 buttons with random Ozkavosh words
  for (var i = 0; i < 20; i++) {
    var btn = createButton(getRandomWord());
    
    if (i === correctPosition) {
      correctButton = btn;
      correctButton.mousePressed(togglePlaying);
    }
  }
  
  // First button resets
  resetButton = createButton(getRandomWord());
  resetButton.mousePressed(toggleNoise);
}

function togglePlaying() {
  if (!song.isPlaying()) {
    song.play();
    song.setVolume(0.5);
    // Change all buttons to TELOS and make them mosh
    var allButtons = document.querySelectorAll('.p5-buttons button');
    var moshClasses = ['mosh1', 'mosh2', 'mosh3', 'mosh4'];
    
    allButtons.forEach((btn) => {
      btn.innerHTML = "TELOS";
      // Random mosh animation for each button
      var randomMosh = moshClasses[Math.floor(Math.random() * moshClasses.length)];
      btn.classList.add(randomMosh);
      // Random delay for chaos
      btn.style.animationDelay = (Math.random() * 0.2) + 's';
    });
    
    // Randomly glow up some buttons
    setInterval(() => {
      var btns = document.querySelectorAll('.p5-buttons button');
      btns.forEach((btn) => {
        if (Math.random() > 0.8) {
          btn.classList.add('glow');
        } else {
          btn.classList.remove('glow');
        }
      });
    }, 150);
    
    noise.stop();
    document.getElementById('tooltip').innerHTML = "One word ends the torment";
  } 
}

function toggleNoise() {
  if (song.isPlaying()) {
    song.pause();
    noise.play();
    noise.setVolume(0.1);
    resetButton.html(getRandomWord());
  }
}
