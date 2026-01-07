'use client';
import HeroSection from "./Components/Home";
import ServicesSection from "./Components/Services";
import WhyChooseSection from "./Components/Whyus";
import FAQSection from "./Components/Faq";
import TestimonialsSection from "./Components/Testimonials";
import Footer from "./Components/Footer";
import ProjectSection from "./Components/Ourworks";
import Blogs from "./Components/Blogs";
import Clients from "./Components/Clients";


export default function Home() {
  return (
 <>
 <HeroSection />
 <ServicesSection />
<WhyChooseSection />
<ProjectSection />
<TestimonialsSection />
<Clients />
<FAQSection />
<Blogs />
<Footer />
 </>
  );
}
