const createDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const text = props.text ?? "Date:";
const date = props.date || createDate();
const update = props.update;
const id = props.id ?? "date-input";

if (!update) {
  return "Cannot render date input without update function!";
}

return (
  <>
    <label htmlFor={id}>{text}</label>
    <input
      id={id}
      type="date"
      value={date}
      onChange={({ target: { value } }) => update(value)}
    />
  </>
);
