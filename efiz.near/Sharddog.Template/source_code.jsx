function Sharddog({ owner, media }) {
  const size = "144px";

  return (
    <Widget
      src="mob.near/widget/Image"
      props={{
        image: {
          url: media,
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
  );
}

return { Sharddog };

// <Link to={`/mob.near/widget/ProfilePage?accountId=${owner}`}>
// </Link>
