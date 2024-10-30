import './App.css';
import Footer from './components/UI/Footer';
import Navbar from "./components/pages/Navbar"


function App({children}) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

export default App;
