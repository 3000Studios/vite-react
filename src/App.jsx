import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProjectPlan from './pages/ProjectPlan';
import Planner from './pages/Planner';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ProjectPlan />} />
        <Route path='/plan' element={<ProjectPlan />} />
        <Route path='/planner' element={<Planner />} />
      </Routes>
    </BrowserRouter>
  );
}
