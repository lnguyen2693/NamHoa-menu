import { ItemOption } from "@interfaces/db";
import {
  styled,
  ToggleButton,
  ToggleButtonGroup,
  toggleButtonGroupClasses,
} from "@mui/material";
import { borderColor } from "@mui/system";
import React from "react";

interface MultipleChoiceProps {
  keyItem: string;
  option: ItemOption["key"];
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
  const { keyItem, option } = props;
  const [choice, setChoice] = React.useState([""]);

  const handleChoice = (
    event: React.MouseEvent<HTMLElement>,
    newChoice: string[]
  ) => {
    setChoice(newChoice);
  };

  return (
    <div>
      <div>{keyItem}</div>

      <StyledToggleButtonGroup
        color="secondary"
        value={choice}
        onChange={handleChoice}
      >
        {option.choice.map((c) => (
          <StylesToggleButton key={c} id={c} value={c}>
            {c}
          </StylesToggleButton>
        ))}
      </StyledToggleButtonGroup>
    </div>
  );
};
