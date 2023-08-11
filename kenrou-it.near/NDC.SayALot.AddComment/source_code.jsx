const ModalCard = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.7);
`;
const CommentCard = styled.div`
  display: flex;
  width: 400px;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  border-radius: 10px;
  background: #fff;
  border: 1px solid transparent;
  margin-left: auto;
  margin-right: auto;
  margin-buttom: 50%;
  @media only screen and (max-width: 480px) {
    width: 90%;
  }
`;
const H1 = styled.h1`
  color: black;
  font-size: 14px;
  font-weight: 500;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;
  align-self: stretch;
`;
const CommentBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
`;
const BComment = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`;
const BCommentmessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`;
const BCMHeader = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 8px;
`;
const BCMProfile = styled.div`
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  flex-direction: row;
  border-radius: 29px;
  background: #d0d6d9;
  text-align: center;
`;
const BCMProfileimg = styled.img`
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  vertical-align: initial;
`;
const BCMProfileUsername = styled.label`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: #000;
  font-size: 14px;

  font-style: normal;
  font-weight: 500;
  line-height: 120%;
`;
const BCMMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  color: #686b6d;
  font-size: 14px;

  font-style: normal;
  font-weight: 400;
  line-height: 120%;
`;
const BFooter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 4px;
  align-self: stretch;
`;
const BFootercont = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;
`;
const BFootercontTime = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1 0 0;
`;
const BFCTimetext = styled.div`
  display: flex;
  height: 19.394px;
  flex-direction: column;
  justify-content: center;
  flex: 1 0 0;
  color: #000;
  font-size: 14px;

  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;
const BFCButton = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 4px;
`;
const BFCButtonitem = styled.button`
  display: flex;
  padding: 2px 12px;
  align-items: center;
  gap: 6px;
  border-radius: 4px;
  border-width: 1px;
  border: solid 1px #9333ea;

  background-image: linear-gradient(#fff, #fff),
    radial-gradient(circle at top left, #f0e1ce, #f0e1ce);
  background-origin: border-box;
  background-clip: padding-box, border-box;
`;
const BFCBIText = styled.label`
  font-size: 12px;

  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  color: #9333ea;
  cursor: pointer;
`;
const NewComment = styled.textarea`
  width: 100%;
  display: flex;
  height: 100px;
  padding: 9px 10px 0px 10px;
  align-items: flex-start;

  gap: 10px;
  align-self: stretch;
  border-radius: 8px;
  border: 1px solid #d0d6d9;
  background: #fff;

  font-size: 12px;

  font-style: normal;
  font-weight: 400;
  line-height: 120%;
`;
const CommentFooter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: end;
  gap: 16px;
  align-self: stretch;
`;
const CFCancel = styled.button`
  display: flex;
  width: 107px;
  padding: 8px 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: #9333ea;
  border-radius: 10px;
  border-width: 1px;
  border: solid 1px #9333ea;

  background-image: linear-gradient(#fff, #fff),
    radial-gradient(circle at top left, #f0e1ce, #f0e1ce);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  @media only screen and (max-width: 480px) {
    width: 100%;
  }
`;

const CFSubmit = styled.button`
  display: flex;
  width: 107px;
  padding: 8px 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: #000;
  display: flex;
  width: 107px;
  padding: 8px 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  border-width: 1px;
  border: solid 1px transparent;

  background-image: linear-gradient(#ffd50d, #ffd50d),
    radial-gradient(circle at top left, #f0e1ce, #f0e1ce);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  @media only screen and (max-width: 480px) {
    width: 100%;
  }
`;

const {
  widgets,
  isTest,
  article,
  onClickCancel,
  candidateOrReply,
  username,
  profile_picture,
  originalComment,
} = props;

const libCalls = [];

const libSrcArray = [
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb/widget/SayALot.lib.comment",
];

function callLibs(srcArray, stateUpdate, libCalls) {
  return (
    <>
      {srcArray.map((src) => {
        return (
          <Widget
            src={src}
            props={{
              isTest,
              stateUpdate,
              libCalls,
            }}
          />
        );
      })}
    </>
  );
}

function stateUpdate(obj) {
  State.update(obj);
}

State.init({
  theme,
  reply: "",
  cancel: false,
  e_message: "",
  libCalls,
});

const SetText = (txt) => {
  State.update({ shareText: txt });
};

function addCommentListener() {
  let newLibCalls = [...libCalls];
  const comment = {
    text: state.reply,
    realArticleId: article.realArticleId,
    timestamp: Date.now(),
    originalCommentId: originalComment.commentId ?? article.realArticleId,
    commentId: comment.commentId ?? `c_${context.accountId}-${Date.now()}`,
  };
  newLibCalls.push({
    functionName: "createComment",
    key: "createComment",
    props: { comment },
  });
  State.update({ libCalls: newLibCalls });
}

return (
  <ModalCard>
    <CommentCard>
      <H1>{candidateOrReply ? " Add a Comment" : "Reply to comment"}</H1>
      <Container>
        {!candidateOrReply ? (
          <>
            <CommentBody>
              <BComment>
                <BCommentmessage>
                  <BCMHeader>
                    <BCMProfile>
                      {profile_picture ? (
                        <BCMProfileimg
                          style={{ "border-radius": "20px" }}
                          alt="pic"
                          src={
                            "https://nativonft.mypinata.cloud/ipfs/" +
                            profile_picture
                          }
                        />
                      ) : (
                        <BCMProfileimg
                          alt="pic"
                          src={
                            "https://emerald-related-swordtail-341.mypinata.cloud/ipfs/QmTKv1yHQKRDQcmc5Jkv2jkaTx2Q1jJE9srHEmyYPq53vJ?preview=1"
                          }
                        />
                      )}
                    </BCMProfile>
                    <BCMProfileUsername>
                      {username ? "@" + username : "@user.near"}
                    </BCMProfileUsername>
                  </BCMHeader>
                  <BCMMessage>
                    {undefined}
                    {originalComment && originalComment}
                  </BCMMessage>
                </BCommentmessage>
              </BComment>
              <BFooter>
                <label>{state.e_message}</label>
                <BFootercont>
                  <BFootercontTime>
                    <img
                      alt="schedule"
                      src={
                        "https://emerald-related-swordtail-341.mypinata.cloud/ipfs/QmP3uRUgZtqV3HAgcZoYaDA6JSPpFcpqULvgenWUs3ctSP"
                      }
                      style={{ width: "14px", height: "14px" }}
                    />
                  </BFootercontTime>
                  <BFCButton>
                    <OverlayTrigger
                      key={placement}
                      placement={placement}
                      overlay={
                        <Tooltip id={`tooltip-${placement}`}>
                          {state.shareText}
                        </Tooltip>
                      }
                    >
                      <BFCButtonitem
                        onClick={() => {
                          SetText("Copied to the clipboard");
                          clipboard.writeText(state.share_url);
                        }}
                      >
                        <BFCBIText>Share</BFCBIText>
                        <img
                          alt="share"
                          src={
                            "https://emerald-related-swordtail-341.mypinata.cloud/ipfs/QmdFMobsnCyj9USY2mHtLzhu58Mz6BFpMx7tKPQGoWmsHY?preview=1"
                          }
                        />
                      </BFCButtonitem>
                    </OverlayTrigger>
                  </BFCButton>
                </BFootercont>
              </BFooter>
            </CommentBody>
            <hr
              style={{
                width: "100%",
                height: "0px",
                border: "1px solid rgba(130, 134, 136, 0.20)",
                flex: "none",
                background: "rgba(130, 134, 136, 0.20)",
                margin: "0px",
                "flex-grow": "0",
              }}
            />
          </>
        ) : (
          <></>
        )}
        <div className="w-100 col">
          <Widget
            src={widgets.styledComponents}
            props={{
              TextArea: {
                placeholder: "Reply here",
                maxLength: 2000,
                value: state.reply,
                handleChange: (e) =>
                  State.update({
                    reply: e.target.value.substring(0, 1000),
                  }),
              },
            }}
          />
        </div>
        <CommentFooter>
          <Widget
            src={widgets.styledComponents}
            props={{
              Button: {
                text: "Cancel",
                className: "secondary dark",
                onClick: props.onClickCancel,
              },
            }}
          />
          <Widget
            src={widgets.styledComponents}
            props={{
              Button: {
                text: "Submit",
                onClick: addCommentListener,
              },
            }}
          />
        </CommentFooter>
      </Container>
    </CommentCard>
    <div style={{ display: "none" }}>
      {callLibs(libSrcArray, stateUpdate, state.libCalls)}
    </div>
  </ModalCard>
);
