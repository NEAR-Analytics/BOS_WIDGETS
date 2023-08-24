const ownerId = "crowdtestify.near";
const skillsArray = [
  { name: "ProgrammingBasics" },
  { name: "TestingBasics" },
  { name: "FunctionalTesting" },
  { name: "LoadTesting" },
  { name: "IntegrationTesting" },
  { name: "UnitTesting" },
  { name: "SecurityTesting" },
  { name: "Selenium" },
  { name: "Playwright" },
  { name: "JUnit" },
  { name: "TestNG" },
  { name: "PythonAutomation" },
  { name: "JavaScriptAutomation" },
  { name: "MobileAppTesting" },
  { name: "WebAppTesting" },
  { name: "ApiTesting" },
  { name: "DatabaseTesting" },
  { name: "CloudTesting" },
  { name: "AgileTesting" },
  { name: "ContinuousIntegration" },
  { name: "ContinuousDeployment" },
  { name: "PerformanceTesting" },
  { name: "UITesting" },
  { name: "UXTesting" },
  { name: "CrossPlatformTesting" },
  { name: "VRTesting" },
  { name: "BlockchainTesting" },
  { name: "TesIoTTestingtinBasics" },
  { name: "MicroservicesTesting" },
];

State.init({
  skills: [],
  skillsError: "",
});

return (
  <Widget
    src={`${ownerId}/widget/Inputs.MultiSelect`}
    props={{
      label: "Skills",
      placeholder: "Add skills",
      options: skillsArray,
      value: state.skills,
      onChange: (skills) =>
        State.update({
          skills: skills.map(({ name }) => ({
            name: name.trim().replaceAll(/\s+/g, "-"),
          })),
        }),
    }}
  />
);
