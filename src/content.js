/*global chrome*/

const subtitleElementId = 'video-subtitle';

const initSubtitleElement = () => {
	const roomVideo = document.getElementById('roomVideo');
	const subtitleElement = document.getElementById(subtitleElementId);
	if (subtitleElement) return subtitleElement;
	else {
		// append subtitle div into roomVideo
		const newSubtitleElement = document.createElement('div');
		newSubtitleElement.setAttribute('id', subtitleElementId);
		newSubtitleElement.style.textAlign = 'center';
		roomVideo.appendChild(newSubtitleElement);
		return newSubtitleElement;
	}
}

const renderSubtitleWhileRunningVideo = (data, subtitleElement) => {
	const video = document.getElementsByTagName('video')[0];
	video.ontimeupdate = function () {
		// get current content of subtitle
		let content = data.results.items.find(item => {
			if (video.currentTime > item.start_time && video.currentTime < item.end_time) return true;
			return false;
		});
		// assign content of subtitleElement to subtitle
		subtitleElement.textContent = content?.alternatives[0].content;
	}
}

const messagesFromReactAppListener = (message, sender) => {
	if (sender.id === chrome.runtime.id) {
		fetch('https://60c4528b2df2cb00178ac4d3.mockapi.io/api/6672/subtitle/1')
			.then(response => response.json())
			.then(data => {
				const subtitleElement = initSubtitleElement();
				renderSubtitleWhileRunningVideo(data, subtitleElement);
			})
	}
}
/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
