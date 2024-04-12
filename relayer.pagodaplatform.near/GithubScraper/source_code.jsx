State.init({ githubApiKey: "GitHub API Key" });
State.init({ repoUrl: "GitHub Repo URL" });
State.init({ docUrl: "Documentation URL" });

//define a variable to hold the response
let response = "";

// event handlers
const handleSubmit = async (e) => {
  e.preventDefault();

  const repoUrl = document.getElementById("repoUrl").value;
  const docUrl = document.getElementById("docUrl").value;

  try {
    const response = await fetch("https://devbot.hellopartage.xyz/scrape", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        repoUrl,
        docUrl,
        // Pass the GitHub API Key from the State object
        githubApiKey: State.get("githubApiKey"),
      }),
      credentials: "include",
    });
    const data = await response.json();
    // Update the response variable with the data from the backend
    response = data.response;
  } catch (error) {
    console.error(error);
  }
};

const handleCopyText = () => {
  const outputArea = document.querySelector(".outputArea");
  if (outputArea) {
    outputArea.select();
    document.execCommand("copy");
  }
};

return (
  <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
    <h1> GitHub Scraper </h1>
    <p>
      1. Input your
      <a href="https://github.com/settings/tokens?type=beta">
        Github API Key
      </a>{" "}
      :
    </p>
    <input
      type="text"
      onChange={(e) => State.update({ githubApiKey: e.target.value })}
    />
    <p></p>

    <p>2. Input the GitHub repository URL you want to scrape :</p>
    <input
      type="text"
      onChange={(e) => State.update({ repoUrl: e.target.value })}
    />
    <p>{state.repoUrl}</p>

    <p>3. (optional) Input the documentation URL :</p>
    <input
      type="text"
      onChange={(e) => State.update({ docUrl: e.target.value })}
    />
    <p>{state.docUrl}</p>

    <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
      <button
        onClick={handleSubmit}
        style={{
          fontSize: "1em",
          padding: "10px 20px",
          borderRadius: "5px",
          border: "none",
          color: "white",
          backgroundColor: "#007bff",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
      >
        Submit
      </button>
      <button
        onClick={handleCopyText}
        style={{
          fontSize: "1em",
          padding: "10px 20px",
          borderRadius: "5px",
          border: "none",
          color: "white",
          backgroundColor: "#007bff",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
      >
        Copy Text
      </button>
    </div>
    <p></p>

    <div>
      <textarea
        value={response}
        readOnly
        style={{
          height: "100px",
          width: "100%",
          margin: "10px 0",
          padding: "20px",
          boxSizing: "border-box",
          borderRadius: "5px",
          border: "1px solid #ccc",
          fontSize: "1em",
        }}
      />
    </div>
  </div>
);
