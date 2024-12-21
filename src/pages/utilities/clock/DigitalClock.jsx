import React, { useState, useEffect } from "react";
import { Card, Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

const DigitalClock = () => {
  const [time, setTime] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [prevSeconds, setPrevSeconds] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = {
        hours: now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          hour12: false,
        }),
        minutes: now.toLocaleTimeString("en-US", { minute: "2-digit" }),
        seconds: now.toLocaleTimeString("en-US", { second: "2-digit" }),
      };
      setPrevSeconds(time.seconds);
      setTime(formattedTime);
    };
    const interval = setInterval(updateTime, 1000);
    updateTime(); // Initial update
    return () => clearInterval(interval);
  }, [time.seconds]);

  const flipVariants = {
    initial: { rotateX: 0 },
    animate: { rotateX: 360 },
    exit: { rotateX: +180 },
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          padding: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Hours */}
        <Card
          elevation={5}
          sx={{
            padding: 2,
            backgroundColor: "#1e88e5",
            color: "white",
            textAlign: "center",
            borderRadius: "12px",
            width: 80,
            height: 120,
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <Typography
            variant="h3"
            sx={{ fontFamily: "'Roboto Mono', monospace", fontSize: "3rem" }}
          >
            {time.hours}
          </Typography>
        </Card>

        {/* Minutes */}
        <Card
          elevation={5}
          sx={{
            padding: 2,
            backgroundColor: "#1e88e5",
            color: "white",
            textAlign: "center",
            borderRadius: "12px",
            width: 80,
            height: 120,
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <Typography
            variant="h3"
            sx={{ fontFamily: "'Roboto Mono', monospace", fontSize: "3rem" }}
          >
            {time.minutes}
          </Typography>
        </Card>

        {/* Seconds with flipping animation */}
        <motion.div
          key={time.seconds}
          variants={flipVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.2 }}
        >
          <Card
            elevation={5}
            sx={{
              padding: 2,
              backgroundColor: "#ff5722",
              color: "white",
              textAlign: "center",
              borderRadius: "12px",
              width: 80,
              height: 120,
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Typography
              variant="h3"
              sx={{ fontFamily: "'Roboto Mono', monospace", fontSize: "3rem" }}
            >
              {time.seconds}
            </Typography>
          </Card>
        </motion.div>
      </Box>
    </Box>
  );
};

export default DigitalClock;
