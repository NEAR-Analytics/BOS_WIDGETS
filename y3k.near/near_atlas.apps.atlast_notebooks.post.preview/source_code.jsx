const accountId = props.accountId;
const blockHeight = parseInt(props.blockHeight);
const admins = props.admins;
const adminContract = "admin.dev-support.near";

const is_hidden = Near.view(adminContract, "is_hidden", {
  id: { account_id: accountId, block_height: blockHeight },
});

if (is_hidden) {
  return "";
}

const notebook = JSON.parse(
  Social.get(`${accountId}/notebook/y3k`, blockHeight) ?? "null"
);

const testNotebook = JSON.parse(
  Social.get(`${accountId}/notebook`, blockHeight) ?? "null"
);

const link = `#/y3k.near/widget/near_atlas.apps.atlast_notebooks.post.page?accountId=${accountId}&blockHeight=${blockHeight}&adminContract=${adminContract}`;

const H2 = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #11181C;

  a {
    color: inherit;
    transition: color .15s ease;
    &:hover {
      color: #30A46C;
      text-decoration: none;

      & + i {
        visibility: visible;
      }
    }

    & + i {
      transition: visibility .1s ease-out;
      visibility: hidden;
      color: #30A46C;
    }
  }
`;
const H6 = styled.h6`
  font-size: 14px;
  font-weight: 500;
  color: #687076;
`;
const Trancate = styled.span`
  text-overflow: ellipsis;
  overflow: hidden;
`;
const TopicName = styled.span`
  color: #006ADC;
  font-weight: 500;
  font-size: 14px;
  white-space: nowrap;
`;
const CardWrapper = styled.div`
  z-index: 100;
  padding: 6px;
`;
const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  gap: 12px;
  width: 275px;
  border-radius: 12px;
  z-index: 1070;
  background: #fff;
  border: 1px solid #eceef0;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  padding: 12px;
`;
const Item = styled.div`
  padding: 0;
  .btn {
    width: 100%;
    text-align: left;
    &:hover,
    &:focus {
      background-color: #ECEDEE;
      text-decoration: none;
      outline: none;
    }

    &.report-btn, &.hide-btn {
      i {
        color: #7E868C;
      }
    }
    span {
      font-weight: 500;
    }
  }
`;
return (
  <div className="flex">
    <div className="hidden sm:block col-span-1">
      <a href={`#/near/widget/ProfilePage?accountId=${accountId}`}>
        <Widget
          src="dev-support.near/widget/ProfileImage"
          props={{
            accountId,
            imageClassName: "rounded-circle w-100 h-100",
          }}
        />
      </a>
    </div>
    <div className="col-span-1 sm:col-span-2">
      <Widget
        src="dev-support.near/widget/DevSupport.Question.Button.Upvote"
        props={{ accountId, blockHeight }}
      />
    </div>
    <div className="col-span-10">
      <div className="grid grid-cols-1">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="col-span-1">
            <H2>
              <a href={link}>{question.title}</a>
              <i className="bi bi-arrow-right" />
            </H2>
            <p>{question.content.text}</p>
          </div>
          <div className="col-span-1 sm:col-span-1">
            <div className="dropdown justify-self-end">
              <button
                className="btn border-0 p-0"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-three-dots" />
              </button>
              <ul className="dropdown-menu">
                <li>
                  <Item>
                    <Widget
                      src="dima_sheleg.near/widget/DevSupport.Question.Button.Flag"
                      props={{
                        accountId,
                        blockHeight,
                        className: "btn report-btn",
                      }}
                    />
                  </Item>
                </li>
                <li>
                  <Item>
                    {/* Delete widget */}
                    <Widget
                      src="dima_sheleg.near/widget/DevSupport.Question.Button.Delete"
                      props={{
                        accountId,
                        blockHeight,
                        admins,
                        adminContract,
                        className: "hide-btn",
                        text: "Hide",
                      }}
                    />
                  </Item>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1">
          <H6>
            <div className="flex">
              <Trancate>
                <a href={`#/near/widget/ProfilePage?accountId=${accountId}`}>
                  {accountId}
                </a>
              </Trancate>{" "}
              &nbsp;in&nbsp;
              <TopicName>
                <Widget
                  src="y3k.near/widget/near_atlas.apps.atlast_notebooks.post.labels"
                  props={{ labels: question.labels }}
                />
              </TopicName>
              &nbsp;&#8226;&nbsp;
              <Widget src="mob.near/widget/TimeAgo" props={{ blockHeight }} />
              &nbsp;ago
            </div>
          </H6>
        </div>
      </div>
      <div className="grid grid-cols-1">
        <div className="col-span-1">
          <Widget
            src="y3k.near/widget/near_atlas.apps.atlast_notebooks.comment.repliesButton"
            props={{ accountId, blockHeight, adminContract, link }}
          />
        </div>
      </div>
    </div>
  </div>
);
