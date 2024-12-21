import { Close } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";

interface CustomDropDownProps {
  data: { label: string; value: string | number }[]; // Correct type for 'data'
  value: string | number; // Correct type for 'value'
  onChange: (event: SelectChangeEvent<string | number>) => void; // Correct onChange type for SelectChangeEvent
  disabled: boolean;
  label: string;
  name: string;
  dropdownValue: string;
  readonly: boolean;
  required: boolean;
  showClearButton: boolean; // Changed to boolean instead of true
}

const CustomDropDown: React.FC<CustomDropDownProps> = ({
  data = [],
  value = "",
  onChange,
  disabled = false,
  label = "",
  name = "",
  dropdownValue = "value", // Default to 'value'
  readonly = false,
  required = false,
  showClearButton = true,
}) => {
  // Function to clear the value
  const handleClear = () => {
    onChange({ target: { value: "" } } as SelectChangeEvent<string>);
  };

  return (
    <FormControl required={required} size="small" fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        value={value}
        onChange={onChange}
        disabled={disabled}
        readOnly={readonly}
        endAdornment={
          !readonly &&
          value !== "" &&
          showClearButton && (
            <IconButton onClick={handleClear} sx={{ mr: 1 }}>
              <Close />
            </IconButton>
          )
        }
      >
        {data?.map((item, index) => (
          <MenuItem key={index} value={item[dropdownValue] || item}>
            {item[name] || item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomDropDown;
