State.init({
  isSelectedMain: true,
  isSelectedSub: false,
});

const MainLink = styled.a`
  height:150px;
  width:225px;
  border: ${state.isSelectedMain ? "3px solid #2E8B57" : ""};
  position:relative;
  border-radius:10px;
  cursor:pointer; 
  box-shadow:${state.isSelectedMain ? "" : " 0 0 8px  #999"};
`;

const SubLink = styled.a`
  box-shadow: ${state.isSelectedSub ? "" : " 0 0 8px  #999"};
  border: ${state.isSelectedSub ? "3px solid #2E8B57" : ""};
  height:150px;
  width:225px;
  position:relative;
  border-radius:10px;
  cursor:pointer;
  margin-left:60px;
`;

const ImageDiv = styled.img`
  height:30%;
  width:75%;
  position:absolute;
  top:35%;
  left:10%;
`;

const ImageDiv2 = styled.img`
  height:30%;
  width:75%;
  position:absolute;
  top:35%;
  left:12%;
`;

const TextDiv = styled.span`
  font-size:10px;
  text-align: center;
  position:absolute;
  border-radius:0px 5px 0px 5px;
  top:0px;
  right:0px;
  background-color:green;
  color:white;
`;

return (
  <div class="d-flex flex-column mt-5 mb-3">
    <div class="d-flex justify-content-center mt-5">
      <h3>Near Explorer Selector</h3>
    </div>
    <div class="d-flex justify-content-center mt-2">
      <h6>Choose from the available Near Explorers below</h6>
    </div>
    <div class="d-flex flex-row justify-content-center mt-5">
      <MainLink
        href="https://nearblocks.io/"
        target="_blank"
        onClick={() => {
          State.update({ isSelectedMain: true, isSelectedSub: false });
        }}
      >
        <TextDiv>Recommended</TextDiv>
        <ImageDiv
          src={"https://nearblocks.io/images/nearblocksblack.svg"}
        ></ImageDiv>
      </MainLink>
      <SubLink
        href={"https://explorer.near.org/"}
        target="_blank"
        onClick={() => {
          State.update({ isSelectedMain: false, isSelectedSub: true });
        }}
      >
        <ImageDiv2
          src={
            "https://near-repo-jithindotin.vercel.app/_next/static/media/logo-black.2e682d59.svg"
          }
        ></ImageDiv2>
      </SubLink>
    </div>
  </div>
);
