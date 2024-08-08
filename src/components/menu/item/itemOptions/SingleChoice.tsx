import { ItemOption } from "@interfaces/db";
import {
  styled,
  ToggleButton,
  ToggleButtonGroup,
  toggleButtonGroupClasses,
} from "@mui/material";
import React from "react";

interface SingleChoiceProps {
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

export const SingleChoice = (props: SingleChoiceProps) => {
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
        exclusive
        value={choice}
        onChange={handleChoice}
      >
        {option.choice.map((c) => (
          <ToggleButton id={c} value={c}>
            {c}
          </ToggleButton>
        ))}
      </StyledToggleButtonGroup>
    </div>
  );
};
