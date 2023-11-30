const ownerId = "kingsley-sama.near";
const contractAddress = "0x34a314473C8901E7D502123ba2ff4Bc0f4D20eE5";
//Db Intergration
const PollABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "pollId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "question",
        type: "string",
      },
    ],
    name: "PollCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "nftId",
        type: "uint256",
      },
    ],
    name: "Voted",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_nftName",
        type: "string",
      },
    ],
    name: "addNFTS",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newOwner",
        type: "address",
      },
    ],
    name: "changeOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "pollId",
        type: "uint256",
      },
    ],
    name: "closePoll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "createPoll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "nftId",
        type: "uint256",
      },
    ],
    name: "getNFTVotes",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "haveYouVoted",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "nfts",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "voteCount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "numberOfNFTs",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "numberOfPolls",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "polls",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "voteCount",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isOpen",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalVoters",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "nftId", type: "uint256" }],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "voters",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
const [count, setCount] = useState(0);
const handleButtonClick = (id) => {
  vote(id);
  setCount(count + 1);
};
const pollDartABI = [
  "function createPoll(string memory _name) public onlyOwner {}",
  "function addNFTS(string memory _nftName) public onlyOwner {}",
  "function vote(uint256 nftId) external {}",
  "function closePoll(uint256 pollId) external onlyOwner {}",
  "function changeOwnership(address _newOwner) public onlyOwner {}",
  "function getNFTVotes(uint256 nftId) public view returns(uint256) {}",
  "function haveYouVoted() public view returns (bool) {}",
];

// Load current sender address if it was not loaded yet
if (state.sender == undefined && Ethers.provider()) {
  Ethers.provider()
    .send("eth_requestAccounts", [])
    .then((accounts) => {
      if (accounts.length) {
        // save sender address to the state
        State.update({ sender: accounts[0] });
      }
    });
}
// setOverallCount(overallCount + 1);

// // Update the count for the clicked button
// const updatedArray = arrayOfObjects.map((obj) =>
//   obj.id === id ? { ...obj, count: obj.count + 1 } : obj
// );

// Create contract interface
const iPollDart = new ethers.utils.Interface(PollABI);

const vote = (nftId) => {
  console.log("okayVote");
  const pollDartContract = new ethers.Contract(
    contractAddress,
    PollABI,
    Ethers.provider().getSigner()
  );

  pollDartContract.vote(nftId);
  //   setCount(count + 1);

  // Update the count for the clicked button
  const updatedArray = arrayOfObjects.map((obj) =>
    obj.id === id ? { ...obj, count: obj.count + 1 } : obj
  );

  console.log("Voting is Successful");
};

const Container = styled.div`
  display: flex;
  min-height: fit-content;
  align-items: center;
  justify-content: center;
  background-color: #f0f4f8;
  margin:10px;
   width: fit-content;
   border-radius: 10px;
`;

const FlexContainer = styled.div`
  display: flex;
  font-family: sans-serif;
`;

const ImageContainer = styled.div`
  flex: none;
  display:flex; 
  width: fit-content;
`;

const StyledImage = styled.img`
  width: 200px;
  height: 200px;
  object-cover;
`;

const FormContainer = styled.div`
  flex: auto;
  padding: 0 30px;

`;

const Title = styled.h1`
  flex: auto;
  text-xl;
  font-semibold;
  color: #1a202c; /* Use your desired text color */
`;

const Price = styled.div`
  text-lg;
  font-semibold;
  color: #1a202c; /* Use your desired text color */
`;

const Stock = styled.div`
  width: 100%;
  flex: none;
  text-sm;
  font-medium;
  color: #2d3748; /* Use your desired text color */
  margin-top: 0.5rem;
`;

const Button = styled.button`
  height: 2rem;
  padding: 0 1rem;
  font-bold;
  rounded-md;
  background:black;
  border-radius: 5px;
  width:100px;
  border: none; /* Use your desired border color */
  color: white; /* Use your desired text color */
   &:hover {
    background-color: grey;
    color: "black";
  }
`;
const HeartIcon = styled.svg`
  width: 20px;
  height: 20px;
  fill: currentColor;
`;

const ShippingText = styled.p`
  text-sm;
  color: #4a5568; /* Use your desired text color */
`;
const profile = {
  avatar:
    "https://ipfs.near.social/ipfs/bafkreic6f6cwyn2loqcln6itukuipl72grqzqqhkmwy6ea3zwqoolgbzxu",
  title: "Ape Fest Poll",
  subtitle: "The Current Poll Ends",
  links: [
    {
      id: 1,
      nftName: "ALMUSTAPHA HAMZA",
      nftURL:
        "https://ipfs.near.social/ipfs/bafkreiaqvbnejqvoaqulvgcyyqfqedo5jep4ppx7vppxiscnrca6ytyufa",
      artistName: "ALMUSTAPHA HAMZA",
      numberOfVotes: 0,
      isOpen: false,
      voteCount: "assets/images/Actionalliance.jpeg",
    },

    {
      id: 2,
      nftName: "Cleopatra Toy Face",
      nftURL:
        "https://ipfs.near.social/ipfs/bafkreibdrpr7jsjzspemhab6ew6tucjarqdlriq6reobmwo55x4q5tdmqa",
      artistName: "Cleopatra",
      numberOfVotes: 0,
      isOpen: false,
      voteCount: "assets/images/adclogo.jpeg",
    },
    {
      id: 3,
      nftName: "Toy Face",
      nftURL:
        "https://ipfs.near.social/ipfs/bafkreihlizxfb7hywefw22nkiwaoubo6mwyabgr5dozfbmdhmuo2es3xnu",
      artistName: "Marilyn Monroe",
      numberOfVotes: 0,
      isOpen: false,
      voteCount: "assets/images/APC.jpeg",
    },

    {
      id: 4,
      nftName: "RetroRadio 17",
      nftURL:
        "https://ipfs.near.social/ipfs/bafkreig77zdurphnig3l47o2pwkqlcu3rcajgt7b6jiig5rnukp7hvpska",
      artistName: "RetroRadio",
      numberOfVotes: 0,
      status: true,
      voteCount: 0,
    },
    {
      id: 5,
      nftName: "RetroRadio 23",
      nftURL:
        " https://ipfs.near.social/ipfs/bafkreidac2uf7v7hj3xi4hzx22bzmtcaq76w7n4xfvngn6w4366pwglm34",
      artistName: "RetroRadio",
      numberOfVotes: 0,
      status: true,
      voteCount: 0,
    },
    {
      id: 6,
      nftName: "RetroRadio 40",
      nftURL:
        "https://ipfs.near.social/ipfs/bafkreidac2uf7v7hj3xi4hzx22bzmtcaq76w7n4xfvngn6w4366pwglm34",
      artistName: "RetroRadio",
      numberOfVotes: 0,
      status: true,
      voteCount: 0,
    },

    {
      id: 7,
      nftName: "Tale Nft",
      nftURL:
        "https://ipfs.near.social/ipfs/bafkreiaqvbnejqvoaqulvgcyyqfqedo5jep4ppx7vppxiscnrca6ytyufa",
      artistName: "Mode Nova",
      numberOfVotes: 0,
      status: true,
      voteCount: 0,
    },
    {
      id: 8,
      nftName: "Cranial",
      nftURL:
        "https://ipfs.near.social/ipfs/bafkreiaqvbnejqvoaqulvgcyyqfqedo5jep4ppx7vppxiscnrca6ytyufa",
      artistName: "Nwanyanwu Daniel",
      numberOfVotes: 0,
      status: true,
      voteCount: 0,
    },
    {
      id: 9,
      nftName: "Panoramic Potraits",
      nftURL:
        "https://ipfs.near.social/ipfs/bafkreiecv5kvztl3afdpzv2gwfluae5rcm6yjmqaex3ebqbil6m423m3li",
      artistName: "BlueGM.eth",
      numberOfVotes: 0,
      status: true,
      voteCount: 0,
    },
    {
      id: 10,
      nftName: "Cranial Earth Maps",
      nftURL:
        "https://ipfs.near.social/ipfs/bafkreiaqvbnejqvoaqulvgcyyqfqedo5jep4ppx7vppxiscnrca6ytyufa",
      artistName: "Map Finder",
      numberOfVotes: 0,
      status: true,
      voteCount: 0,
    },
  ],
  socials: [
    { title: "Github", url: "#" },
    { title: "Twitter", url: "#" },
    { title: "Facebook", url: "#" },
    { title: "Whatsapp", url: "#" },
    { title: "Linkedin", url: "#" },
  ],
};

const titleToIcon = [
  {
    title: "Github",
    icon: <i class="bi bi-github"></i>,
  },
  {
    title: "Twitter",
    icon: <i class="bi bi-twitter"></i>,
  },
  {
    title: "Facebook",
    icon: <i class="bi bi-facebook"></i>,
  },
  {
    title: "Whatsapp",
    icon: <i class="bi bi-whatsapp"></i>,
  },
  {
    title: "Linkedin",
    icon: <i class="bi bi-linkedin"></i>,
  },
];
const headerStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "fit-content",
  padding: "0 8px",
  width: "100%",
  background: "white",
};
return (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: 16,
      height: "fit-content",
      padding: "0 8px",
      width: "100%",
    }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        padding: "10px",
        height: "fit-content",
        padding: "0 8px",
        width: "100vw",
        height: "60px",
        color: "white",
        background: "black",
      }}
    >
      <img
        style={{ aspectRatio: 1 / 1, maxHeight: "60px" }}
        src={
          "https://ipfs.near.social/ipfs/bafkreicxfp5vicqzbnlu75ottkkfghmm3snhlevg373rjtwym72do5ortm"
        }
      ></img>
      <h3 style={{ margin: "10px" }}>Poll Dart</h3>
      <Web3Connect />
    </div>
    <img
      style={{
        height: "100%",
        maxHeight: 200,
        borderRadius: "10px",
        width: "80vw",
        objectFit: "cover",
      }}
      src={profile.avatar}
      alt={profile.title}
    />

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "rgba(250, 250, 250, 0.1)",
        width: "100vw",
        borderRadius: "10px",
        padding: "10px",
        height: "500p",
      }}
    >
      <h2 style={{ color: props.theme.textColor }}>{profile.title}</h2>
      <h5 style={{ color: props.theme.textColor2 }}>{profile.subtitle}</h5>
      <Widget src="kingsley-sama.near/widget/countdowntimer" />
    </div>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        maxWidth: "100vw",
      }}
    >
      {profile.links?.map((link) => (
        <Container>
          <FlexContainer>
            <ImageContainer>
              <StyledImage
                src={link.nftURL}
                alt={link.artistName}
                loading="lazy"
              />
            </ImageContainer>
            <FormContainer role="form">
              <div>
                <Title>{link.nftName}</Title>
                <Price>Vote Count: {count}</Price>
                <Stock>Artist: {link.artistName} </Stock>
              </div>
              <div>
                <Button onClick={() => vote(link.id)} type="button">
                  Vote
                </Button>
              </div>
              <div></div>
              <ShippingText>Status</ShippingText>
            </FormContainer>
          </FlexContainer>
        </Container>
      ))}
    </div>
  </div>
);
