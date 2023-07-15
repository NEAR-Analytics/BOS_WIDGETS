const { handleFilter, candidateId, placeholder } = props;

const Container = styled.div`
    padding: 16px;
    border-radius: 8px;
    background: #F8F8F9;

    i {
      position: absolute;
      top: 7px;
      left: 15px;
    }

    input {
      padding-left: 40px;
    }
`;

return (
  <Container>
    <div className="position-relative">
      <i className="bi bi-search text-secondary"></i>
      <input
        placeholder={placeholder}
        className="form-control w-100"
        value={candicateId}
        onChange={handleFilter}
      />
    </div>
  </Container>
);
