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
    `-user:${props.githubNickname ?? nickName}`,
    `author:${props.githubNickname ?? nickName}`
];
const pullRequestDefaultFilterList = [
    "type:pr"
];
const issueDefaultFilterList = [
    "is:issue"
];
const config = {
  headers: {
    Authorization: `Bearer ${props.token ?? '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'}`,
  },
};

const mergeFilters = ( filterLists ) => {
    return ([].concat(...filterLists)).join("%20");
};

const [data, setData] = useState([]);

asyncFetch(`${searchBaseUrl}${mergeFilters([defulatFilterList, pullRequestDefaultFilterList])}`, config).then(
  (res) => {
    setData(res.body?.items ?? []);
  }
);

// if(!props.token) {
//     return <p>your token is required.</p>
// }
// if(!props.githubNickname) {
//     return <p>github nickname is required.</p>
// }

return <div>
{data.map(pullRequest => {
    return (
        <div>
            <span>{pullRequest.title}</span>
            <span>{pullRequest.state}</span>
            <a href="pullRequest.pull_request.html_url">바로가기</a>
        </div>
    )
})}
</div>;
