State.init({
  answer: "",
  showOptions: false,
  answer1: "",
  answer2: "",
  answer3: "",
  answer4: "",
  optionA: "",
  optionB: "",
  optionC: "",
});

const handleAnswer = (selectedAnswer) => {
  State.update({
    answer: selectedAnswer,
    showOptions: true,
  });
};

const handleOptionA = (selectedOption) => {
  State.update({
    answer: selectedOption,
    showOptions: false,
  });
};

const handleOptionB = (selectedOption) => {
  State.update({
    answer: selectedOption,
    showOptions: false,
  });
};

const handleOptionC = (selectedOption) => {
  State.update({
    answer: selectedOption,
    showOptions: false,
  });
};

const handleOptionD = (selectedOption) => {
  State.update({
    answer: selectedOption,
    showOptions: false,
  });
};

let showQuestion1 = false;

if (
  Social.keys(`${context.accountId}.near/graph/follow/evangel.near`) === true
) {
  showQuestion1 = true;
}

let showQuestion2 = false;
let showQuestion3 = false;
let showQuestion4 = false;
let showQuestion5 = false;

if (state.answer1.toLowerCase() === "1") {
  showQuestion2 = true;
}

if (state.answer2.toLowerCase() === "1") {
  showQuestion3 = true;
}

if (state.answer3 === "1") {
  showQuestion4 = true;
}

if (state.answer4.toLowerCase() === "1") {
  showQuestion5 = true;
}

return (
  <div>
    <div className="d-flex flex-wrap justify-content-between mb-3">
      <div className="m-1">
        <h2>
          <b>But Who is your NDC and what kind of Election ?</b>
        </h2>
        <h4>Test your knowledge about the NDC and elections</h4>
        <h5>
          Hint can be found here -{" "}
          <a href="https://medium.com/near-protocol-ua-eng/but-who-is-your-ndc-and-what-kind-of-election-b1552874745e">
            ENG
          </a>{" "}
          /
          <a href="https://medium.com/@nearuaguild/%D1%82%D0%B0-%D1%85%D1%82%D0%BE-%D0%B6-%D1%82%D0%B0%D0%BA%D0%B8%D0%B9-%D0%B2%D0%B0%D1%88-ndc-%D1%96-%D1%89%D0%BE-%D0%B7%D0%B0-%D0%B2%D0%B8%D0%B1%D0%BE%D1%80%D0%B8-a6921bec5b65">
            UA
          </a>{" "}
          ⋈
        </h5>
      </div>
      <div className="m-2">
        <Widget
          src="mob.near/widget/Profile"
          props={{ accountId: "nearukraineguild.near" }}
        />
        <br></br>
        <Widget
          src="evangel.near/widget/ShareButtonUA"
          props={{ accountId: "evangel.near" }}
        />
        Share the quest with your friends :)
      </div>
    </div>
    <hr />
    <div>
      {context.accountId ? (
        <Widget
          src="hack.near/widget/connect.button"
          props={{ accountId: "academy.near" }}
        />
      ) : (
        <Widget
          src="near/widget/DIG.Button"
          props={{
            href: "https://near.org/signup",
            label: "Create Account",
            variant: "outline-dark",
          }}
        />
      )}
    </div>
    <br />
    <div>
      <h5>Question 1:</h5>
      <p>What does the "NDC" acronym stand for?</p>
      <input
        className="form-control"
        placeholder="Your answer goes here :)"
        defaultValue={state.answer1}
        onChange={(e) => {
          State.update({
            answer1: e.target.value,
          });
        }}
      />
    </div>
    <br />
    {showQuestion2 && (
      <div>
        <h5>Question 2:</h5>
        <p>What language is used to build on the BOS?</p>
        <input
          className="form-control"
          placeholder="Your answer goes here :)"
          defaultValue={state.answer2}
          onChange={(e) => {
            State.update({
              answer2: e.target.value,
            });
          }}
        />
      </div>
    )}
    <br />
    {showQuestion3 && (
      <div>
        <h5>Question 3:</h5>
        <p>What is the path of this BOS component, which you are using now?</p>
        <input
          className="form-control"
          placeholder="Your answer goes here :)"
          defaultValue={state.answer3}
          onChange={(e) => {
            State.update({
              answer3: e.target.value,
            });
          }}
        />
      </div>
    )}
    <br />
    {showQuestion4 && (
      <div>
        <h5>Question 4:</h5>
        <p>
          Where is the code actually stored for decentralized apps on the BOS?
        </p>
        <input
          className="form-control"
          placeholder="Your answer goes here :)"
          defaultValue={state.answer4}
          onChange={(e) => {
            State.update({
              answer4: e.target.value,
            });
          }}
        />
      </div>
    )}
    <br />
    {showQuestion5 && (
      <div>
        <h5>Question 5:</h5>
        <p>Which is NOT 1 of the 3 core pillars of the BOS?</p>
        <button onClick={() => handleAnswer("A")}>Components</button>
        <button onClick={() => handleAnswer("B")}>Smart Contracts</button>
        <button onClick={() => handleAnswer("C")}>Gateways</button>
        <button onClick={() => handleAnswer("D")}>Blockchains</button>
      </div>
    )}
    {state.showOptions && (
      <div>
        {state.answer === "A" && (
          <div>
            <br />
            <h5>TRY AGAIN </h5>
            <p>
              Components are small web 3 applications that are stored entirely
              on-chain. Developers can fork these apps and compose them to
              create full web applications.
            </p>
          </div>
        )}
        {state.answer === "B" && (
          <div>
            <br />
            <h5>CONGRATS 🎉</h5>
            <p>You got it right!</p>
            <p>ываываываы</p>
          </div>
        )}
        {state.answer === "C" && (
          <div>
            <br />

            <h5>TRY AGAIN</h5>
            <p>
              Components can call functions on any blockchain, with current
              support for all EVM chains (e.g. Polygon, zkSync) and NEAR. The
              source code for the apps is on NEAR, due to its ability to very
              cheaply store HTML/CSS/JS (a few cents).
            </p>
          </div>
        )}
        {state.answer === "D" && (
          <div>
            <br />

            <h5>TRY AGAIN</h5>
            <p>
              Gateways make locally-run, decentralized front-ends available to
              the masses. A gateway consists of a specially designed virtual
              machine that loads and runs frontends for protocols built on
              Ethereum, L2s, and other Layer 1s like NEAR. The code for these
              frontends is stored on the NEAR blockchain.
            </p>
          </div>
        )}
      </div>
    )}
    <br />
  </div>
);
