import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import { Spinner } from 'react-bootstrap';

function Home() {
    const [loggedInUser, setLoggedInUser] = useState('');
    const [products, setProducts] = useState([]); // Initialiser comme tableau vide
    const [loading, setLoading] = useState(true); // État de chargement
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem('loggedInUser'));
    }, []);

    const handleLogout = (e) => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSuccess('User Logged out');
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };

    const fetchProducts = async () => {
        try {
            const url = "http://localhost:8000/products";
            const headers = {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            };
            const response = await fetch(url, headers);
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const result = await response.json();
            
            // Vérifier que result est bien un tableau
            if (Array.isArray(result)) {
                setProducts(result);
            } else {
                console.error('Expected array but got:', result);
                setProducts([]); // Définir comme tableau vide si ce n'est pas un tableau
            }
        } catch (err) {
            handleError(err);
            setProducts([]); // En cas d'erreur, définir comme tableau vide
        } finally {
            setLoading(false); // Arrêter le chargement dans tous les cas
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="main-content">
      <h1>Welcome {loggedInUser}</h1>
      <button onClick={handleLogout} className="btn btn-danger mb-4">
        Logout
      </button>
      
      <div className="product-grid">
        {products.map((item, index) => (
          <div key={index} className="card">
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <p className="card-text">Price: {item.price} $</p>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Home;