const Styled = styled.div`
  html{
    margin:0 !important;
    padding: 0 !important;
  }
`;
return (
  <Styled>
    <Widget
      src="cuongdcdev.near/widget/IframeEmbed"
      props={{
        src: "https://vbivn-links.vercel.app/",
      }}
    ></Widget>
  </Styled>
);
