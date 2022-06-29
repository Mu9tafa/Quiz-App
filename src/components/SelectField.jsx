import { InputLabel, MenuItem, Select, FormControl } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
   changeCategoryHandler,
   changeTypeHandler,
   changeDifficultyHandler,
} from "./../redux/actions";

const SelectField = (props) => {
   const { label, options } = props;
   const [value, setvalue] = useState("");
   const dispatch = useDispatch();
   const changeHandler = (e) => {
      setvalue(e.target.value);
      switch (label) {
         case "Category":
            dispatch(changeCategoryHandler(e.target.value));
            break;
         case "Difficulty":
            dispatch(changeDifficultyHandler(e.target.value));
            break;
         case "Type":
            dispatch(changeTypeHandler(e.target.value));
            break;
         default:
            break;
      }
   };

   return (
      <Box mt={3}>
         <FormControl fullWidth size="small">
            <InputLabel>{label}</InputLabel>
            <Select value={value} label={label} onChange={changeHandler}>
               {options.map(({ id, name }) => (
                  <MenuItem value={id} key={id}>
                     {name}
                  </MenuItem>
               ))}
            </Select>
         </FormControl>
      </Box>
   );
};

export default SelectField;
