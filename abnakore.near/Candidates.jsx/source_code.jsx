const [candidates, setCandidate] = useState([
  { id: 1, name: "Foo", votes: 3, rank: 2 },
  { id: 2, name: "Bar", votes: 5, rank: 1 },
  { id: 3, name: "Baz", votes: 1, rank: 4 },
  { id: 4, name: "sass", votes: 2, rank: 3 },
]);
// Social.set(candidates);
// console.log(Social.get("abnakore.near/widget/Candidates.jsx"));
return [candidates, setCandidate];
