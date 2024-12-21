import React, { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";

const AnalogClock = ({ size = "300px" }) => {
  const [time, setTime] = useState(new Date());
  const secondHandRef = useRef(null);
  const minuteHandRef = useRef(null);
  const hourHandRef = useRef(null);

  const clockSize = parseInt(size, 10); // Convert size to number
  const center = clockSize / 2;
  const radius = center - 30; // Reduced radius to provide more space
  const handLength = radius - 10; // Length of the hands

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, []);

  useEffect(() => {
    // Get the seconds, minutes, and hours in degrees
    const seconds = time.getSeconds();
    const minutes = time.getMinutes();
    const hours = time.getHours();

    // Rotate hands accordingly
    if (secondHandRef.current) {
      secondHandRef.current.style.transform = `rotate(${seconds * 6}deg)`; // 360 / 60
    }

    if (minuteHandRef.current) {
      minuteHandRef.current.style.transform = `rotate(${
        minutes * 6 + seconds / 10
      }deg)`; // 360 / 60 + fraction for smoothness
    }

    if (hourHandRef.current) {
      const hourDeg = (hours % 12) * 30 + minutes * 0.5; // 360 / 12 hours
      hourHandRef.current.style.transform = `rotate(${hourDeg}deg)`;
    }
  }, [time]);

  return (
    <Box
      sx={{
        position: "relative",
        width: size,
        height: size,
        border: "10px solid #333",
        borderRadius: "50%",
        backgroundColor: "white",
        margin: "50px auto",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Box
        ref={hourHandRef}
        sx={{
          position: "absolute",
          bottom: "50%",
          left: "50%",
          width: `${clockSize / 50}px`,
          height: `${clockSize / 5}px`,
          backgroundColor: "#333",
          transformOrigin: "bottom",
          transform: "translateX(-50%)",
          transition: "transform 0.5s ease",
        }}
      />

      {/* Minute hand */}
      <Box
        ref={minuteHandRef}
        sx={{
          position: "absolute",
          bottom: "50%",
          left: "50%",
          width: `${clockSize / 60}px`,
          height: `${clockSize / 3.33}px`,
          backgroundColor: "#555",
          transformOrigin: "bottom",
          transform: "translateX(-50%)",
          transition: "transform 0.5s ease",
        }}
      />

      {/* Second hand */}
      <Box
        ref={secondHandRef}
        sx={{
          position: "absolute",
          bottom: "50%",
          left: "50%",
          width: `${clockSize / 150}px`,
          height: `${clockSize / 2.5}px`,
          backgroundColor: "red",
          transformOrigin: "bottom",
          transform: "translateX(-50%)",
          transition: "transform 0.1s linear",
        }}
      />

      {/* Clock Numbers */}
      {[3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2].map((digit, index) => {
        const angle = index * 30; // 360 / 12 hours
        const x =
          center + (radius - 0) * Math.cos((angle * Math.PI) / 180) - 10; // Adjusted radius
        const y =
          center + (radius - 0) * Math.sin((angle * Math.PI) / 180) - 10; // Adjusted radius
        return (
          <Typography
            key={index}
            variant="body1"
            sx={{
              position: "absolute",
              top: `${y}px`,
              left: `${x}px`,
              fontSize: `${clockSize / 15}px`,
              fontWeight: "bold",
              color: "#333",
              transform: "translate(-50%, -50%)",
            }}
          >
            {digit}
          </Typography>
        );
      })}
    </Box>
  );
};

export default AnalogClock;
