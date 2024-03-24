const { config, select, setSelect, theme } = props;

const TabContainer = styled.div`
  background: #212233;

  display: flex;
  padding: 4px;
  border-radius: 10px;

  margin-top: 30px;

  @media (min-width: 640px) {
    max-width: 355px;
    margin: 0 auto;
    margin-top: 50px;
  }
`;

const TabItem = styled.div`
  flex: 1;
  height: 48px;

  display: grid;
  place-content: center;
  border-radius: 10px;
  /* color: var(--button-text-color);
  background: ${loading || disabled
    ? "var(--button-disabled-color)"
    : "var(--button-color)"}; */
  ${(props) =>
    props.selected &&
    "color: var(--button-text-color);background: var(--button-color);"}
  ${(props) =>
    props.disabled &&
    `
    opacity: 0.3;
    cursor: not-allowed;
  `}

  font-size: 16px;
  font-weight: bold;

  transition: all 0.3s ease-in-out;
  ${(props) =>
    !props.selected &&
    `
    cursor: pointer;
    &:hover {
      color: var(--button-text-color);
      background: var(--button-color);
      opacity: 0.7;
    }
  `}
`;

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
