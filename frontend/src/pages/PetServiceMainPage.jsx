import PetServicePage from "../components/categories/PetServicePage";
import Footer from "../components/home/Footer";
import Navbar from "../components/home/Navbar";
import ProductListPage from "../components/product/ProductListPage";


const PetServiceMainPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
 <Navbar/>
      <main className="flex-grow">
      
      </main>
    <PetServicePage/>
    <Footer/>
    </div>
  );
};

export default PetServiceMainPage;
