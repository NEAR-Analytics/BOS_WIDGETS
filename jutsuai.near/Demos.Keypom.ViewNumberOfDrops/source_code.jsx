const keypom_contract = "v2.keypom.near";

const [numDrops, setNumDrops] = useState(0);
const [user, setUser] = useState(null);

// Do not update state.num_drops until BtnClick
const onInputChange = ({ target }) => {
  setUser(target.value);
  setNumDrops(0);
};

const Mark = styled.span`
	background-color: yellow;
`;
const onBtnClick = () => {
  const userNum = Near.view(keypom_contract, "get_drop_supply_for_owner", {
    account_id: user,
  });
  setUser(user);
  setNumDrops(userNum);
};

const get_user_form = (
  <>
    <div class="border border-black p-3">
      <label>User Account ID</label>
      <input placeholder="user.near" onChange={onInputChange} />
      <button class="btn btn-primary mt-2" onClick={onBtnClick}>
        Update
      </button>
    </div>
  </>
);

// Render
return (
  <>
    <div class="container border border-info p-3">
      <>
        {user && (
          <h3 class="text-center">
            The number of drops by <Mark>{user}</Mark>:
            <span class="text-decoration-underline"> {numDrops} </span>
          </h3>
        )}

        {get_user_form}
      </>
    </div>
  </>
);
