import React, { useEffect, useState } from "react";
import { Box, Divider, Paper, Typography } from "@mui/material";
import { sheetUrl } from "../../constants/helper";
import { motion } from "framer-motion";

const Shayari = () => {
  const [sayaries, setSayaries] = useState(null);

  useEffect(() => {
    fetch("/data/sayari.json")
      .then((response) => response.json())
      .then((data) => setSayaries(data));
  }, []);

  return (
    <>
      {sayaries &&
        sayaries.map((s, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
              delay: 0.1 * index, // Items animate sequentially with a delay
            }}
          >
            <Paper
              elevation={4}
              sx={{
                borderRadius: 2,
                p: 3,
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease-in-out",
                ":hover": {
                  boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.2)",
                },
                mb: 1,
              }}
            >
              <Typography>{s?.type}</Typography>
              <Divider sx={{ my: 1 }} />
              <Typography>
                {s?.content?.map((c, subIndex) => (
                  <Typography key={subIndex}>{c}</Typography>
                ))}
              </Typography>
            </Paper>
          </motion.div>
        ))}
    </>
  );
};

export default Shayari;
