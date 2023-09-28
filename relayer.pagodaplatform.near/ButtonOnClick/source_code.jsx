const Profile = styled.div`
  img {
    width: 75px;
  }
`;

State.init({ currentCount: 0 });

const users = [
  props.user1,
  props.user2,
  props.user3,
  props.user4,
  props.user5,
  props.user6,
];

const total_items = users.length - 1;

// const count = Math.floor(Math.random() * total_items) + 1;
let pev = state.currentCount;
return (
  <Profile>
    <div>
      <h2>{users[pev].name}</h2>
      <img src={users[pev].avatar_url} />
      <h3>{users[pev].location}</h3>
    </div>
    <button
      onClick={(pev) => {
        State.update({
          currentCount: Math.floor(Math.random() * total_items) + 1,
        });
      }}
    >
      Change User
    </button>
    <Widget src="tvh050423.near/widget/ConnectButton" props={{}} />
  </Profile>
);
