import { ItemOption } from "@interfaces/db";
import {
  styled,
  ToggleButton,
  ToggleButtonGroup,
  toggleButtonGroupClasses,
} from "@mui/material";
import { borderColor, Box } from "@mui/system";
import React from "react";

interface SingleChoiceProps {
  keyItem: string;
  option: ItemOption["key"];
  allOptions: Record<string, string[]>;
  addOptions: (key: string, choices: string[]) => void;
}

const StyledToggleButtonGroup = styled(ToggleButtonGroup)({
  display: "flex",
  flexDirection: "row",
  columnGap: "16px",
  marginTop: "8px",
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    border: "1px solid",
    borderColor: "#A3A3A3",
    borderRadius: 6,
    textTransform: "none",
  },
});

const StylesToggleButton = styled(ToggleButton)({
  borderColor: "#A3A3A3",
  color: "#000000DE",
  fontWeight: 500,
  minWidth: "72px",
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "white",
    backgroundColor: "#2E3A85",
    border: "0px",
  },
});

export const SingleChoice = (props: SingleChoiceProps) => {
  const { keyItem, option, allOptions, addOptions } = props;

  const handleChoice = (
    event: React.MouseEvent<HTMLElement>,
    newChoice: string
  ) => {
    addOptions(keyItem, [newChoice]);
  };

  return (
    <Box>
      <Box display="flex" gap={0.5}>
        {keyItem} {option.required ? <Box color="red">*</Box> : <></>}
      </Box>

      <StyledToggleButtonGroup
        color="secondary"
        exclusive
        value={allOptions[keyItem] ?? []}
        onChange={handleChoice}
      >
        {option.choice.map((c) => (
          <StylesToggleButton key={c} id={c} value={c}>
            {c}
          </StylesToggleButton>
        ))}
      </StyledToggleButtonGroup>
    </Box>
  );
};
