// Variables globals
let songs = [];  // Array per emmagatzemar les cançons carregades des del fitxer JSON
let currentSongIndex = 0;  // Índex de la cançó actual
let isPlaying = false;  // Estat de reproducció (fals per defecte)

// Elements del DOM
const playButton = document.getElementById('playBtn');  // Botó de reproducció/pausa
const prevButton = document.getElementById('previousBtn');  // Botó per la cançó anterior
const nextButton = document.getElementById('nextBtn');  // Botó per la següent cançó
const volumeRange = document.getElementById('volumeRange');  // Slider per ajustar el volum
const volumeDisplay = document.getElementById('volumeDisplay');  // Element per mostrar el valor del volum
const coverImg = document.getElementById('cover');  // Imatge de la portada de l'àlbum
const songName = document.getElementById('songName');  // Element per mostrar el nom de la cançó
const artistName = document.getElementById('artist');  // Element per mostrar el nom de l'artista
const duration = document.getElementById('duration');  // Element per mostrar la durada de la cançó
const audioPlayer = document.getElementById('audioPlayer');  // Element de l'àudio HTML

// Carregar les cançons des del fitxer JSON
fetch('songs.json')
    .then(response => response.json())  // Carregar el fitxer JSON
    .then(data => {
        songs = data;  // Assignar les cançons carregades a l'array 'songs'
        loadSong(currentSongIndex);  // Carregar la primera cançó
    })
    .catch(error => console.error('Error al cargar las canciones:', error));  // Manejar errors de càrrega

// Funció per carregar una cançó
function loadSong(songIndex) {
    const song = songs[songIndex];  // Obtenir la cançó de l'índex especificat
    songName.textContent = song.name;  // Actualitzar el nom de la cançó
    artistName.textContent = song.artist;  // Actualitzar el nom de l'artista
    coverImg.src = song.img;  // Actualitzar la imatge de la portada
    audioPlayer.src = song.path;  // Actualitzar la font de l'àudio
    resetPlayState();  // Restablir l'estat de reproducció
}

// Funció per restablir l'estat de reproducció
function resetPlayState() {
    isPlaying = false;  // Restablir l'estat de reproducció
    playButton.textContent = 'play_circle';  // Actualitzar la icona del botó de reproducció
    coverImg.classList.remove('rotating');  // Eliminar la classe d'animació
    coverImg.style.animationPlayState = 'paused';  // Pausar l'animació
}

// Funció per reproduir o pausar la cançó
function playPause() {
    if (isPlaying) {
        audioPlayer.pause();  // Pausar la reproducció si està sonant
        playButton.textContent = 'play_circle';  // Actualitzar la icona del botó a 'play'
        coverImg.style.animationPlayState = 'paused';  // Pausar l'animació de la portada
    } else {
        audioPlayer.play();  // Reproduir l'àudio si està pausat
        playButton.textContent = 'pause_circle';  // Actualitzar la icona del botó a 'pause'
        coverImg.classList.add('rotating');  // Afegir la classe d'animació
        coverImg.style.animationPlayState = 'running';  // Continuar l'animació
    }
    isPlaying = !isPlaying;  // Invertir l'estat de reproducció
}

// Funció per actualitzar el volum
function updateVolume() {
    audioPlayer.volume = volumeRange.value / 100;  // Actualitzar el volum de l'àudio
    volumeDisplay.textContent = volumeRange.value;  // Mostrar el valor actual del volum
}

// Funció per actualitzar la durada de la cançó
function updateDuration() {
    const minutes = Math.floor(audioPlayer.currentTime / 60);  // Calcular els minuts de la cançó
    const seconds = Math.floor(audioPlayer.currentTime % 60).toString().padStart(2, '0');  // Calcular els segons i formatar-los
    duration.textContent = `${minutes}:${seconds}`;  // Actualitzar el text de durada
}

// Funció per passar a la següent cançó
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;  // Incrementar l'índex de la cançó de manera circular
    loadSong(currentSongIndex);  // Carregar la següent cançó
}

// Funció per passar a la cançó anterior
function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;  // Decrementar l'índex de la cançó de manera circular
    loadSong(currentSongIndex);  // Carregar la cançó anterior
}

// Assignar esdeveniments als botons i altres elements
playButton.addEventListener('click', playPause);  // Assignar l'event de click al botó de reproducció/pausa
volumeRange.addEventListener('input', updateVolume);  // Assignar l'event de canvi al slider de volum
audioPlayer.addEventListener('timeupdate', updateDuration);  // Actualitzar la durada mentre es reprodueix la cançó
nextButton.addEventListener('click', nextSong);  // Assignar l'event de click al botó de següent cançó
prevButton.addEventListener('click', prevSong);  // Assignar l'event de click al botó de cançó anterior