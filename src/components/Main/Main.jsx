import './Main.css';

import Header from '../Headers/Header';
import SearchBar from '../Headers/SearchBar';
import Content from './Components/Content';

const Main = () => {
  return (
    <div>
      <Header/>
      <SearchBar/>
      <Content/>
    </div>
  );
};

export default Main;
