import React from 'react';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const calculateTotal = () => {
    if (!cartItems) return 0;
    return cartItems.reduce((total, item) => {
      const price = item.product ? item.product.price : 0;
      return total + (price * item.quantity);
    }, 0);
  };

  const handleCheckout = async () => {
    try {
      await clearCart();
      alert('Checkout effettuato con successo!');
    } catch (error) {
      console.error('Errore durante il checkout:', error);
      alert('Si è verificato un errore durante il checkout');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Il tuo carrello</h2>
      {cartItems && cartItems.length > 0 ? (
        <>
          <div className="list-group mt-4">
            {cartItems.map((item) => (
              <div key={item.product._id} className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="mb-1">{item.product.name || item.product.title}</h5>
                    <p className="mb-1">Quantità: {item.quantity}</p>
                    <p className="mb-0">Prezzo: €{item.product.price.toFixed(2)}</p>
                  </div>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeFromCart(item.product._id)}
                  >
                    Rimuovi
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 d-flex justify-content-between align-items-center">
            <h4>Totale: €{calculateTotal().toFixed(2)}</h4>
            <button 
              className="btn btn-success btn-lg"
              onClick={handleCheckout}
            >
              Procedi al Checkout
            </button>
          </div>
        </>
      ) : (
        <div className="alert alert-info mt-4">
          Il tuo carrello è vuoto
        </div>
      )}
    </div>
  );
};

export default CartPage;