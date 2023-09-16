//PR
//https://api.github.com/search/issues?q=type:pr author:dhsimpson -user:dhsimpson
//공백으로 구분

//ISSUE
//https://api.github.com/search/issues?q=is:issue author:dhsimpson -user:dhsimpson ///state:open///

const searchBaseUrl = "https://api.github.com/search/issues?";
const nickName = "dhsimpson";
const defulatFilterList = [
    `-user:${props.githubNickname}`,
    `author:${props.githubNickname}`,
];
const pullRequestDefaultFilterList = [
    "type:pr"
];
const issueDefaultFilterList = [
    "is:issue"
];
const mergeFilters = (filterLists) => {
    return filterLists.flat().join("%20");
};

const config = {
  headers: {
    Authorization: `Bearer ${props.token}`,
  },
};

const [data, setData] = useState("");
//issues?q=author:YOUR_GITHUB_USERNAME+type:pr
asyncFetch(`${searchBaseUrl}q=author:${nickname}+type:pr`, config).then(
  (res) => {
    setData(JSON.stringify(res));
  }
);
return <div>
{data}

</div>;
