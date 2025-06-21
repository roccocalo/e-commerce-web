import React from 'react';

const CartItem = ({ item, updateQuantity, removeFromCart }) => {
  return (
    <div className="card mb-3 cart-item border-0">
      <div className="row g-0 align-items-center p-2">
        <div className="col-md-2">
          <img 
            src={item.image} 
            alt={item.title} 
            className="img-fluid rounded"
            style={{ height: '80px', objectFit: 'cover' }}
          />
        </div>
        <div className="col-md-6">
          <div className="card-body">
            <h5 className="card-title">{item.title}</h5>
            <p className="card-text fw-bold" style={{ color: 'var(--accent-color)' }}>€{item.price.toFixed(2)}</p>
          </div>
        </div>
        <div className="col-md-2">
          <div className="input-group">
            <button 
              className="btn btn-sm btn-outline-secondary" 
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
            >
              -
            </button>
            <span className="input-group-text bg-white border-0">{item.quantity}</span>
            <button 
              className="btn btn-sm btn-outline-secondary" 
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
            >
              +
            </button>
          </div>
        </div>
        <div className="col-md-2 text-end">
          <button 
            className="btn btn-remove rounded-circle"
            onClick={() => removeFromCart(item.id)}
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;