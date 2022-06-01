function TodoItem(props) {
  return (
    <div className="todo-item">
      <input
        type="checkbox"
        onChange={(e) => {
          e.preventDefault();
          props.onCheck(props.index);
        }}
      />
      <li>{props.item}</li>
    </div>
  );
}

export default TodoItem;
