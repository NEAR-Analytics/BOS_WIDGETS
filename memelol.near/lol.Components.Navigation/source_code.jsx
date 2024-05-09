const { assets } = VM.require(`memelol.near/widget/lol.Config`);

const Navigation = () => {
  const Container = styled.div`
    a {
      width: 100%;
      color: #000;
      font-weight: 700;
      &:hover {
        text-decoration: none;
      }
    }

    @media screen and (max-width: 786px) {
      width: 100%;
      flex-direction: column;
    }
  `;

  const Section = styled.div`
    padding: 1rem 2rem;
    border: 3px solid black;
    border-radius: 20px;
    width: 100%;
    background: #efefef;
    justify-content: center;

    &:hover {
      background: #c2d5ff;
    }
  `;

  const links = [
    {
      href: `?page=home`,
      title: "Home",
    },
    {
      href: `?page=profile`,
      title: "Profile",
    },
    {
      href: `?page=mint`,
      title: "Mint a Box",
    },
    {
      href: "",
      title: "LOL Puzzle Soon...",
    },
  ];

  return (
    <Container className="d-flex gap-2">
      {links.map(({ href, title }) => (
        <a href={href}>
          <Section className="d-flex justify-content-center align-items-center">
            {title}
          </Section>
        </a>
      ))}
    </Container>
  );
};

return { Navigation };
