import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage({ text: "Signed in successfully!", type: "success" });
      navigate("/");
    } catch (error) {
      let errorMessage = "";
      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "User not found";
          break;
        case "auth/wrong-password":
          errorMessage = "Wrong password, try again";
          break;
        default:
          errorMessage = "Wrong Email or Password, please try again";
      }
      setMessage({ text: errorMessage, type: "error" });
    }
  };

  return (
    <div className="signin max-w-md mx-auto bg-gray-800 text-white p-6 rounded shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>
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
      <button
        onClick={handleSignIn}
        className="btn-primary w-full py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-700 transition"
      >
        Sign In
      </button>
      <p className="mt-4 text-sm">
        Do not have an account?{" "}
        <Link to="/signup" className="text-blue-500 hover:text-blue-700">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default SignIn;
