"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const workerTimers = require("worker-timers");
class StaticTiming {
}
class Timer {
    constructor() { }
    static getMsFromString(time) {
        // e.g. 00:15:15
        const regex = /\d+/g;
        const matches = time.match(regex);
        const hour = Number(matches[0]) * 60 * 60 * 1000;
        const minutes = Number(matches[1]) * 60 * 1000;
        const seconds = Number(matches[2]) * 1000;
        return hour + minutes + seconds;
    }
    static getMsFormated(time) {
        var hours = Math.floor(time / 60 / 60 / 1000);
        var minutes = Math.floor((time - (hours * 60 * 60 * 1000)) / 60 / 1000);
        var seconds = Math.floor((time - (hours * 60 * 60 * 1000) - (minutes * 60 * 1000)) / 1000);
        return `(${Math.floor(hours)}:${Math.floor(minutes)}:${Math.floor(seconds)})`;
    }
    static updateTimeDOM(timedAction, timerInputElement, timerInputElementValue, actionButtonElement) {
        const now = Timer.now().getTime();
        const timedActionMs = timedAction.getTime() - now;
        // Set Action delay
        const x = workerTimers.setInterval(function () {
            const timeNow = new Date();
            const regexString = /\(.*\)/;
            if (timedActionMs - (timeNow.getTime() - now) > 0) {
                timerInputElement.value =
                    timerInputElementValue.replace(regexString, '') + " " + Timer.getMsFormated(timedActionMs - (timeNow.getTime() - now));
            }
            else {
                timerInputElement.value =
                    timerInputElementValue.replace(regexString, '') + " " + Timer.getMsFormated(0);
            }
            // If the count down is finished, click button
            if (timedActionMs - (timeNow.getTime() - now) <= 0) {
                console.log("Action timed [date]: " + Timer.toString(timedAction) + ":" + timedAction.getMilliseconds());
                console.log("Action executed [date]: " + Timer.toString(timeNow) + ":" + timeNow.getMilliseconds());
                timerInputElement.value = timerInputElementValue.replace(regexString, '');
                workerTimers.clearInterval(x);
                if (actionButtonElement)
                    actionButtonElement.click();
            }
        }, 1);
        return x;
    }
    static generateDateFromString(date) {
        const regex = /\d+/g;
        const matches = date.match(regex);
        const day = Number(matches[0]);
        const month = Number(matches[1]) - 1;
        const year = Number(matches[2]);
        const hours = Number(matches[3]);
        const minutes = Number(matches[4]);
        const seconds = Number(matches[5]);
        const ms = Number(matches[6]) ? Number(matches[6]) : 0;
        return new Date(new Date(year, month, day, hours, minutes, seconds).setMilliseconds(ms));
    }
}
exports.default = Timer;
Timer.now = () => new Date(new Date(Date.now()).setMilliseconds(0));
Timer.correctTimeOffset = (date) => {
    const timeZoneOffset = Timer.now().getTimezoneOffset() * 60 * 1000;
    return new Date(date.getTime() - timeZoneOffset);
};
Timer.toString = (date) => {
    const regexDate = /^.*\s/g;
    const regexTime = /\s.*$/g;
    const matchesDate = date ? date.toLocaleString().match(regexDate) : Timer.now().toLocaleString().match(regexDate);
    const matchesTime = date ? date.toLocaleString().match(regexTime) : Timer.now().toLocaleString().match(regexTime);
    const [day, month, year] = matchesDate[0].trim().split('.');
    const [hour, minutes, seconds] = matchesTime[0].trim().split(':');
    return `${day}.${month}.${year} ${hour}:${minutes}:${seconds}`;
};
