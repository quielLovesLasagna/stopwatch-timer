"use strict";

// Element/s
const minutesLabel = document.getElementById("minutes");
const secondsLabel = document.getElementById("seconds");
const millisecondsLabel = document.getElementById("milliseconds");

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

const lapList = document.getElementById("lap-list");

// Stopwatch variable/s
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let interval;

// Function/s
const formatTime = function (time) {
	return time.toString().padStart(2, "0");
};

const displayTimer = function () {
	millisecondsLabel.textContent = formatTime(milliseconds);
	secondsLabel.textContent = formatTime(seconds);
	minutesLabel.textContent = formatTime(minutes);
};

const updateTimer = function () {
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
};

const addToLapList = function () {
	const lapTime = `${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(
		milliseconds
	)}`;

	const listItem = document.createElement("li");
	listItem.innerHTML = `
    <span>Lap ${lapList.childElementCount + 1}:</span>${lapTime}
    `;

	lapList.appendChild(listItem);
};

const startTimer = function () {
	interval = setInterval(updateTimer, 10);
	startBtn.disabled = true;
	stopBtn.disabled = false;
};

const stopTimer = function () {
	clearInterval(interval);
	addToLapList();
	resetTimerData();
	stopBtn.disabled = true;
	startBtn.disabled = false;
};

const pauseTimer = function () {
	clearInterval(interval);
	startBtn.disabled = false;
};

const resetTimerData = function () {
	minutes = 0;
	seconds = 0;
	milliseconds = 0;
	displayTimer();
};

const resetTimer = function () {
	clearInterval(interval);
	resetTimerData();
	startBtn.disabled = false;
};

// Event listener/s
startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
