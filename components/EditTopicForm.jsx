"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditTopicForm({ id, title, description }) {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message
    if (!newTitle || !newDescription) {
      setError("Both fields are required.");
      return;
    }

    setLoading(true); // Start loading state

    try {
      const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTitle, description: newDescription }),
      });

      if (!res.ok) {
        throw new Error("Failed to update");
      }
      router.push("/");
    } catch (error) {
      setError("Error updating topic: " + error.message);
      console.log("Error: ", error);
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 border border-slate-300 rounded-lg shadow-lg">
      {error && <div className="text-red-500">{error}</div>}
      <input
        onChange={(e) => setNewTitle(e.target.value)}
        value={newTitle}
        className="rounded-full border border-slate-500 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        placeholder="Enter Topic Title"
        aria-label="Topic Title"
        required
      />
      <input
        onChange={(e) => setNewDescription(e.target.value)}
        value={newDescription}
        className="rounded-full border border-slate-500 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        placeholder="Enter Topic Description"
        aria-label="Topic Description"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className={`bg-green-500 py-2 px-6 w-fit text-white font-bold rounded-full ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {loading ? "Updating..." : "Edit Topic"}
      </button>
    </form>
  );
}
