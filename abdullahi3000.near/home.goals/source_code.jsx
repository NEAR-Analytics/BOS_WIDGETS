const GoalsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3.125rem;

  position: relative;

  padding: 6.25rem 3rem;

  @media screen and (max-width: 768px) {
    padding: 6.25rem 1.5rem;
  }
`;

const SectionPill = ({ title, icon }) => {
  const Pill = styled.div`
    display: flex;
    padding: 8px 12px;
    justify-content: center;
    align-items: center;
    gap: 4px;

    border-radius: 100px;
    border: 1px solid var(--Yellow, #ffaf51);
    background: rgba(255, 189, 52, 0.2);

    color: var(--Yellow, #ffaf51);
    text-align: center;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-transform: capitalize;

    width: max-content;
  `;

  return (
    <Pill>
      <span>{title}</span> {icon}
    </Pill>
  );
};

const Title = styled.h2`
  color: #fff;
  text-align: center;
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 500;
  line-height: 120%; /* 48px */
  margin: 0;

  span.yellow {
    color: var(--Yellow, #ffaf51);
  }

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2.5rem;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }
`;

const GridItem = ({ tag, title, description, image, isFirst }) => {
  const Card = styled.div`
    display: flex;
    max-height: 635.75px;
    padding: 2.5rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    ${isFirst && "grid-column: 1 / span 2;"}
    ${isFirst && "flex-direction: row-reverse;"}

    border-radius: 16px;
    background: var(--bg-2, #23242b);
    border: 1px solid #51ffea;

    div {
      flex: 0 1 auto;
    }

    div.content {
      width: 100%;
      ${isFirst && "max-width: 50%;"}
      display: flex;
      flex-direction: column;
      gap: 1rem;

      span.tag {
        color: var(--Yellow, #ffaf51);

        /* Other/CAPS */
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 500;
        line-height: 160%; /* 22.4px */
        text-transform: uppercase;
      }

      h3 {
        color: var(--white-100, #fff);

        /* H3/Large */
        font-size: 1.5rem;
        font-style: normal;
        font-weight: 500;
        line-height: 140%; /* 33.6px */
        margin: 0;
      }

      p {
        color: var(--white-50, rgba(255, 255, 255, 0.7));

        /* Body/Large */
        font-size: 1rem;
        font-style: normal;
        font-weight: 400;
        line-height: 170%; /* 27.2px */
        margin: 0;
      }
    }

    div.image img {
      width: 100%;
      max-width: 600px;
      max-height: 400px;
      height: 100%;
      object-fit: cover;
    }

    @media screen and (max-width: 768px) {
      flex-direction: column;
      div.content {
        max-width: 100%;
      }
    }
  `;
  return (
    <Card>
      <div className="image">
        <img src={image} alt="Item Image" />
      </div>
      <div className="content">
        <span className="tag">{tag}</span>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </Card>
  );
};

const Goals = () => {
  return (
    <GoalsContainer className="container-xl">
      <Title>
        Primary <span className="yellow">Objectives</span>
      </Title>
      <GridContainer>
        <GridItem
          title="Support Builders"
          tag="Development"
          description="The core mission is to build open-source infrastructure and web applications for everyone. By creating systems to reward useful contributions, we can grow successful projects that solve problems and generate sustainable value."
          image="https://ipfs.near.social/ipfs/bafkreiezfdf2y4zz3nm2dgfhfs2lq3wjuwm647vdn75c3rdwidru4l3ufy"
          isFirst
        />
        <GridItem
          title="Learn Together"
          tag="Education"
          description="We are cultivating a worldwide community of builders who are motivated to help others. Members can earn badges and get necessary resources for training potential contributors."
          image="https://ipfs.near.social/ipfs/bafkreigdor4dtdj5sfq6g2m6wvsfihx72psb7sc5wtx6mbp7g7kxetrpsi"
        />
        <GridItem
          title="Community"
          tag="Facilitate Governance"
          description="We introduced on-chain feedback channels to gather input from participants. This will be crucial for understanding common issues, optimizing documentation, and improving quality of experience."
          image="https://ipfs.near.social/ipfs/bafkreiggevnacu45yy72igqlmq4gkdyea2jj7hswvolonjoqzvifdf57nq"
        />
      </GridContainer>
    </GoalsContainer>
  );
};

return { Goals };
