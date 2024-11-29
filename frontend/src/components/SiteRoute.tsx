import { Routes, Route } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import ProtectedRoute from './ProtectedRoute';
import { Register } from './Register';
import { Login } from './Login';
import { Vecations } from './Vecations';
import VecationGraph from './VecationGraph';


export const SiteRoute = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path="/progress" element={<ProgressBar duration={6000} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/vecation-graph" element={<VecationGraph />} />
        <Route 
          path='/vecations' 
          element={
            <ProtectedRoute>
              <Vecations/>
            </ProtectedRoute>
          } 
        />
      </Routes>
    </div>
  );
};
