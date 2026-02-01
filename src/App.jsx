import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Planner from './pages/Planner';
import MenuPage from './pages/Menu';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/menu' element={<MenuPage />} />
        <Route path='/planner' element={<Planner />} />
      </Routes>
    </BrowserRouter>
  );
}
