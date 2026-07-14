import type { MetadataRoute } from "next";
import { BUSINESS } from "./site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BUSINESS.name,
    short_name: "Evolura",
    description:
      "Commercial cleaning and building maintenance services in Dubai and across the UAE.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#031a2b",
    icons: [
      {
        src: "/evolura-mark-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/evolura-mark.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
