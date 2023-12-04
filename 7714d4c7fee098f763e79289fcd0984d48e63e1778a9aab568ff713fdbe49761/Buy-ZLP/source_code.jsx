const DaisyUIWrapper = ({ children }) => {
  return (
    <Widget
      src="igris.near/widget/DaisyUIWrapper"
      props={{
        children,
        daisyUiTheme: "forest",
      }}
    />
  );
};
