import React from "react";
import EncDec from "./EncDec";
import Hash from "./Hash";
import { Box } from "@mui/material";
import { motion } from "framer-motion";

function CryptoJS() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Box>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <EncDec />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          style={{ marginTop: 10 }}
        >
          <Hash />
        </motion.div>
      </Box>
    </motion.div>
  );
}

export default CryptoJS;
