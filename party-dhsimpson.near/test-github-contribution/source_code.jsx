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
`;
const PortFolioHalfMiddleText = styled.h4`
    display: flex;
    justify-content: center;  /* 가로 방향으로 중앙 정렬 */
    align-items: center;    
  height: 100%;
`;

return (
  <Wrapper>
    <PortFolioTitle>포트폴리오 제목</PortFolioTitle>
    <PortFolio>
      <PortFolioHalf>
        <PortFolioHalfMiddleText>포트폴리오 항목</PortFolioHalfMiddleText>
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
