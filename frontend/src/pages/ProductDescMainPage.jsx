import Footer from "../components/home/Footer";
import Navbar from "../components/home/Navbar";
import ProductDescriptionPage from "../components/product/ProductDescriptionPage";



const ProductDescMainPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
 <Navbar/>
      <main className="flex-grow">
      
      </main>
     <ProductDescriptionPage/>
    <Footer/>
    </div>
  );
};

export default ProductDescMainPage;
