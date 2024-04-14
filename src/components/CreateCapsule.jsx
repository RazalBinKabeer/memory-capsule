import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { storage, db, auth } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateCapsule = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [unlockDate, setUnlockDate] = useState(new Date());
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate("/signin");
      }
    });
  }, [navigate]);

  const handleFileUpload = async (file) => {
    const fileRef = ref(storage, `capsules/${file.name}`);
    await uploadBytes(fileRef, file);
    return getDownloadURL(fileRef);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content || !files.length) {
      setMessage({
        text: "Please fill in all fields and upload at least one file.",
        type: "error",
      });
      return;
    }
    setLoading(true);
    const fileUrls = await Promise.all([...files].map(handleFileUpload));
    await addDoc(collection(db, "capsules"), {
      userId: user.uid,
      title,
      content,
      files: fileUrls,
      createdAt: new Date(),
      unlockDate,
    });
    setLoading(false);
    setMessage({ text: "Capsule created successfully!", type: "success" });
    setTimeout(() => {
      navigate("/capsules");
    }, 0);
  };

  return (
    <div className="create-capsule max-w-md mx-auto bg-gray-800 text-white p-6 rounded shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4">Create a Memory Capsule</h2>
      {loading && (
        <div className="loader mt-4 mb-4">
          <svg className="animate-spin h-8 w-8 text-white" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
          </svg>
        </div>
      )}
      {message && (
        <p
          className={`mb-4 ${
            message.type === "success" ? "text-green-500" : "text-red-500"
          }`}
        >
          {message.text}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-4 border rounded bg-gray-700 text-white"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 mb-4 border rounded bg-gray-700 text-white"
        />
        <input
          type="file"
          multiple
          onChange={(e) => setFiles(e.target.files)}
          className="w-full p-2 mb-4 border rounded bg-gray-700 text-white"
        />
        <label className="block mb-2 text-sm font-bold">Unlock Date:</label>
        <DatePicker
          selected={unlockDate}
          onChange={(date) => setUnlockDate(date)}
          className="w-full p-2 mb-4 border rounded bg-gray-700 text-white"
        />
        <button
          type="submit"
          className="btn-primary w-full py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-700 transition"
          disabled={loading}
        >
          Create Capsule
        </button>
      </form>
    </div>
  );
};

export default CreateCapsule;
