/*global chrome*/
import React, { useEffect, useState } from 'react';
import { Header, Warning, Actions, Footer } from './components';
import './App.css';

const App = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [isShowSubtitle, setIsShowSubtitle] = useState(true);
	const queryInfo = {
		active: true,
		currentWindow: true
	};

	useEffect(() => {
		chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
			const currentTabId = tabs[0].id;
			const message = {
				getSubtitleStatus: true
			}
			// send message to content script
			chrome.tabs.sendMessage(currentTabId, message, (response) => {
				setIsShowSubtitle(response)
			});
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const onDisplaySubtitle = () => {
		setIsLoading(true);

		chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
			const currentTabId = tabs[0].id;
			// get classId
			const classId = tabs[0].url.split('/').reduce((acc, cur) => {
				if (Number.isInteger(+cur)) return cur;
				return acc;
			}, '');
			// fetch subtitle from server with classId
			fetch(`https://60c4528b2df2cb00178ac4d3.mockapi.io/api/${classId}/subtitle/1`)
				.then(response => response.json())
				.then(data => {
					setIsLoading(false);
					setIsShowSubtitle(true);
					const message = {
						data,
						isShowSubtitle: true
					}
					// send message to content script
					chrome.tabs.sendMessage(currentTabId, message);
				});

		})
	};

	const onHideSubtitle = () => {
		setIsShowSubtitle(false);

		chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
			const currentTabId = tabs[0].id;
			const message = {
				isShowSubtitle: false
			}
			// send message to content script
			chrome.tabs.sendMessage(currentTabId, message);
		});
	};

	return (
		<div className="App">
			<Header />
			<Warning />
			<Actions
				isLoading={isLoading}
				onDisplaySubtitle={onDisplaySubtitle}
				onHideSubtitle={onHideSubtitle}
				isShowSubtitle={isShowSubtitle}
			/>
			<Footer />
		</div>
	);
};

export default App;
