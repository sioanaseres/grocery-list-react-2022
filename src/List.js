import React from "react";
import { FaEdit, FaTrash, FaRegCheckSquare } from "react-icons/fa";
const List = ({ items, editItem, deleteItem, checkItem, checked }) => {
  return (
    <div className="grocery-list">
      {items.map((item) => {
        const { id, title } = item;

        return (
          <article className="grocery-item" key={id}>
            <h4 className={`title ${checked && "checked"}`}>{title}</h4>
            <div className="btn-container">
              <button type="button" className="edit-btn">
                <FaEdit onClick={() => editItem(id)} />
              </button>
              <button type="button" className="check-btn">
                <FaRegCheckSquare onClick={() => checkItem(id)} />
              </button>
              <button type="button" className="delete-btn">
                <FaTrash onClick={() => deleteItem(id)} />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
