/*global chrome*/

const messagesFromReactAppListener = (message, sender) => {

	if (sender.id === chrome.runtime.id) {
		const roomVideo = document.getElementById('roomVideo');
		const video = document.getElementsByTagName('video')[0];
		// append subtitle div into roomVideo
		let div = document.createElement('div');
		div.setAttribute('id', 'video-subtitle');
		div.style.textAlign = 'center';
		roomVideo.appendChild(div);

		video.ontimeupdate = function () {
			// get current content of subtitle
			let content = message.script.results.items.find(item => {
				if (video.currentTime > item.start_time && video.currentTime < item.end_time) return true;
				return false;
			});
			// assign content of div to subtitle
			div.textContent = content?.alternatives[0].content;
		}
	}
}

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
