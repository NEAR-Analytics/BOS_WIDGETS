State.init({
  feedback: "",
  widget_id: props.widget_id,
  widget_link: props.widget_link,
  get_feedbacksList: [],
  accountId: props.accountId ?? context.accountId,
  selectedStars,
  star,
  account_id_star,
  average_star,
  get_starList: [],
});
const acc = "marketplacebos.near";
const contract = "marketplacebos.near";

//sss
const fetchData = () => {
  const result = Near.view(contract, "get_feedbacks", {
    widget_id: state.widget_id,
  });
  State.update({ get_feedbacksList: result });
};

fetchData();

const fetchData2 = () => {
  const result = Near.view(contract, "get_star", {
    widget_id: state.widget_id,
  });
  State.update({ get_starList: result });
};

fetchData2();

const CardMain = styled.div`
        width: 220px;
  height: 270px;
  border-radius: 20px;
  background: #f5f5f5;
  position: relative;
  padding: 1.8rem;
  border: 0.2rem solid #fff4b0ff;
  box-shadow:0 0 4px 0px red;  transition: 0.5s ease-out;
  overflow: visible;

  &:hover {
    border-color: #008bf8;
    box-shadow:0 4 14px 0px red;
  }

`;
const CardDetails = styled.div`
      color: black;
  height: 100%;
  gap: 0.5em;
  display: grid;
  place-content: center;
  

`;
const TextTitle = styled.p`
        font-size: 1.5em;
  font-weight: bold;

`;
const TextBody = styled.p`
        color: rgb(134, 134, 134);

`;
const CardButton = styled.button`
          transform: translate(-50%, 125%);
  width: 60%;
  border-radius: 1rem;
  border: none;
  background-color: #008bf8;
  color: #fff;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  position: absolute;
  left: 50%;
  bottom: 0;
  opacity: 0;
  transition: 0.3s ease-out;${CardMain}:hover & {
    transform: translate(-50%, 50%);
    opacity: 1;
  }
`;

const IMG = styled.img`
  width: 80px;
  height: 80px; /* Set the height to the same value as the width to make it a perfect circle */
  border-radius: 50%; /* Make it round */
  object-fit: cover; /* Maintain aspect ratio and cover the container */
  margin: 0 auto; /* Center the image horizontally */
  display: block; /* Remove default inline display */
`;
const widget_name = props.widget_name || "MagicBuild";
const widget_name_link = props.widget_name_link || "magicbuild.near/widget/app";
const logo_link = props.logo_link || "https://ipfs.near.social/ipfs/bafybeibfd2jqmeknux4n6ojbhnzdsdyhwagcq2cyi6zriutpmirol7sa2e";


return (
  <CardMain>
    <IMG src={logo_link} />

    <CardDetails>
      <TextTitle>{widget_name}</TextTitle>
      <TextBody>
        {state.get_starList &&
          state.get_starList.map((item, index) => (
            <div key={index}>{item}/5★</div>
          ))}{" "}
      </TextBody>
    </CardDetails>
    <a href={widget_name_link}>
      <CardButton>Give feedback</CardButton>
    </a>
  </CardMain>
);
