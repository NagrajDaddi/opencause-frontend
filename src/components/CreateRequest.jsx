import { useState } from "react";

export default function CreateRequest() {
  const [form, setForm] = useState({ description: "", amount: "" });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("New Request:", form);
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Create Request</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          name="description"
          placeholder="Request Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="amount"
          placeholder="Amount (ETH)"
          value={form.amount}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Create Request
        </button>
      </form>
    </div>
  );
}
