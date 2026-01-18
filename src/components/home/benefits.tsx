import { MessageSquare, Video, Link2, TrendingUp } from "lucide-react";

export function Benefits() {
  const benefits = [
    {
      icon: MessageSquare,
      title: "Welcome Message",
      description:
        "A personal welcome from the Vedica leadership team to set you up for success",
    },
    {
      icon: Video,
      title: "Ready-to-Use Creatives",
      description:
        "Professional 9:16 creatives (static & video) designed for social media",
    },
    {
      icon: Link2,
      title: "Personal Referral Link",
      description: "Your unique tracking link to share with your network",
    },
    {
      icon: TrendingUp,
      title: "Performance Tracking",
      description: "Real-time dashboard to monitor your impact and earnings",
    },
  ];

  return (
    <section
      id="benefits"
      className="py-24 px-6 bg-linear-to-br from-burgundy/10 via-white to-burgundy/10"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-4">What You'll Receive</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Designed to be simple, transparent, and respectful of your time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-14 h-14 bg-burgundy/80 rounded-xl flex items-center justify-center mb-6">
                <benefit.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl mb-3">{benefit.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
