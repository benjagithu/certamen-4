import React, { useState, useEffect } from 'react';

function Form({ addOrUpdateItem, itemToEdit }) {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (itemToEdit) {
      setInputValue(itemToEdit.value);
    } else {
      setInputValue("");
    }
  }, [itemToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // VALIDACIÓN: Comprueba si el texto está vacío o tiene puros espacios
    if (!inputValue.trim()) {
      alert("⚠️ No puedes agregar un elemento vacío. Por favor, escribe algo válido.");
      return; // El "return" detiene la función aquí para que no guarde nada
    }

    addOrUpdateItem(inputValue);
    setInputValue("");
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <input
        className="input-task"
        type="text"
        placeholder="Añadir una tarea..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button className="btn-submit" type="submit">
        {itemToEdit ? 'Actualizar' : 'Agregar'}
      </button>
    </form>
  );
}

export default Form;