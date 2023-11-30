const CityContainer = styled.div`
  display: flex;
  border: 1px solid #FFFFFF;
  background-color: #151515;
  padding: 16px;
  border-radius: 15px
`;

const CityInfo = styled.div`
  flex: 1;
  padding: 10px;
`;

const VotesText = styled.p`
  margin: 5px;
`;

const info = props.information;

State.init({
  showVoters: false,
  name: info.name,
  description: String(info.description),
  authorId: info.authorId,
  timestamp: info.timestamp,
});

let des = state.description.split("~");

function convertTimestampToReadableDate(timestamp) {
  // Multiply by 1000 to convert seconds to milliseconds
  const date = new Date(timestamp * 1000);

  // Options for formatting the date
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  };

  // Format the date according to the options
  const formattedDate = date.toLocaleDateString("en-US", options);

  return formattedDate;
}

const readableDate = convertTimestampToReadableDate(state.timestamp);

return (
  <CityContainer>
    <CityInfo>
      <h2>{state.name}</h2>
      <VotesText>Description: {des[2]}</VotesText>
      <VotesText>{des[0]}</VotesText>
      <VotesText>{des[1]}</VotesText>
      <VotesText>Posted By: {state.authorId}</VotesText>
      <VotesText>Published: {readableDate}</VotesText>
    </CityInfo>
  </CityContainer>
);
