"use client";

import { redirect } from "next/navigation";
import { type ReactNode } from "react";

import { authClient } from "@/lib/auth-client";

interface WithAuthenticationProps {
  children: ReactNode;
  mustHaveClinic?: boolean;
  mustHavePlan?: boolean;
}

export default function WithAuthentication({
  children,
  mustHaveClinic,
  mustHavePlan,
}: WithAuthenticationProps) {
  const session = authClient.useSession();

  if (!session?.user) {
    redirect("/authentication");
  }

  if (mustHaveClinic && !session.user.clinic) {
    redirect("/clinic-form");
  }

  if (mustHavePlan && !session.user.plan) {
    redirect("/new-subscription");
  }

  return <>{children}</>;
}
