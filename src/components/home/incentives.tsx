import { Gift, Users, FileCheck, CheckCircle2 } from "lucide-react";

export function IncentivesSection() {
  const rewards = [
    {
      icon: Users,
      milestone: "20 registrations referred",
      reward: "₹500 Amazon voucher",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: FileCheck,
      milestone: "5 completed applications",
      reward: "₹1,000 Amazon voucher",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: CheckCircle2,
      milestone: "1 confirmed admission (token submitted)",
      reward: "Reward worth ₹5,000",
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section className="px-6 py-20 bg-burgundy text-white">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <div className="mb-4 inline-flex items-center gap-2">
            <Gift className="w-8 h-8" />
          </div>
          <h2 className="mb-4 text-3xl md:text-4xl">Your effort is valued.</h2>
          <p className="text-xl text-gold">
            Ambassadors are rewarded at meaningful milestones:
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {rewards.map((reward, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-all"
            >
              <div
                className={`w-16 h-16 bg-linear-to-br ${reward.color} rounded-xl flex items-center justify-center mb-6 shadow-lg`}
              >
                <reward.icon className="w-8 h-8 text-white" />
              </div>

              <div className="mb-4">
                <p className="text-lg text-gold mb-2">{reward.milestone}</p>
                <p className="text-2xl">{reward.reward}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gold text-sm">
            (Exact incentives may evolve as the program grows.)
          </p>
          <p className="mt-4 text-lg">
            This structure recognises follow-through, not just sharing.
          </p>
        </div>

        <div className="mt-16 text-center">
          <a href="/register">
            <button className="bg-white text-black hover:bg-gold hover:text-white px-10 py-4 rounded-lg text-xl font-medium transition-all shadow-xl hover:shadow-2xl">
              Start Your Ambassador Journey
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}
