const accountId = context.accountId;
const Owner = "dropcast.near";
const API_URL = props.API_URL || "http://localhost:3000";
const TOKEN = props.TOKEN || "";
const changePage = props.changePage || ((page) => {});

//Styles
const Wrapper = styled.div`
    display: flex;
    width: 100%;
    padding: 64px;
    position: relative;
    flex-direction: column;
    color: rgb(229 229 229);
    background: rgb(23,23,23);
    @media (max-width: 510px) {
      padding: 25px;
    }  
`;

const Card = styled.div`
    gap: 24px;
    display: flex;
    width: 100%;
    padding: 48px;
    border-radius: 8px;
    position: relative;
    flex-direction: column;
    background: rgb(38, 38, 38);
    @media (max-width: 510px) {
      padding: 15px;
      height: 100%;
      .menu {
        width: 74vw;
      }
    }  
`;

const Label = styled.label`
    font-size: 14px;
    margin-bottom: 4px;
`;

const StepButton = styled.button`
    color: #FFF;
    padding: 12px;
    border-radius: 6px;
    background-image: linear-gradient(to right, rgb(147, 51, 234), rgb(99, 102, 241));
`;

State.init({
  error: "",
  selected: "0",
  next: false,
  loaded: false,
  projects: [{ text: "Loading", value: "0" }],
  description: "",
  mint_price: "",
  mint_date: "",
  supply: "",
  discord: "",
  twitter: "",
});

const getProjects = () => {
  State.update({
    loaded: true,
  });
  let promise = asyncFetch(`${API_URL}/api/project/chanel`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "x-auth-token": TOKEN,
    },
    method: "GET",
  });

  promise.then((data) => {
    if (data.status === 200) {
      State.update({
        projects: data.body,
      });
    } else {
      State.update({
        loaded: true,
      });
    }
  });
};

const changeOption = (value) => {
  State.update({
    ...state,
    selected: value,
  });
};

const handleNextStep = () => {
  State.update({
    ...state,
    next: true,
  });
};

const onClose = () => {
  State.update({
    ...state,
    next: false,
  });
};

const changeInput = (value, key) => {
  State.update({
    ...state,
    [key]: value,
  });
};

if (!state.loaded) getProjects();
