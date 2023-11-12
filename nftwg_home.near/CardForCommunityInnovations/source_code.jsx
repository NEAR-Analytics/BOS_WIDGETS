const Owner = "nftwg_home.near";

const props = [
  {
    title: "NFT Swap",
    imageSrc:
      "https://dweb.link/ipfs/QmfVUkdAnQSmPARCKutHdMFBTu2dnsinGmBxji4ha8JjmF",
    description:
      "Trade NFTs directly with other Near Users. Powered by Genadrop",
    buttonText: "Goto DApp",
    fontSize: 20,
    href: "https://near.org/harrydhillon.near/widget/NFTSwap.NFT-Trade",
  },
  {
    title: "NFT Transfer",
    imageSrc:
      "https://dweb.link/ipfs/QmfVUkdAnQSmPARCKutHdMFBTu2dnsinGmBxji4ha8JjmF",
    description:
      "Transfer NFTs using ContractID and TokenID. Powered by Genadrop",
    buttonText: "Goto DApp",
    fontSize: 20,
    href: "https://near.org/onboarder.near/widget/NFT-Transfer",
  },
  {
    title: "Holder Snapshot",
    imageSrc: "https://www.indexer.xyz/indexer-logo-icon.svg",
    description:
      "Input contract ID to get NFT Collection holder snapshot. Powered by Indexer.xyz",
    buttonText: "Goto DApp",
    fontSize: 20,
    href: "https://near.org/9c461db4ac11b66ed1167ff969042ac278eaf2d571712585424be00171a63884/widget/NFT-Collection-Holder-Snapshot",
  },
  {
    title: "LinkDrop+",
    imageSrc:
      "https://ipfs.near.social/ipfs/bafkreicck7fsu7j26qr5wpzjad4xumocgqmowwuie5ilhrdlnkssjriyyq",
    description:
      "Linkdrop plus powered by Keypom! Create and customize linkdrops for onboarding new users to web3!",
    buttonText: "Goto DApp",
    fontSize: 20,
    href: "https://near.org/cuongdcdev.near/widget/linkdrop_plus",
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
  grid-template-columns: repeat(2, 1fr);
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
              <a href={item.href} target="_blank">
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
