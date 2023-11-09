const ProjectContainer = styled.div`
  width: 800px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 8px;
  color: #8261CF; // Using the primary color for text
  background-color: #E5DEF4; // Neutral background color
  border: 1px solid #7551CA; // Secondary color for the border
`;

const StyledButton = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 12px;
  font-weight: 500;

  a {
    color: #FFFFFF; // Base elements color (White) for text
    font-size: 16px;
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
    border: 2px solid #7551CA; // Using the secondary color for border
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #8261CF; // Primary color
    &:hover {
      background-color: #7551CA; // Darker shade for hover state
    }
  }
`;

const Main = (
  <ProjectContainer className="m-2 p-4">
    <div className="row">
      {/* ... Your content here ... */}
      <StyledButton className="p-2">
        <a
          href="#"
          style={{
            backgroundColor: "#8261CF", // Primary color
            color: "#FFF", // White text
            paddingInline: "24px", // Horizontal padding
            height: "40px", // Height of the button
            border: "2px solid #7551CA", // Border with secondary color
            borderRadius: "5px", // Rounded corners
            display: "flex", // Flex display to center items
            alignItems: "center", // Align items vertically
            justifyContent: "center", // Justify content horizontally
            textDecoration: "none", // No underline on the text
          }}
        >
          Publish
        </a>
      </StyledButton>
      <StyledButton className="p-2">
        <a
          href="#"
          style={{
            backgroundColor: "#CFC2EC", // Accent color
            color: "#FFF", // White text
            paddingInline: "24px", // Horizontal padding
            height: "40px", // Height of the button
            border: "2px solid #7551CA", // Border with secondary color
            borderRadius: "5px", // Rounded corners
            display: "flex", // Flex display to center items
            alignItems: "center", // Align items vertically
            justifyContent: "center", // Justify content horizontally
            textDecoration: "none", // No underline on the text
          }}
        >
          Cancel
        </a>
      </StyledButton>
    </div>
  </ProjectContainer>
);

// If you are not using ES6 modules, simply include your Main JSX in your render method:
function render() {
  return <div>{Main}</div>;
}
