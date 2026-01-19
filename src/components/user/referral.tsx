"use client";
import { useUserStore } from "@/store/user.store";
import { Copy, TrendingUp, Users, CheckCircle, Link2 } from "lucide-react";
import { useState } from "react";

export function ReferralTracking() {
  const [copied, setCopied] = useState(false);

  const { data, isLoading, isFetching } = useUserStore();
  const handleCopy = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stats = [
    {
      label: "Total Referrals",
      value: "24",
      icon: Users,
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "Successful Conversions",
      value: "12",
      icon: CheckCircle,
      color: "bg-green-100 text-green-600",
    },
    {
      label: "This Month",
      value: "8",
      icon: TrendingUp,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
          Your Performance
        </h3>
        <p className="text-gray-600">
          Track your referrals and share your unique link
        </p>
      </div>

      <div className="bg-burgundy/10 rounded-xl p-6 ">
        <div className="flex items-center space-x-2 mb-3">
          <Link2 className="w-5 h-5 text-orange-600" />
          <h4 className="font-semibold text-gray-900">
            Your Personal Referral Link
          </h4>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Share this link with potential students to track your referrals
        </p>
        <div className="flex items-center flex-col  md:flex-row gap-3 w-full ">
          <div className="w-full flex-1 bg-white rounded-lg px-4 py-3 border border-gray-200 flex items-center justify-between">
            <span className="text-sm text-gray-700 font-mono truncate">
              {data?.referralCode}
            </span>
          </div>
          <button
            onClick={() => handleCopy(data?.referralCode || "")}
            className="flex items-center w-full md:w-fit space-x-2 px-6 py-3 bg-burgundy text-white rounded-lg  transition-colors font-medium whitespace-nowrap"
          >
            {copied ? (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Link</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
