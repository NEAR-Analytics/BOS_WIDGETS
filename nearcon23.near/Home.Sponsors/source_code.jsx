const ownerId = "nearcon23.near";

const apiKey =
  "patWQQ6FY8H5O8wTY.4b08b48ac31aa13eb9fea974cfa60e103ae7297c010d4fe752e1abb37bd24c9d";

const Section = styled.div`
  display: flex;
  width: 100%;
  padding: 3.125rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 3rem;

  & > div:first-child {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    align-self: stretch;

    & > h2 {
      display: flex;
      flex-direction: column;
      color: var(--black, #000);
      font-size: 2rem;
      font-family: FK Grotesk;
      font-weight: 500;
    }

    @media screen and (max-width: 768px) {
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
    }
  }
  @media screen and (max-width: 768px) {
    padding: 1rem;

  }
`;

const Logos = styled.div`
  display: flex;
  flex-wrap:wrap;
  width: 100%;
  gap: 2rem;
  justify-content:center;
  & > img {
    object-fit: contain;
  }
`;

const Img = styled.img`
  width:22%;
  @media screen and (max-width: 768px) {
    width:44%;
  }

  @media screen and (max-width: 480px) {
    width:100%;
  }

`;

State.init({
  sponsors: [],
  sponsorsIsFetched: false,
});

if (!state.sponsorsIsFetched) {
  asyncFetch(
    "https://api.airtable.com/v0/appcR9zt96Wv7VXWl/tbl7lCj23rJIOSPA9?fields%5B%5D=Image",
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  ).then(({ body }) => {
    State.update({
      sponsors: body.records.map((record) => record.fields.Image[0].url),
      sponsorsIsFetched: true,
    });
  });

  return <>Loading...</>;
}

return (
  <Section>
    <div>
      <h2>Media Partners</h2>
    </div>
    <Logos>
      {state.sponsors.map((src) => (
        <Img src={src} />
      ))}
    </Logos>
  </Section>
);
