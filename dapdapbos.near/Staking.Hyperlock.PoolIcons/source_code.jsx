const { icons } = props;

const StyledContainer = styled.div`
  display: inline-flex;
  align-items: center;
`;

return (
  <StyledContainer>
    {icons?.map((icon, i) => {
      return (
        <span key={i} style={{ marginRight: -12 }}>
          <Widget
            src="dapdapbos.near/widget/UI.Avatar"
            props={{ src: icon || "/images/tokens/default_icon.png" }}
          />
        </span>
      );
    })}
  </StyledContainer>
);
