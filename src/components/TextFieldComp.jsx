import { FormControl, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import { changeAmountHandler } from "../redux/actions";

const TextFieldComp = () => {
   const dispatch = useDispatch();
   const changeHandler = (e) => {
      dispatch(changeAmountHandler(e.target.value));
   };
   return (
      <Box mt={3}>
         <FormControl fullWidth>
            <TextField
               type="number"
               label="Number of questions"
               size="small"
               onChange={changeHandler}
               InputProps={{ inputProps: { min: 1 } }}
            ></TextField>
         </FormControl>
      </Box>
   );
};

export default TextFieldComp;
