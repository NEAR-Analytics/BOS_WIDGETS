
const BackgroundImage = styled.div`
  height: 240px;
  border-radius: 20px 20px 0 0;
  overflow: hidden;
  margin: 0 -12px;
  background: #eceef0;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  @media (max-width: 1024px) {
    margin: calc(var(--body-top-padding) * -1) -12px 0;
    border-radius: 0;
  }

  @media (max-width: 1024px) {
    height: 100px;
  }
`;
return <div>
    <BackgroundImage>
        <Widget
          src="mob.near/widget/Image"
          props={{
            image: "https://ipfs.near.social/ipfs/bafkreiggzwt5isdtkd3uggctgglbe6dt4phlwmecm4mjswnsbvd5d4noum",
            alt: "Cafe Cartel header Image",
            fallbackUrl:
              "https://ipfs.near.social/ipfs/bafkreiggzwt5isdtkd3uggctgglbe6dt4phlwmecm4mjswnsbvd5d4noum",
          }}
        />
 
    </BackgroundImage></div>;
