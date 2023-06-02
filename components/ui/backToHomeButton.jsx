import React from "react";
import { IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import Link from "next/link";

const BackToHomeButton = () => {
  return (
    <Link href="/">
      <IconButton className="rounded-[5px] mb-8">
        <ArrowBack />
        <h2 className="capitalize max-md:text-[16px]">Continue to Shopping</h2>
      </IconButton>
    </Link>
  );
};

export default BackToHomeButton;
