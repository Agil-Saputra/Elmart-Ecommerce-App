import React from "react";
import { IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

const backToHomeButton = () => {
  return (
    <IconButton href="/" className="rounded-[5px] mb-10">
      <ArrowBack />
      <h2 className="capitalize">Continue to Shopping</h2>
    </IconButton>
  );
};

export default backToHomeButton;
