const Owner = "nftwg_home.near";

const props = [
  {
    title: "ABC",
    imageSrc: "https://humans.nearverselabs.com/logo.png",
    description:
      "Humans of Near is a Map of IAM Human SBT holders. Built by the NFT Workgroup.",
    buttonText: "Completed",
    fontSize: 20,
    href: "https://near.org/humans-of-near.near/widget/humans.nearverselabs.com",
  },
  {
    title: "XYZ",
    imageSrc:
      "https://cdn.discordapp.com/attachments/1135845507189702748/1162116592906293341/image.png?ex=653ac46a&is=65284f6a&hm=65dad1554346d62e5e55c6917328b4a1d5ffad8c1352329ada45b47c85bdaeff&",
    description: "Socializer is an interactive rewards portal for Near Social.",
    buttonText: "In Progress",
    fontSize: 20,
  },
  {
    title: "MNC",
    imageSrc:
      "https://cdn.discordapp.com/attachments/1135845507189702748/1162116592906293341/image.png?ex=653ac46a&is=65284f6a&hm=65dad1554346d62e5e55c6917328b4a1d5ffad8c1352329ada45b47c85bdaeff&",
    description: "Socializer is an interactive rewards portal for Near Social.",
    buttonText: "In Progress",
    fontSize: 20,
  },
  {
    title: "XYZ",
    imageSrc:
      "https://cdn.discordapp.com/attachments/1135845507189702748/1162116592906293341/image.png?ex=653ac46a&is=65284f6a&hm=65dad1554346d62e5e55c6917328b4a1d5ffad8c1352329ada45b47c85bdaeff&",
    description: "Socializer is an interactive rewards portal for Near Social.",
    buttonText: "In Progress",
    fontSize: 20,
  },
  {
    title: "MNC",
    imageSrc:
      "https://cdn.discordapp.com/attachments/1135845507189702748/1162116592906293341/image.png?ex=653ac46a&is=65284f6a&hm=65dad1554346d62e5e55c6917328b4a1d5ffad8c1352329ada45b47c85bdaeff&",
    description: "Socializer is an interactive rewards portal for Near Social.",
    buttonText: "In Progress",
    fontSize: 20,
  },
];

const Card = styled.div`
  box-sizing: border-box;
  width: 400px;
  height: 313px;
  background: #FFFFFF;
  border: 1px solid #A0A0A0;
  border-radius: 10px;
  margin: 10px; /* Add margin for spacing between cards */
 position: relative;
 font-family:inherit;
`;

const CardContent = styled.div`
  width: 400px;
  height: 13px;
  display:flex;
  position: relative;
  
`;

const AppLinkButton = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 16px 132px;
  gap: 10px;
  cursor: pointer;
  width: 352px;
  height: 48px;
 background: #D9D9D9;
  border: 1px solid #F0F0F0;
  border-radius: 79px;
  position: relative;
`;

const ApplinkText = styled.div`
  width: 88px;
  height: 16px;
  font-family: inherit;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  color: #333333;
  flex: none;
  order: 0;
  flex-grow: 0;
  position: relative;
`;
const Line = styled.div`
/* Line 6 */
position: absolute;
width: 399px;
height: 0px;
border: 1px solid #A0A0A0;

`;
const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

return (
  <div style={{ display: "flex" }}>
    <CardsGrid>
      {props.map((item, index) => (
        <Card key={index}>
          <CardContent style={{ top: 10, left: 10 }}>
            <img
              style={{ width: 80, height: 80 }}
              src={item.imageSrc}
              alt={item.title}
            />
          </CardContent>
          <CardContent
            style={{ fontSize: 24, top: 50, left: 170, fontWeight: 700 }}
          >
            {item.title}
          </CardContent>

          <CardContent style={{ fontSize: 16, top: 100, left: 10 }}>
            {item.description}
          </CardContent>
          <CardContent style={{ top: 180 }}>
            <Line />
          </CardContent>
          <CardContent>
            <AppLinkButton style={{ top: 200, left: 20 }}>
              <a href={item.href}>
                {" "}
                <ApplinkText>{item.buttonText}</ApplinkText>
              </a>
            </AppLinkButton>
          </CardContent>
        </Card>
      ))}
    </CardsGrid>
  </div>
);
