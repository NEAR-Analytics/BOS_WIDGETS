const mintTool = [
  {
    name: "get-temperature",
    description: "Get temperature",
    inputDescription: "",
    callback: () => {
      const temperature = 10; // get from external source in the future

      return `Temperature is ${temperature}ºC`;
    },
  },
  {
    name: "set-temperature",
    description: "Set temperature",
    callback: () => {
      // set temperature
      const temperature = 10; // set from external source in the future

      return `Modified temperature to ${temperature}ºC`;
    },
  },
];

return (
  <>
    <h2>Weather Agents</h2>
    <div className="d-flex flex-column gap-4">
      <Widget
        src="microchipgnu.near/widget/Agent"
        props={{
          role: "Temperature Regulator",
          backstory: "Years of experience regulating temperature",
          goal: "Help regulating the temperature",
          tools: [...mintTool],
        }}
      />
    </div>
  </>
);
