return (
  <div>
    <iframe
      iframeResizer={{
        onResized: ({ width, height }) => {
          console.log("iframe resized", width, height);
        },
      }}
      onLoad={() => console.log("iframe loaded")}
      src="https://davidjbradshaw.com/iframe-resizer/example/frame.content.html"
    />
  </div>
);
