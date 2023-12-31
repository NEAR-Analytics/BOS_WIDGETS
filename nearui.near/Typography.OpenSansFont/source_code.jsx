const demoMode = props.demoMode ?? false;

const fontCss = fetch(
  "https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap",
).body;

if (!fontCss) {
  return;
}

const Theme = styled.div`
  * {
    font-family: "Open Sans", sans-serif;
  }
  ${fontCss}
`;

if (demoMode) {
  return (
    <Theme>
      <div>
        <h1>Open Sans</h1>
        <p>
          Import this widgte to your BOS app to load the Open Sans font. To use
          it, simply add the following CSS to your root component:
        </p>
        <p>
          <b>font-family: "Open Sans", sans-serif;</b>
        </p>
      </div>
    </Theme>
  );
}

return <Theme />;
