const editableProps = {
  placeholder: "Type...",
};

const initialValue = [
  {
    type: "p",
    children: [
      {
        text: "This is editable plain text with react and history plugins, just like a <textarea>!",
      },
    ],
  },
];

return <Plate editableProps={editableProps} initialValue={initialValue} />;
