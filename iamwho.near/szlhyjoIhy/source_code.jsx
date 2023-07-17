State.init({
  value: "",
});

const handleChange = (e) => {
  State.update({ value: e.target.value });
};

return (
  <div class="w-screen flex flex-col items-center">
    <input
      class="rounded border px-3 py-1 w-10vw"
      placeholder={props.placeHolder}
      value={state.value}
      onChange={handleChange}
    />
    <button
      onClick={() => props.handleSubmit(state.value)}
      class="rounded bg-transparent border border-gray-600 text-gray-800 px-2 py-1"
    >
      Search
    </button>
  </div>
);
