const TableWrapper = styled.div`
  overflow-x: auto;
  max-width: 100%;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

const TableCell = styled.td`
  padding: 8px;
  white-space: nowrap;
  text-align: left;

  @media (max-width: 768px) {
    display: block;
    padding: 6px;
    font-size: 14px;
    text-align: left;
  }
`;

const CandidateName = styled.span`
  color: #007bff;
  text-decoration: underline;
  cursor: pointer;
`;

const VotesTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
`;

const VotesTableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

const VotesTableCell = styled.td`
  padding: 8px;
  text-align: left;
`;

const candidates = Near.view("rc-dao.sputnik-dao.near", "get_proposals", {
  from_index: 911,
  limit: 26,
});
console.log("candidates", candidates);

const extractCandidateInfo = (description) => {
  const startIndex = description.indexOf("Candidate:") + 11;
  const endIndex = description.indexOf("(");
  const candidateName = description.substring(startIndex, endIndex).trim();
  const nameWithoutLink = candidateName.replace(/ *\([^)]*\) */g, "");
  const link = description
    .substring(endIndex + 1, description.length - 1)
    .trim();

  return {
    candidateName: nameWithoutLink,
    link,
  };
};

const europe = [];
const asia = [];
const afrika = [];
const northAmerica = [];
const southAmerica = [];
const avb = [];

State.init({ selectedCandidate: null });

candidates.map((candidate) => {
  let votesCount = 0;
  const keys = Object.keys(candidate.votes);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    votesCount++;
  }

  // Check if the description contains the name of a continent

  const candidateName = extractCandidateInfo(candidate.description);
  const updatedCandidate = {
    ...candidate,
    votesCount,
    ...candidateName,
  };
  const description = candidate.description.toLowerCase();
  if (description.includes("europe")) {
    europe.push(updatedCandidate);
  } else if (description.includes("asia")) {
    asia.push(updatedCandidate);
  } else if (description.includes("africa")) {
    afrika.push(updatedCandidate);
  } else if (description.includes("north america")) {
    northAmerica.push(updatedCandidate);
  } else if (description.includes("south america")) {
    southAmerica.push(updatedCandidate);
  } else {
    avb.push(updatedCandidate);
  }
  return;
});

const handleCandidateClick = (candidate) => {
  State.update({ selectedCandidate: candidate });
};

console.log(selectedCandidate);

const renderVotesTable = () => {
  if (!selectedCandidate) {
    return null;
  }

  const votesKeys = Object.keys(selectedCandidate.votes);

  return (
    <VotesTable>
      <tbody>
        {votesKeys.map((voteKey, index) => (
          <VotesTableRow key={index}>
            <VotesTableCell>{voteKey}</VotesTableCell>
          </VotesTableRow>
        ))}
      </tbody>
    </VotesTable>
  );
};

const CandidateTable = ({ title, candidates }) => (
  <div>
    <h2>{title}</h2>
    <TableWrapper>
      <Table>
        <tbody>
          {candidates.map((candidate, index) => (
            <TableRow
              key={index}
              onClick={() => handleCandidateClick(candidate)}
            >
              <TableCell>
                <CandidateName>
                  <a
                    href={candidate.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {candidate.candidateName}
                  </a>
                </CandidateName>
              </TableCell>
              <TableCell>Votes: {candidate.votesCount}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </TableWrapper>
  </div>
);

const sortedEurope = europe.slice().sort((a, b) => b.votesCount - a.votesCount);
const sortedAsia = asia.slice().sort((a, b) => b.votesCount - a.votesCount);
const sortedAfrika = afrika.slice().sort((a, b) => b.votesCount - a.votesCount);
const sortedNorthAmerica = northAmerica
  .slice()
  .sort((a, b) => b.votesCount - a.votesCount);
const sortedSouthAmerica = southAmerica
  .slice()
  .sort((a, b) => b.votesCount - a.votesCount);
const sortedAvb = avb.slice().sort((a, b) => b.votesCount - a.votesCount);

return (
  <div>
    {renderVotesTable()}
    <CandidateTable title="Europe Candidates" candidates={sortedEurope} />
    <CandidateTable title="Asia Candidates" candidates={sortedAsia} />
    <CandidateTable title="Africa Candidates" candidates={sortedAfrika} />
    <CandidateTable
      title="North America Candidates"
      candidates={sortedNorthAmerica}
    />
    <CandidateTable
      title="South America Candidates"
      candidates={sortedSouthAmerica}
    />
    <CandidateTable title="Available Candidates" candidates={sortedAvb} />
  </div>
);
