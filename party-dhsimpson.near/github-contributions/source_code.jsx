//PR
//https://api.github.com/search/issues?q=type:pr author:dhsimpson -user:dhsimpson
//공백으로 구분

//ISSUE
//https://api.github.com/search/issues?q=is:issue author:dhsimpson -user:dhsimpson ///state:open///

//Sort "sort=" 필수
// &sort=created&order=desc&per_page=30&page=1

const searchBaseUrl = "https://api.github.com/search/issues?q=";
const nickName = "dhsimpson";
const defulatFilterList = [
  `-user:${props.githubNickname}`,
  `author:${props.githubNickname}`,
];
const pullRequestDefaultFilterList = ["type:pr"];
const issueDefaultFilterList = ["is:issue"];
const config = {
  headers: {
    Authorization: `Bearer ${props.token}`,
  },
};

const mergeFilters = (filterLists) => {
  return [].concat(...filterLists).join("%20");
};

const [prData, setPrData] = useState([]);

asyncFetch(
  `${searchBaseUrl}${mergeFilters([
    defulatFilterList,
    pullRequestDefaultFilterList,
  ])}`,
  config
).then((res) => {
  setPrData(res.body?.items ?? []);
});

const [issueData, setIssueData] = useState([]);

asyncFetch(
  `${searchBaseUrl}${mergeFilters([
    defulatFilterList,
    issueDefaultFilterList,
  ])}`,
  config
).then((res) => {
  setIssueData(res.body?.items ?? []);
});

if (!props.token) {
  return <p>your token is required.</p>;
}
if (!props.githubNickname) {
  return <p>github nickname is required.</p>;
}

const PRWrapper = styled.div`
    display: none;
`;
const IssueWrapper = styled.div`
    // display: none;
`;

const MyContributionList = styled.ul`
    width: 100%;
    list-style-type: none;
    padding: 20px;
    margin: 0;
    background-color: rgb(12,17,23);
    color: white;
    border-radius: 25px;
`;

const MyContribution = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70px;
    border-bottom: 1px solid rgba(125, 125, 225, 0.3);
`;

const ContributionInfo = styled.div`
    display: flex;
`;

return (
  <div>
    {prData.map((pullRequest) => {
      return (
        <PRWrapper>
          <span>{pullRequest.title}</span>
          <span>{pullRequest.state}</span>
          <a href={pullRequest.html_url}>바로가기</a>
          {pullRequest.state === "closed" && (
            <span>{pullRequest.closed_at}</span>
          )}
        </PRWrapper>
      );
    })}

    <MyContributionList>
      {issueData.map((issue) => {
        return (
          <MyContribution>
            <ContributionInfo>
              <div>
                <h4>{issue.title}</h4>
                {issue.state === "closed" && <span>{issue.closed_at}</span>}
              </div>
              <span>{issue.state}</span>
            </ContributionInfo>
            <a href={issue.html_url}>
              <Widget
                src="party-dhsimpson.near/widget/gotoSvg"
                props={{ width: 15, heigh: 15, color: "gray" }}
              />
            </a>
          </MyContribution>
        );
      })}
    </MyContributionList>
  </div>
);
