import { BrowserRouter, Routes, Route } from "react-router-dom";
import Settings from "./pages/Settings";
import Questions from "./pages/Questions";
import FinalScore from "./pages/FinalScore";

import { Container } from "@mui/material";
import { Box } from "@mui/system";

const App = () => {
   return (
      <BrowserRouter>
         <Container maxWidth="sm">
            <Box textAlign="center" mt={5}>
               <Routes>
                  <Route path="/" element={<Settings />}></Route>
                  <Route path="/questions" element={<Questions />}></Route>
                  <Route path="/score" element={<FinalScore />}></Route>
                  <Route
                     path="*"
                     element={
                        <main style={{ padding: "1rem" }}>
                           <p>There's nothing here!</p>
                        </main>
                     }
                  ></Route>
               </Routes>
            </Box>
         </Container>
      </BrowserRouter>
   );
};

export default App;
