
import Footer from "../components/home/Footer";
import Navbar from "../components/home/Navbar";
import OrderConfirmationPage from "../components/product/OrderConfirmationPage";



const OrderConfirmationMain = () => {
  return (
    <div className="flex flex-col min-h-screen">
 <Navbar/>
      <main className="flex-grow">
      <OrderConfirmationPage/>
      </main>
   
    <Footer/>
    </div>
  );
};

export default OrderConfirmationMain;
