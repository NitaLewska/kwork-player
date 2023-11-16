const tracks = [
    {
        trackName: "Forever and a Day",
        bandName: "Blackbriar",
        cover: "src/covers/blackbriar_forever_and_a_day.jfif",
        trackPath: "./tracks/Blackbriar - Forever and a Day.mp3"
    },
    {
        trackName: "Lilith Be Gone",
        bandName: "Blackbriar",
        cover: "src/covers/blackbriar_the_cause_of_shipwreck.jfif",
        trackPath: "./tracks/Blackbriar - Lilith Be Gone.mp3"
    },
    {
        trackName: "Cyberpunk 2077",
        bandName: "Vinnie Dixie",
        cover: "src/covers/cyberpunk.jfif",
        trackPath: "./tracks/Vinnie Dixie - Cyberpunk 2077.mp3"
    }
]

let currentTrack = 0;
let playing = false

let audio = document.querySelector(".audio_player__audio")
let fullTime = document.querySelector('p.audio_player__full_time')
let currentTime = document.querySelector('p.audio_player__current_time')

function refreshPlayer() {
    audio.src = tracks[currentTrack].trackPath;
    audio.onloadedmetadata = function () {
        fullTime.innerHTML = secondsToClock(audio.duration)
        progressBar.max = audio.duration
    };
}

refreshPlayer()

function playAudio() {
    audio.play();
    setInterval(refreshTime, 500)
}

function pauseAudio() {
    audio.pause();
}

function togglePlay() {
    if (playing) {
        pauseAudio()
        playing = false
        playButton.classList.remove('pause')
        topPanel.classList.remove('pause')
    } else {
        playAudio()
        playing = true
        playButton.classList.add('pause')
    }
}

function nextTrack() {
    currentTrack = currentTrack === (tracks.length - 1) ? 0 : currentTrack + 1
    refreshPlayer()
    if (playing) {
        playAudio()
    }
}

function previousTrack() {
    currentTrack = currentTrack === 0 ? tracks.length - 1 : currentTrack - 1
    refreshPlayer()
    if (playing) {
        playAudio()
    }
}

function secondsToClock(time) {
    let minutes = "" + Math.floor(time / 60)
    let seconds = "" + Math.floor(time % 60)
    seconds = seconds.length < 2 ? '0' + seconds : seconds
    return `${minutes}:${seconds}`
}

let progressBar = document.querySelector('.audio_player__progress_bar')

function refreshTime() {
    currentTime.innerHTML = secondsToClock(audio.currentTime)
    progressBar.value = audio.currentTime
    progressBar.style.setProperty('--progressBar', `${progressBar.value / audio.duration * 100}%`)
    if (audio.currentTime === audio.duration) {
        nextTrack()
    }
}

let playButton = document.querySelector(".audio_player__play")
playButton.addEventListener('click', togglePlay)

let nextButton = document.querySelector(".audio_player__next")
nextButton.addEventListener('click', nextTrack)

let previousButton = document.querySelector(".audio_player__previous")
previousButton.addEventListener('click', previousTrack)

let volume = document.querySelector("input.audio_player__volume");
let mute = document.querySelector('.audio_player__volume_img');

volume.addEventListener("input", function (e) {
    audio.volume = e.currentTarget.value / 100;
    if (audio.volume === 0) {
        mute.classList.add('mute')
        audio.volume = currentVolumelevel
    } else (
        mute.classList.remove('mute')
    )
})

mute.addEventListener('click', toggleVolume);

let currentVolumelevel;

function toggleVolume() {
    if (audio.volume === 0) {
        audio.volume = currentVolumelevel
        mute.classList.remove('mute')
    } else {
        currentVolumelevel = audio.volume;
        audio.volume = 0;
        mute.classList.add('mute')
    };
}

function changeProgressBar() {
    audio.currentTime = progressBar.value;
    currentTime.innerHTML = secondsToClock(audio.currentTime)
    progressBar.style.setProperty('--progressBar', `${progressBar.value / audio.duration * 100}%`)
}

progressBar.addEventListener("input", changeProgressBar);
