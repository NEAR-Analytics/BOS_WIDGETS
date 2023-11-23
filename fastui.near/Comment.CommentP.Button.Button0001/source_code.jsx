const acc = "fastui.near";
const contract = "fastui.near";
const messList = Near.view(contract, "get_message", {});
const accountId = props.accountId ?? context.accountId;

State.init({ component_id: "button0001", mess });
State.init({
  messList,
});
const onInputMess = ({ target }) => {
  State.update({ mess: target.value });
};
const onInputComment = ({ target }) => {
  State.update({ component_id: target.value || "button0001" });
};

// if (!messList || context.loading) {
//   return "Loading...";
// }

function addComment() {
  const messa = State.get().mess;
  const component = State.get().component_id;

  const message = {
    mess: messa,
    component_id: component,
  };

  Near.call("fastui.near", "add_message", message, State.get().accountId);
}

const CommentContainer = styled.div`
  width: 400px;
  margin: auto;
  
  
`;

const CommentBox = styled.div`
  border: 0.2rem solid #fff4b0ff;
  box-shadow:0 0 4px 0px red;
  border-radius: 4px;
  margin-bottom: 10px;
  padding: 10px;
  background: black;
`;

const CommentConponent = styled.input`
  display:none;
  width: 100%;
  height: 40px;
  margin-bottom: 5px;
  background: white;
  color:black;
  border: 0.2rem solid #fff4b0ff;
  box-shadow:0 0 4px 0px red;
  border-radius: 4px;
`;

const CommentTextarea = styled.input`
  width: 100%;
  height: 40px;
  margin-bottom: 5px;
  background: white;
  color:black;
  border: 0.2rem solid #fff4b0ff;
  box-shadow:0 0 4px 0px red;
  border-radius: 4px;

`;

const CommentButton = styled.button`
  border-radius: 2px;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  font-weight: 600;
  font-size: 23px;
  padding: 12px;
  position: relative;
  color: white;
  background-image: linear-gradient(90deg, rgba(251,136,255,1) 0%, rgba(252,176,69,1) 100%);
  outline: none;
  text-align: center;
  text-decoration: none;
  border: none;
  &:hover {
    background: #ffd83e;
    cursor: pointer;
    color:white;

  }
 @media (max-width: 414px) {
    font-size: 18px;
    padding: 10px 0;
  }

  @media (max-width: 768px) {
    font-size: 20px;
    padding: 10px 0;
  }
`;

const RateList = styled.div`
  width: 400px;
  height:400px;
  margin: auto;
  border: 0.2rem solid #fff4b0ff;
  box-shadow:0 0 4px 0px red;
  `;

const Comment = styled.div`
  border: 0.2rem solid #fff4b0ff;
  width:100%;
  box-shadow:0 0 4px 0px red;
  border-radius: 4px;
  margin-bottom: 10px;
  padding: 10px;
`;

const EllipsisNavLink = styled.a`
  text-decoration: none;
  font-size: 20px;
  text-transform: capitalize;
  font-family: var(--font), Arial;
  font-weight: 700;
  margin-right: 1em;
  color: white;
  position: relative;
  border-bottom: 2px solid #000;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

    @media (max-width: 768px) {
    font-size: 16px; /* Adjust the font size for smaller screens */
    margin-right: 0.5em;
  }
`;

return (
  <CommentContainer>
    <RateList>
      <>Comment list</>
      <></>
      <Comment></Comment>
    </RateList>
    <CommentBox>
      <br />
      <CommentTextarea
        placeholder="Comment..."
        onChange={onInputMess}
        type="text"
      />
      <CommentConponent type="text" onChange={onInputComment} />
      <CommentButton onClick={addComment}>Send</CommentButton>
    </CommentBox>
  </CommentContainer>
);
