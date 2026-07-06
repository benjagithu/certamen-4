import React from 'react';

// Ahora recibimos también la función toggleComplete
function Item({ item, deleteItem, editItem, toggleComplete }) {
  return (
    // Si la tarea está completada, le añadimos la clase 'item-completed'
    <li className={`list-item ${item.completada ? 'item-completed' : ''}`}>
      
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input 
          type="checkbox" 
          className="check-tarea"
          checked={item.completada || false}
          onChange={() => toggleComplete(item.id)}
        />
        <span className="item-text">{item.value}</span>
      </div>

      <div className="action-buttons">
        {/* Desactivamos el botón de editar si la tarea ya está tachada */}
        <button className="btn-edit" onClick={() => editItem(item)} disabled={item.completada}>
          Editar
        </button>
        <button className="btn-delete" onClick={() => deleteItem(item.id)}>
          Eliminar
        </button>
      </div>
    </li>
  );
}

export default Item;