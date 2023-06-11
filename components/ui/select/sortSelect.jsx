import React from 'react'
import { Select, InputBase, MenuItem } from '@mui/material';
import styled from '@emotion/styled';

export const StyledInput = styled(InputBase)(({ theme }) => ({
    "label + &": {
      marginTop: theme.spacing(3),
    },
    "& .MuiInputBase-input": {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #ced4da",
      fontSize: 16,
      padding: "8px 12px 8px 12px",
      width: "100%",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      "&:focus": {
        borderRadius: 4,
        boxShadow: `0 0 0 0.1rem ${theme.palette.primary.main}`,
      },
    },
  }));

const SortSelect = ({sortName, setSortName}) =>  (
    <Select
    input={<StyledInput />}
    displayEmpty
    renderValue={(selected) => {
      if (selected.length == 0) {
        return "Sort By";
      }
      return <span className="capitalize">{selected}</span>
    }}
    value={sortName}
    onChange={(e) => setSortName(e.target.value)}
    className="h-full w-fit"
  >
    <MenuItem value="" disabled>Sort By</MenuItem>
    <MenuItem value="price(highest)">Price(Highest)</MenuItem>
    <MenuItem value="price(lowest)">Price(Lowest)</MenuItem>
    <MenuItem value="title(A-Z)">Title(A-Z)</MenuItem>
    <MenuItem value="title(Z-A)">Title(Z-A)</MenuItem>
  </Select>
  )


export default SortSelect