const iframe = document.querySelector(".iframe");
const iframeOnload = (ev) => {
  console.log(ev);
  iframe.sandbox = "allow-scripts allow-same-origin";
  if (a === 1) iframe.src = "https://zksync.satori.finance";
  a = a + 1;

  console.log(iframe);
};

iframe.addEventListener("load", iframeOnload);
return (
  <div class="iframe-box">
    <iframe
      class="iframe"
      src="https://zksync.satori.finance"
      sandbox="allow-scripts allow-same-origin"
    />
  </div>
);
