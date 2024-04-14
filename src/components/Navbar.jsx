import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setMessage({ text: "You have been logged out", type: "success" });
      setTimeout(() => {
        setMessage(null);
        navigate("/");
      }, 3000);
    } catch (error) {
      setMessage({ text: error.message, type: "error" });
    }
  };

  return (
    <div>
      <nav className="navbar bg-gray-900 text-white shadow-md p-4 flex justify-between items-center fixed w-full top-0 z-50">
        <ul className="flex space-x-4">
          <li>
            <Link
              to="/"
              className="font-bold mr-10 uppercase hover:text-blue-500"
            >
              Memory Capsule
            </Link>
          </li>
          {user && (
            <li>
              <Link to="/create" className="hover:text-blue-500">
                Create Capsule
              </Link>
            </li>
          )}
          {user && (
            <li>
              <Link to="/capsules" className="hover:text-blue-500">
                My Capsules
              </Link>
            </li>
          )}
        </ul>
        <div className="flex items-center space-x-4">
          {!user && (
            <Link to="/signup" className="hover:text-blue-500">
              Sign Up
            </Link>
          )}
          {!user && (
            <Link to="/signin" className="hover:text-blue-500">
              Sign In
            </Link>
          )}
          {user && (
            <button
              onClick={handleSignOut}
              className="btn-primary bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              Sign Out
            </button>
          )}
        </div>
      </nav>
      {message && (
        <p
          className={`mt-4 text-center ${
            message.type === "success" ? "text-green-500" : "text-red-500"
          }`}
        >
          {message.text}
        </p>
      )}
    </div>
  );
};

export default Navbar;
