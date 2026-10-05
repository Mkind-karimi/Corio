import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import DiscountSection from "@/components/DiscountSection";
import BestSellers from "@/components/BestSellers";
import CustomSection from "@/components/CustomSection";
import LoyaltyBanner from "@/components/LoyaltyBanner";
import TrustFeatures from "@/components/TrustFeatures";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <main >
      <Header />
      <Hero />
      <Categories />
       <DiscountSection />
         <BestSellers />
         <CustomSection />
         <LoyaltyBanner />
         <TrustFeatures />
         <Footer />
    </main>
  );
}