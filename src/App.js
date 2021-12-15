
import Header from './components/Header';
import Footer from './components/Footer';
import FetchData from './components/FetchData';

function App() {
  return (
    <div className="weather-app">
      <Header/>
      <FetchData />
      <Footer/>
    </div>
  );
}

export default App;
