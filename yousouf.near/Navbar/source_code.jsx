State.init({
  view: "",
});

const Button = styled.button``;

return (
  <div>
    <Button onClick={() => State.update({ view: "thing will change" })}>
      Team
    </Button>

    <Button
      onClick={() =>
        State.update({
          view: "Goals and Objectives    ====>  1 - Education and awareness 2 - Networking and Connection  3 - Socials Club 4 - Community based Projects 5 - Inclusivity and Collaboration 6 - Bridge Language Barrier 7 - Knowledge Sharing ",
        })
      }
    >
      Our Mission
    </Button>

    <Button
      onClick={() =>
        State.update({
          view: "The northern part of Nigeria is home to 60–75% of the Nigerian population, 90% of whom are Hausa speakers, with around 3-4 million active blockchain/crypto users and native influencers, content creators, and developers. The region has had a well established Web2 tech community for more than a decade and is ranked as one of the regions with the highest tech specialists in the country (Nigeria), a community with a population of more than 150 million people, yet they don't have a better idea or knowledge of the Near Protocol blockchain, or Web3, and its impact within our region. The Near Hausa Community (NHC) has set clear goals and objectives to promote education, awareness, and adoption of the Near Protocol blockchain and Web3 technology within the Hausa-speaking community in the northern part of Nigeria.",
        })
      }
    >
      {" "}
      About Us
    </Button>
    <h5>{state.view}</h5>
  </div>
);
