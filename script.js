const songs = [
  {
    title: "We Rollin",
    artist: "Shubh",
    src: "songs/we_rollin.mp3",
    cover: "covers/we_rollin.jpg"
  },
  {
    title: "Starboy",
    artist: "The Weeknd",
    src: "songs/starboy.mp3",
    cover: "covers/starboy.jpg"
  },
  {
    title: "Paranday",
    artist: "Bilal Saeed",
    src: "songs/paranday.mp3",
    cover: "covers/paranday.jpg"
  }
];

let currentSong = 0;
let isPlaying = false;
const audio = new Audio(songs[currentSong].src);

const title = document.getElementById('title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeSlider = document.getElementById('volume');
const playPauseBtn = document.getElementById('play-pause');
const playlistDiv = document.getElementById('playlist');

function loadSong(index) {
  const song = songs[index];
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;
  audio.src = song.src;
  updatePlaylist();
  if (isPlaying) audio.play();
}

function togglePlayPause() {
  if (isPlaying) {
    audio.pause();
    playPauseBtn.textContent = '▶️';
  } else {
    audio.play();
    playPauseBtn.textContent = '⏸️';
  }
  isPlaying = !isPlaying;
}

function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
}

function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
}

audio.addEventListener('timeupdate', () => {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progress.value = progressPercent || 0;
  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
});

progress.addEventListener('input', () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value;
});

audio.addEventListener('ended', () => {
  nextSong();
});

function formatTime(sec) {
  const minutes = Math.floor(sec / 60) || 0;
  const seconds = Math.floor(sec % 60) || 0;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function updatePlaylist() {
  playlistDiv.innerHTML = '';
  songs.forEach((song, index) => {
    const item = document.createElement('div');
    item.textContent = `${song.title} - ${song.artist}`;
    if (index === currentSong) {
      item.style.color = '#1db954';
    }
    item.onclick = () => {
      currentSong = index;
      loadSong(currentSong);
      audio.play();
      isPlaying = true;
      playPauseBtn.textContent = '⏸️';
    };
    playlistDiv.appendChild(item);
  });
}

loadSong(currentSong);
updatePlaylist();
