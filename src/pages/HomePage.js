import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="container py-5">
      <div className="hero-section text-center">
        <h1 className="display-4 mb-3">Accendi la magia in ogni momento</h1>
        <p className="lead text-muted mb-4">Esplora tutte le nostre candele</p>
        <Link to="/products" className="btn btn-success btn-lg">
          Inizia lo Shopping
        </Link>
      </div>

      <div className="row mt-5">
        <div className="col-md-4 mb-4">
          <div className="card h-100 p-4">
            <h3 className="card-title">Spedizione Veloce</h3>
            <p className="card-text">Consegna in 24/48 ore su tutti i prodotti disponibili.</p>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100 p-4">
            <h3 className="card-title">Pagamenti Sicuri</h3>
            <p className="card-text">Transazioni protette e multiple opzioni di pagamento.</p>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100 p-4">
            <h3 className="card-title">Assistenza Clienti</h3>
            <p className="card-text">Supporto disponibile 7 giorni su 7 per qualsiasi necessità.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;