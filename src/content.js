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

const handleDisplaySubtitle = (data) => {
	const subtitleElement = document.getElementById(subtitleElementId);
	if (subtitleElement) subtitleElement.style.visibility = 'visible';
	else {
		const subtitleElement = initSubtitleElement();
		renderSubtitleWhileRunningVideo(data, subtitleElement);
	}
}

const handleHideSubtitle = () => {
	const subtitleElement = document.getElementById(subtitleElementId);
	if (subtitleElement) subtitleElement.style.visibility = 'hidden';
}

const handleGetSubtitleStatus = () => {
	const subtitleElement = document.getElementById(subtitleElementId);
	if (subtitleElement && subtitleElement.style.visibility !== 'hidden') return true;
	return false;
}

const messagesFromReactAppListener = (message, sender, response) => {
	const { isShowSubtitle, data, getSubtitleStatus } = message;

	if (sender.id !== chrome.runtime.id) return;
	if (getSubtitleStatus) {
		response(handleGetSubtitleStatus());
		return;
	}
	if (isShowSubtitle) handleDisplaySubtitle(data);
	else handleHideSubtitle();
}
/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
