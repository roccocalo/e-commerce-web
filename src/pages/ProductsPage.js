import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import axios from 'axios';

const ProductsPage = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCandles = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('https://e-commerce-fs95.onrender.com/api/candles');
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (err) {
        setError('Errore nel caricamento delle candele');
        setLoading(false);
        console.error('Error fetching candles:', err);
      }
    };

    fetchCandles();
  }, []);

  useEffect(() => {
    let result = [...products];
    
    if (category !== 'all') {
      result = result.filter(product => product.category === category);
    }
    
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredProducts(result);
  }, [category, searchTerm, products]);

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Le Nostre Candele</h1>
      
      <div className="row mb-4 justify-content-center">
        <div className="col-md-6">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Cerca candele..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <select 
            className="form-select"
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">Tutte le categorie</option>
            <option value="profumata">Profumate</option>
            <option value="decorativa">Decorative</option>
            <option value="votiva">Votive</option>
            <option value="tealight">Tealight</option>
            <option value="galleggiante">Galleggianti</option>
            <option value="pilastro">Pilastro</option>
            <option value="cera di soia">Cera di soia</option>
            <option value="cera d'api">Cera d'api</option>
          </select>
        </div>
      </div>
      
      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Caricamento...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <div className="row justify-content-center">
          {filteredProducts.length === 0 ? (
            <div className="col-12 text-center">
              <p>Nessuna candela trovata</p>
            </div>
          ) : (
            filteredProducts.map(product => (
              <div className="col-md-4 col-lg-3 mb-4" key={product._id}>
                <ProductCard 
                  product={{
                    id: product._id,
                    title: product.name,
                    price: product.price,
                    category: product.category,
                    image: product.image,
                    description: product.description,
                    burnTime: product.burnTime
                  }} 
                  addToCart={addToCart} 
                />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;