import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const LandingPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <div className="landing-page min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Welcome to Memory Capsule</h1>
      <p className="mt-4 text-lg mb-8">
        Preserve your precious memories forever.
      </p>
      <div className="flex space-x-4">
        {!user && (
          <Link
            to="/signup"
            className="btn-primary bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Sign Up
          </Link>
        )}
        {!user && (
          <Link
            to="/signin"
            className="btn-secondary bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-500 transition"
          >
            Sign In
          </Link>
        )}
        {user && (
          <Link
            to="/create"
            className="btn-primary bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Create Capsule
          </Link>
        )}
        {user && (
          <Link
            to="/capsules"
            className="btn-primary bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition"
          >
            My Capsules
          </Link>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
