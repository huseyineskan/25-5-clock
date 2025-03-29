import React, { useEffect, useState } from "react";

function Clock() {
  const [breakCounter, setBreakCounter] = useState(5);
  const [sessionCounter, setSessionCounter] = useState(25);
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [startTimer, setStartTimer] = useState(false);
  const [lastOneMinute, setLastOneMinute] = useState(false);
  const [breakOn, setBreakOn] = useState(false);
  const [bgColor, setBgColor] = useState("transparent");

  function SetMusic(link) {
    const audio = new Audio(link);
    audio.play();
  }

  function HandleBreakClick(value) {
    value > 0
      ? setBreakCounter(Number(breakCounter) + 1)
      : setBreakCounter(Number(breakCounter) - 1);
  }

  function HandleSessionClick(value) {
    value > 0
      ? setSessionCounter(Number(sessionCounter) + 1)
      : setSessionCounter(Number(sessionCounter) - 1);
    setSecond(0);
    setBgColor("black");
  }

  function Session() {
    if (second > 0) {
      setSecond(second - 1);
    } else {
      setSecond(59);
      setMinute(minute - 1);
    }

    if (minute == 0 && second == 0) {
      setBreakOn((prev) => !prev);
      breakOn ? setMinute(sessionCounter - 1) : setMinute(breakCounter - 1);
    }

    SetStyles();
  }

  function SetStyles() {
    if (breakOn) {
      setBgColor("#20bf6b");
      second == 59 &&
        SetMusic(
          "https://cdn.freesound.org/previews/795/795303_17090683-lq.mp3"
        );
    } else {
      setBgColor("#b71540");
    }

    if (minute == 0) {
      setLastOneMinute(true);
      second == 59 &&
        !breakOn &&
        SetMusic(
          "https://cdn.freesound.org/previews/795/795492_5287430-lq.mp3"
        );
    } else {
      setLastOneMinute(false);
    }
  }

  function Reset() {
    setStartTimer(false);
    setBreakCounter(5);
    setSessionCounter(25);
    setMinute(sessionCounter);
    setSecond(0);
    setBreakOn(false);
    setBgColor("black");
  }

  setTimeout(() => {
    if (startTimer) {
      Session();
    }
  }, 1000);

  useEffect(() => {
    setMinute(sessionCounter);
  }, [sessionCounter]);

  return (
    <div className="clock-div">
      <div className="clock-top">
        <div className="break">
          <p id="break-label">Break Length</p>
          <div>
            <button
              id="break-decrement"
              onClick={() => breakCounter > 1 && HandleBreakClick(-1)}
            >
              -
            </button>
            <span id="break-length">{breakCounter}</span>
            <button
              id="break-increment"
              onClick={() => breakCounter < 60 && HandleBreakClick(1)}
            >
              +
            </button>
          </div>
        </div>
        <div className="session">
          <p id="session-label">Session Length</p>
          <div>
            <button
              id="session-decrement"
              onClick={() => sessionCounter > 1 && HandleSessionClick(-1)}
            >
              -
            </button>
            <span id="session-length">{sessionCounter}</span>
            <button
              id="session-increment"
              onClick={() => sessionCounter < 60 && HandleSessionClick(1)}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div
        className="clock-timer"
        style={
          lastOneMinute || breakOn
            ? { backgroundColor: bgColor, transition: "400ms ease" }
            : { backgroundColor: "black", transition: "400ms ease" }
        }
      >
        <p id="timer-label">{breakOn ? "Break" : "Session"}</p>
        <span id="time-left">
          {minute < 10 ? "0" + minute : minute} :{" "}
          {second < 10 ? "0" + second : second}
        </span>
      </div>
      <div className="clock-controls">
        <button
          id="start_stop"
          onClick={() => {
            startTimer ? setStartTimer(false) : setStartTimer(true);
          }}
        >
          Start / Pause
        </button>
        <button id="reset" onClick={Reset}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default Clock;
