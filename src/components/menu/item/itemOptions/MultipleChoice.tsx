import { ItemOption } from "@interfaces/db";
import {
  Box,
  styled,
  ToggleButton,
  ToggleButtonGroup,
  toggleButtonGroupClasses,
} from "@mui/material";
import React from "react";

interface MultipleChoiceProps {
  keyItem: string;
  option: ItemOption["key"];
  allOptions: Record<string, string[]>;
  addOptions: (key: string, choices: string[]) => void;
}

const StyledToggleButtonGroup = styled(ToggleButtonGroup)({
  [`& .${toggleButtonGroupClasses.grouped}`]: {
    margin: 10,
    border: 0,
    borderRadius: 3,
    textTransform: "none",
  },
});

const StylesToggleButton = styled(ToggleButton)({
  border: 1,
  borderColor: "black",
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
      <Box display="flex" gap={0.5}>
        {keyItem} {option.required ? <Box color="red">*</Box> : <></>}
      </Box>

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
