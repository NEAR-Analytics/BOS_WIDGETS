const website = "https://fluidmoney.xyz/";

return (
  <div>
    <iframe
      iframeResizer={{
        onResized: ({ width, height }) => {
          console.log("iframe resized", width, height);
        },
      }}
      onLoad={() => console.log("iframe loaded")}
      src="https://fluidmoney.xyz"
    />
  </div>
);
