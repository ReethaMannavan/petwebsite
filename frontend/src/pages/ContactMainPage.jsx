import AboutPage from "../components/about/AboutPage";
import Contact from "../components/contact/Contact";
import Footer from "../components/home/Footer";
import Navbar from "../components/home/Navbar";


const ContactMainPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
 <Navbar/>
      <main className="flex-grow">
      
      </main>
    <Contact/>
    <Footer/>
    </div>
  );
};

export default ContactMainPage;
