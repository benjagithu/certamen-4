import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import List from './components/List';
import './App.css'; 

function App() {
  const [items, setItems] = useState(() => {
    const storedItems = localStorage.getItem('items');
    return storedItems ? JSON.parse(storedItems) : [];
  });

  const [itemToEdit, setItemToEdit] = useState(null);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const addOrUpdateItem = (value) => {
    if (itemToEdit) {
      setItems(items.map(item => item.id === itemToEdit.id ? { ...item, value } : item));
      setItemToEdit(null);
    } else {
      setItems([...items, { id: Date.now(), value }]);
    }
  };

  // CONFIRMACIÓN AL ELIMINAR
  const deleteItem = (id) => {
    // Esto abre la ventana del navegador. Si el usuario da "Aceptar", confirmar es true.
    const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este elemento?");
    
    if (confirmar) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const editItem = (item) => {
    setItemToEdit(item);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">CRUD con LocalStorage</h1>
      
      {/* CONTADOR DE ELEMENTOS */}
      <p className="item-counter">Total: {items.length}</p>

      <Form addOrUpdateItem={addOrUpdateItem} itemToEdit={itemToEdit} />
      <List items={items} deleteItem={deleteItem} editItem={editItem} />
    </div>
  );
}

export default App;