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
  
  // 1. ESTADO PARA EL BUSCADOR
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const addOrUpdateItem = (value) => {
    if (itemToEdit) {
      setItems(items.map(item => item.id === itemToEdit.id ? { ...item, value } : item));
      setItemToEdit(null);
    } else {
      // Le agregamos "completada: false" por defecto a las tareas nuevas
      setItems([...items, { id: Date.now(), value, completada: false }]);
    }
  };

  const deleteItem = (id) => {
    const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este elemento?");
    if (confirmar) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const editItem = (item) => {
    setItemToEdit(item);
  };

  // 2. FUNCIÓN PARA MARCAR/DESMARCAR TAREAS
  const toggleComplete = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completada: !item.completada } : item
    ));
  };

  // 3. FUNCIÓN PARA BORRAR TODO
  const clearAll = () => {
    if (items.length === 0) return;
    const confirmar = window.confirm("⚠️ ¿Estás seguro de que quieres BORRAR TODO el contenido? Esta acción no se puede deshacer.");
    if (confirmar) {
      setItems([]); // Vaciamos el array del estado, y useEffect limpiará el localStorage
    }
  };

  // 4. LÓGICA DEL BUSCADOR (Filtramos antes de mostrarlos)
  const itemsFiltrados = items.filter(item => 
    item.value.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="app-container">
      <h1 className="app-title">CRUD con LocalStorage</h1>
      
      <p className="item-counter">Total: {items.length}</p>

      {/* INPUT DEL BUSCADOR */}
      <input 
        type="text"
        className="search-input"
        placeholder="🔍 Buscar elemento..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <Form addOrUpdateItem={addOrUpdateItem} itemToEdit={itemToEdit} />
      
      {/* OJO: Aquí pasamos itemsFiltrados en vez de items */}
      <List 
        items={itemsFiltrados} 
        deleteItem={deleteItem} 
        editItem={editItem} 
        toggleComplete={toggleComplete} 
      />

      {/* BOTÓN BORRAR TODO (Solo aparece si hay elementos guardados) */}
      {items.length > 0 && (
        <button className="btn-clear-all" onClick={clearAll}>
          🗑️ Borrar Todos Los Elementos
        </button>
      )}
    </div>
  );
}

export default App;