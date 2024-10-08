import './Main.css';
import '../../index.css';
import Header from './Components/Header';
import SearchBar from './Components/SearchBar';
import Filter from './Components/Filter';

const Main = () => {
  return (
    <div>
      <Header/>
      <SearchBar/>
      <Filter/>
    </div>
  );
};

export default Main;
