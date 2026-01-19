"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "../../ui/checkbox";

export default function Published() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const param = searchParams.get("onlyPublished");
    setChecked(param === "true");
  }, [searchParams]);

  const handleChange = (value: boolean) => {
    setChecked(value);

    const params = new URLSearchParams(searchParams.toString());

    params.set("onlyPublished", value ? "true" : "false");

    router.replace(`${window.location.pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <Checkbox
        checked={checked}
        onCheckedChange={(val) => handleChange(!!val)}
      />
      <div className="text-sm text-nowrap">Show only Published</div>
    </div>
  );
}
