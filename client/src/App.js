import {Routes, Route} from 'react-router-dom'
import Campgrounds from './components/Campgrounds';
import Campground from './components/Campground';
import NewCampground from './components/NewCampground';
import EditCampground from './components/EditCampground';
import NavBar from './components/Layout/NavBar';
import Footer from './components/Layout/Footer';

function App() {
  return (
    <div className='min-h-screen flex flex-col'>
      <NavBar/>
      <Routes>
        <Route path="/campgrounds" element={<Campgrounds />} />
        <Route path="/campgrounds/new" element={<NewCampground/>} />
        <Route path="/campgrounds/:id" element={<Campground />} />
        <Route path="/campgrounds/:id/edit" element={<EditCampground />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
