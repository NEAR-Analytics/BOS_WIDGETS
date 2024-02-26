function WarningBanner(props) {
  const style = { color: props.warn ? "red" : "black" };
  return <div style={style}>Warning!</div>;
}

return (
  <div>
    <WarningBanner warn={true} />
    <WarningBanner warn={false} />
  </div>
);
