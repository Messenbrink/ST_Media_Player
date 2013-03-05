volumeSlider.value = player.volume;

var sources = new Array();
sources[0] = '<source src="_media-files/Tales480p.mp4" type="video/mp4">\n<source src="_media-files/Tales480p.ogv" type="video/ogv">\n<source src="_media-files/Tales480p.webm" type="video/webm">';
sources[1] = '<source src="_media-files/Tales720p.mp4" type="video/mp4">\n<source src="_media-files/Tales720p.ogv" type="video/ogv">\n<source src="_media-files/Tales720p.webm" type="video/webm">';

playButton.addEventListener("click", 
    function(){
        if(player.paused){
            player.play();
        } else {
            player.pause();
        }
});

player.addEventListener("click", function(){
    if(player.paused){
            player.play();
        } else {
            player.pause();
        }
});

smallScreenButton.addEventListener("click", function(){
    player.width = "640";
    player.height = "360";
});

bigScreenButton.addEventListener("click", function(){
    player.width = "960";
    player.height = "540";
});

player.addEventListener("timeupdate", function(){
    var value = (100 / player.duration) * player.currentTime;
    seekBar.value = value;
});

stopButton.addEventListener("click", 
    function(){
        player.pause();
        player.currentTime = 0;
});

volumeSlider.addEventListener("change", 
    function(){
        player.volume = volumeSlider.value;
});

player.addEventListener("canplay", 
    function(){
        playButton.disabled = false;
        stopButton.disabled = false;
        volumeSlider.disabled = false;
        playButton.innerHTML = "Play";
});



fullscreenButton.addEventListener("click", function(){
    if(player.requestFullscreen){
        player.requestFullscreen();
    } else if(player.mozRequestFullScreen){
        player.mozRequestFullScreen();
    } else if(player.webkitRequestFullscreen){
        player.webkitRequestFullscreen();
    }
});

seekBar.addEventListener("change", function(){
    var time = player.duration * (seekBar.value / 100);
    player.currentTime = time;
    
});

player.addEventListener("play", 
    function(){
        playButton.innerHTML = "Pause";
});

player.addEventListener("pause", 
    function(){
        playButton.innerHTML = "Play";
});

function changeRes(){
    var currentTime = player.currentTime;
    var selectBox = document.getElementById("resolution");
    var selected_value = selectBox.options[selectBox.selectedIndex].value;                
   
    if(selected_value == 480){
        player.innerHTML = sources[0];
        
    } else if(selected_value == 720){
        player.innerHTML = sources[1];
        
    } else {
        player.innerHTML = sources[0]; 
    }
    
    player.addEventListener('loadedmetadata', function(){
        this.currentTime = currentTime;
    }, false);
    
    player.load();                
    player.play();
}

function initPlayer(){
    player.style.backgroundColor = "#000"; 
    player.innerHTML = sources[0];             
    player.load();
                   
}
            
initPlayer();
