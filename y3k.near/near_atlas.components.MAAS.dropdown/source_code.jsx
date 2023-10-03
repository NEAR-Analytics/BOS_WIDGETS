const initialState = {
  selectedWidget: "A", // "A" represents the MonthlyActiveAcounts and "B" represents MainChainActiveAcounts
};

State.init(initialState);

// const state = {
//   data: initialState,
//   update(newState) {
//     this.data = { ...this.data, ...newState };
//   },
// };

const Style = styled.div`
  /* Add any styles if needed */
`;

const handleDropdownChange = (e) => {
  State.update({ selectedWidget: e.target.value });
};

return (
  <Style>
    <div className="bg-dark container rounded-4 p-3 mb-4">
      <div>
        <label
          htmlFor="widget-dropdown"
          className="text-white block text-sm font-medium"
        ></label>
        <select
          id="widget-dropdown"
          value={state.selectedWidget}
          onChange={handleDropdownChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring focus:border-blue-300 sm:text-sm rounded-md"
        >
          <option value="A">NEAR Active Accounts</option>
          <option value="B">AURORA and NEAR Active Accounts</option>
        </select>

        {state.selectedWidget === "A" ? (
          <Widget
            src="y3k.near/widget/near_atlas.components.MonthlyActiveAcounts"
            props={{}}
          />
        ) : (
          <Widget
            src="y3k.near/widget/near_atlas.components.MainChainActiveAcounts"
            props={{}}
          />
        )}
      </div>
    </div>
  </Style>
);
