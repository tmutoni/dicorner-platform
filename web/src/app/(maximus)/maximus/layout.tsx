import type { Metadata } from "next";
import "@/styles/maximus.css";
import MaximusNav from "@/components/maximus/MaximusNav";
import MaximusFooter from "@/components/maximus/MaximusFooter";

export const metadata: Metadata = {
  title: "Maximus Energy Consultations — Behavioral Energy Intelligence",
  description:
    "Since 2006, Maximus Energy has walked 10,000+ homes to turn comfort into measurable savings. Residential energy, HVAC, and renewables scope development.",
};

export default function MaximusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="maximus-root">
      <MaximusNav />
      <main>{children}</main>
      <MaximusFooter />
    </div>
  );
}
