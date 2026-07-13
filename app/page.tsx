import type { Metadata } from "next";
import { EvoluraLanding } from "./EvoluraLanding";

export const metadata: Metadata = {
  title: {
    absolute: "Evolura Technical Services | Cleaning & Maintenance in Dubai",
  },
  description:
    "Professional cleaning, facility maintenance, MEP, HVAC and emergency repair services for well-maintained spaces across Dubai.",
};

export default function Home() {
  return <EvoluraLanding />;
}
