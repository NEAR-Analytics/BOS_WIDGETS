const StyledFont = styled.div`
  color: ${(props) => props.color || '#000'};
  font-family: ${(props) => props.fontFamily || 'Gantari'};
  font-size: ${(props) => props.fontSize || '16px'};
  font-style: ${(props) => props.fontStyle || 'normal'};
  font-weight: ${(props) => props.fontWeight || '400'};
  line-height: ${(props) => props.lineHeight || 'normal'};
  white-space: ${(props) => props.whiteSpace || 'normal'};
`;
const StyledFlex = styled.div`
  display: flex;
  flex-direction: ${(props) => props.flexDirection || 'row'};
  align-items: ${(props) => props.alignItems || 'center'};
  justify-content: ${(props) => props.justifyContent || 'flex-start'};
  gap: ${(props) => props.gap || '0px'};
`;
return {
  StyledFont,
  StyledFlex
}