State.init({
  queryPlanet: "Strong",
});
const handleInputChange = ({ target }) => {
  State.update({ queryPlanet: target.value });
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
  const queryP = state.queryPlanet;
  asyncFetch(url, {
    method: "POST",
    body: JSON.stringify({ queryPlanet: queryP }),
    mode: "no-cors",
  })
    .then((response) => response)
    .catch((err) => console.log(err));
};

return (
  <Wrapper>
    <input
      placeholder="humanoid dog wearing white clothing, and leather sneakers"
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
