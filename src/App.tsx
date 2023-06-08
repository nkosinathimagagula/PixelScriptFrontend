import { Routes, Route } from "react-router-dom";

import { LandingPage } from "./pages/LandingPage";
import { SignupPage } from "./pages/SignupPage";
import { SigninPage } from "./pages/SigninPage";
import { ImagePage } from "./pages/ImagePage";

import { TemporaryPage } from "./pages/TemporaryPage";
import { ProfilePage } from "./pages/ProfilePage";

const App = () => {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />}/>

        <Route path="/signup" element={<SignupPage />}/>
        <Route path="/signin" element={<SigninPage />}/>

        <Route path="/home/" element={<LandingPage />}/>
        <Route path="/images/" element={<ImagePage/>}/>
        <Route path="/pdfs/" element={<TemporaryPage />}/>
        <Route path="/word-docs/" element={<TemporaryPage />}/>
        <Route path="/history/" element={<ProfilePage />}/>
      </Routes>
    </>
      
  )
}

export default App
