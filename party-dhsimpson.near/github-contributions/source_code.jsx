//PR
//https://api.github.com/search/issues?q=type:pr author:dhsimpson -user:dhsimpson
//공백으로 구분

//ISSUE
//https://api.github.com/search/issues?q=is:issue author:dhsimpson -user:dhsimpson ///state:open///

//Sort "sort=" 필수
// &sort=created&order=desc&per_page=30&page=1

if (!props.token) {
  return <p>your token is required.</p>;
}
if (!props.githubNickname) {
  return <p>github nickname is required.</p>;
}

const searchBaseUrl = "https://api.github.com/search/issues?q=";
const nickName = "dhsimpson";
const defulatFilterList = [
  `-user:${props.githubNickname}`,
  `author:${props.githubNickname}`,
];
const pullRequestDefaultFilterList = ["type:pr"];
const issueDefaultFilterList = ["is:issue"];
const filterOptionList = ["state:open", "state:closed"];

const config = {
  headers: {
    Authorization: `Bearer ${props.token}`,
  },
};

const mergeFilters = (filterLists) => {
  return [].concat(...filterLists).join("%20");
};

const MyContributionWrapper = styled.div`
    background-color: black;
    border-radius: 25px;
    color: white;
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
    align-items: center;
    width: 100%;
`;
const ContributionTitle = styled.span`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 20px;
`;
const ContributionTimeStamp = styled.p`
    margin: 0;
    font-size: 12px;
    color: #BBB;
`;

const ContributionBasicInfo = styled.div`
    max-width: 70%;
    display: flex;
    flex-direction: column;
`;

const Label = styled.div`
    background-color: ${(props) => props.color};
    width: 100px;
    height: 30px;
    border-radius: 25px;
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    margin-left: 15px;
`;

const StatusColors = {
  open: "rgba(10, 155, 10, 0.8)", // 초록색
  closed: "rgba(255, 0, 0, 0.7)", // 빨간색
};

const [contributionData, setContributionData] = useState([]);

const togglePR = () => {
  asyncFetch(
    `${searchBaseUrl}${mergeFilters([
      defulatFilterList,
      pullRequestDefaultFilterList,
    ])}`,
    config
  ).then((res) => {
    setContributionData(res.body?.items ?? []);
  });
};

const toggleIssue = () => {
  asyncFetch(
    `${searchBaseUrl}${mergeFilters([
      defulatFilterList,
      issueDefaultFilterList,
    ])}`,
    config
  ).then((res) => {
    setContributionData(res.body?.items ?? []);
  });
};
useEffect(() => {
  togglePR();
}, []);

const [isChecked, setIsChecked] = useState(true);

const Toggle = ({
  callbackOn,
  callbackOff,
  textOn,
  textOff,
  isChecked,
  setIsChecked,
}) => {
  const ToggleBoxWrapper = styled.label`
`;

  const ToggleBox = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

  const handleToggle = () => {
    // 여기에 토글 상태에 따른 로직을 실행하실 수 있습니다.
    if (isChecked) {
      callbackOn();
      console.log("isChecked");
    } else {
      callbackOff();
      console.log("notChecked");
    }
    setIsChecked(!isChecked);
  };
  return (
    <ToggleBoxWrapper>
      <ToggleBox
        type="checkbox"
        checked={isChecked}
        onChange={handleToggle}
        value="체크 박스"
      />
      {isChecked ? textOn : textOff}
    </ToggleBoxWrapper>
  );
};
return (
  <MyContributionWrapper>
    <div>
      <p>프로필 영역 (아바타) | 프로필 영역 (깃헙닉네임)</p>
      <Toggle
        callbackOn={toggleIssue}
        callbackOff={togglePR}
        textOn="Pull Request -> Issue"
        textOff="Issue -> Pull Request"
        isChecked={isChecked}
        setIsChecked={setIsChecked}
      />
    </div>
    <MyContributionList>
      {contributionData.map((issue) => {
        return (
          <MyContribution>
            <ContributionInfo>
              <ContributionBasicInfo>
                <ContributionTitle>{issue.title}</ContributionTitle>
                <ContributionTimeStamp>
                  opened :
                  <Widget
                    src="party-dhsimpson.near/widget/past-time-from"
                    props={{ date: issue.created_at }}
                  />
                  {issue.state === "closed" && (
                    <>
                      closed :
                      <Widget
                        src="party-dhsimpson.near/widget/past-time-from"
                        props={{ date: issue.closed_at }}
                      />
                    </>
                  )}
                </ContributionTimeStamp>
              </ContributionBasicInfo>
              <Label color={StatusColors[issue.state]}>{issue.state}</Label>
            </ContributionInfo>
            <a href={issue.html_url}>
              <Widget
                src="party-dhsimpson.near/widget/gotoSvg"
                props={{ width: 20, heigh: 20, color: "gray" }}
              />
            </a>
          </MyContribution>
        );
      })}
    </MyContributionList>
  </MyContributionWrapper>
);
