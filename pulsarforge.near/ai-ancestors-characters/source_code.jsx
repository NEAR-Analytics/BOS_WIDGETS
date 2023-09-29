State.init({
  queryPlanet: "",
});
const handleInputChange = (event) => {
  State.update({ queryPlanet: event.target.value });
};

const TextArea = styled.textarea`
  display: block;
  padding:.5em;
  width:100%;
  border: 1px solid #e5e8eb;
  border-radius: 10px;
  outline: none;
  background: #f4f5f6;
  color: #525c76;
  :focus{
    border:1px solid #0d99ff;
  }
`;
const Wrapper = styled.div``;

const handleSubmit = () => {
  // The base URL for our API
  const url = "https://bos-ancestors.pulsarforge.workers.dev/";

  asyncFetch(url, {
    method: "POST",
    body: JSON.stringify({ queryPlanet }),
    mode: "no-cors",
    headers: {
      accept: "application/json",
      "Content-type": "application/json",
    },
  })
    .then((response) => response)
    .catch((err) => console.log(err));
};

return (
  <Wrapper>
    <TextArea
      placeholder="humanoid dog wearing white clothing, and leather sneakers"
      value={state.queryPlanet}
      onChange={handleInputChange}
    />

    <button
      onClick={handleSubmit}
      type="submit"
      className="btn btn-primary"
      style={{
        width: "100%",
        padding: 25,
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 20,
      }}
    >
      Create Characters
    </button>
    <h4>
      Humanoid dog, wearing colorful clothing, dancing pose, outdoor, daylight,
      mountains, cinema 4d
    </h4>
    <h5> Sample: </h5>
    <img
      src="https://ipfs.near.social/ipfs/bafkreie75zc7tqt2xk6ttwnf6x2r5mmzd74emuj2u6yaycbh7tabiirwlq"
      alt="Otter"
      style={{ width: "35%", borderRadius: 40 }}
    />
  </Wrapper>
);
