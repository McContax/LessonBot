chrome.runtime.onInstalled.addListener(function() {
	chrome.storage.sync.set({valueRemovePause: false, valueMute: false}, function() {
		console.log("Default setting loaded");
	});
});