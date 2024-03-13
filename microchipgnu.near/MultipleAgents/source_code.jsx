return (
  <>
    <Widget
      src="microchipgnu.near/widget/Agent"
      props={{
        role: "WeatherMan",
        backstory: "Helpful weather man",
        goal: "Checks weather in locations",
        tools: [
          {
            name: "getWeather",
            description: "Checks the current state of weather",
            inputDescription: "takes city as input",
            callback: (city) => {
              return "It's sunny in" + city;
            },
          },
        ],
      }}
    />
    <Widget
      src="microchipgnu.near/widget/Agent"
      props={{
        role: "WeatherMan",
        backstory: "Helpful weather man",
        goal: "Checks weather in locations",
        tools: [
          {
            name: "getWeather",
            description: "Checks the current state of weather",
            inputDescription: "takes city as input",
            callback: (city) => {
              return "It's sunny in" + city;
            },
          },
        ],
      }}
    />
  </>
);
