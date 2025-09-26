import FeaturedProducts from "../components/home/FeaturedProducts";
import Footer from "../components/home/Footer";
import HeroSection from "../components/home/HeroSection";
import HomepageSections from "../components/home/HomePageSections";
import Navbar from "../components/home/Navbar";
import ShopByPet from "../components/home/ShopByPet";



const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
 <Navbar/>
      <main className="flex-grow">
        <HeroSection/>
      <ShopByPet/>
      <FeaturedProducts/>
      <HomepageSections/>
      </main>
    
    <Footer/>
    </div>
  );
};

export default HomePage;
