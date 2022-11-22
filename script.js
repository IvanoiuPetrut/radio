const url = "http://localhost:8080/song/";
const songTitle = document.querySelector(".song__title");
const songArtist = document.querySelector(".song__artist");
let songIsPlaying = false;

const musicSource = document.querySelector("#music-source");

const song = new Audio("http://localhost:8080/song/currently-playing");

const getSongDetailsJSON = async () => {
  const response = await fetch(`${url}currently-playing/details`);
  const songDetails = await response.json();
  return songDetails;
};

const getSong = async () => {
  const response = await fetch(`${url}currently-playing`);
  const data = await response.json();
  // return data;
  console.log(response);
};

let songCurrentSecond;
let songDuration;

getSongDetailsJSON().then((songDetails) => {
  const { title, artist, currentSecond, duration } = songDetails;
  songTitle.innerHTML = title;
  songArtist.innerHTML = artist;
  songCurrentSecond = currentSecond;
  songDuration = duration;
  document.querySelector(".audio__end").innerHTML = secondsToMinutes(duration);
});

document.querySelector(".audio__play").addEventListener("click", () => {
  if (songCurrentSecond) {
    songIsPlaying = true;
    song.currentTime = songCurrentSecond;
    console.log(songCurrentSecond, "start second");
    song.play();
  } else {
    // * implement HTML declaration of this message
    console.log("Song hasn't fully loaded yet");
  }
});

const secondsToMinutes = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};

const nextTick = () => {
  songCurrentSecond++;
  document.querySelector(".audio__current-time").innerHTML =
    secondsToMinutes(songCurrentSecond);
  document.querySelector(
    ".audio__length"
  ).style = `background: linear-gradient(90deg, rgba(132,29,253,1) 0%, rgba(69,237,252,1) ${isWhatPercentageOf(
    songCurrentSecond,
    songDuration
  )}%, rgba(51,51,51,1) ${isWhatPercentageOf(
    songCurrentSecond,
    songDuration
  )}%)`;
  if (songIsPlaying) {
  }
};

const isWhatPercentageOf = (firstNumber, secondNumber) => {
  return Math.floor((firstNumber / secondNumber) * 100);
};

setInterval(nextTick, 1000);
