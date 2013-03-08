/*global document: false */

var currentVideo = 'tales';
var videoWindowBig = false;
var autoplay = false;
var video_wrapper_big = false;
var tmpVolume;

//DEFINE ELEMENTS
var volumeSlider = document.getElementById('volumeSlider');
var player = document.getElementById('player');
var autoplayButton = document.getElementById('autoplayButton');
var playlist = document.getElementById('playlist');
var resolution = document.getElementById('resolution');
var video_player = document.getElementById('video_player');
var video_controls = document.getElementById('video_controls');
var playlistButton = document.getElementById('playlistButton');
var volumeButton = document.getElementById('volumeButton');
var volumeSlider = document.getElementById('volumeSlider');
var stopButton = document.getElementById('stopButton');
var playButton = document.getElementById('playButton');
var seekBar = document.getElementById('seekBar');
var toggleSizeButton = document.getElementById('toggleSizeButton');
var fullscreenButton = document.getElementById('fullscreenButton');




var sources = {
    tales:  {480: '<source src="http://www.messenbrink.eu/Film/Filmography/Movies/Files/Tales/Tales480p.mp4" type="video/mp4">\n<source src="http://www.messenbrink.eu/Film/Filmography/Movies/Files/Tales/Tales480p.ogv" type="video/ogv">\n<source src="http://www.messenbrink.eu/Film/Filmography/Movies/Files/Tales/Tales480p.webm" type="video/webm">', 720:'<source src="http://www.messenbrink.eu/Film/Filmography/Movies/Files/Tales/Tales720p.mp4" type="video/mp4">\n<source src="http://www.messenbrink.eu/Film/Filmography/Movies/Files/Tales/Tales720p.ogv" type="video/ogv">\n<source src="http://www.messenbrink.eu/Film/Filmography/Movies/Files/Tales/Tales720p.webm" type="video/webm">'},
    thehut: {480: '<source src="http://www.messenbrink.eu/Film/Filmography/Movies/Files/Hut/MovieFiles/Hut480p.mp4" type="video/mp4">\n<source src="http://www.messenbrink.eu/Film/Filmography/Movies/Files/Hut/MovieFiles/Hut480p.ogv" type="video/ogv">\n<source src="http://www.messenbrink.eu/Film/Filmography/Movies/Files/Hut/MovieFiles/Hut480p.webm" type="video/webm">', 1080 :'<source src="http://www.messenbrink.eu/Film/Filmography/Movies/Files/Hut/MovieFiles/Hut720p.mp4" type="video/mp4">\n<source src="http://www.messenbrink.eu/Film/Filmography/Movies/Files/Hut/MovieFiles/Hut720p.ogv" type="video/ogv">\n<source src="http://www.messenbrink.eu/Film/Filmography/Movies/Files/Hut/MovieFiles/Hut720p.webm" type="video/webm">'},
    ildsjaele: {480: '<source src="http://www.messenbrink.eu/Film/Aarhus_Festuge_2012_480p.mp4" type="video/mp4">\n', 720: '<source src="http://www.messenbrink.eu/Film/Aarhus_Festuge_2012_720p.mp4" type="video/mp4">\n'}
};

volumeSlider.value = player.volume;

function videoMouseOut() {
    "use strict";
    var controls = document.getElementById('video_controls');
    controls.style.display = 'none';
}

function videoMouseIn() {
    "use strict";
    var controls = document.getElementById('video_controls');
    controls.style.display = 'block';
}

autoplayButton.addEventListener("click", function () {
    "use strict";
    if (!autoplay) {
        autoplay = true;
        autoplayButton.style.backgroundImage = 'url("_icons/autoplay_on.png")';
    } else {
        autoplay = false;
        autoplayButton.style.backgroundImage = 'url("_icons/autoplay_off.png")';
    }
});

function findKey(targetKey) {
    var i = 0;
    var nkey;
    for (nkey in sources) {
        if (nkey === targetKey) {
            return i;
        } else {
            i++;
        }
    }
}


function initPlayList() {
    "use strict";
    var playlistItems = {};
    var i;
    playlistItems = document.getElementById('itemWrapper').getElementsByTagName('*');
    
    for (i = 0; i < playlistItems.length; i++) {
        playlistItems[i].addEventListener("click", function () {
            playlist.style.display = "none";
        });
    }
}

function lengthOfObject(object) {
    
    var i = 0;
    var key;
    for (key in object) {
        i++;
    }
    return i;
}

resolution.addEventListener("click", function () {
    if (!video_wrapper_big) {
        
        if (video_player.style.height == '540px') {
           video_player.style.height = '580px';
        } else {
            video_player.style.height = '400px'; 
        }
        
        video_controls.style.marginBottom = "40px";
        video_wrapper_big = true;
    }
    
});

function resMouseOut() {
    if (video_wrapper_big) {
        if (video_player.style.height == '580px') {
            video_player.style.height = '540px';
        } else if(video_player.style.height == '400px'){
            
            video_player.style.height = '360px';
        }
        video_controls.style.marginBottom = "0";
        
    }
    video_wrapper_big = false;
}


function findAliasByKey(targetKey) {
    var i = 0;
    if (targetKey < lengthOfObject(sources)) {
        var key;
        for (key in sources) {
            if (i === targetKey) {
                return key;
            } else {
                i++;
            }
        }
    } else {
        return findAliasByKey(0);
    }
}

player.addEventListener("ended", function () {
    var currentVidIndex = findKey(currentVideo);
    var nextVid = findAliasByKey(currentVidIndex + 1);
    if (autoplay) {       
        if (sources[nextVid] !== undefined) {
            changeSource(nextVid);    
        } else {
            changeSource(sources[findAliasByKey(0)]);    
        }
    } else {
        player.pause();
    }
});


playButton.addEventListener("click",
    function() {
        if (player.paused) {
            player.play();
            playButton.style.backgroundImage = 'url("_icons/pause.png")';
        } else {
            player.pause();
            playButton.style.backgroundImage = 'url("_icons/play.png")';
        }
});

player.addEventListener("click", function() {
    if (player.paused) {
            player.play();
        } else {
            player.pause();
        }
});

volumeButton.addEventListener("click", function() {
    if (player.volume !== 0) {
        tmpVolume = player.volume;
        volumeSlider.value = 0;
        player.volume = 0;
        volumeButton.style.backgroundImage = 'url("_icons/volume_off.png")';
    } else {
        volumeSlider.value = tmpVolume;
        player.volume = tmpVolume;
        volumeButton.style.backgroundImage = 'url("_icons/volume.png")';
    }
});

function volumeOver() {
    var volumeSlider = document.getElementById("volumeSlider");
    volumeSlider.style.display = "inline";
   
}

function volumeOut() {
    var volumeSlider = document.getElementById("volumeSlider");
    volumeSlider.style.display = "none";
}

playlistButton.addEventListener("click", function () {
    var playlist = document.getElementById("playlist");
    if (playlist.style.display === "block") {
        playlist.style.display = "none";
    } else {
        playlist.style.display = "block";
    }

});

toggleSizeButton.addEventListener("click", function() {
    if (!videoWindowBig) {
        videoWindowBig = true;
        video_player.style.width = '960px';
        video_player.style.height = '540px';
        player.width = '960';
        player.height = '540';
        seekBar.style.width = '600px';
        video_player.style.margin = '-270px auto';
    } else {
        videoWindowBig = false;
        video_player.style.width = '640px';
        video_player.style.height = '360px';
        player.width = '640';
        player.height = '360';
        seekBar.style.width = '280px';
        video_player.style.margin = '-180px auto';
    }    
});

player.addEventListener("timeupdate", function() {
    var value = (100 / player.duration) * player.currentTime;
    seekBar.value = value;
});

stopButton.addEventListener("click", 
    function () {
        player.pause();
        player.currentTime = 0;
        playButton.style.backgroundImage = 'url("_icons/play.png")';
});

volumeSlider.addEventListener("change", 
    function() {
        player.volume = volumeSlider.value;
});

player.addEventListener("canplay", 
    function() {
        playButton.disabled = false;
        stopButton.disabled = false;
        volumeSlider.disabled = false;
        
});

fullscreenButton.addEventListener("click", function() {
    if (player.requestFullscreen) {
        player.requestFullscreen();
    } else if (player.mozRequestFullScreen) {
        player.mozRequestFullScreen();
    } else if (player.webkitRequestFullscreen) {
        player.webkitRequestFullscreen();
    }
});

seekBar.addEventListener("change", function() {
    var time = player.duration * (seekBar.value / 100);
    player.currentTime = time;    
});

function getSelectedRes() {
    var selectBox = document.getElementById("resolution");
    var selected_value = selectBox.options[selectBox.selectedIndex].value;
    
    return selected_value;
}

function changeSource(title) {
    if (sources[title] != undefined) {
        player.pause();
        currentVideo = title;
        initPlayer();
        player.play();
        playButton.style.backgroundImage = 'url("_icons/pause.png")';
    } else {
        console.log("YOU SUCK AT CHANGING STUFF");
    }
}


function initResButtons() {
    var selectBox = document.getElementById("resolution");
    selectBox.innerHTML = "";
    
    var key;
    for(key in sources[currentVideo]) {
        selectBox.innerHTML += '<option value="' + key + '">' + key + 'p</option>';
    }
    
}

function changeRes() {
    var currentTime = player.currentTime;
    var selected_value = getSelectedRes();
    
    if (sources[currentVideo][selected_value] != undefined) {
        player.innerHTML = sources[currentVideo][selected_value];
    } else {
        alert('Video is currently unavailable! Please try again later');
    }
    
    player.addEventListener('loadedmetadata', function() {
        this.currentTime = currentTime;
    }, false);
    
    player.load();                
    player.play();
}

function initPlayer() {
    player.style.backgroundColor = "#000"; 
    player.innerHTML = sources[currentVideo][480];             
    player.load();
    initResButtons();
    
}

//Starts the player
initPlayList();
initPlayer();

console.log(autoplay);
