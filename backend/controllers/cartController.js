const Cart = require('../models/cartModel');

const getCart = async (req, res) => {
  try {
    console.log('User ID per ricerca carrello:', req.user._id);
    
    let cart = await Cart.findOne({ user: req.user._id })
                        .populate({
                          path: 'items.product',
                          select: 'name price image description category burnTime' // Cambiato 'title' in 'name'
                        });
        
    if (!cart) {
      console.log('Nessun carrello trovato, ne creo uno nuovo');
      cart = await Cart.create({
        user: req.user._id,
        items: []
      });
    }
    
    if (!cart.items || cart.items.length === 0) {
      return res.status(200).json({ items: [] });
    }
    
    res.status(200).json(cart);
  } catch (error) {
    console.error('Errore dettagliato:', error);
    res.status(500).json({ 
      message: 'Errore nel recupero del carrello',
      error: error.message 
    });
  }
};

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    let cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [{ product: productId, quantity }]
      });
    } else {
      const existingItem = cart.items.find(
        item => item.product.toString() === productId
      );
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
      
      await cart.save();
    }
    
    await cart.populate('items.product');
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Errore nell\'aggiunta al carrello' });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    
    const cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
      return res.status(404).json({ message: 'Carrello non trovato' });
    }
    
    cart.items = cart.items.filter(
      item => item.product.toString() !== productId
    );
    
    await cart.save();
    await cart.populate('items.product');
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Errore nella rimozione dal carrello' });
  }
};

const clearCart = async (req, res) => {
  try {
    const userId = req.user._id;
    
    const cart = await Cart.findOne({ user: userId });
    
    if (!cart) {
      return res.status(404).json({ message: 'Carrello non trovato' });
    }
    
    cart.items = [];
    await cart.save();
    
    res.status(200).json({ message: 'Carrello svuotato con successo', cart });
  } catch (error) {
    console.error('Errore nello svuotamento del carrello:', error);
    res.status(500).json({ message: 'Errore del server' });
  }
};

module.exports = { getCart, addToCart, removeFromCart, clearCart };