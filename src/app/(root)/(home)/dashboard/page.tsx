"use client";

import Header from "@/components/user/header";
import FeedSection from "@/components/user/feed";
import { ProgramOverview } from "@/components/user/program";
import { WelcomeMessage } from "@/components/user/welcome";
import { ReferralTracking } from "@/components/user/referral";
import { useUserStore } from "@/store/user.store";

export default function Page() {
  const { isLoading, isFetching, data } = useUserStore();

  if (isLoading || isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <>
      <Header />
      <div className="min-w-80 my-10 mx-auto max-w-[80%] flex flex-col gap-10">
        <WelcomeMessage />
        <ProgramOverview />
        <ReferralTracking />
      </div>
      <FeedSection />
    </>
  );
}
