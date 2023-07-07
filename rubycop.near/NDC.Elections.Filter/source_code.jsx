const { handleFilter, candidateId } = props;

const Container = styled.div`
    padding: 16px;
    border-radius: 8px;
    background: #F8F8F9;
`;

return (
  <Container>
    <input
      placeholder="Search by candidate name"
      className="form-control w-100"
      value={candicateId}
      onChange={handleFilter}
    />
  </Container>
);
