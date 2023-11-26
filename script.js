"use strict";

const minutesLabel = document.getElementById("minutes");
const secondsLabel = document.getElementById("seconds");
const millisecondsLabel = document.getElementById("milliseconds");
const controls = document.querySelector(".controls");
const lapList = document.getElementById("lap-list");

let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let interval;

function initialize() {
	minutes = 0;
	seconds = 0;
	milliseconds = 0;
	displayTimer();
}

function formatTime(time) {
	return time.toString().padStart(2, "0");
}

function displayTimer() {
	millisecondsLabel.textContent = formatTime(milliseconds);
	secondsLabel.textContent = formatTime(seconds);
	minutesLabel.textContent = formatTime(minutes);
}

function updateTimer() {
	milliseconds++;
	if (milliseconds === 100) {
		milliseconds = 0;
		seconds++;

		if (seconds === 60) {
			seconds = 0;
			minutes++;
		}
	}
	displayTimer();
}

function addToLapList() {
	const lapTime = `${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(
		milliseconds
	)}`;

	const listItem = document.createElement("li");
	listItem.innerHTML = `
    <span>Lap ${lapList.childElementCount + 1}:</span> ${lapTime}
  `;

	lapList.appendChild(listItem);
}

function setButtonState(start, stop, pause) {
	startBtn.disabled = start;
	stopBtn.disabled = stop;
	pauseBtn.disabled = pause;
}

function startTimer() {
	interval = setInterval(updateTimer, 10);
	setButtonState(true, false, false);
}

function stopTimer() {
	clearInterval(interval);
	addToLapList();
	initialize();
	setButtonState(false, true, true);
}

function pauseTimer() {
	clearInterval(interval);
	setButtonState(false, false, true);
}

function resetTimer() {
	clearInterval(interval);
	initialize();
	setButtonState(false, true, true);
}

controls.addEventListener("click", function (event) {
	if (event.target.classList.contains("control-btn")) {
		const buttonId = event.target.id;

		switch (buttonId) {
			case "startBtn":
				startTimer();
				break;

			case "stopBtn":
				stopTimer();
				break;

			case "pauseBtn":
				pauseTimer();
				break;

			case "resetBtn":
				resetTimer();
				break;
		}
	}
});
