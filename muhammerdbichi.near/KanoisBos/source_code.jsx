const { title, description, small } = props;

const Container = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  h3,
  h4 {
    margin: 0 3px;
  }
  h3 {
    font-weight: 900;
  }
  .text-secondary {
    margin: 0 10px;
  }
  &.not-verified {
    h4 {
      font-size: 16px;
      margin: 0 0 5px 0;
      font-weight: 600;
    }
    h5 {
      margin: 0;
      font-size: 12px;
    }
  }
`;
const PrimaryLink = styled.a`
  width: ${(p) => (p.small ? "100%" : "max-content")};
  padding: 8px 20px;
  font-size: 19px;
  border-radius: 10px;
  font-weight: 500;
  text-align:center;
  line-height: 24px;
  border: 0;
        &.dark {


      }
  background: #4ba6ee;
  color: #fff;
  &:hover {
          box-shadow: rgba(var(--primary-color), 0.5) 0px 0px 20px 0px;

  }
`;
const Learn = () => (
  <Container className={`not-verified ${small ? "" : "align-items-center"}`}>
    <div className={`${small ? "pb-12" : "py-4"}`}>
      <h4>{title}</h4>
      <h2 className="text-red text-center">
        Barka Da Zuwa Shafin NEARHausa Quiz
      </h2>
      <h4 className="text-red text-center">Koyi Matakin Farko Na NearHausa</h4>
      <h2>Ka Karanta Kafin Kafara Jarabawa</h2>
      <p>
        Engr. Bakaka shine shugaban NEARHausa community, kuma NEARHAusa an fara
        shi ne a shekarar 2022, domin koyar da mutane masu jin hausa technology
        na NEAR protocol, babban mukami da bahaushe ya taba rikewa a NEAR shine
        Grant Manager, Kuma an kirkiri NEAR blockchain akan yarjejeniya ta
        Nightshade
      </p>
    </div>
    <PrimaryLink
      small={small}
      href="https://bos.gg/muhammerdbichi.near/widget/NearHausa"
    >
      Kafara NearHausa Quiz
    </PrimaryLink>
  </Container>
);
return <Learn />;
