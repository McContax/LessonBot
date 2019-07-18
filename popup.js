var valueRemovePause, valueMute;
chrome.storage.sync.get(['valueRemovePause','valueMute'], function(data) {
	valueRemovePause = data.valueRemovePause;
	valueMute = data.valueMute;
	console.log( valueRemovePause );
	console.log( valueMute );
});
window.onload = function() {
	var checkboxRemovePause = document.getElementsByTagName("input")[0];
	var checkboxMute = document.getElementsByTagName("input")[1];

	if ( valueRemovePause ) {
		checkboxRemovePause.checked = true ;
	} else {
		checkboxRemovePause.checked = false;
	}

	if ( valueMute ) {
		checkboxMute.checked = true ;
	} else {
		checkboxMute.checked = false ;
	}

	document.getElementById("save-button").addEventListener("click", saveSettings);
	document.getElementById("github-link").addEventListener("click", openGithubPage);

	function saveSettings() {
		chrome.storage.sync.set({valueRemovePause: checkboxRemovePause.checked, valueMute: checkboxMute.checked}, function() {
			console.log("settings saved!");
		});

		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {refreshing: true}, function(response) {
				console.log(response.farewell);
			});
		});


	}
	function openGithubPage() {
		chrome.tabs.create({url: "https://github.com/McContax"});
	}
};