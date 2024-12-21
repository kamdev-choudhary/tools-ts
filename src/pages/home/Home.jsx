import React from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
} from "@mui/material";
import { ExpandMoreRounded } from "@mui/icons-material"; // Importing expand icon
import { tools } from "../../constants/tools";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
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
          bgcolor: "background.primary",
        }}
      >
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Welcome to ToolBox
          </Typography>
          <Typography
            variant="h5"
            component="p"
            gutterBottom
            sx={{ color: "#555" }}
          >
            We provide a collection of awesome tools for free!
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 1, color: "#666" }}>
            Discover powerful tools to enhance your productivity, creativity,
            and more. New tools and features are added every week, so be sure to
            check back regularly!
          </Typography>
        </motion.div>

        {/* Tools List Section */}
        <Box>
          {Object.keys(tools)?.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2 * index,
                duration: 0.5,
                ease: "easeOut",
              }}
              style={{ padding: 4 }}
            >
              <Accordion
                sx={{
                  borderRadius: 2,
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  transition: "all 0.3s ease-in-out",
                  ":hover": {
                    boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreRounded />}>
                  {category}
                </AccordionSummary>
                <AccordionDetails>
                  {tools[category]?.map((tool, toolIndex) => (
                    <motion.div
                      key={toolIndex}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.3 + 0.1 * toolIndex,
                        duration: 0.4,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          ml: 1,
                          mb: 1,
                          cursor: "pointer",
                          ":hover": {
                            bgcolor: "rgba(173, 216, 230, 0.3)",
                          },
                          p: 1,
                          borderRadius: 1,
                        }}
                        onClick={() => navigate(tool?.path)}
                      >
                        <img src={tool.icon} height={30} alt={tool.name} />
                        <Typography variant="body1" sx={{ ml: 2 }}>
                          {tool?.name}
                        </Typography>
                      </Box>
                    </motion.div>
                  ))}
                </AccordionDetails>
              </Accordion>
            </motion.div>
          ))}
        </Box>

        {/* Footer Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <Typography variant="body2" sx={{ marginTop: "40px", color: "#888" }}>
            Updates and new tools are released every week. Stay tuned for more!
          </Typography>
        </motion.div>
      </Paper>
    </motion.div>
  );
}

export default Home;
