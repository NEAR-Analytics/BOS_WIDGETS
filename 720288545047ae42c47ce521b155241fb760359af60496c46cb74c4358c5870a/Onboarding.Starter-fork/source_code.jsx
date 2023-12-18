const iframe = useRef(null);
useEffect(() => {
  const iframeOnload = (ev) => {
    console.log(ev);
    iframe.current.sandbox = "allow-scripts allow-same-origin";
    if (a === 1) iframe.current.src = "https://zksync.satori.finance";
    a = a + 1;

    console.log(iframe);
  };

  iframe.current.addEventListener("load", iframeOnload);
});
return (
  <div class="iframe-box">
    <iframe
      ref={iframe}
      class="iframe"
      src="https://zksync.satori.finance"
      sandbox="allow-scripts allow-same-origin"
    />
  </div>
);
