const gateway = "https://near.social/#/";

const WidgetItem = styled.a`
  border: 1px solid ${props.theme.borderColor};

  gap: 5px;
  padding: 15px 20px 20px 20px;
  border-radius: 5px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: all 0.2s ease-in-out;
  text-decoration: none;


  &:hover: {
    border: 1px solid #828a94;
    cursor: pointer;
    text-decoration: none;
  }

`;

return (
  <WidgetItem
    href={`${gateway + props.accountId}/widget/${props.name}`}
    target="_blank"
  >
    <h3
      className="max1Lines"
      style={{
        color: props.theme.textColor,
        fontSize: "1.17em",
        fontWeight: 600,
        margin: 0,
        padding: 0,
      }}
    >
      {props.name}
    </h3>
    <p
      className="max1Lines"
      style={{
        fontSize: "0.9rem",
        color: props.theme.textColor3,
        overflowWrap: "break-word",
        margin: 0,
        padding: 0,
      }}
    >{`${props.accountId}/widget/${props.name}`}</p>

    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginTop: 15,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 5,
          color: props.theme.textColor3,
        }}
      >
        <Widget
          src={`harrydhillon.near/widget/SearchPage.ComponentItem.TimeAgo`}
          props={{
            blockHeight: props.commits[props.commits.length - 1],
          }}
        />
      </div>
    </div>
  </WidgetItem>
);
