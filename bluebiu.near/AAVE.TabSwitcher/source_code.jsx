const { config, select, setSelect, theme } = props;

const TabContainer = styled.div`
  background: #212233;
  display: flex;
  width: 244px;
  height: 52px;
  border-radius: 28px;
  align-items: center;
  padding: 0 4px;
`;

const TabItem = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  border-radius: 28px;
  ${(props) =>
    props.selected && "color: white;background: var(--agg-primary-color,#000);"}
  ${(props) =>
    props.disabled &&
    `
    opacity: 0.3;
    cursor: not-allowed;
  `}

  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  /* ${(props) =>
    !props.selected &&
    `
    cursor: pointer;
    &:hover {
      color: var(--agg-primary-color,--button-text-color);
      background: var(--agg-secondary-color,--button-color);
      opacity: 0.7;
    }
  `} */
`;
console.log(1111, select);
return (
  <TabContainer>
    <TabItem
      selected={select === "MARKET"}
      onClick={() => setSelect("MARKET")}
      style={theme ? theme : {}}
    >
      Market
    </TabItem>
    <TabItem
      selected={select === "YOURS"}
      onClick={() => setSelect("YOURS")}
      style={theme ? theme : {}}
    >
      Yours
    </TabItem>
  </TabContainer>
);
