import CreateProject from "../components/CreateProject";
import CreateRequest from "../components/CreateRequest";

export default function BeneficiaryDashboard() {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Beneficiary Dashboard</h1>
      <p className="text-gray-600">
        Welcome, beneficiary! Here you can create new projects and submit spending requests.
      </p>

      {/* Create new project form */}
      <CreateProject />

      {/* Create request form */}
      <CreateRequest />
    </div>
  );
}
