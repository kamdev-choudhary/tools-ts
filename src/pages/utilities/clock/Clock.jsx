import React, { useRef, useState } from "react";
import AnalogClock from "./AnalogClock";
import DigitalClock from "./DigitalClock";

function Clock() {
  const analogRef = useRef(null);
  const digitalRef = useRef(null);

  // Function to request fullscreen
  const enterFullscreen = (ref) => {
    if (ref.current) {
      if (ref.current.requestFullscreen) {
        ref.current.requestFullscreen();
      } else if (ref.current.webkitRequestFullscreen) {
        ref.current.webkitRequestFullscreen();
      } else if (ref.current.mozRequestFullScreen) {
        ref.current.mozRequestFullScreen();
      } else if (ref.current.msRequestFullscreen) {
        ref.current.msRequestFullscreen();
      }
    }
  };

  return (
    <>
      <div
        ref={analogRef}
        onClick={() => enterFullscreen(analogRef)}
        style={{ cursor: "pointer" }}
      >
        <AnalogClock />
      </div>
      <div
        ref={digitalRef}
        onClick={() => enterFullscreen(digitalRef)}
        style={{ cursor: "pointer" }}
      >
        <DigitalClock />
      </div>
    </>
  );
}

export default Clock;
