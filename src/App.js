import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useState } from 'react';
import RefrshHandle from './RefrshHandler';
import { Container } from 'react-bootstrap';
import Home from './components/Home';
import Store from './components/Store';
import Navbar from './components/Navbar';
import About from './components/About';
import ShoppingCartProvider from "./context/ShoppingCartContext";

function App() {
  const [isAthenticated, setIsAuthenticated] = useState(false);
  
  const PrivateRoute = ({ element }) => {
    return isAthenticated ? element : <Navigate to="/login" />;
  };

  // Layout pour les routes authentifiées (avec Navbar)
   const AuthenticatedLayout = () => (
    <ShoppingCartProvider>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <Container fluid style={{ 
          flex: 1,
          padding: '1rem',
          maxWidth: '100%',
          marginTop: '0' 
        }}>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/store" element={<Store />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Container>
      </div>
    </ShoppingCartProvider>
  );

  return (
    <div className="App">
      <RefrshHandle setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Toutes les routes protégées */}
        <Route 
          path="/*" 
          element={<PrivateRoute element={<AuthenticatedLayout />} />} 
        />
      </Routes>
    </div>
  );
}

export default App;