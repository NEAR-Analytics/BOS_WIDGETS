const { joinBtnChildren, connectedChildren, showActivity, className } = props;

const { Bullet, Button } = VM.require(
  "abdullahi3000.near/widget/components"
) || {
  Bullet: () => <></>,
  Button: () => <></>,
};
const DaoSDK = VM.require("sdks.near/widget/SDKs.Sputnik.DaoSDK") || (() => {});

if (!DaoSDK) {
  return <></>;
}
const daoId = "build.sputnik-dao.near";
const sdk = DaoSDK(daoId);
if (!sdk) {
  return <></>;
}
const userAccountId = context.accountId;

const data = sdk?.checkIsMemberOrPending({
  accountId: userAccountId,
  rolesToCheck: ["community", "council"],
});

const connectEdge = Social.keys(
  `${userAccountId}/graph/connect/${daoId}`,
  undefined,
  {
    values_only: true,
  }
);

// get DAO policy, deposit, and group
const policy = sdk?.getPolicy();

if (policy === null || data === null) {
  return "";
}

const deposit = policy?.proposal_bond;
const roleId = "community";

const handleJoin = () => {
  const connectData = {
    [userAccountId]: {
      graph: {
        connect: {
          [daoId]: "",
        },
      },
      index: {
        graph: JSON.stringify({
          key: "connect",
          value: {
            type: "connect",
            accountId: daoId,
          },
        }),
      },
      notify: JSON.stringify({
        key: daoId,
        value: {
          type: "connect",
        },
      }),
    },
  };

  sdk.createAddMemberProposal({
    description: `add ${userAccountId} to the ${roleId} group`,
    memberId: userAccountId,
    roleId: roleId,
    gas: 219000000000000,
    deposit: deposit,
    additionalCalls: [
      {
        contractName: "social.near",
        methodName: "set",
        deposit: 100000000000000000000000,
        args: { data: connectData, options: { refund_unused_deposit: true } },
      },
    ],
  });
};

const isConnected = Object.keys(connectEdge || {}).length > 0;

const Container = styled.div`
  .custom-button {
    display: flex;
    padding: 10px 20px;
    justify-content: center;
    align-items: center;
    gap: 4px;

    border-radius: 8px;
    background: #2287C2;

    color: #fff;
    margin: 0;

    a {
      color: #fff !important;
    }

    /* Other/Button_text */
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    text-decoration: none;
    transition: all 300ms;

    &:hover {
      background: #1b73a7;
    }
  }

  a {
    @apply custom-button;
  }
`;

const Component = () => {
  return (
    <a
      href="https://near.social/abdullahi3000.near/widget/app?page=joinUs"
      target="_blank"
    >
      <Button variant="primary" noLink={true}>
        Join Now
      </Button>
    </a>
  );
};

return (
  <Container>
    <Component />
  </Container>
);
