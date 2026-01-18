"use client";

import { useUserStore } from "@/store/user.store";
import { Sparkles } from "lucide-react";

export function WelcomeMessage() {
  const { data, isLoading, isFetching } = useUserStore();
  return (
    <div className="bg-burgundy  rounded-2xl p-8 text-white shadow-lg ">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-4">
            <Sparkles className="w-6 h-6" />
            <span className="text-sm font-medium opacity-90">
              Welcome to the Team
            </span>
          </div>
          <h2 className="text-3xl font-bold mb-3">Welcome, {data?.name}</h2>
          <p className="text-orange-50 text-lg leading-relaxed max-w-3xl">
            We're thrilled to have you join the Vedica Scholars Ambassador
            Program. Your passion for education and community will help us reach
            more students and transform lives through accessible learning.
            Everything you need to succeed is right here—let's make an impact
            together.
          </p>
          {/* <div className="mt-6 flex items-center space-x-3">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 rounded-full bg-white/20 border-2 border-white"></div>
              <div className="w-10 h-10 rounded-full bg-white/20 border-2 border-white"></div>
              <div className="w-10 h-10 rounded-full bg-white/20 border-2 border-white"></div>
            </div>
            <p className="text-sm text-orange-50">
              <span className="font-semibold">The Vedica Leadership Team</span>
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}
