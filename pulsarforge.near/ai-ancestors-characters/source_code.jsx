State.init({
  queryPlanet: "Strong",
  generation,
  images: [],
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

const handleImages = () => {
  const urlImages = "https://bos-ancestors-images.pulsarforge.workers.dev/";
  var resp = fetch(urlImages);

  State.update({ generation: resp.body.generations });
};
const handleImagesUpdate = () => {
  State.update({ generation: undefined });
};
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

console.log("STATE GENERATION", state.generation);
return (
  <Wrapper>
    <div className="row">
      <TextArea placeholder="red bird, outdoor" onChange={handleInputChange} />
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
        Send Query to Create Character
      </button>
      <h4>red bird, daylight, outdoor, cinema 4d</h4>
      {state.generation ? (
        <>
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              <h4>Get your character here, to use again F5</h4>
              <br />
              <br />
            </div>
            <div className="col-md-2"></div>
          </div>
          <div className="row">
            {state.generation.map(
              (leoImage, index) =>
                index === 0 && (
                  <div className="row" key={index}>
                    {leoImage.generated_images.map((leoGenerate, idx) => (
                      <>
                        <div className="col-md-12" key={idx}>
                          <h2>Gen {idx + 1}</h2>
                          <img
                            src={leoGenerate?.url}
                            style={{
                              width: "95%",
                              borderRadius: 40,
                            }}
                            alt="generations"
                          />
                        </div>
                      </>
                    ))}
                    <h5>Previous Creator Prompt: {leoImage.prompt}</h5>
                  </div>
                )
            )}
          </div>
        </>
      ) : (
        <h4>
          <br />
          Submit, wait 5 seconds and discover your character, to use once again
          F5.
          <br />
          <br />
        </h4>
      )}
      <button
        onClick={handleImages}
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
        Get Character
      </button>
      <h2>
        <a href="https://ancestors.pulsarforge.io/" target="_blank">
          {" "}
          Visit Ancestors
        </a>
      </h2>
      <h5> Sample: </h5>
      <img
        src="https://cdn.leonardo.ai/users/fc497577-e347-4826-85fa-48e611881c4e/generations/3c9c5468-e44c-422a-b5d1-6811e4f5acee/3D_Animation_Style_red_bird_daylight_outdoor_cinema_4d_0.jpg"
        alt="Otter"
        style={{ width: "35%", borderRadius: 40 }}
      />
    </div>
  </Wrapper>
);
