
import Footer from "../components/home/Footer";
import Navbar from "../components/home/Navbar";
import SearchPage from "../components/home/SearchPage";



const SearchMainPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
 <Navbar/>
      <main className="flex-grow">
      <SearchPage/>
      </main>
   
    <Footer/>
    </div>
  );
};

export default SearchMainPage;
