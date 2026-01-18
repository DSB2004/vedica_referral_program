import { ImageWithFallback } from "../common/imageWithFallback";
import { Check } from "lucide-react";

export function WhoShouldApply() {
  const qualifications = [
    "Believe more women deserve access to leadership education",
    "Are trusted within your college, workplace, or peer network",
    "Prefer meaningful conversations over aggressive selling",
    "Want to earn while standing for something that matters",
  ];

  return (
    <section id="apply" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="relative h-125 rounded-2xl overflow-hidden order-2 lg:order-1">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1758270705482-cee87ea98738?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWdlJTIwc3R1ZGVudHMlMjBjb2xsYWJvcmF0aW9ufGVufDF8fHx8MTc2ODY1ODAzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Students collaborating"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content Side */}
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl mb-6">Who Should Apply</h2>
            <p className="text-xl text-gray-600 mb-8">
              This is for you if you:
            </p>

            <div className="space-y-6">
              {qualifications.map((qual, index) => (
                <div key={index} className="flex gap-4">
                  <div className="shrink-0 w-6 h-6 bg-burgundy rounded-full flex items-center justify-center mt-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {qual}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 p-6 bg-gray-50 rounded-xl border-l-4 border-burgundy">
              <p className="text-gray-700 italic">
                "This isn't about sales—it's about sharing an opportunity you
                genuinely believe in with people who could benefit from it."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
