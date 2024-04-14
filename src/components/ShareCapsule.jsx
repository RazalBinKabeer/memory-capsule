import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const ShareCapsule = ({ capsuleId }) => {
  const [email, setEmail] = useState("");

  const handleInvite = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "invites"), {
      capsuleId,
      email,
      invitedAt: new Date(),
    });
    alert("Invite sent successfully!");
  };

  return (
    <div className="share-capsule">
      <h2 className="text-2xl font-bold">Share Your Capsule</h2>
      <form onSubmit={handleInvite} className="mt-4">
        <input
          type="email"
          placeholder="Invitee's Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block p-2 border mt-2"
        />
        <button type="submit" className="btn-primary mt-4">
          Send Invite
        </button>
      </form>
    </div>
  );
};

export default ShareCapsule;
