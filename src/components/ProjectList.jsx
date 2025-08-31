export default function ProjectList() {
  const projects = [
    { id: 1, title: "Clean Water Project", goal: "10 ETH", description: "Provide clean water to rural villages." },
    { id: 2, title: "School Building", goal: "15 ETH", description: "Help build a school for children." },
    { id: 3, title: "Medical Aid", goal: "8 ETH", description: "Support medical treatment for patients." },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {projects.map((p) => (
        <div key={p.id} className="border p-4 rounded shadow hover:shadow-lg bg-white">
          <h3 className="text-xl font-bold">{p.title}</h3>
          <p className="text-gray-600">{p.description}</p>
          <p className="mt-2 font-semibold">Goal: {p.goal}</p>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            View Details
          </button>
        </div>
      ))}
    </div>
  );
}
