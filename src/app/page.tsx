import Hero from "@/components/Hero";
import AboutUs from "@/components/AboutUs";
import FeaturedProperties from "@/components/FeaturedProperties";
import TopListings from "@/components/TopListings";
import PrimeLocations from "@/components/PrimeLocations";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-neutral-50 p-2 flex flex-col gap-2 box-border">
      <div className="w-full min-h-[640px] md:min-h-[700px] lg:h-[calc(100vh-1rem)] lg:min-h-[720px] flex flex-col flex-shrink-0">
        <Hero />
      </div>
      <AboutUs />
      <FeaturedProperties />
      <TopListings />
      <PrimeLocations />
      <WhyUs />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}


