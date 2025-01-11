import { ItemOption } from "@interfaces/db";
import {
  Box,
  styled,
  ToggleButton,
  ToggleButtonGroup,
  toggleButtonGroupClasses,
  Typography,
} from "@mui/material";
import React from "react";

interface MultipleChoiceProps {
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

export const MultipleChoice = (props: MultipleChoiceProps) => {
  const { keyItem, option, allOptions, addOptions } = props;

  const handleChoice = (
    event: React.MouseEvent<HTMLElement>,
    newChoice: string[]
  ) => {
    addOptions(keyItem, newChoice);
  };

  return (
    <Box>
      <Typography
        display="flex"
        gap={0.5}
        color="#00000099"
        fontWeight={500}
        fontSize={14}
      >
        {keyItem} {option.required ? <Box color="red">*</Box> : <></>}
      </Typography>
      <StyledToggleButtonGroup
        color="secondary"
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
