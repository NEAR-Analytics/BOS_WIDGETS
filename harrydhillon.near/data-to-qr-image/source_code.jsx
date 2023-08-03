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
    if (!state.img) State.update({ img: qrcodedata });
  });
};
dataToEndcode();

console.log(state);

return (
  <div style={{ width: 300 }}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      {...props.svgProps}
      width="100%"
      height="auto"
      viewBox="0 0 34 34"
      shape-rendering="crispEdges"
    >
      <path stroke="#000000" d={state.img} />
    </svg>
  </div>
);
