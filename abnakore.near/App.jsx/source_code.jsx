// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
// import Aside from './components/Aside';
// import useCandidates from './components/Candidates';
// import './App.css'

const Wrapper = styled.div`
button, select {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  margin: 5px;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}

.error {
  border-color: #ff6464;
}

button:hover, select:hover {
  border-color: #646cff;
}

button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

.hide {
  display: none;
}

`;

const [candidate, setCandidate] = useState(0);
const [candidates, setCandidates] = useState([
  { id: 1, name: "Foo", votes: 3, rank: 2 },
  { id: 2, name: "Bar", votes: 5, rank: 1 },
  { id: 3, name: "Baz", votes: 1, rank: 4 },
  { id: 4, name: "sass", votes: 2, rank: 3 },
]);
const [state, setState] = useState({
  show_message: false,
  show_error_on_dropdown: false,
});

// Pages that will be displayed in the aside
const [pages, setPages] = useState([
  { name: "Voting Page", link: "/" },
  { name: "Result", link: "/result" },
  { name: "Log out", link: "/signin" },
]);

// Functions
function vote() {
  if (candidate > 0) {
    console.log(candidates);
    console.log(candidates[candidate]);
    setCandidates([...candidates]);
    setState({
      ...state,
      show_message: true,
    });
  } else {
    // Set an error on the dropdown
    setState({
      ...state,
      show_error_on_dropdown: true,
    });
  }
}

// Update the value of the dropdown when changed
function updateDropdown(e) {
  setCandidate(e.target.value);
  // Remove the error on the dropdown
  setState({
    ...state,
    show_error_on_dropdown: false,
  });
}

return (
  <Widget
    src="abnakore.near/widget/Wrapper.jsx"
    props={{
      body: (
        <>
          <div className="two-sides">
            {/* The Aside bar that helps in quick navigation btw pages */}
            <Widget
              src="abnakore.near/widget/Aside.jsx"
              props={{ objs: pages, active: "/" }}
            />

            <div className="main-body">
              <h1>VoteChain</h1>
              <div className="card">
                <div>
                  <select
                    className={`drop-down ${
                      state.show_error_on_dropdown ? "error" : ""
                    }`}
                    value={candidate}
                    onChange={updateDropdown}
                    name="candidate"
                    required
                  >
                    <option className="option" value={0}>
                      Select Candidate
                    </option>
                    {candidates.map((candidate) => (
                      <option
                        className="option"
                        key={candidate.id}
                        value={candidate.id}
                      >
                        {candidate.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button onClick={vote}>Vote</button>

                <p
                  id="thanks"
                  className={`read-the-docs ${
                    state.show_message ? "" : "hide"
                  }`}
                >
                  Thank you for voting {candidate}
                </p>
              </div>
              <p className="read-the-docs">
                <Link to="/register">Register</Link>
                .....
                <Link to="/signin">Sign In</Link>
              </p>
            </div>
          </div>
        </>
      ),
    }}
  />
);
