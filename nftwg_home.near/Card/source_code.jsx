const Card = styled.div`
box-sizing: border-box;
position: absolute;
width: 400px;
height: 313px;
background: #FFFFFF;
border: 1px solid #A0A0A0;
border-radius: 10px;
background: #D9D9D9;


`;
const CardContent = styled.div`
position: absolute;
width: 400px;
height: 13px;
`;
const AppLinkButton = styled.div`
/* Frame 2 */

box-sizing: border-box;

/* Auto layout */
display: flex;
flex-direction: row;
justify-content: flex-end;
align-items: center;
padding: 16px 132px;
gap: 10px;
cursor:pointer;

position: absolute;
width: 352px;
height: 48px;


background: #FFFFFF;
border: 1px solid #F0F0F0;
border-radius: 79px;
`;
const ApplinkText = styled.div`
/* View Details */

width: 88px;
height: 16px;

font-family: inherit;
font-style: normal;
font-weight: 400;
font-size: 16px;
line-height: 100%;
/* identical to box height, or 16px */

color: #333333;


/* Inside auto layout */
flex: none;
order: 0;
flex-grow: 0;

`;
return (
  <Card style={{ top: 400, left: 470 }}>
    <CardContent style={{ top: 50, left: 210, fontSize: 20 }}>
      Socializer.
    </CardContent>
    <CardContent style={{ top: -10, left: 10, fontSize: 20 }}>
      <img
        style={{ width: 132, height: 120 }}
        src="https://cdn.discordapp.com/attachments/1135845507189702748/1162116592906293341/image.png?ex=653ac46a&is=65284f6a&hm=65dad1554346d62e5e55c6917328b4a1d5ffad8c1352329ada45b47c85bdaeff&"
      />
    </CardContent>
    <CardContent style={{ top: 140, left: 15 }}>
      Socializer is an interactive rewards portal for Near Socaial
    </CardContent>
    <CardContent style={{ top: 240, left: 20 }}>
      <AppLinkButton>
        <ApplinkText>In Progress</ApplinkText>
      </AppLinkButton>
    </CardContent>
  </Card>
);
