import React, { useEffect, useState } from "react";

function Clock() {
  const [breakCounter, setBreakCounter] = useState(5);
  const [sessionCounter, setSessionCounter] = useState(25);
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);

  function HandleBreakClick(value) {
    value > 0
      ? setBreakCounter(Number(breakCounter) + 1)
      : setBreakCounter(Number(breakCounter) - 1);
  }

  function HandleSessionClick(value) {
    value > 0
      ? setSessionCounter(Number(sessionCounter) + 1)
      : setSessionCounter(Number(sessionCounter) - 1);
  }

  function Timer() {
    setSecond(Number(second) + 1);
  }

  // useEffect(() => {
  //   setTimeout(() => {
  //     Timer();
  //   }, 1000);
  // });

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
      <div className="clock-timer">
        <p id="timer-label">Session</p>
        <span id="time-left">
          {minute} : {second}
        </span>
      </div>
      <div className="clock-controls">
        <button id="start_stop">Start / Pause</button>
        <button id="reset">Reset</button>
      </div>
    </div>
  );
}

export default Clock;
