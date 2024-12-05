import Footer from './components/Footer';
import Header from './components/Header';
import PostDetail from './pages/PostDetail';
import PostList from './pages/PostList';
import CategoryPosts from './pages/CategoryPosts'
import {BrowserRouter,Routes,Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
	  	<Header/>
			<Routes>
				<Route path='/' element={<PostList/>} />
				<Route path='/post/:id' element={<PostDetail/>} />
        <Route path='/posts/category/:id' element={<CategoryPosts/>} />
			</Routes>
		<Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
