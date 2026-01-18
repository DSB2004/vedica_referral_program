import {
  UserPlus,
  Package,
  MessageCircle,
  BarChart3,
  Gift,
} from "lucide-react";

export function ProcessSection() {
  const steps = [
    {
      icon: UserPlus,
      title: "Join the Program",
      description:
        "Sign up as a Vedica Scholars Ambassador through this platform.",
    },
    {
      icon: Package,
      title: "Get Your Ambassador Kit",
      description:
        "Access shareable content, your referral link, and clear guidance—all in one dashboard.",
    },
    {
      icon: MessageCircle,
      title: "Share with Intent",
      description:
        "Use stories, reels, WhatsApp messages, or in-person conversations to introduce Vedica to women who would benefit from it.",
    },
    {
      icon: BarChart3,
      title: "Track Your Impact",
      description:
        "Every referral is tracked transparently through your dashboard.",
    },
    {
      icon: Gift,
      title: "Get Rewarded",
      description:
        "You earn incentives as your referrals progress—from registration to application to confirmed admission.",
    },
  ];

  return (
    <section id="process" className="px-6 py-20 bg-white">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="mb-4 text-3xl md:text-4xl text-gray-900">
            Your journey as an Ambassador
          </h2>
        </div>

        <div className="relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute left-12 top-0 bottom-0 w-0.5 bg-linear-to-b from-burgundy/20 via-burgundy/30 to-burgundy/20"></div>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="relative flex gap-6 md:gap-8">
                {/* Step number and icon */}
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-24 h-24 bg-burgundy rounded-2xl flex items-center justify-center shadow-lg relative z-10">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="mt-2 text-sm font-semibold text-burgundy">
                    Step {index + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-2">
                  <h3 className="mb-2 text-2xl text-gray-900">{step.title}</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
