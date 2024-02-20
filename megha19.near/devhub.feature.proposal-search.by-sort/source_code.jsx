const options = [
  { label: "Most recent", value: "" },
  { label: "Most viewed", value: "" },
  { label: "Most commented", value: "" },
  { label: "Unanswered", value: "" },
];

const [selected, setSelected] = useState(null);

return (
  <div>
    <Widget
      src="megha19.near/widget/devhub.components.molecule.DropDown"
      props={{
        options: options,
        label: "Sort",
        onUpdate: (v) => {
          setSelected(v);
        },
      }}
    />
  </div>
);
