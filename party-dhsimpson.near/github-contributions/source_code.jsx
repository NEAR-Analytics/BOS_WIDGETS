//PR
//https://api.github.com/search/issues?q=type:pr author:dhsimpson -user:dhsimpson 
//공백으로 구분

//ISSUE
//https://api.github.com/search/issues?q=is:issue author:dhsimpson -user:dhsimpson state:open

//https://github.com/search?q=is%3Apr+author%3Adhsimpson&type=pullrequests
const searchBaseUrl = "https://api.github.com/search/issues?";
const nickName = "dhsimpson";
const token = "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";
//issues?q=author:YOUR_GITHUB_USERNAME+type:pr
const config = {
    headers: {
        Authorization: `Bearer ${token}`
    }
};

const [data, setData] = useState("");
//issues?q=author:YOUR_GITHUB_USERNAME+type:pr
asyncFetch(`${searchBaseUrl}q=author:${nickname}+type:pr`, config).then(res => {
    setData(JSON.stringify(res));
});
return <div>
{data}</div>;
