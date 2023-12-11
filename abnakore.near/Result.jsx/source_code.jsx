// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import Aside from "../components/Aside";
// import Table from "../components/Table";
// import useCandidates from "../components/Candidates";

// Pages that will be displayed in the aside
const [pages, setPages] = useState([
  { name: "Voting Page", link: "/" },
  { name: "Result", link: "/result" },
  { name: "Log out", link: "/signin" },
]);

// List of candidates and their curresponding number of votes
const [candidates, setCandidates] = useState([
  { id: 1, name: "Foo", votes: 3, rank: 2 },
  { id: 2, name: "Bar", votes: 5, rank: 1 },
  { id: 3, name: "Baz", votes: 1, rank: 4 },
  { id: 4, name: "sass", votes: 2, rank: 3 },
]);

return (
  <>
    <div className="two-sides">
      <Widget
        src="abnakore.near/widget/Aside.jsx"
        props={{ objs: pages, active: "/result" }}
      />
      ,
      <div className="main-body">
        <h1>Result</h1>
        {/* Calling the table component */}
        {/* Extracting The values in the table an converting them to list */}
        <Widget
          src="abnakore.near/widget/Table.jsx"
          props={{
            headings: ["S/N", "Candidate's Name", "Number of votes", "Rank"],
            data: Object.values(candidates.map((c) => Object.values(c))),
          }}
        />
      </div>
    </div>
  </>
);
