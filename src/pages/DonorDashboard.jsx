import ProjectList from "../components/ProjectList";

export default function DonorDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Donor Dashboard</h1>
      <p className="mb-4 text-gray-600">
        Welcome, donor! Here you can browse projects, contribute, approve requests, or request refunds.
      </p>

      {/* Browse all projects */}
      <ProjectList />
    </div>
  );
}
