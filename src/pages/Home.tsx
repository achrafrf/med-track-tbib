
import { Navbar } from "@/components/home/Navbar";
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { Testimonials } from "@/components/home/Testimonials";
import { Contact } from "@/components/home/Contact";
import { Footer } from "@/components/home/Footer";
import BackToTop from "@/components/home/BackToTop";

export default function Home() {
  return (
    <div id="home" className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      <Contact />
      <BackToTop />
      <Footer />
    </div>
  );
}
