const desktopImage =
  "https://ipfs.near.social/ipfs/bafkreiga7r5nutmlf66qkfvgkzbq2orbqtlmvgshq47355um2ttqybt4pe";
const mobileImage =
  "https://ipfs.near.social/ipfs/bafkreiddafldobfu4tcqmeyhxgxdkwp7mhfb5keottpe6lir67j6zgout4";

const MyImage = styled.img`
    @media (max-width: 650px) {    
         content:url(${mobileImage});   
    }
`;

return <MyImage src={desktopImage} style={{ width: "100%" }} />;
