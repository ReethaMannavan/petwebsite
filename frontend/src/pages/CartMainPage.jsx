
import Footer from "../components/home/Footer";
import Navbar from "../components/home/Navbar";
import CartPage from "../components/product/CartPage";



const CartMainPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
 <Navbar/>
      <main className="flex-grow">
      <CartPage/>
      </main>
   
    <Footer/>
    </div>
  );
};

export default CartMainPage;
