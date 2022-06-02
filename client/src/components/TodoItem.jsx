import { Checkbox } from "@mantine/core";

function TodoItem(props) {
  return (
    <div className="todoItem">
      <Checkbox
        className="checkbox"
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
