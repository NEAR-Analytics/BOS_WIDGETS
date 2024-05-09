const handleToggle = () => {
  setIsOpen(!isOpen);
};

return (
  <div>
    <button onClick={handleToggle} className="new-campaign">
      Create New Campaign
    </button>
    <Collapse isOpened={isOpen}>
      <CrowdfundingForm />
    </Collapse>
  </div>
);
