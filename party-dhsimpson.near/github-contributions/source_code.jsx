//PR
//https://api.github.com/search/issues?q=type:pr author:dhsimpson -user:dhsimpson
//공백으로 구분

//ISSUE
//https://api.github.com/search/issues?q=is:issue author:dhsimpson -user:dhsimpson ///state:open///

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


const [data, setData] = useState("");
//issues?q=author:YOUR_GITHUB_USERNAME+type:pr

asyncFetch(`${searchBaseUrl}${mergeFilters([defulatFilterList, pullRequestDefaultFilterList])}`, config).then(
  (res) => {
    setData(JSON.stringify(res));
  }
);
return <div>
{data}
{`${searchBaseUrl}${mergeFilters([defulatFilterList, pullRequestDefaultFilterList])}`}
</div>;
