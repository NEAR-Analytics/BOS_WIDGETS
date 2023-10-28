const MagicDot = styled.div`
	position: fixed;
	right: 20px;
	bottom: 20px;
	z-index: 1000;
	width: 80px;
	height: 80px;
	border-radius: 50%;
	cursor: pointer;
	background: radial-gradient(circle at 30% 30%, rgb(74, 73, 73), rgb(0, 0, 0));
	box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px, rgba(0, 0, 0, 0.06) 0px 2px 4px,
		rgba(0, 0, 0, 0.1) 0px 10px 15px;
	transition: transform 0.2s ease 0s, box-shadow 0.2s ease 0s;

	img {
		opacity: 0;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		object-fit: cover;
		transition: 2s;
	}

	&:hover img {
		opacity: 1;
	}
`;

State.init({
  isMagicMoment: false,
});

const accountId = context.accountId;

const homepage = accountId
  ? Social.get(`${accountId}/settings/near.social/homepage`)
  : undefined;

if (homepage === null) {
  return "Loading";
}

const handleMagicClick = () => {
  State.update({ isMagicMoment: true });
};

return (
  <div>
    <div
      style={{
        visibility: state.isMagicMoment ? "hidden" : "visible",
        opacity: state.isMagicMoment ? 0 : 1,
        transition: "2s",
      }}
    >
      <Widget src={homepage ?? "mob.near/widget/N"} props={props} />
      <MagicDot onClick={handleMagicClick}>
        <img src="https://i.ibb.co/X7PJfh6/s-l1600.png" />
      </MagicDot>
    </div>
    <div
      style={{
        visibility: state.isMagicMoment ? "visible" : "hidden",
        opacity: state.isMagicMoment ? 1 : 0,
        transition: "2s",
        position: "absolute",
        top: 0,
      }}
    >
      <img
        src="https://i.ibb.co/jWZ4NB3/background.png"
        style={{ width: "100%" }}
      />
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <input
          style={{
            width: "250px",
          }}
        />
      </div>
    </div>
  </div>
);
