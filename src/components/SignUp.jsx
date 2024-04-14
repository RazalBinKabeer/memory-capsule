import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setMessage({ text: "Passwords do not match!", type: "error" });
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage({ text: "User registered successfully!", type: "success" });
      navigate("/");
    } catch (error) {
      setMessage({ text: error.message, type: "error" });
    }
  };

  return (
    <div className="signup max-w-md mx-auto bg-gray-800 text-white p-6 rounded shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      {message && (
        <p
          className={`mb-4 ${
            message.type === "success" ? "text-green-500" : "text-red-500"
          }`}
        >
          {message.text}
        </p>
      )}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-4 border rounded bg-gray-700 text-white"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-4 border rounded bg-gray-700 text-white"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full p-2 mb-4 border rounded bg-gray-700 text-white"
      />
      <button
        onClick={handleSignUp}
        className="btn-primary w-full py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-700 transition"
      >
        Sign Up
      </button>
      <p className="mt-4 text-sm">
        Already have an account?{" "}
        <Link to="/signin" className="text-blue-500 hover:text-blue-700">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
