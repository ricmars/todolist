import { memo } from "react";

const ToDoDetailsRow = memo(function ToDoDetailsRow({
  pyGUID,
  Name,
  Description,
  AssignedTo,
  IsCompleted,
  DueDate,
  updateTodo,
  removeTodo,
}) {
  return (
    <tr>
      <td>
        <input
          type="text"
          aria-label="Name"
          defaultValue={Name}
          onBlur={(e) => updateTodo(pyGUID, "Name", e)}
        />
      </td>
      <td>
        <textarea
          aria-label="Description"
          defaultValue={Description}
          onBlur={(e) => updateTodo(pyGUID, "Description", e)}
        />
      </td>
      <td>
        <select
          aria-label="Assigned to"
          defaultValue={AssignedTo}
          onChange={(e) => updateTodo(pyGUID, "AssignedTo", e)}
        >
          <option value="marsr">Richard Marsot</option>
          <option value="jsmith">Joe Smith</option>
        </select>
      </td>
      <td>
        <input
          aria-label="Due date"
          type="date"
          defaultValue={
            DueDate
              ? `${DueDate.substring(0, 4)}-${DueDate.substring(
                  4,
                  6
                )}-${DueDate.substring(6, 8)}`
              : ""
          }
          onBlur={(e) => updateTodo(pyGUID, "DueDate", e)}
        />
      </td>
      <td>
        <input
          aria-label="Is completed"
          type="checkbox"
          onChange={(e) => updateTodo(pyGUID, "IsCompleted", e)}
          defaultChecked={IsCompleted === "true" ? true : false}
        />
      </td>
      <td>
        <button
          aria-label={`Delete record ${pyGUID}`}
          className="icon"
          onClick={(e) => removeTodo(pyGUID, e)}
        >
          <svg role="presentation" viewBox="0 0 25 25">
            <path
              fill="currentColor"
              d="M22.033 3.898h-4.51l-.466-1.776c-.046-.327-.232-.562-.465-.795a1.42 1.42 0 0 0-.93-.327H9.337c-.326 0-.605.094-.884.28-.28.235-.465.468-.512.795L7.476 3.9h-4.51c-.326 0-.466.14-.466.467s.14.467.465.467h1.489l.884 17.811c.046.374.185.702.465.935.232.28.558.421.976.421h11.488c.419 0 .745-.14 1.024-.42.232-.234.371-.562.419-.936l.883-17.81h1.442c.325 0 .465-.14.465-.468 0-.327-.14-.467-.465-.467l-.002-.001Zm-13.534 0 .372-1.543a.452.452 0 0 1 .465-.374h6.325c.232 0 .419.14.465.374l.372 1.543h-8H8.5Zm11.162.935-.884 17.764c-.046.28-.232.42-.511.42H6.778c-.28 0-.466-.14-.512-.42L5.382 4.833h14.279ZM9.15 17.782v-7.667c0-.327.186-.467.511-.467.326 0 .465.14.465.467v7.667c0 .327-.14.467-.465.467s-.511-.14-.511-.467Zm5.72 0v-7.667c0-.327.14-.467.466-.467.325 0 .511.14.511.467v7.667c0 .327-.186.467-.511.467-.326 0-.465-.14-.465-.467Zm-2.837.935V9.18c0-.327.14-.514.465-.514.326 0 .465.187.465.514v9.537c0 .327-.14.514-.465.514s-.465-.187-.465-.514Z"
            ></path>
          </svg>
        </button>
      </td>
    </tr>
  );
});
export default ToDoDetailsRow;
