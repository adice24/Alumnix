import { Inter, Outfit } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

export const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
});

// Primary Professional Font Exports
export const nunito = inter; // Maintenance alias for existing components
export const syne = outfit; // Maintenance alias for dashboard typography
export const displayFont = outfit;
export const bodyFont = inter;


