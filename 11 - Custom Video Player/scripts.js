var video = document.querySelector('.player__video');
var isPlaying = false;
var playButtons = document.querySelector(".player__controls");
var progressBar = document.querySelector('.progress__filled');
var progress = document.querySelector('.progress');
console.log(progressBar);

playButtons.addEventListener('click', (e) =>{
  if (e.toElement.className.includes('player__button')) {
    controlVideo(e.toElement);
  }
});

playButtons.addEventListener('mousemove', (e) =>{
  if (e.buttons && e.toElement.className.includes('player__slider')){
    controlSliders(e.toElement);
  }
  if (e.buttons && e.toElement.className.includes('progress')){
    controlProgress(e);
  }
});
function controlSliders(control){
  video[control.name] = control.value;
}
function controlProgress(control){
  console.log(control.offsetX)
  video.currentTime = (control.offsetX / progress.offsetWidth) * video.duration;
}

function progressUpdate(){
  setInterval(()=> {
  progressBar.style.flexBasis = `${100 * video.currentTime / video.duration}%`
}, 100)
}

function controlVideo(control){
  if (control.className === 'player__button toggle') {
    isPlaying ? video.pause() : video.play();
    isPlaying = !isPlaying;
    control.textContent = isPlaying ? '❚ ❚' :  '►' ;
    isPlaying ? progressUpdate() : clearInterval(progressUpdate);
  } else if (control.className === 'player__button') {
    console.log(control);
    video.currentTime += Number(control.dataset.skip);
  }
}

