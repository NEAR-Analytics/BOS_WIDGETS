import React, { useState } from "react";
State.init({
  answer: "",
  showOptions: false,
  answer1: "",
  answer2: "",
  answer3: "",
  answer4: "",
  answer5: "",
  answer6: "",
  optionA: "",
  optionB: "",
  optionC: "",
  optionD: "",
});

const [showContinueButton, setShowContinueButton] = useState(false);

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

const handleOption45 = (selectedOption) => {
  State.update({
    answer: selectedOption,
    showOptions: false,
  });
};

const handleOption56 = (selectedOption) => {
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

if (state.answer1.toLowerCase() === "1") {
  showQuestion2 = true;
}

if (state.answer2.toLowerCase() === "1") {
  showQuestion3 = true;
}

if (state.answer3.toLowerCase() === "1") {
  showQuestion4 = true;
}

if (state.answer4.toLowerCase() === "1") {
  showQuestion5 = true;
}

if (state.answer5.toLowerCase() === "1") {
  showQuestion6 = true;
}

return (
  <div>
    <div className="d-flex flex-wrap justify-content-between mb-3">
      <div className="m-1">
        <h2>
          <b>test</b>
        </h2>
        <h4>Test Your Knowledge</h4>
        <h5>
          First, read the{" "}
          <a href="https://medium.com/near-protocol-ua-eng/but-who-is-your-ndc-and-what-kind-of-election-b1552874745e">
            article
          </a>{" "}
          ⋈
        </h5>
      </div>
      <div className="m-2">
        <Widget
          src="mob.near/widget/Profile"
          props={{ accountId: "evangel.near" }}
        />
        <br></br>
        <Widget
          src="evangel.near/widget/ShareButton"
          props={{ accountId: "evangel.near" }}
        />
        Share
      </div>
    </div>
    <hr />
    <div>
      {context.accountId ? (
        <Widget
          src="evangel.near/widget/ShareButtonUA"
          props={{ accountId: "evangel.near" }}
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
      <p>What does the "BOS" acronym stand for?</p>
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
        <button onClick={() => handleAnswer("A")}>1</button>
        <button onClick={() => handleAnswer("B")}>2</button>
        <button onClick={() => handleAnswer("C")}>3</button>
        <button onClick={() => handleAnswer("D")}>4</button>
      </div>
    )}
    {state.showOptions && (
      <div>
        {state.answer === "A" && (
          <div>
            <br />
            <h5>заглавное </h5>
            <p>объяснение</p>
          </div>
        )}
        {state.answer === "B" && (
          <div>
            <br />
            <p>
              <h5>KEK LOL </h5>
            </p>
          </div>
        )}
        {state.answer === "C" && (
          <div>
            <br />
            <p>
              <h5>ez lol </h5>
            </p>
          </div>
        )}
        {state.answer === "D" && (
          <div>
            <br />
            <p>
              <h5>CONGRATS </h5>
            </p>
          </div>
        )}
      </div>
    )}
    <br />
    {showQuestion6 && (
      <div>
        <h5>Question 6:</h5>
        <p>Which option do you choose?</p>
        <button onClick={() => handleOption45("45")}>Option 1</button>
        <button onClick={() => handleOption56("56")}>Option 2</button>
      </div>
    )}

    {/* Explanation for Question 6 */}
    {state.answer6 === "45" && (
      <div>
        <br />
        <p>
          <h5>Explanation for Option 1</h5>
          This is the explanation for Option 1.
        </p>
      </div>

      {showContinueButton && (
  <div>
    <button onClick={handleContinueButton}>Continue</button>
  </div>
    )}

    {state.answer6 === "56" && (
      <div>
        <br />
        <p>
          <h5>Explanation for Option 2</h5>
          This is the explanation for Option 2.
        </p>
      </div>
    )}
    <br />
  </div>
);
