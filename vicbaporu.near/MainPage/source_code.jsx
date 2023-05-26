const contractName = "milestonemx.near";
const nftContract = "milestonenft.near";

const user = "vicbaporu.near";

const contractData = Near.view(contractName, "get_project_details", "{}");

const result = Near.view(contractName, "get_all_investors", "{}");

const optionChanged = (option) => {
  State.update({ activeSection: option });
  console.log("option change", option);
};

const propsForNavbar = {
  onSelectedOption: optionChanged,
};

State.init({
  activeSection: "project",
});

return (
  <>
    {/* src="near/widget/Onboarding.ComponentCard" to be pasted below */}
    <Widget />

    <Widget src={`${user}/widget/Navbar`} props={propsForNavbar} />

    {state.activeSection === "rewards" && (
      <Widget
        src={`${user}/widget/Rewards`}
        props={{
          nftContract: nftContract,
          contract: contractName,
        }}
      />
    )}
    {state.activeSection === "buys" && (
      <Widget
        src={`${user}/widget/Buys`}
        props={{
          nftContract: nftContract,
          contract: contractName,
        }}
      />
    )}
    {state.activeSection === "project" && (
      <Widget
        src={`${user}/widget/ProjectDetails`}
        props={{
          project: contractData,
          contract: contractName,
        }}
      />
    )}

    {/* src="near/widget/Onboarding.ComponentCollection" to be pasted below */}
    <Widget />
  </>
);
