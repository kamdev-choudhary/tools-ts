import React from "react";
import {
  Box,
  MenuItem,
  ListItemIcon,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@mui/material";
import { ArrowDropDownRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { icons } from "../constants/icons";
import { tools } from "../constants/tools";

interface DrawerItemsProps {
  setDrawerOpen: (open: boolean) => void; // Corrected setDrawerOpen typing to expect a boolean parameter
}

const DrawerItems: React.FC<DrawerItemsProps> = ({ setDrawerOpen }) => {
  const navigate = useNavigate();

  // Type the parameter `category` as a string that matches keys of toolsList
  const renderCategoryItems = (category: string) =>
    (tools[category] || []).map((button: any) => (
      <MenuItem
        key={button.name}
        onClick={() => {
          if (!button.path) {
            console.error(`No path defined for button: ${button.name}`);
            return;
          }
          navigate(button.path);
          setTimeout(() => setDrawerOpen(false), 200); // Close the drawer after navigating
        }}
        sx={{ display: "flex", alignItems: "center", padding: "8px 16px" }}
      >
        <ListItemIcon>
          <img
            src={button?.icon}
            alt={button?.name}
            style={{ height: "24px", marginRight: 8 }}
          />
        </ListItemIcon>
        <Typography>{button?.name}</Typography>
      </MenuItem>
    ));

  const renderAccordion = () =>
    Object.keys(tools).map((category) => (
      <Accordion key={category} sx={{ margin: "8px 0" }}>
        <AccordionSummary
          expandIcon={<ArrowDropDownRounded />}
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        >
          <img
            src={icons[category]}
            height="24px"
            style={{ marginRight: 8 }}
            alt={`${category} icon`}
          />
          <Typography variant="body2">{category}</Typography>
        </AccordionSummary>
        <AccordionDetails>{renderCategoryItems(category)}</AccordionDetails>
      </Accordion>
    ));

  return (
    <Box sx={{ width: 300, p: 2 }} role="presentation">
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h6">Toolbox</Typography>
      </Box>
      <Divider />
      {renderAccordion()}
    </Box>
  );
};

export default DrawerItems;
