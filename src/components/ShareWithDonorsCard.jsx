import ThreeBackground from "./ThreeBackground";

export default function ShareWithDonorsCard() {
  return (
    <div className="relative how-card glassy-card overflow-hidden min-h-[280px]">
      <div className="absolute inset-0 opacity-60">
        <ThreeBackground mode="donors" />
      </div>
      <div className="relative z-10 content text-center p-6">
        <h3 className="text-3xl md:text-4xl font-extrabold text-blue-600">
          🤝 Share with Donors
        </h3>
        <p className="mt-4 text-lg">
          Amplify reach — share across social, email and communities. Donors can contribute instantly and securely.
        </p>
      </div>
    </div>
  );
}
