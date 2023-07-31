State.init({
  img: null,
});

const dataToEndcode = async () => {
  asyncFetch(
    "https://nodejs-production-9e04.up.railway.app/getbase64image?data=https://www.google.com",
    {
      method: "GET",
    }
  ).then((res) => {
    const { qrcodedata } = res.body;
    console.log(qrcodedata);
    if (state.img === null) {
      State.update({ img: qrcodedata });
    }
  });
};
dataToEndcode();

return (
  <div>
    <img style={{ width: 200 }} src={state.img} />
  </div>
);
