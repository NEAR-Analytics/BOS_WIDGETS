State.init({});

const Wrapper = styled.div`
  --section-gap: 23px;
  padding-top: 42px;

  @media (max-width: 1160px) {
    .line-rounded-corners {
      display: none !important;
    }
  }

  @media (max-width: 900px) {
    padding-top: 0;
  }
`;

const Flex = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  flex-direction: column;
  flex-wrap: "nowrap";

    @media (max-width: 900px) {
    flex-direction: column;
    gap: var(--section-gap);
    }
`;

const Container = styled.div`
  display: flex;
  max-width: 1060px;
  margin: 0 auto;
  gap: var(--section-gap);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--section-gap) 24px;
`;

const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
    margin-top: 23px;

`;

const TimelineItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding-top: 10px;
  border-top: 1px solid #ccc;
`;

const TimelineText = styled.p`
  font-size: 16px;
  margin: 0;
`;

const schedule = [
  {
    url: "https://nearbuilders.com/tg-builders",
    day: "Day--, August 11:",
    subtitle: "Hackathon Kick-Off",
  },
  {
    url: "https://nearbuilders.com/tg-builders",
    day: "Sunday, August 27:",
    subtitle: "Hackathon Submission",
  },
  {
    url: "https://nearbuilders.com/tg-builders",
    day: "Monday, August 28th:",
    subtitle: "Judging Starts",
  },
  {
    url: "https://nearbuilders.com/tg-builders",
    day: "Friday, September 1st:",
    subtitle: "Prize Ceremony",
  },
];

return (
  <Wrapper>
    <Container>
      <Flex>
        <TimelineContainer>
          <h5>
            <b>🗓️ Hackathon Schedule:</b> Virtual
          </h5>
          {schedule.map((schedule) => (
            <TimelineItem>
              <TimelineText>
                <b>{schedule.day}</b>{" "}
                <a href={schedule.url}>{schedule.subtitle}</a>
              </TimelineText>
            </TimelineItem>
          ))}
        </TimelineContainer>
      </Flex>
      <br />
    </Container>
  </Wrapper>
);
