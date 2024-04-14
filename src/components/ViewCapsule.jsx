import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

const ViewCapsule = () => {
  const { capsuleId } = useParams();
  const [capsule, setCapsule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const fetchCapsule = async () => {
      const docRef = doc(db, "capsules", capsuleId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCapsule(docSnap.data());
      } else {
        console.log("No such document!");
      }
      setLoading(false);
    };
    fetchCapsule();
  }, [capsuleId]);

  useEffect(() => {
    if (capsule) {
      const unlockDate = new Date(capsule.unlockDate.seconds * 1000);
      const updateCountdown = () => {
        const currentTime = new Date();
        const diff = unlockDate - currentTime;
        if (diff > 0) {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
        } else {
          setTimeLeft(null);
        }
      };

      updateCountdown();
      const timer = setInterval(updateCountdown, 1000);

      return () => clearInterval(timer);
    }
  }, [capsule]);

  if (loading) return <div>Loading...</div>;

  if (!capsule) return <div>No capsule found.</div>;

  const currentDate = new Date();
  const unlockDate = new Date(capsule.unlockDate.seconds * 1000);

  if (currentDate < unlockDate) {
    return (
      <div className="view-capsule max-w-md mx-auto bg-gray-800 text-white p-6 rounded shadow-md mt-6">
        <h2 className="text-2xl font-bold mb-4">Locked Capsule</h2>
        <p>This capsule will unlock on {unlockDate.toLocaleDateString()}.</p>
        {timeLeft && (
          <p className="text-lg text-yellow-500 bg-gray-700 p-2 rounded mt-4">
            Time remaining: {timeLeft}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="view-capsule max-w-md mx-auto bg-gray-800 text-white p-6 rounded shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4">{capsule.title}</h2>
      <p className="mt-4">{capsule.content}</p>
      <div className="media mt-4">
        {capsule.files.map((url, index) => (
          <div key={index} className="media-item">
            <img src={url} alt="Memory" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewCapsule;
