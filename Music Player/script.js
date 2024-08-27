const audio = new Audio();
const playPauseBtn = document.getElementById('play-pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const timeline = document.getElementById('timeline');
const currentTimeElement = document.getElementById('current-time');
const songTitleElement = document.getElementById('song-title');
const songArtistElement = document.getElementById('song-artist');
const songCoverElement = document.getElementById('song-cover');

const songs = [
  { title: 'Faded', artist: 'Alan Walker', file: 'Music/faded-Alan Walker.mp3', cover: 'Cover Images/Faded.jpg' },
  { title: 'Unstoppable', artist: 'Sia', file: 'Music/Unstoppable-Sia.mp3', cover: 'Cover Images/Unstoppable.jpg' },
  { title: 'Set Fire To the Rain', artist: 'Adele', file: 'Music/Set Fire To the Rain-Adele.m4a', cover: 'Cover Images/Set Fire to the Rain.jpg' },
  { title: 'Love The Way You Lie', artist: 'Eminem [ft.Rihanna]', file: 'Music/Love The Way You Lie-Rihana[feat. Eminem].mp3', cover: 'Cover Images/Love the Way you Lie.jpg' },
];

let currentSongIndex = 0;
let isPlaying = false;

loadSong(currentSongIndex);

playPauseBtn.addEventListener('click', () => {
  if (isPlaying) {
    audio.pause();
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    isPlaying = false;
  } else {
    audio.play();
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    isPlaying = true;
  }
});

prevBtn.addEventListener('click', () => {
  currentSongIndex--;
  if (currentSongIndex < 0) {
    currentSongIndex = songs.length - 1;
  }
  loadSong(currentSongIndex);
});

nextBtn.addEventListener('click', () => {
  currentSongIndex++;
  if (currentSongIndex >= songs.length) {
    currentSongIndex = 0;
  }
  loadSong(currentSongIndex);
});

audio.addEventListener('loadedmetadata', () => {
  timeline.max = audio.duration;

  timeline.addEventListener('input', () => {
    audio.currentTime = timeline.value;
  });
});

audio.addEventListener('timeupdate', () => {
  timeline.value = audio.currentTime;
  const currentTime = formatTime(audio.currentTime);
  currentTimeElement.textContent = currentTime;
});

audio.addEventListener('ended', () => {
  nextBtn.click();
});

function loadSong(songIndex) {
  audio.src = songs[songIndex].file;
  songTitleElement.textContent = songs[songIndex].title;
  songArtistElement.textContent = songs[songIndex].artist;
  songCoverElement.src = songs[songIndex].cover;
  audio.play();
  isPlaying = true;
  playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}