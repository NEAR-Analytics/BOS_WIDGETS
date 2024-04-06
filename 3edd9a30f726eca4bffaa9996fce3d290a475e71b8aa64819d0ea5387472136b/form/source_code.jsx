const accountId = context.accountId;

if (!accountId) {
  return "Please sign in with NEAR wallet";
}

const note = Social.get(`${accountId}/experimental/note`);

if (note === null) {
  return "Loading";
}

State.init({ note: note || "" });

const body = styled.div`
background-color: orange;
`;

const text = styled.div`
background-color: white;
height:100px;
display:flex;
weight:50%;
`;
const form = styled.div`
input[type=text] {
  background-color: green;
  background-image: url('searchicon.png');
  background-position: 10px 10px;
  background-repeat: no-repeat;
  margin-left: 25%;
  margin-top: 5%;
  width : 50%;
}
`;
const button = styled.div`
width: 50%;
height :50%;

`;

return (
  <body>
    <div>
      <img src="https://i.ibb.co/hH3SmWq/fotor-202401300583.png"></img>
      <form>
        <input type="text" name="firstName" placeholder="First name"></input>
        <input type="text" name="lastname" placeholder="Last name"></input>
        <input type="text" name="nearwallet" placeholder="xyz.near"></input>
        <input type="text" name="twitter" placeholder="@twitter"></input>
        <input type="text" name="telegram" placeholder="@telegram"></input>
        <input type="text" name="discord" placeholder="@discord"></input>
        <input type="text" name="github" placeholder="Github"></input>
      </form>

      <button>
        <CommitButton data={{ experimental: { note: state.note } }}>
          Submit
        </CommitButton>
      </button>
    </div>
  </body>
);
