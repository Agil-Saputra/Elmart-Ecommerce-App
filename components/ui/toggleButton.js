import React from "react";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { State } from "@/context/Provider";

const ToggleButtonComp = ({ data, setCriteria, criteria }) => {
  const {
    state,
    dispatch
  } = State();
  return (
    <ToggleButtonGroup
      color="primary"
      value={criteria}
      exclusive
      onChange={(e, value) => {
        setCriteria(value);
        dispatch({
          type: "SET_QUERY",
          payload: ""
        })
      }}
      className="grid grid-cols-2 gap-2 my-2"
      sx={{
        width: "fit-content",
        "& .MuiToggleButtonGroup-grouped:not(:first-of-type)": {
          borderRadius: "5px",
          borderColor: "primary.main",
        },
        "& .MuiToggleButtonGroup-grouped:not(:last-of-type)": {
          borderRadius: "5px",
          borderColor: "primary.main",
        },
       
      }}
    >
      {data.map(({ title }) => (
        <ToggleButton
          key={title}
          value={title}
          sx={{
            "& .MuiToggleButton-root": {
          borderColor: "#333",
        }
          }}
          className="shadow-md text-[11px] capitalize handle-text-overflow line-clamp-1"
        >
          {title}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default ToggleButtonComp;
