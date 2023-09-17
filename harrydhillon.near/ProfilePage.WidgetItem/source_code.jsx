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
    <div style={{ display: "flex", justifyContent: "center" }}>
      {props.image ? (
        <img
          style={{ width: 200, height: 200, objectFit: "contain" }}
          src={`https://ipfs.near.social/ipfs/${props.image}` ?? ``}
        />
      ) : props.theme.mode !== "dark" ? (
        <svg
          width="200"
          height="200"
          viewBox="0 0 1173 1173"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M879 658C878.868 735.395 848.012 809.592 793.182 864.329C738.234 919.183 663.708 950 586 950C508.292 950 433.766 919.183 378.818 864.329C323.87 809.474 293 735.076 293 657.5V546H446.25V657.5L446.251 657.5C446.251 694.501 460.974 729.986 487.182 756.149C513.39 782.312 548.936 797.011 586 797.011C623.064 797.011 658.61 782.312 684.818 756.149C711.026 729.986 725.749 694.501 725.749 657.5H726V364.25L294 364.25L294 211L726 211H879V364.25V657.5L879 657.667C879 657.778 879 657.889 879 658Z"
            fill="#0C121F"
          />
          <circle cx="370.098" cy="455.153" r="48.8012" fill="#FFD37C" />
        </svg>
      ) : (
        <>
          <svg
            width="200"
            height="200"
            viewBox="0 0 1173 1173"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M879 658C878.868 735.395 848.012 809.592 793.182 864.329C738.234 919.183 663.708 950 586 950C508.292 950 433.766 919.183 378.818 864.329C323.87 809.474 293 735.076 293 657.5V546H446.25V657.5L446.251 657.5C446.251 694.501 460.974 729.986 487.182 756.149C513.39 782.312 548.936 797.011 586 797.011C623.064 797.011 658.61 782.312 684.818 756.149C711.026 729.986 725.749 694.501 725.749 657.5H726V364.25L294 364.25L294 211L726 211H879V364.25V657.5L879 657.667C879 657.778 879 657.889 879 658Z"
              fill="white"
            />
            <circle cx="370.098" cy="455.153" r="48.8012" fill="#FFD37C" />
          </svg>
        </>
      )}
    </div>
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
