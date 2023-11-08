const ProjectContainer = styled.div`
  width: 800px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 8px;
  color: #0095b6;
  border-style: solid;
`;

const Button = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 12px;
  font-weight: 500;

  a {
    color: #0095b6;
    font-size: 16px;
  }
`;

// Assuming context is a globally available object
const loggedIn = !!context.accountId;

const onInputChange = () => {
  // Define how you handle input changes
};

const onBtnClick = () => {
  // Define what happens when the button is clicked
};

const showSpinner = false; // This would be managed by your component's state

// Define your main component structure
const Main = (
  <ProjectContainer className="m-2 p-4">
    {/* ... All your component markup */}
  </ProjectContainer>
);

// Assuming you're within a React component or script that renders this directly into an app
return <div>{Main}</div>;
