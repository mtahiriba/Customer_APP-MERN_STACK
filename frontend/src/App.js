import './App.css';
import { Route, Routes } from 'react-router-dom';
import { AsideBar } from './components';
import { Dashboard, CustomerForm } from './pages';

function App() {
  return (
    <div>
      <div>
        <AsideBar />
      </div>
      <div>
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/customer-form" element={<CustomerForm/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
