import './Main.css';

import Header from '../Headers/Header';
import SearchBar from '../Headers/SearchBar';
import Content from './Components/Content';
import Categories from './Components/Categories';
import Menu from './Components/Menu';
import PageRouter from './Components/PageRouter';


const Main = () => {
  const currentUrl = window.location.href;
  if(currentUrl === 'http://localhost:3000/'){
    return (
      <div>
        <Header/>
        <SearchBar/>
        <div className='main-container'>
          <Menu/>
          <div className='main-bar'>
            <PageRouter/>
            <Categories/>
          </div>
        </div>
        
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
          <div className='main-container'>
            <Menu/>
            <Categories/>
          </div>
          {/* <Categories/> */}
          {/* <SubCategories/> */}
          <Content/> 
        </div>
      );
     
  }
};

export default Main;
