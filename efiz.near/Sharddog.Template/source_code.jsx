const data = props.data;

const size = "144px";

return (
  <Link to={`/mob.near/widget/ProfilePage?accountId=${data.owner}`}>
    <Widget
      src="mob.near/widget/Image"
      props={{
        image: {
          url: data.media,
        },
        style: {
          width: size,
          height: size,
          objectFit: "cover",
          minWidth: size,
          minHeight: size,
          maxWidth: size,
          maxHeight: size,
          overflowWrap: "break-word",
        },
      }}
    />
  </Link>
);
