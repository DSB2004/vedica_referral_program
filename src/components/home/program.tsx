import { Users, Share2, Award, Link2 } from "lucide-react";

export function ProgramSection() {
  const features = [
    {
      icon: Users,
      title: "Represent a women-led leadership institution",
    },
    {
      icon: Share2,
      title: "Share meaningful opportunities within their networks",
    },
    {
      icon: Award,
      title: "Be rewarded for real outcomes, not noise",
    },
  ];

  return (
    <section className="px-6 py-20 bg-linear-to-br from-burgundy/10 via-white to-burgundy/10 ">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="mb-4 text-3xl md:text-4xl text-gray-900">
            A referral programme with purpose.
          </h2>
          <p className="text-xl text-gray-700">
            The Vedica Scholars Ambassador Program is designed for students and
            young leaders who want to:
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-burgundy/10 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-burgundy" />
              </div>
              <p className="text-lg text-gray-800">{feature.title}</p>
            </div>
          ))}
        </div>

        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-md">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-burgundy/10 rounded-full flex items-center justify-center shrink-0 mt-1">
                <Link2 className="w-5 h-5 text-burgundy" />
              </div>
              <p className="text-lg text-gray-700">
                You receive curated, easy-to-share content and a personal
                referral link.
              </p>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-burgundy/10 rounded-full flex items-center justify-center shrink-0 mt-1">
                <Award className="w-5 h-5 text-burgundy" />
              </div>
              <p className="text-lg text-gray-700">
                When someone applies through your referral, you move closer to
                rewards—while helping another woman take her next step.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
