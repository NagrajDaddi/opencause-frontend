export default function ProjectDetail({ project }) {
  if (!project) return <p>No project selected</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold">{project.title}</h2>
      <p className="text-gray-600 mt-2">{project.description}</p>
      <p className="mt-4 font-semibold">Goal: {project.goal}</p>
      <div className="mt-6 space-x-4">
        <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Contribute
        </button>
        <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
          Approve Request
        </button>
      </div>
    </div>
  );
}
