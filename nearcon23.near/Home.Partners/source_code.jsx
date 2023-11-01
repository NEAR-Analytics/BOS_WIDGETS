const ownerId = "nearcon23.near";

const desktopImage =
  "https://ipfs.near.social/ipfs/bafkreieh454tbxt6jxikkmzdvytvrujoglmiuruplwarojm3tkke6ru4s4";

const mobileImage =
  "https://ipfs.near.social/ipfs/bafkreicim25ai3n2zybevbr3p4vxkwujd3r6htclphmnc5n2n57gx2aaji";

const MyImage = styled.img`
    width:100%;
    @media (max-width: 650px) {    
            content:url(${mobileImage});   
    }
`;

return <MyImage src={desktopImage} />;
