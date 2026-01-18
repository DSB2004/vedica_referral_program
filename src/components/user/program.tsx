import { BookOpen, Gift, Users, Target } from "lucide-react";

const benefits = [
  {
    icon: BookOpen,
    title: "Exclusive Resources",
    description:
      "Access to premium content, marketing materials, and training sessions",
  },
  {
    icon: Gift,
    title: "Earn Rewards",
    description:
      "Get rewarded for every successful referral and milestone achieved",
  },
  {
    icon: Users,
    title: "Community Access",
    description:
      "Join a network of passionate ambassadors and connect with leaders",
  },
  {
    icon: Target,
    title: "Track Your Impact",
    description: "Real-time analytics to monitor your performance and growth",
  },
];

export function ProgramOverview() {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
          Program Overview
        </h3>
        <p className="text-gray-600">
          Everything you need to succeed as a Vedica Scholars Ambassador
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="flex space-x-4 p-5 rounded-xl bg-gray-50 hover:bg-burgundy/10 transition-colors border border-transparent hover:border-burgundy"
          >
            <div className="shrink-0">
              <div className="w-12 h-12 bg-burgundy rounded-lg flex items-center justify-center">
                <benefit.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">
                {benefit.title}
              </h4>
              <p className="text-sm text-gray-600">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
