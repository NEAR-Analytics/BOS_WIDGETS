// const Wrapper = styled.div`
//   /* Your styling for the overall wrapper */
// `;

// const FlexContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
// `;

// const FlexChild = styled.div`
//   border: 1px solid black;
//   border-radius: 1rem;
//   flex: 1;
//   margin-right: 10px;

//   &:last-child {
//     margin-right: 0;
//     margin-left: 10px;
//   }
// `;

// return (
//   <Wrapper>
//     <div>
//       <Widget
//         src="efiz.near/widget/every.thing.raw"
//         props={{ path: "harmonic1.near/thing/artist/jas" }}
//       />
//     </div>
//     <FlexContainer>
//       <FlexChild>
//         <Widget
//           src="harmonic1.near/widget/every.thing.view"
//           props={{ path: "harmonic1.near/thing/artist/jas" }}
//         />
//       </FlexChild>
//       <FlexChild>
//         <Widget
//           src="harmonic1.near/widget/every.thing.view"
//           props={{
//             path: "harmonic1.near/thing/artist/jas",
//             templateOverride: "harmonic1.near/widget/artist-content-template",
//           }}
//         />
//       </FlexChild>
//       <FlexChild>
//         <Widget
//           src="harmonic1.near/widget/every.thing.view"
//           props={{
//             path: "harmonic1.near/thing/artist/jas",
//             templateOverride: "harmonic1.near/widget/artist2",
//           }}
//         />
//       </FlexChild>
//     </FlexContainer>
//   </Wrapper>
// );

// Wrapper for the entire content
const Wrapper = styled.div`
  margin: 20px;
  padding: 20px;
  border-radius: 1rem;
  //background-color: #f8f8f8;
`;

const Info = styled.div`
  margin: 20px;
  //padding: 20px;
  margin-bottom: 40px;
  border-radius: 1rem;
`;
// Container for the raw JSON display and its explanation
const JsonContainer = styled.div`
  //margin: 20px;
  margin-top: 10px;
  padding: 10px;
  border-radius: 1rem;
  border: 1px solid black;
  border-radius: 1rem;
`;

// Flex container for the widgets
const FlexContainerRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px; // Adds space between children
`;

const FlexContainerColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 20px; // Adds space between children
`;

// Each widget container
const FlexChild = styled.div`
  flex: 1;
  min-width: calc(50% - 10px); // Makes sure it takes up about half the width
  padding: 10px;
  border: 1px solid black;
  border-radius: 1rem;
`;

return (
  <Wrapper>
    <Info>
      <h1>Template Library for your Link in Bio Profiles</h1>
    </Info>
    {/* Widgets */}
    <FlexContainerRow>
      <FlexChild>
        <Widget
          src="harmonic1.near/widget/every.thing.view"
          props={{ path: "harmonic1.near/thing/artist/jas" }}
        />
      </FlexChild>
      <FlexChild>
        <Widget
          src="harmonic1.near/widget/every.thing.view"
          props={{
            path: "harmonic1.near/thing/artist/jas",
            templateOverride: "harmonic1.near/widget/artist-content-template",
          }}
        />
      </FlexChild>
    </FlexContainerRow>
    <FlexContainerColumn>
      <FlexChild>
        <Widget
          src="harmonic1.near/widget/every.thing.view"
          props={{
            path: "harmonic1.near/thing/artist/jas",
            templateOverride: "harmonic1.near/widget/artist2",
          }}
        />
      </FlexChild>
      <FlexChild>
        <Widget
          src="harmonic1.near/widget/every.thing.view"
          props={{
            path: "harmonic1.near/thing/artist/jas",
            templateOverride: "harmonic1.near/widget/artist3",
          }}
        />
      </FlexChild>
    </FlexContainerColumn>
    {/* JSON Container */}
    <div style={{ "margin-top": "50px" }}>
      <h3>All the above templates are rendered using the thing data below.</h3>
      <JsonContainer>
        <Widget
          src="efiz.near/widget/every.thing.raw"
          props={{ path: "harmonic1.near/thing/artist/jas" }}
        />
      </JsonContainer>
    </div>
  </Wrapper>
);
