const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1.25em 1.25em 1.5em;
  gap: 0.625em;
  background: #ffffff;
  border-radius: 16px;

  h3 {
    color: var(--black, #000);
    font-family: FK Grotesk;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: 40px; /* 166.667% */
  }

  p {
    color: var(--green, #00EC97);
    font-family: Mona Sans;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; /* 21px */
  }

  img {
    width: 100%;
    border-radius: 10px;
    aspect-ratio: 1 / 1;
    object-fit: cover;
  }

  &:hover,
  &:visited,
  &:active {
    text-decoration: none;
  }
`;

return (
  <Container>
    <img src={props.image} alt={props.name} />
    <h3>{props.name}</h3>

    <p style={{ color: "#9797FF" }}>{props.title}</p>
    <p style={{ color: "#00ec97" }}>{props.org}</p>
  </Container>
);
