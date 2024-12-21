import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Link,
  Box,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FreeApi = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/freeapi/apis.json");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAccordionChange = (category) => (_, isExpanded) => {
    setExpanded(isExpanded ? category : false);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <CircularProgress />
        <Typography variant="h6" mt={2}>
          Loading...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
      </Box>
    );
  }

  if (!data || Object.keys(data).length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h6" color="textSecondary">
          No APIs available at the moment.
        </Typography>
      </Box>
    );
  }

  return (
    <Box px={3} py={5}>
      <Typography variant="h4" gutterBottom align="center">
        Free API List
      </Typography>
      {Object.keys(data).map((category) => (
        <Accordion
          key={category}
          expanded={expanded === category}
          onChange={handleAccordionChange(category)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6">{category}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box display="flex" flexDirection="column" gap={2}>
              {data[category]?.map((api, index) => (
                <Card key={index} variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      <Link
                        href={api.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        underline="hover"
                      >
                        {api.name}
                      </Link>
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {api.description}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default FreeApi;
