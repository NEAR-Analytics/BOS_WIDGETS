State.init({
  answer: "",
  showOptions: false,
  answer1: "",
  answer2: "",
  answer3: "",
  answer4: "",
  answer5: "",
  answer6: "",
  answer7: "",
  answer8: "",
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
let showQuestion6 = false;
let showQuestion7 = false;
let showQuestion8 = false;
let showQuestion9 = false;

if (state.answer1.toLowerCase() === "near digital collective") {
  showQuestion2 = true;
}

if (state.answer2.toLowerCase() === "og") {
  showQuestion3 = true;
}

if (state.answer3.toLowerCase() === "sbt") {
  showQuestion4 = true;
}

if (state.answer4.toLowerCase() === "soul bound token") {
  showQuestion5 = true;
}

if (state.answer5.toLowerCase() === "3") {
  showQuestion6 = true;
}

if (state.answer6.toLowerCase() === "hom") {
  showQuestion7 = true;
}

if (state.answer6.toLowerCase() === "house of merit") {
  showQuestion7 = true;
}

if (state.answer7.toLowerCase() === "8.09") {
  showQuestion8 = true;
}

if (state.answer7.toLowerCase() === "8 september") {
  showQuestion8 = true;
}

if (state.answer8.toLowerCase() === "yes") {
  showQuestion9 = true;
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
          props={{ accountId: "hack.near" }}
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
        <p>Who can be nominated for election?</p>
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
        <p>What token gives the right to vote in elections?</p>
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
        <p>What does the "SBT" acronym stand for?</p>
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
        <p>How many nominations?</p>
        <input
          className="form-control"
          placeholder="Your answer goes here :)"
          defaultValue={state.answer5}
          onChange={(e) => {
            State.update({
              answer5: e.target.value,
            });
          }}
        />
      </div>
    )}
    <br />
    {showQuestion6 && (
      <div>
        <h5>Question 6:</h5>
        <p>Which category has the most nomination spots?</p>
        <input
          className="form-control"
          placeholder="Your answer goes here :)"
          defaultValue={state.answer6}
          onChange={(e) => {
            State.update({
              answer6: e.target.value,
            });
          }}
        />
      </div>
    )}
    <br />
    {showQuestion7 && (
      <div>
        <h5>Question 7:</h5>
        <p>When will the elections start?</p>
        <input
          className="form-control"
          placeholder="Your answer goes here :)"
          defaultValue={state.answer7}
          onChange={(e) => {
            State.update({
              answer7: e.target.value,
            });
          }}
        />
      </div>
    )}
    <br />
    {showQuestion8 && (
      <div>
        <h5>Question 8:</h5>
        <p>Can you vote for all candidates at once?</p>
        <input
          className="form-control"
          placeholder="Your answer goes here :)"
          defaultValue={state.answer8}
          onChange={(e) => {
            State.update({
              answer8: e.target.value,
            });
          }}
        />
      </div>
    )}
    <br />
    {showQuestion9 && (
      <div>
        <h5>Question 9:</h5>
        <p>Can a person be paid to vote?</p>
        <button onClick={() => handleAnswer("A")}>Yes</button>
        <button onClick={() => handleAnswer("B")}>No</button>
        <button onClick={() => handleAnswer("C")}>Maybe</button>
        <button onClick={() => handleAnswer("D")}>
          It doesn't break the rules
        </button>
      </div>
    )}
    {state.showOptions && (
      <div>
        {state.answer === "A" && (
          <div>
            <br />
            <h5>TRY AGAIN </h5>
            <p>This is not the correct option</p>
          </div>
        )}
        {state.answer === "B" && (
          <div>
            <br />
            <h3>CONGRATS 🎉</h3>
            <p>You got it right!</p>
            <p>
              It is strictly forbidden to pay in any way for a person to vote.
              You can always ask him to vote on a voluntary basis without giving
              anything in return.
              <p>
                <a>
                  <h4>
                    <br />
                    Submit a screenshot of a completed test showing your Near
                    Social account to receive a reward in{" "}
                    <a
                      href="https://zealy.io/c/nearukraineguild/questboard"
                      target="_blank"
                    >
                      Zealy
                    </a>{" "}
                    for your knowledge.
                  </h4>
                </a>
              </p>
            </p>
          </div>
        )}
        {state.answer === "C" && (
          <div>
            <br />

            <h5>TRY AGAIN</h5>
            <p>This is not the correct option</p>
          </div>
        )}
        {state.answer === "D" && (
          <div>
            <br />

            <h5>TRY AGAIN</h5>
            <p>This is not the correct option</p>
          </div>
        )}
      </div>
    )}
    <br />
  </div>
);
