const handleSubmit = (value) => {
  console.log(value);
};
const widgetProps = {
  placeHolder: "wtf",
  handleSubmit: handleSubmit,
};

return (
  <div class="container">
    <div class="text-center">
      <Widget src={"iamwho.near/widget/szlhyjoIhy"} props={widgetProps} />
    </div>
  </div>
);
