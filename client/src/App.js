import {Routes, Route} from 'react-router-dom'
import Campgrounds from './components/Campgrounds';
import Campground from './components/Campground';
import NewCampground from './components/NewCampground';
import EditCampground from './components/EditCampground';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/campgrounds" element={<Campgrounds />} />
        <Route path="/campgrounds/new" element={<NewCampground/>} />
        <Route path="/campgrounds/:id" element={<Campground />} />
        <Route path="/campgrounds/:id/edit" element={<EditCampground />} />
      </Routes>
    </div>
  );
}

export default App;
