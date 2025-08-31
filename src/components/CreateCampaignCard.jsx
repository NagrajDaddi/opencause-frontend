import ThreeBackground from "./ThreeBackground";

export default function CreateCampaignCard() {
  return (
    <div className="relative how-card glassy-card overflow-hidden min-h-[280px]">
      {/* Background */}
      <div className="absolute inset-0 opacity-30">
        <ThreeBackground mode="campaign" />
      </div>

      {/* Foreground */}
      <div className="relative z-10 content text-center p-6">
        <h3 className="text-3xl md:text-4xl font-extrabold text-blue-600">
          📌 Create a Campaign
        </h3>
        <p className="mt-4 text-lg">
          Start in minutes with a compelling story, clear goal and media. Share your campaign and begin receiving donations.
        </p>
      </div>
    </div>
  );
}
