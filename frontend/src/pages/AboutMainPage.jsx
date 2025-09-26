import AboutPage from "../components/about/AboutPage";
import Footer from "../components/home/Footer";
import Navbar from "../components/home/Navbar";


const AboutMainPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
 <Navbar/>
      <main className="flex-grow">
      
      </main>
    <AboutPage/>
    <Footer/>
    </div>
  );
};

export default AboutMainPage;
