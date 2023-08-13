const { widgets, data } = props;

State.init({
  showModal: false,
  hasReply: false,
});

const CommentCard = styled.div`
  width: 100%;
  display: flex;
  padding: 14px 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  border-radius: 10px;
  background: #fff;
`;

const CommentCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const CommentUserContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ProfileImageComment = styled.img`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  border-radius: 20px;
`;

const CommentUser = styled.p`
  color: #000;
  font-size: 12px;
  font-weight: 500;
  line-height: 120%;
  margin: 0px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ReplyCounterDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ReplyIconPurple = styled.img`
  width: 14px;
  height: 14px;
`;

const ReplyCounterText = styled.p`
  color: #000;
  font-size: 10px;
  font-weight: 500;
  margin: 0px;
`;

const CommentCardContent = styled.p`
  color: #585b5c;
  font-size: 12px;
  line-height: 18px;
  display: flex;
  flex-direction: column;
  margin: 0px;
`;

const CommentCardLowerSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
  width: 100%;
`;

const TimestampCommentDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1 0 0;
`;

const TimestampIconComment = styled.img`
  width: 12px;
  height: 12px;
`;

const TimestampTextComment = styled.p`
  color: #000;
  font-size: 10px;
  font-weight: 300;
  margin: 0px;
`;

const DeleteCommentButton = styled.button`
  display: flex;
  width: 28px;
  padding: 2px 12px;
  justify-content: center;
  align-items: center;
  gap: 6px;
  align-self: stretch;
  border-radius: 4px;
  border: 1px solid #c23f38;
  background: #f1d6d5;
`;

const DeleteCommentIcon = styled.img`
  width: 14px;
  height: 14px;
  flex-shrink: 0;
`;

const ShareCommentButton = styled.button`
  display: flex;
  width: 28px;
  height: 28px;
  padding: 2px 12px;
  justify-content: center;
  align-items: center;
  gap: 6px;
  border-radius: 4px;
  border: solid 1px transparent;
  background-image: linear-gradient(white, white),
    radial-gradient(circle at top left, #9333ea 0%, #4f46e5 100%);
  background-origin: border-box;
  background-clip: padding-box, border-box;
`;

const ShareCommentIcon = styled.img`
  width: 14px;
  height: 14px;
  flex-shrink: 0;
`;

const ReplyCommentButton = styled.div`
  cursor: pointer;
  display: flex;
  padding: 2px 12px;
  align-items: center;
  gap: 6px;
  align-self: stretch;
  border-radius: 4px;
  background: var(--buttons-yellow-default, #ffd50d);
`;

const ReplyCommentText = styled.p`
  color: var(--primary-black, #000);
  font-size: 12px;
  font-weight: 500;
  line-height: 24px;
  margin: 0px;
`;

const ReplyCommentIcon = styled.img`
  width: 14px;
  height: 14px;
`;

const CommentReplySeparator = styled.hr`
  height: 0px;
  margin: 16px 0 16px 0;
  border: 1px solid rgba(208, 214, 217, 1);
`;

const ReplyContainer = styled.div`
  display: flex;
  width: 260px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  margin: 0 0 0 35px;
`;

const ReplyHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  align-self: stretch;
`;

const ReplyContent = styled.p`
  color: #828688;
  font-size: 12px;
  line-height: 120%;
  margin: 0px;
`;

const ReplyLowerSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const ReplyButtonSection = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 4px;
`;

const DeleteReplyButton = styled.button`
  display: flex;
  padding: 2px 12px;
  align-items: center;
  gap: 6px;
  align-self: stretch;
  border-radius: 4px;
  border: 1px solid #c23f38;
  background: #f1d6d5;
`;

const DeleteReplyText = styled.p`
  color: #c23f38;
  font-size: 12px;
  font-weight: 500;
  line-height: 24px;
  margin: 0px;
`;

const formatName = (name) =>
  name.length === 64
    ? `${name.slice(0, 4)}..${name.slice(name.length - 4, name.length)}`
    : name;

return (
  <CommentCard>
    <CommentCardHeader>
      <CommentUserContent>
        <Widget
          src="mob.near/widget/ProfileImage"
          props={{
            accountId: data.accountId,
            imageClassName: "rounded-circle w-100 h-100",
            style: { width: "25px", height: "25px" },
          }}
        />
        <CommentUser>{formatName(data.accountId)}</CommentUser>
      </CommentUserContent>
    </CommentCardHeader>
    <CommentCardContent>
      <Widget
        src="mob.near/widget/SocialMarkdown"
        props={{ text: data.value.comment.text }}
      />
    </CommentCardContent>
    <CommentCardLowerSection>
      <TimestampCommentDiv>
        <i className="bi bi-clock" />
        <TimestampTextComment>
          {new Date(data.value.comment.timestamp).toDateString()}
        </TimestampTextComment>
      </TimestampCommentDiv>
    </CommentCardLowerSection>
  </CommentCard>
);
