//PR
//https://api.github.com/search/issues?q=type:pr author:dhsimpson -user:dhsimpson
//공백으로 구분

//ISSUE
//https://api.github.com/search/issues?q=is:issue author:dhsimpson -user:dhsimpson ///state:open///

//Sort "sort=" 필수
// &sort=created&order=desc&per_page=30&page=1
const [githubNickname, setGithubNickname] = useState(props.githubNickname);

if (!props.token) {
  return <p>your token is required.</p>;
}

const searchBaseUrl = "https://api.github.com/search/issues?q=";
const nickName = "dhsimpson";
const defulatFilterList = [
  `-user:${githubNickname}`,
  `author:${githubNickname}`,
];
const pullRequestDefaultFilterList = ["type:pr"];
const issueDefaultFilterList = ["is:issue"];
// const filterOptionList = ["state:open", "state:closed"];
const allState = "";
const isOpen = "state:open";
const isClosed = "state:closed";

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
    padding: 20px;
`;

const MyContributionList = styled.ul`
    width: 100%;
    list-style-type: none;
    padding: 20px;
    margin: 0;
    background-color: rgb(12,17,23);
    color: white;
    border-radius: 25px;
    max-height: 400px;
    overflow: scroll;
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

const [searchOptions, setSearchOptions] = useState([
  ...defulatFilterList,
  ...pullRequestDefaultFilterList,
]);

const togglePR = () => {
  //  searchOptions 의 내용에 issueDefaultFilterList 의 내용이 있으면 제거 후
  //  pullRequestDefaultFilterList의 내용만을 추가
  const filteredOptions = searchOptions.filter((option) => {
    return !issueDefaultFilterList.includes(option);
  });
  setSearchOptions([...filteredOptions, ...pullRequestDefaultFilterList]);
};

const toggleIssue = () => {
  //  searchOptions 의 내용에 pullRequestDefaultFilterList 의 내용이 있으면 제거 후
  //  issueDefaultFilterList 내용만을 추가
  const filteredOptions = searchOptions.filter((option) => {
    return !pullRequestDefaultFilterList.includes(option);
  });
  setSearchOptions([...filteredOptions, ...issueDefaultFilterList]);
};
const [all, setAll] = useState(true);
const [open, setOpen] = useState(false);
const [closed, setClosed] = useState(false);

const toggleAll = () => {
  //allState isOpen isClosed
  const filteredOptions = searchOptions.filter((option) => {
    return ![isOpen, isClosed].includes(option);
  });
  setAll(true);
  setOpen(false);
  setClosed(false);
  setSearchOptions([...filteredOptions]);
};

const toggleOpen = () => {
  const filteredOptions = searchOptions.filter((option) => {
    return isClosed !== option;
  });
  setAll(false);
  setOpen(true);
  setClosed(false);
  setSearchOptions([...filteredOptions, isOpen]);
};

const toggleClosed = () => {
  //allState isOpen isClosed
  const filteredOptions = searchOptions.filter((option) => {
    return isOpen !== option;
  });
  setAll(false);
  setClosed(true);
  setOpen(false);
  setSearchOptions([...filteredOptions, isClosed]);
};

useEffect(() => {
  asyncFetch(`${searchBaseUrl}${mergeFilters([searchOptions])}`, config)
    .then((res) => {
      setContributionData(res.body?.items ?? []);
    })
    .catch((e) => {
      setContributionData([]);
    });
}, [searchOptions]);

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
    background-color: rgba(20,50,125,1);
    border-radius: 20px;
    padding: 5px 10px;
    font-weight: 600;
    margin-bottom: 20px;
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

const FilterButton = styled.button`
  background-color: ${(props) => (props.clicked ? "green" : "red")};
  color: white;
  font-weight: 650;
  border-radius: 20px;
  padding: 5px 10px;
  border: none;
`;

const OptionWrapper = styled.div`
  margin: 20px 10px;
`;

const FilterState = styled.span`
  font-size: 24px;
  font-weight: 650;
`;

function SwitchText({ asis, tobe }) {
  const BigText = styled.span`
      font-size: 24px;
      margin-left: 15px;
  `;

  const SmallText = styled.span`
      font-size: 14px;
      margin-right: 15px;
  `;

  return (
    <span>
      <BigText>{asis}</BigText>
      <Widget
        src="party-dhsimpson.near/widget/SwitchButtonSvg"
        props={{
          width: "55",
          height: "30",
        }}
      />
      <SmallText>{tobe}</SmallText>
    </span>
  );
}

function Profile() {
  const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 110px;
  background-color: rgba(55,55,125,0.5);
  border-radius: 25px;
  padding: 0 10px;
  margin-bottom: 25px;
`;

  const ProfileImg = styled.img`
  width: 50px;
  border-radius: 100%;
  margin-right: 10px;
`;
  const userProfileUrl = "https://api.github.com/users/";
  const userProfile = fetch(`${userProfileUrl}${nickName}`, config)?.body;

  return (
    <ProfileWrapper>
      <ProfileImg src={userProfile.avatar_url} />
      <span>{userProfile.name}</span>
    </ProfileWrapper>
  );
}

const changeName = (newName) => {
  //allState isOpen isClosed
  const filteredOptions = searchOptions.filter((option) => {
    return `author:${githubNickname}` !== option;
  });
  setGithubNickname(newName);

  setSearchOptions([...filteredOptions, `author:${newName}`]);
};

const ChangeNameWrapper = styled.div`
  display: flex;
  margin-top: 10px;
`;
const ChangeNameButton = styled.button`
  width: 100px;
  margin-left: 10px;
  border: none;
  background-color: rgba(40,70,145,0.8);
  border-radius: 15px;
  color: white;
  font-weight: 600;
`;
const [tempText, setTempText] = useState("");

const handleInputChange = (event) => {
  setTempText(event.target.value);
};

return (
  <MyContributionWrapper>
    <OptionWrapper>
      <Profile />
      <Toggle
        callbackOn={toggleIssue}
        callbackOff={togglePR}
        textOn={<SwitchText asis={"Pull Request"} tobe={"Issue"} />}
        textOff={<SwitchText asis={"Issue"} tobe={"Pull Request"} />}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
      />
      <br />
      <FilterState>STATE : </FilterState>
      <FilterButton clicked={all} onClick={toggleAll}>
        ALL State
      </FilterButton>
      <FilterButton clicked={open} onClick={toggleOpen}>
        Open
      </FilterButton>
      <FilterButton clicked={closed} onClick={toggleClosed}>
        Closed
      </FilterButton>
      <ChangeNameWrapper>
        <input
          type="text"
          name="github_nickname"
          placeholder="닉네임을 입력하세요."
          onChange={handleInputChange}
        />
        <ChangeNameButton
          onClick={() => {
            changeName(tempText);
          }}
        >
          적용
        </ChangeNameButton>
      </ChangeNameWrapper>
    </OptionWrapper>
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
