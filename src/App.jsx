import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import CreateCapsule from "./components/CreateCapsule";
import ShareCapsule from "./components/ShareCapsule";
import ViewCapsule from "./components/ViewCapsule";
import MyCapsules from "./components/MyCapsules";
import Footer from "./components/Footer";
import TransitionWrapper from "./components/TransitionWrapper";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow pt-16 pb-16">
          <TransitionWrapper>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/create" element={<CreateCapsule />} />
              <Route path="/share/:capsuleId" element={<ShareCapsule />} />
              <Route path="/view/:capsuleId" element={<ViewCapsule />} />
              <Route path="/capsules" element={<MyCapsules />} />
            </Routes>
          </TransitionWrapper>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
