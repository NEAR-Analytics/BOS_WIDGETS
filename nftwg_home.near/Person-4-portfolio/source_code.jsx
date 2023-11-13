const SocialIcon = styled.div`
left:20;
width:20;
height:20;
`;
const Container = styled.div`

position: absolute;
width: 100px;
height: 30px;
top: 0px;
display: flex;
justify-content: space-between; /* Use 'justify-content' for spacing between flex items */
flex-direction: row;
 
`;
return (
  <Container>
    <SocialIcon>
      <a
        href="https://near.social/mob.near/widget/ProfilePage?accountId=ndcplug.near"
        target="blank"
      >
        <img
          style={{ width: 20, height: 20 }}
          src="https://near.social/favicon.png"
        />
      </a>
    </SocialIcon>
    <SocialIcon>
      <a
        href="https://gov.near.org/t/nft-workgroup-technical-council/36748/3"
        target="blank"
      >
        <img
          style={{ width: 20, height: 20 }}
          src="https://cdn.discordapp.com/attachments/1135845507189702748/1162113622244347974/self-introduction.svg?ex=653ac1a6&is=65284ca6&hm=93e8c533053b22ea0bbdf66e06ece735bbace3a746ad382a4c2772a3fb467fd7&"
        />
      </a>
    </SocialIcon>
  </Container>
);
