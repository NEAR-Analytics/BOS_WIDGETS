const Wrapper = styled.div`
    width: 100%;
`;
const PortFolioTitle = styled.h4`
    width: 100%;
    text-align: center;    
    border-radius: 25px;
    background-color: yellow; 
    line-height: 12; 
`;
const PortFolio = styled.div`
    width: 100%;
    display: flex;  
    border-radius: 25px;
`;
const PortFolioHalf = styled.div`
    width: 50%;  
    border-radius: 25px;
    background-color: green; 
    display: flex;
    justify-content: center;
    align-items: center;
    padding: auto;
`;

return (
  <Wrapper>
    <PortFolioTitle>포트폴리오 제목</PortFolioTitle>
    <PortFolio>
      <PortFolioHalf>
        <p>포트폴리오 항목</p>
      </PortFolioHalf>
      <PortFolioHalf>
        <Widget
          src="party-dhsimpson.near/widget/github-contributions"
          props={{
            token: "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",
            githubNickname: "dhsimpson",
          }}
        />
      </PortFolioHalf>
    </PortFolio>
  </Wrapper>
);
