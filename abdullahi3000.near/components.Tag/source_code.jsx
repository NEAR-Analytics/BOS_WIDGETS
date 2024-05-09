const Container = styled.div`
  display: flex;
  padding: 12px 20px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  width: max-content;

  border-radius: 100px;
  border: 1px solid var(--eca-227, #2287C2);
  background: #7dc6f059;

  span {
    color: var(--eca-227, #c7cfd5);
    text-align: center;
    font-family: "Zen Kaku Gothic Antique", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    text-transform: capitalize;
  }

  @media screen and (max-width: 768px) {
    padding: 8px 16px;

    span {
      font-size: 12px;
    }
  }
`;

const Tag = ({ label }) => {
  return (
    <Container>
      <span>{label}</span>{" "}
    </Container>
  );
};

return { Tag };
