const description = props.description || "";
const lengthCutoff = 90;

return (
  <div className="text-truncate my-2" style={{ textOverflow: "Read more" }}>
    {description.length > lengthCutoff
      ? description.substring(0, lengthCutoff - 10)
      : description}
    {description.length > lengthCutoff ? (
      <b className="text-primary">Read more</b>
    ) : (
      <></>
    )}
  </div>
);
