import { Routes, Route } from "react-router-dom";

import { LandingPage } from "./pages/LandingPage";
import { SignupPage } from "./pages/SignupPage";
import { SigninPage } from "./pages/SigninPage";
import { ImagePage } from "./pages/ImagePage";

const App = () => {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />}/>

        <Route path="/signup" element={<SignupPage />}/>
        <Route path="/signin" element={<SigninPage />}/>

        <Route path="/home" element={<LandingPage />}/>
        <Route path="/images" element={<ImagePage/>}/>
      </Routes>
    </>
      
  )
}

export default App
