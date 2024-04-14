import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";

const MyCapsules = () => {
  const [capsules, setCapsules] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchCapsules(currentUser.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchCapsules = async (userId) => {
    const q = query(collection(db, "capsules"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const capsulesData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCapsules(capsulesData);
  };

  return (
    <div className="my-capsules max-w-2xl mx-auto bg-gray-800 text-white p-6 rounded shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4">My Capsules</h2>
      {capsules.length === 0 ? (
        <p>You have no capsules yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {capsules.map((capsule) => (
            <div
              key={capsule.id}
              className="bg-gray-700 p-4 rounded shadow hover:bg-gray-600 transition"
            >
              <h3 className="text-xl font-semibold truncate">
                {capsule.title}
              </h3>
              <Link
                to={`/view/${capsule.id}`}
                className="mt-4 inline-block text-blue-500 hover:text-blue-700"
              >
                View Capsule
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCapsules;
