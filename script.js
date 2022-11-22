const url = "http://localhost:8080/song/";
const songTitle = document.querySelector(".song__title");
const songArtist = document.querySelector(".song__artist");

const musicSource = document.querySelector("#music-source");

// musicSource.src = `${url}currently-playing`;
console.log(musicSource);

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

getSongDetailsJSON().then((songDetails) => {
  const { title, artist } = songDetails;
  songTitle.innerHTML = title;
  songArtist.innerHTML = artist;
});
