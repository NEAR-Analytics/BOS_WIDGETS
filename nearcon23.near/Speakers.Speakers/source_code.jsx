const ownerId = "nearcon23.near";

const speakersUrl = `https://21mqgszhf3.execute-api.us-east-1.amazonaws.com/testnet/api/v1/airtable/speakers`;

const Container = styled.div`
  display: flex;
  padding: 3.125rem 3.25rem;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;

  & > div {
    width: 25%;
  }

  @media screen and (max-width: 768px) {
    & > div {
      width: 100%;
    }
  }

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    & > div {
      width: 50%;
    }
  }
`;

State.init({
  speakers: [],
  speakersIsFetched: false,
});

if (!state.speakersIsFetched) {
  asyncFetch(speakersUrl).then(({ body }) => {
    console.log(body);
    State.update({
      speakers: body,
      speakersIsFetched: true,
    });
  });

  return <>Loading...</>;
}

return (
  <Container>
    {state.speakers.map(({ name, org, image }) => (
      <div key={name}>
        <Widget
          src={`${ownerId}/widget/Speakers.SpeakerCard`}
          props={{ name, org, image }}
        />
      </div>
    ))}
  </Container>
);
