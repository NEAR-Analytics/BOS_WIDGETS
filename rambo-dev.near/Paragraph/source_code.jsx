const StyledParagraph = styled.p`
  font-family: "Aekonik", sans-serif;
  font-weight: 500;
  letter-spacing: 0;
  color: ${(props) => props.textColor}

  ${(props) => {
    switch (props.pType) {
      case "p1":
        return `
          font-size: 1rem;
          line-height: 170%;
        `;
      case "p2":
        return `
          font-size: 0.875rem;
          line-height: 170%;
        `;
      case "p3":
        return `
          font-size: 0.8125rem;
          line-height: auto;
        `;
      default:
        return "";
    }
  }}
  
`;

function P({ children, pType = "p1", textColor = "#FFFFFF" }) {
  return (
    <StyledParagraph pType={pType} textColor={textColor}>
      {children}
    </StyledParagraph>
  );
}

return { P };
