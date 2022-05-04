import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};
function App() {
  const [value, setValue] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [checked, setChecked] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) {
      // display alert
      // setAlert({ show: true, message: "Please enter value", type: "danger" });
      showAlert(true, "danger", "Please enter value");
    } else if (value && isEditing) {
      //editing
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: value };
          }
          return item;
        })
      );
      setValue("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true, "success", "value changed");
    } else {
      showAlert(true, "success", "Item added to the list");
      const newList = { id: new Date().getTime().toString(), title: value };
      setList([...list, newList]);
      setValue("");
    }
  };

  const showAlert = (show = false, type = "", message = "") => {
    setAlert({ show, type, message });
  };
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setValue(specificItem.title);
  };

  const checkItem = (id) => {
    showAlert(true, "success", "done");
    setChecked(true);
  };

  const deleteItem = (id) => {
    showAlert(true, "danger", "item removed");
    setList(
      list.filter((item) => {
        return item.id !== id;
      })
    );
  };

  const clearList = () => {
    showAlert(true, "danger", "empty list");
    setList([]);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>Grocery list</h3>
        <div className="form-control">
          <label htmlFor="grocery-item"></label>
          <input
            type="text"
            id="grocery-item"
            className="grocery"
            placeholder="e.g. eggs"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button className="submit-btn ">
            {isEditing ? "edit" : "submit"}{" "}
          </button>
        </div>
      </form>

      {list.length > 0 && (
        <div className="grocery-container">
          <List
            items={list}
            editItem={editItem}
            deleteItem={deleteItem}
            checkItem={checkItem}
            checked={checked}
          />
          <button className="clear-btn" onClick={clearList}>
            Clear Items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
