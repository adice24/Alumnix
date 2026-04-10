"use client";

import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import StatsBar from "@/components/landing/StatsBar";
import AboutUs from "@/components/landing/AboutUs";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorks from "@/components/landing/HowItWorks";
import Testimonials from "@/components/landing/Testimonials";
import AlumniSpotlight from "@/components/landing/AlumniSpotlight";
import CTABanner from "@/components/landing/CTABanner";
import Footer from "@/components/landing/Footer";
import { Meteors } from "@/components/ui/meteors";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen bg-white selection:bg-brand-orange/30">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <Meteors number={150} />
      </div>
      <Navbar />
      <HeroSection />
      <StatsBar />
      <AboutUs />
      <FeaturesSection />
      <HowItWorks />
      <Testimonials />
      <AlumniSpotlight />
      <CTABanner />
      <Footer />
    </main>
  );
}

