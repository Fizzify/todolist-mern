import axios from "axios";
import { useState, useEffect } from "react";
import TodoItem from "./components/TodoItem";
import { Button, Input } from "@mantine/core";

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
        setTodoItems((prevItems) => {
          return [...prevItems, { item: res.data.item }];
        });
      });

    setItem("");
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
    <>
      <>
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
      </>
      <Input
        className="itemInput"
        onChange={handleChange}
        value={item}
        type="text"
        name="todoItem"
        placeholder="New Item..."
      />
      <Button className="addItem" type="button" onClick={createItem}>
        Add Item
      </Button>
    </>
  );
}

export default App;
