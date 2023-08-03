State.init({
  img: null,
});

const dataToEndcode = async () => {
  asyncFetch(
    `https://0f10-45-127-194-52.ngrok.io/getbase64image?data=${
      props.link ?? "www.testinglink.com"
    }`,
    {
      method: "GET",
    }
  ).then((res) => {
    const { qrcodedata } = res.body;
    console.log("as", qrcodedata);
    if (!state.img) State.update({ img: qrcodedata });
  });
};
dataToEndcode();

console.log(state);

return (
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...props.svgProps}
      viewBox={`0 0 ${props.width ?? "100"} ${props.height ?? "100"}`}
      shape-rendering="crispEdges"
    >
      <path fill="#ffffff" d="M0 0h33v33H0z" />
      <path stroke="#000000" d={state.img} />
    </svg>
  </div>
);
