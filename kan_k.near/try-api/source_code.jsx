State.init({
  waifuUrl: "",
});

const queryURI = "https://api.waifu.im/search?included_tags=maid";

const fetchWaifu = (queryURI) => {
  return asyncFetch(queryURI, {
    method: "GET",
    body: JSON.stringify(data),
  });
};

const handleAskRequestWaifu = () => {
  fetchWaifu(queryURI).then((res) => {
    State.update({ waifuUrl: res.body.images[0].url });
    console.log(res.body.images[0]);
  });
};

return (
  <>
    <button class="btn btn-primary" onClick={handleAskRequestWaifu}>
      {!state.waifuUrl ? "Waifu" : "Reroll Waifu"}
    </button>
    {state.waifuUrl && (
      <div>
        <p>
          <img src={state.waifuUrl} style={{ width: 500, height: 500 }} />
        </p>
      </div>
    )}
  </>
);
