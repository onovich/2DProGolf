import './view/styles/game.css';
import { initGame } from './logic/engine/gameEngine';
import { renderAppShell } from './view/screens/appShell';

const app = document.getElementById('app');
const SAVE_STORAGE_KEY = '2d-pro-golf-save-slot-v1';

app.innerHTML = renderAppShell();

const uiState = {
	controller: null,
	hasLiveSession: false,
	toastTimer: null,
};

const elements = {
	gameShell: document.getElementById('game-shell'),
	titleScreen: document.getElementById('title-screen'),
	systemMenu: document.getElementById('system-menu'),
	systemSaveStatus: document.getElementById('system-save-status'),
	titleNewGame: document.getElementById('title-new-game'),
	titleLoadGame: document.getElementById('title-load-game'),
	openSystemMenu: document.getElementById('open-system-menu'),
	menuResume: document.getElementById('menu-resume-game'),
	menuSave: document.getElementById('menu-save-game'),
	menuLoad: document.getElementById('menu-load-game'),
	menuTitle: document.getElementById('menu-return-title'),
	shellToast: document.getElementById('shell-toast'),
};

function setGameShellVisible(visible) {
	elements.gameShell.classList.toggle('is-dormant', !visible);
	elements.gameShell.setAttribute('aria-hidden', String(!visible));
}

function ensureController() {
	if (!uiState.controller) {
		uiState.controller = initGame({ autoStart: false });
	}
	return uiState.controller;
}

function readSaveSlot() {
	const raw = window.localStorage.getItem(SAVE_STORAGE_KEY);
	if (!raw) {
		return null;
	}

	try {
		const parsed = JSON.parse(raw);
		if (!parsed?.state) {
			return null;
		}
		return parsed;
	} catch {
		return null;
	}
}

function formatSaveTime(value) {
	if (!value) {
		return '未知时间';
	}
	return new Intl.DateTimeFormat('zh-CN', {
		month: 'numeric',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	}).format(new Date(value));
}

function syncPauseState() {
	if (!uiState.controller) {
		return;
	}

	const shouldPause = elements.titleScreen.classList.contains('visible') || elements.systemMenu.classList.contains('visible');
	uiState.controller.setPaused(shouldPause);
}

function setTitleVisible(visible) {
	elements.titleScreen.classList.toggle('visible', visible);
	elements.titleScreen.hidden = !visible;
	syncPauseState();
}

function setSystemMenuVisible(visible) {
	elements.systemMenu.classList.toggle('visible', visible);
	elements.systemMenu.hidden = !visible;
	syncPauseState();
}

function showToast(text) {
	elements.shellToast.textContent = text;
	elements.shellToast.classList.add('visible');
	if (uiState.toastTimer) {
		window.clearTimeout(uiState.toastTimer);
	}
	uiState.toastTimer = window.setTimeout(() => {
		elements.shellToast.classList.remove('visible');
	}, 2200);
}

function updateSaveLabels() {
	const saveSlot = readSaveSlot();
	elements.systemSaveStatus.textContent = saveSlot
		? `最近一次写入：${formatSaveTime(saveSlot.savedAt)}`
		: '当前没有可读取的本地存档。';

	elements.menuSave.disabled = !uiState.hasLiveSession;
	elements.titleLoadGame.disabled = !saveSlot;
	elements.menuLoad.disabled = !saveSlot;
	elements.openSystemMenu.disabled = !uiState.hasLiveSession;
}

function writeSaveSlot() {
	if (!uiState.controller || !uiState.hasLiveSession) {
		showToast('当前没有可存档的进行中回合。');
		return false;
	}

	const payload = {
		savedAt: new Date().toISOString(),
		state: uiState.controller.saveState(),
	};
	window.localStorage.setItem(SAVE_STORAGE_KEY, JSON.stringify(payload));
	updateSaveLabels();
	showToast('已写入本地存档。');
	return true;
}

async function startNewGame() {
	setGameShellVisible(true);
	const controller = ensureController();
	await controller.startNewGame();
	uiState.hasLiveSession = true;
	setSystemMenuVisible(false);
	setTitleVisible(false);
	updateSaveLabels();
	showToast('已开始新游戏。');
}

async function loadSavedGame() {
	const saveSlot = readSaveSlot();
	if (!saveSlot) {
		updateSaveLabels();
		showToast('没有找到可读取的本地存档。');
		return;
	}

	try {
		setGameShellVisible(true);
		const controller = ensureController();
		await controller.loadState(saveSlot.state);
		uiState.hasLiveSession = true;
		setSystemMenuVisible(false);
		setTitleVisible(false);
		updateSaveLabels();
		showToast(`已读取存档：${formatSaveTime(saveSlot.savedAt)}`);
	} catch {
		if (!uiState.hasLiveSession) {
			setGameShellVisible(false);
		}
		showToast('存档数据无效，无法读取。');
	}
}

function returnToTitle() {
	setGameShellVisible(false);
	setSystemMenuVisible(false);
	setTitleVisible(true);
	updateSaveLabels();
}

elements.titleNewGame.addEventListener('click', startNewGame);
elements.titleLoadGame.addEventListener('click', loadSavedGame);
elements.openSystemMenu.addEventListener('click', () => {
	if (!uiState.hasLiveSession) {
		showToast('先开始一局，再打开设置页。');
		return;
	}
	setSystemMenuVisible(true);
	updateSaveLabels();
});
elements.menuResume.addEventListener('click', () => setSystemMenuVisible(false));
elements.menuSave.addEventListener('click', writeSaveSlot);
elements.menuLoad.addEventListener('click', loadSavedGame);
elements.menuTitle.addEventListener('click', returnToTitle);

window.addEventListener('keydown', (event) => {
	if (event.key === 'Escape' && elements.systemMenu.classList.contains('visible')) {
		setSystemMenuVisible(false);
	}
});

updateSaveLabels();
elements.systemMenu.hidden = true;
setGameShellVisible(false);
syncPauseState();
