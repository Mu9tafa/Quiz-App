import { Button, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import TextFieldComp from "./../components/TextFieldComp";
import SelectField from "./../components/SelectField";
import UseAxios from "../hooks/UseAxios";
import { useNavigate } from "react-router-dom";

const Settings = () => {
   const navigate = useNavigate();
   const { response, error, loading } = UseAxios({ url: "api_category.php" });

   if (loading) {
      return (
         <Box mt={20}>
            <CircularProgress />
         </Box>
      );
   }

   if (error) {
      return (
         <Typography variant="h5" color="red" mt={17}>
            Somthing Went Wrong
         </Typography>
      );
   }

   const difficultyOptions = [
      { id: "easy", name: "Easy" },
      { id: "medium", name: "Medium" },
      { id: "hard", name: "Hard" },
   ];

   const typeOptions = [
      { id: "multiple", name: "Multiple Choice" },
      { id: "boolean", name: "True/False" },
   ];

   const changeHandler = (e) => {
      e.preventDefault();
      navigate("questions");
   };

   return (
      <Box>
         <Typography variant="h2" fontWeight="bold">
            Quiz App
         </Typography>
         <form onSubmit={changeHandler}>
            <SelectField
               options={response.trivia_categories}
               label="Category"
            />
            <SelectField options={difficultyOptions} label="Difficulty" />
            <SelectField options={typeOptions} label="Type" />
            <TextFieldComp />
            <Box mt={3}>
               <Button variant="contained" fullWidth type="submit">
                  GET STARTED
               </Button>
            </Box>
         </form>
      </Box>
   );
};

export default Settings;
