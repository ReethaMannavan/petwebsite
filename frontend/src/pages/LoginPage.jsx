
import Footer from "../components/home/Footer";
import Navbar from "../components/home/Navbar";
import Login from "../components/login/Login";


const LoginPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
 <Navbar/>
      <main className="flex-grow">
      <Login/>
      </main>
   
    <Footer/>
    </div>
  );
};

export default LoginPage;
