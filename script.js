const playListContainerTag = document.getElementsByClassName('playListContainer')[0];
const audioTag = document.getElementsByClassName("audioTag")[0];
const currentAndTotalTimeTag = document.getElementsByClassName("currentAndTotalTime")[0];
const previousBtnTag = document.getElementsByClassName("previousBtn")[0];
const playBtnTag = document.getElementsByClassName("playBtn")[0];
const pauseBtnTag = document.getElementsByClassName("pauseBtn")[0];
const nextBtnTag = document.getElementsByClassName("nextBtn")[0];
const currentProgressTag = document.getElementsByClassName("currentProgress")[0];
const tracks = [
    {trackId:"music/El Phyu .mp3" , title:"အယ်ဖြူ နောက်ဆုံး"},
    {trackId:"music/AlanWalker.mp3" , title:"Lost Control Alan Walker"},
    {trackId:"music/Htoo Eain Thin.mp3" , title:"Htoo Eain Thin"},
    {trackId:"music/Lay Phyu.mp3" , title:"lay phyu အသည်းကွဲသီးချင်းသစ်"},
    {trackId:"music/Jewelmp3.mp3" , title:"Jewl"},
    {trackId:"music/mother.mp3" , title:"အမေ တစ်ခု သားတစ်ခု"},
    {trackId:"music/The Ants.mp3" , title:"သီချင်းများနဲ.ကခုန်ခြင်း"},
    {trackId:"music/TheAnts.mp3" , title:"သီချင်းဆိုင်"}
];
for (let i = 0; i<tracks.length; i++) {
    const trackTag = document.createElement("div");
    trackTag.addEventListener("click",()=>{
        trackId = tracks[i].trackId;
        audioTag.src = trackId;
        audioTag.play();
        isPlaying = true;
        updatePlayAndPauseBtn();
        currentPlayingIndex = i;
    });
    pauseBtnTag.addEventListener("click",()=> {
        audioTag.pause();
        isPlaying = false;
        updatePlayAndPauseBtn();
    });
    trackTag.classList.add("trackItem");
    const title = (i+0).toString() + ". " + tracks[i].title;
    trackTag.textContent = title;
    playListContainerTag.append(trackTag);
    audioTag.addEventListener('ended', function() {
        trackId = tracks[1 + i].trackId;
        audioTag.src = trackId;
        audioTag.play();
    },false);
}
let duration = 0;
let durationText = "";
let isPlaying = false;
audioTag.addEventListener("loadeddata",()=> {
    duration = Math.floor(audioTag.duration);
    durationText = createMinuteAndSecond(duration);
});

audioTag.addEventListener("timeupdate", ()=> {
const currentTime = Math.floor(audioTag.currentTime);
const currentText = createMinuteAndSecond(currentTime);
const totalCurrentTimeAndDuration = currentText + " / " + durationText;
currentAndTotalTimeTag.textContent = totalCurrentTimeAndDuration;
updateCurrentProgress(currentTime);
});

const updateCurrentProgress = (currentTime) => {
    const currentProgressWidth = (400/duration)*currentTime;
    currentProgressTag.style.width = currentProgressWidth + "px";
};
const createMinuteAndSecond = (totalSecond) => {
    const minutes = Math.floor(totalSecond/60);
    const seconds = totalSecond%60;
    const minuteText = minutes<10 ? "0" + minutes.toString() : minutes;
    const secondText = seconds < 10 ? "0" + seconds.toString() : seconds;
    return minuteText + ":" + secondText;
};

const updatePlayAndPauseBtn = ()=> {
    if(isPlaying) {
        pauseBtnTag.style.display = "inline";
        playBtnTag.style.display = "none";
    }else {
        pauseBtnTag.style.display = "none";
        playBtnTag.style.display = "inline";
    }
}
let currentPlayingIndex = 0;
playBtnTag.addEventListener("click",()=> {
    const currentTime = Math.floor(audioTag.currentTime);
    isPlaying = true;
    if(currentTime == 0) {
        const firstSongId = tracks[currentPlayingIndex].trackId;
        audioTag.src = firstSongId;
        audioTag.play();
        updatePlayAndPauseBtn();
    }else {
        audioTag.play();
        updatePlayAndPauseBtn();
    }
});
previousBtnTag.addEventListener("click",function(){
    if(currentPlayingIndex === 0){
        return
    }else{
        currentPlayingIndex -=1;
        const songIdToPlay = tracks[currentPlayingIndex].trackId;
        audioTag.src = songIdToPlay;
        audioTag.play();
        isPlaying = true;
        updatePlayAndPauseBtn();
    }
});
nextBtnTag.addEventListener("click",function(){
    if(currentPlayingIndex === tracks.length -1){
        return
    }else{
        currentPlayingIndex +=1;
        const songIdToPlay = tracks[currentPlayingIndex].trackId;
        audioTag.src = songIdToPlay;
        audioTag.play();
        isPlaying = true;
        updatePlayAndPauseBtn();
    }
});