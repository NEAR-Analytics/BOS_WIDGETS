const IPFS_BASE_URL = "https://nftstorage.link/ipfs/";

const linktree = props.linktree;


const LinktreeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 16px;
  width: 100%;
  padding: 0px 14px;
`;

const LinktreeItemContainer = styled.div`
  padding: 8px 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

const LinkText = styled.a`
  font-size: 14px;
  color: gray;
  font-weight: 400;
  margin-left: 16px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  &:hover {
    text-decoration: none;
  }
`;

const itemIconUrls = {
  github: IPFS_BASE_URL + "bafkreiankcn5awmw3b5ghhhebrmxahf2bdvrsd4i74rw7s4x4ye5djpyxu",
  // "telegram": IPFS_BASE_URL +
  twitter: IPFS_BASE_URL + "bafkreiabmokq5rsnb2nehzdktmiw57esvwz7i4baggpxyg2kg3x5quachu",
  website: IPFS_BASE_URL + "bafkreibr5xstjlyyjicgz3epxv5soa7fzhu72qvukp7dpld75uwnvtbveq",
  NEAR: IPFS_BASE_URL + "bafkreigogi7iyonbdjsxi3n6seplll7at6e4jsrxwpgke5b5uk5obxkdpe",
};

const fullUrls = {
  twitter: (handle) => `https://twitter.com/${keypomxyz}`,
  github: (username) => `https://github.com/${keypom}`,
  website: (url) => url,
};

return (
  <LinktreeContainer>
    <LinktreeItemContainer>
      <Icon src={itemIconUrls.twitter} />
      <LinkText
        target="_blank"
        href={`https://twitter.com/keypomxyz`}
      >
        Twitter
      </LinkText>
    </LinktreeItemContainer>
    <LinktreeItemContainer>
      <Icon src={itemIconUrls.github} />
      <LinkText
        target="_blank"
        href={`https://github.com/keypom`}
      >
        Github
      </LinkText>
    </LinktreeItemContainer>
    <LinktreeItemContainer>
      <Icon src={itemIconUrls.NEAR} />
      <LinkText
        target="_blank"
        href={`https://near.social/mob.near/widget/ProfilePage?accountId=${props.projectId}`}
      >
        NEAR
      </LinkText>
    </LinktreeItemContainer>
  </LinktreeContainer>
);
