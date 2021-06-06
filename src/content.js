/*global chrome*/

const messagesFromReactAppListener = (message, sender) => {

	if (sender.id === chrome.runtime.id) {
		// const discussion = document.getElementById('discussion_bucket');
		const video = document.getElementsByTagName('video');
		const currentTime = video[0].currentTime;
		// video[0].style.display = 'none';
		// setInterval(() => console.log('running'), 1000);
		const content = message.script.results.items.find(item => {
			if (currentTime > item.start_time && currentTime < item.end_time)	return true;
			return false;
		});
		let div = document.createElement("div")
		div.textContent = content.alternatives[0].content;
		const roomVideo = document.getElementById('roomVideo');
		roomVideo.appendChild(div);
		// video[0].parentElement.removeChild(newChild);
	}

	// if (
	// 	sender.id === chrome.runtime.id &&
	// 	message.message === "delete logo") {
	// 	const logo = document.getElementById('hplogo');
	// 	logo.parentElement.removeChild(logo)
	// }
}

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
