import './Main.css';

import Header from '../Headers/Header';
import SearchBar from '../Headers/SearchBar';
import Content from './Components/Content';
import Categories from './Components/Categories';


const Main = () => {
  const currentUrl = window.location.href;
  if(currentUrl === 'http://localhost:3000/'){
    return (
      <div>
        <Header/>
        <SearchBar/>
        <Categories/>
        {/* <SubCategories/> */}
        {/* <Content/>  */}
        </div>
      );
    }
    else{
      return(
        <div>
          <Header/>
          <SearchBar/>
          {/* <Categories/> */}
            {/* <SubCategories/> */}
          <Content/> 
        </div>
      );
     
  }
};

export default Main;
