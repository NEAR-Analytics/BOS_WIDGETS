const options = [
  { label: "Draft", value: "" },
  { label: "Review", value: "" },
  { label: "Approved", value: "" },
  { label: "Approved  - Conditional", value: "" },
  { label: "Rejected", value: "" },
  { label: "Payment Processing", value: "" },
  { label: "Funded", value: "" },
];

const [selected, setSelected] = useState(null);

return (
  <div>
    <Widget
      src="megha19.near/widget/devhub.components.molecule.DropDown"
      props={{
        options: options,
        label: "Stage",
        onUpdate: (v) => {
          setSelected(v);
        },
      }}
    />
  </div>
);
