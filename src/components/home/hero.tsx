"use client";

import { ArrowRight, BookOpen } from "lucide-react";

const Hero = () => {
  return (
    <>
      <section
        id="hero"
        className="relative  px-4 flex flex-col items-center justify-center bg-linear-to-br from-burgundy/10 via-white to-burgundy/10 min-h-screen"
      >
        <div className="flex flex-col items-center justify-center -translate-y-6">
          <div className="mb-6 inline-block rounded-full bg-burgundy/20 text-burgundy px-4 py-2 text-sm font-medium text-center ">
            VEDICA SCHOLARS AMBASSADOR PROGRAM
          </div>{" "}
          <h1 className="mb-6 text-4xl md:text-6xl lg:text-7xl tracking-tight  text-center">
            Lead the change.
            <br />
            <span className="bg-linear-to-r from-burgundy-dark to-burgundy-light bg-clip-text text-transparent">
              Open doors for other women.
            </span>
          </h1>
          <p className="mb-4 text-2xl md:text-3xl text-gray-800 text-center">
            Become a Vedica Scholars Ambassador
          </p>
          <p className="mx-auto mb-10 max-w-3xl text-lg md:text-xl text-muted-foreground text-center">
            Help ambitious women discover a leadership journey built on
            judgment, confidence, and real-world readiness—and earn rewards
            along the way.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/register">
              <button className="group w-full sm:w-auto bg-burgundy hover:bg-burgundy/90 text-white px-8 py-4 rounded-lg text-lg font-medium transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                Apply as an Ambassador
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </a>
            <a href="#process">
              <button className="w-full sm:w-auto bg-white hover:bg-gray-50 text-burgundy px-8 py-4 rounded-lg text-lg font-medium transition-all flex items-center justify-center gap-2 border-2 border-burgundy">
                <BookOpen className="w-5 h-5" />
                How the Program Works
              </button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
