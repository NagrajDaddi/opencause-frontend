import ThreeBackground from "./ThreeBackground";

export default function TrackOnBlockchainCard() {
  return (
    <div className="relative how-card glassy-card overflow-hidden min-h-[280px]">
      <div className="absolute inset-0 opacity-10">
        <ThreeBackground mode="blockchain" />
      </div>
      <div className="relative z-10 content text-center p-6">
        <h3 className="text-3xl md:text-4xl font-extrabold text-blue-600">
          🔗 Track on Blockchain
        </h3>
        <p className="mt-4 text-lg">
          Every donation and spending request is recorded immutably. Donors can inspect transactions and track funds end-to-end.
        </p>
      </div>
    </div>
  );
}
