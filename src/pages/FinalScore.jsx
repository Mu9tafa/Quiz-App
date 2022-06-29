import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeAmountHandler, changeScoreHandler } from "../redux/actions";
import { useNavigate } from "react-router-dom";

const FinalScore = () => {
   const { score } = useSelector((state) => state);
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const backToSettingsHandler = () => {
      dispatch(changeScoreHandler(0));
      dispatch(changeAmountHandler(10));
      navigate("/");
   };
   return (
      <Box mt={17}>
         <Typography variant="h4" font="bold" mb={3}>
            Your Final Score is : {score}
         </Typography>
         <Button variant="outlined" onClick={backToSettingsHandler}>
            Back to settings
         </Button>
      </Box>
   );
};

export default FinalScore;
