import([
  "form/FormContainer",
  "form/FormTitle",
  "form/FormBody",
  "form/FormRowContainer",
  "form/FormRowTitle",
  "form/FormRowValue",
  "form/FormButtonGroup",
  "form/FormButton",
  "form/FormFragment",
  "constants",
  "data/GlobalData",
]);

const yourNeatData = [
  {
    title: "Token amount",
    value: state.balance ? Number(state.balance).toLocaleString() : "-",
  },
];
return (
  <FormFragment>
    <FormContainer>
      <FormTitle>Your $Neat</FormTitle>
      <FormBody>
        {yourNeatData.map((row) => (
          <FormRowContainer key={row.title}>
            <FormRowTitle>{row.title}</FormRowTitle>
            <FormRowValue>{row.value}</FormRowValue>
          </FormRowContainer>
        ))}
      </FormBody>
    </FormContainer>
    <FormContainer>
      <FormTitle>Minted address rank</FormTitle>
      <FormBody>
        <Widget src={`${config.ownerId}/widget/NEAT.SearchInput`} />
        <Widget src={`${config.ownerId}/widget/NEAT.IndexTable`} />
      </FormBody>
    </FormContainer>
  </FormFragment>
);
