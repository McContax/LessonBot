//initialize varieties
var video, valueRemovePause, valueMute;

//retrieve the settings from storage
chrome.storage.sync.get( ['valueRemovePause','valueMute'], function(data) {
	valueRemovePause = data.valueRemovePause;
	valueMute = data.valueMute;
	console.log("是否移除暂停"+valueRemovePause);
	console.log("是否静音"+valueMute);
} );

//reload web page and settings while the popup.js send message.
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
	if (request.refreshing == true) {
		sendResponse({farewell: "goodbye"});
		location.reload();
	}
});

var timerGetButton = setInterval( getButton, 300 );
function getButton() {
	console.log("我开始重复地找寻按键元素啦");
	var buttonChangeServer = document.getElementsByClassName("vjs-playline-button")[0].childNodes[1].childNodes[0].childNodes[2];
	var buttonPlayVideo = document.getElementsByClassName("vjs-big-play-button")[0];
	console.log(buttonChangeServer);
	if ( buttonChangeServer != undefined && buttonPlayVideo != undefined) {
		clearInterval( timerGetButton );
		buttonChangeServer.click();
		buttonPlayVideo.click();
	}
}

//set a loop to repeat checking the video element, the loop will break once the video element is obtained.
var timerGetVideo = setInterval( getVideo, 300 );
function getVideo() {
	console.log("我开始重复地找寻video元素啦");
	video = document.getElementsByTagName("video")[0];
	console.log(video);
	if ( video != undefined ) {
		clearInterval( timerGetVideo );
		removePause();
		mute();
	}
}

function removePause() {
	if ( valueRemovePause ) {
		video.addEventListener("pause",function() {
			if ( !this.ended ) {
				console.log("我来强制播放啦")
				this.play();
			}
		} )
	}
}

function mute() {
	if ( valueMute ) {
		console.log("我开始mute啦");
		setInterval( function(){
			if ( video.muted == false ) {
				video.muted = true;
			}
		} ,300 );
	}
}