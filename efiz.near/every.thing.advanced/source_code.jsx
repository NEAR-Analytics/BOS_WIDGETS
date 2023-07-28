const ArrowIcon = styled.span`
  display: inline-block;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid ${(props) => (props.isExpanded ? "#fff" : "#000")};
  margin-right: 5px;
  transition: transform 0.3s;
  transform: rotate(${(props) => (props.isExpanded ? "180deg" : "0")});
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${(props) => (props.isExpanded ? "#fff" : "#000")};
  margin-top: 10px;
  transition: background-color 0.3s;
`;

const AdvancedContainer = styled.div`
  margin: 20px 0;
`;

const AdvancedButton = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  background-color: ${(props) => (props.isExpanded ? "#007bff" : "#28a745")};
  color: #fff;
  font-size: 16px;
  text-align: left;
  cursor: pointer;
`;

const FiltersContainer = styled.div`
  margin-top: 10px;
  display: ${(props) => (props.isExpanded ? "block" : "none")};
`;

const RadioButton = styled.div`
  margin-top: 10px;
`;

const handleToggle = () => {
  State.update({ isExpanded: !state.isExpanded });
};

const handleRadioChange = (event) => {
  State.update({ selectedOption: event.target.value });
};

function Filters() {
  return (
    <Widget
      src="efiz.near/widget/every.thing.filters"
      props={{ handleFilter }}
    />
  );
}

return (
  <AdvancedContainer>
    <AdvancedButton onClick={handleToggle} isExpanded={state.isExpanded}>
      <ArrowIcon onClick={handleToggle} isExpanded={state.isExpanded} />
      {isExpanded ? "Hide Advanced" : "Show Advanced"}
    </AdvancedButton>
    <FiltersContainer isExpanded={state.isExpanded}>
      <Filters />
      <RadioButton>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="filterOption"
            id="allOption"
            value="all"
            checked={state.selectedOption === "all"}
            onChange={handleRadioChange}
          />

          <label htmlFor="allOption">All</label>
        </div>
      </RadioButton>
      <RadioButton>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="filterOption"
            id="taggedByCreatorOption"
            value="taggedByCreator"
            checked={state.selectedOption === "taggedByCreator"}
            onChange={handleRadioChange}
          />

          <label htmlFor="taggedByCreatorOption">Tagged by Creator</label>
        </div>
      </RadioButton>
      <RadioButton>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="filterOption"
            id="taggedByCommunityOption"
            value="taggedByCommunity"
            checked={state.selectedOption === "taggedByCommunity"}
            onChange={handleRadioChange}
          />

          <label htmlFor="taggedByCommunityOption">Tagged by Community</label>
        </div>
      </RadioButton>
      <RadioButton>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="filterOption"
            id="curatedByCategoryOption"
            value="curatedByCategory"
            checked={state.selectedOption === "curatedByCategory"}
            onChange={handleRadioChange}
          />

          <label htmlFor="curatedByCategoryOption">Curated by Category</label>
        </div>
      </RadioButton>
    </FiltersContainer>
  </AdvancedContainer>
);
