import { Box } from "@mui/system";
import { Button, CircularProgress, Typography } from "@mui/material";
import UseAxios from "../hooks/UseAxios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { changeAmountHandler, changeScoreHandler } from "../redux/actions";
import { decode } from "html-entities";

const getRandomNum = (max) => Math.floor(Math.random() * Math.floor(max));

const Questions = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [currentIndex, setCurrentIndex] = useState(0);
   const [options, setOptions] = useState([]);
   const {
      question_category,
      question_difficulty,
      question_type,
      amount_of_question,
      score,
   } = useSelector((state) => state);

   let apiUrl = `api.php?amount=${amount_of_question}`;
   if (question_category) {
      apiUrl = apiUrl.concat(`&category=${question_category}`);
   }
   if (question_difficulty) {
      apiUrl = apiUrl.concat(`&difficulty=${question_difficulty}`);
   }
   if (question_type) {
      apiUrl = apiUrl.concat(`&type=${question_type}`);
   }

   const { response, error, loading } = UseAxios({ url: apiUrl });

   useEffect(() => {
      if (response) {
         let questions = response.results[currentIndex];
         let answers = [...questions.incorrect_answers];
         answers.splice(
            getRandomNum(questions.incorrect_answers.length),
            0,
            questions.correct_answer
         );
         setOptions(answers);
      }
   }, [response, currentIndex]);

   if (loading) {
      return (
         <Box mt={20}>
            <CircularProgress></CircularProgress>
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
   const clickAnswerHandler = (e) => {
      if (
         e.target.textContent === response.results[currentIndex].correct_answer
      ) {
         dispatch(changeScoreHandler(score + 1));
      }
      if (currentIndex + 1 < response.results.length) {
         setCurrentIndex(currentIndex + 1);
      } else {
         navigate("/score");
      }
   };
   const backToSettingsHandler = () => {
      dispatch(changeScoreHandler(0));
      dispatch(changeAmountHandler(10));
      navigate("/");
   };
   return (
      <Box>
         <Typography variant="h4" mt={2} font="bold">
            Questions {currentIndex + 1}
         </Typography>
         <Typography mt={3}>
            {decode(response.results[currentIndex].question)}
         </Typography>
         {options.map((answer, idx) => (
            <Box mt={2} key={idx}>
               <Button variant="contained" onClick={clickAnswerHandler}>
                  {decode(answer)}
               </Button>
            </Box>
         ))}
         <Box mt={5}>
            Score : {score} / {response.results.length}
         </Box>
         <Box mt={3}>
            <Button variant="outlined" onClick={backToSettingsHandler}>
               Back to settings
            </Button>
         </Box>
      </Box>
   );
};

export default Questions;
