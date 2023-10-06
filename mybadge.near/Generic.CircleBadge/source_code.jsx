const IconWrapper = styled.div`
    display: flex;
    width: 16px;
    height: 16px;
    justify-content: center;
    align-items: center;
    border-radius: 16px;
    background: ${props.backgroundColor};

    * {
        fill: white;
    }
`;

return (
  <IconWrapper>
    <Widget src={props.iconSrc} />
  </IconWrapper>
);
