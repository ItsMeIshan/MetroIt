class Metronome {
  constructor() {
    this.playBtn = document.querySelector(".play");
    this.pads = document.querySelectorAll(".pad");
    this.tempo = document.querySelector(".tempo-slider");
    this.metronomeAudio = document.querySelector(".metroAudio");
    this.bpm = 150;
    this.index = 0;
    this.isPlaying = null;
  }
  //creating our loop
  repeat() {
    let step = this.index % 8;
    const notes = document.querySelectorAll(`.b${step}`);
    notes.forEach((note) => {
      note.style.animation = "anim 0.3s alternate ease-in-out";
      this.metronomeAudio.play();
      this.metronomeAudio.currentTime = 0;
    });
    this.index++;
  }
  start() {
    let interval = (60 / this.bpm) * 1000;
    if (!this.isPlaying) {
      this.isPlaying = setInterval(() => {
        this.repeat();
        this.playBtn.innerText = "Stop"; //here we changed the text of button
      }, interval);
    } else {
      clearInterval(this.isPlaying);
      this.playBtn.innerText = "Play";
      this.isPlaying = null;
    }
  }
  changeTempo(e) {
    //here we reset everything according to tempo and invoked the start() again so that bpm would reset
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    this.start();
  }
  changeText(e) {
    let tempoNr = document.querySelector(".tempo-nr");
    tempoNr.innerText = e.target.value;
    this.bpm = e.target.value;
  }
}
//object: myMetron
const myMetron = new Metronome();

//event listeners
myMetron.playBtn.addEventListener("click", function () {
  myMetron.start();
});
myMetron.pads.forEach((pad) => {
  pad.addEventListener("animationend", function () {
    pad.style.animation = "";
  });
});
myMetron.tempo.addEventListener("input", function (e) {
  myMetron.changeText(e);
});
myMetron.tempo.addEventListener("change", function (e) {
  myMetron.changeTempo(e);
});
