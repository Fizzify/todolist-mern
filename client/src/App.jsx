import axios from "axios";
import { useState, useEffect } from "react";
import TodoItem from "./components/TodoItem";

function App() {
  const [todoItems, setTodoItems] = useState([]);
  const [item, setItem] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/getItems").then((res) => {
      setTodoItems(res.data);
    });
  }, []);

  function createItem(e) {
    e.preventDefault();
    axios
      .post("http://localhost:3001/createItem", { item: item })
      .then((res) => {
        setTimeout(() => {
          setTodoItems((prevItems) => {
            return [...prevItems, item];
          });
        }, 1000);
      });
  }

  function handleChange(e) {
    const newItem = e.target.value;
    setItem(newItem);
  }

  function handleCheck(index) {
    axios
      .post("http://localhost:3001/deleteItem", { index: index })
      .then((res) => {
        setTodoItems((prevItems) => {
          return prevItems.filter((filteredItem, itemIndex) => {
            return itemIndex !== index;
          });
        });
      });
  }

  return (
    <div>
      <div className="items">
        <ul>
          {todoItems.map((todoItem, index) => {
            return (
              <TodoItem
                key={index}
                index={index}
                item={todoItem.item}
                onCheck={handleCheck}
              />
            );
          })}
        </ul>
      </div>
      <input
        onChange={handleChange}
        value={item}
        type="text"
        name="todoItem"
        placeholder="New Item..."
      />
      <button type="button" onClick={createItem}>
        Add Item
      </button>
    </div>
  );
}

export default App;
