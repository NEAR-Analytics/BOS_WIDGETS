const Root = styled.div`
  ${cssFont}
  padding: 16px;
  width: 420px;
  height: 1000px;
  font-family: Poppins, sans-serif;
  border-radius: 12px;
  border: 1.5px solid #e6e6e6;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.25);
  margin: 16px auto;

  p {
    font-size: 14px;
    margin: 0;
  }
`;

return (
  <Root>
    <iframe
      iframeResizer
      height="100%"
      src="https://sepolia.easscan.org/schema/view/0x447cefc057bdd611bc853756d3fd633e495d4d8d75a1aaed7ae5598573984c13"
    />
  </Root>
);
