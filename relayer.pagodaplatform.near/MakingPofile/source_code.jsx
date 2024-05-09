// initiate state variables
State.init({
  img: null,
  message: "Have a great day!",
  isVisible: false,
});

// set markdown text
const text = `
  #### Create your own profile!
  This is an example code using BOS by **catenaLAB**
    
  Visit our [website](https://www.catenalab.xyz/) & Check out our cool [Youtube Channel](https://www.youtube.com/@catenalab)
`;

// get user account from context.accountId
let user_account = context.accountId;

// set options of typeahead
const options = [
  "Hackathon",
  "Development",
  "Smart contract",
  "DeFi",
  "Blockchain",
];

// define clickOnchange event to update state variable
const handleClick = () => {
  State.update({ isVisible: true });
};

// define handleChange event to update state variable
const handleChange = ({ target }) => {
  State.update({ message: target.value });
};

const Box = styled.div`
    color: palevioletred;
    padding: 20px 20px;
    background: linear-gradient(to right, #f5d0d2, #f5e8d0);
`;

const Button = styled.button`
    background: palevioletred;
    color: white;
    font-weight: 600;
    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid palevioletred;
    border-radius: 20px;
`;

return (
  <>
    <div className="container row">
      <div className="container border border-info pt-3 min-vw-50 text-center item-center">
        {/* styled component */}
        <Box>
          {/* markdown text component */}
          <Markdown text={text} />

          {/* tootip component */}
          <OverlayTrigger
            key={"right"}
            placement={"right"}
            overlay={
              <Tooltip id={`tooltip-right`}>
                Insert data and <strong>complete your profile!</strong>
              </Tooltip>
            }
          >
            <Button onClick={handleClick}>Make profile</Button>
          </OverlayTrigger>
        </Box>

        <hr />
        {state.isVisible && (
          <div style={{ marginTop: "50px", marginBottom: "50px" }}>
            {/* Image uploader component */}
            <div>
              <IpfsImageUpload image={state.img} />
            </div>
            <div className="mt-2">
              {state.img.cid && (
                <img
                  width={300}
                  style={{ marginBottom: "20px" }}
                  src={`https://ipfs.near.social/ipfs/${state.img.cid}`}
                  alt="uploaded"
                />
              )}
            </div>

            {/* Receiving input using props */}
            <h5>name : {props.name}</h5>
            <h5>email : {props.email}</h5>

            {/* get current signed-in user account by using accountId */}
            <h5>account : {user_account ? user_account : "user account"}</h5>

            {/* typeahead component */}
            <div
              style={{
                width: "30%",
                marginLeft: "35%",
                marginRight: "35%",
                marginTop: "10px",
              }}
            >
              <Typeahead
                options={options}
                multiple
                onChange={(value) => {
                  State.update({ choose: value });
                }}
                placeholder="Choose your interests"
              />
              <h5>
                interests:
                <span>{JSON.stringify(state.choose)}</span>
              </h5>
            </div>

            {/* use state */}
            <div>
              <h5>
                status message :
                <span style={{ color: "palevioletred" }}>{state.message}</span>
              </h5>

              <label class="text-center" style={{ color: "#3b9ded" }}>
                Change the status message
              </label>
              <input
                style={{
                  width: "40%",
                  marginLeft: "30%",
                  marginRight: "30%",
                  marginTop: "10px",
                }}
                onChange={handleChange}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  </>
);
