import React from 'react';
import HeroSection from "./Components/herosection";
import ServicesSection from "./Components/Services";
import FAQSection from "./Components/Faq";
import TestimonialsSection from "./Components/newtestimonial";
import ProjectSection from "./Components/newourworks";
import Blogs from "./Components/Blogs";
import Clients from "./Components/Clients";
import SmoothScroll from "./Components/SmoothScroll";

export default function Home() {
  return (
    <div className="will-change-transform">
      <SmoothScroll>
        <HeroSection />
        <ServicesSection />
        <ProjectSection />
        <TestimonialsSection />
        <Clients />
        <FAQSection />
        <Blogs />
      </SmoothScroll>
    </div>
  );
}
