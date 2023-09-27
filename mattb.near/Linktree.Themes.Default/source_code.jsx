const Wrapper = styled.div`
  display: grid;
  gap: 40px;
  position: relative;

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 8px 16px;
    height: 32px;
    border-radius: 100px;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    cursor: pointer;
    background: #fbfcfd;
    border: 1px solid #d7dbdf;
    color: #11181c !important;

    &.button--primary {
      width: 100%;
      color: #006adc !important;

      @media (max-width: 1024px) {
        width: auto;
      }
    }

    &:hover,
    &:focus {
      background: #ecedee;
      text-decoration: none;
      outline: none;
    }

    i {
      color: #7e868c;
    }

    .bi-16 {
      font-size: 16px;
    }
  }

  @media (max-width: 900px) {
    gap: 24px;
  }
`;

const Section = styled.div`
  display: grid;
  gap: 24px;
`;

const Avatar = styled.div`
  width: 133px;
  height: 133px;
  flex-shrink: 0;
  border: 3px solid #fff;
  overflow: hidden;
  border-radius: 100%;
  box-shadow: 0px 12px 16px rgba(16, 24, 40, 0.08),
    0px 4px 6px rgba(16, 24, 40, 0.03);

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  @media (max-width: 900px) {
    width: 80px;
    height: 80px;
  }
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: ${(p) => p.size || "25px"};
  line-height: 1.2em;
  color: #11181c;
  margin: ${(p) => (p.margin ? "0 0 24px" : "0")};
  overflow-wrap: anywhere;
`;

const Text = styled.p`
  margin: 0;
  line-height: 1.5rem;
  color: ${(p) => (p.bold ? "#11181C" : "#687076")} !important;
  font-weight: ${(p) => (p.bold ? "600" : "400")};
  font-size: ${(p) => (p.small ? "12px" : "14px")};
  overflow: ${(p) => (p.ellipsis ? "hidden" : "")};
  text-overflow: ${(p) => (p.ellipsis ? "ellipsis" : "")};
  white-space: ${(p) => (p.ellipsis ? "nowrap" : "")};
  overflow-wrap: anywhere;

  b {
    font-weight: 600;
    color: #11181c;
  }

  &[href] {
    display: inline-flex;
    gap: 0.25rem;

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }
`;

const TextLink = styled.a`
  display: block;
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  color: #11181c !important;
  font-weight: 400;
  font-size: 14px;
  white-space: nowrap;
  outline: none;
  overflow-x: hidden;
  text-overflow: ellipsis;

  &:focus,
  &:hover {
    text-decoration: underline;
  }

  i {
    color: #7e868c;
    margin-right: 8px;
  }
`;

const TextBadge = styled.p`
  display: inline-block;
  margin: 0;
  font-size: 10px;
  line-height: 1.1rem;
  background: #687076;
  color: #fff;
  font-weight: 600;
  white-space: nowrap;
  padding: 0 6px;
  border-radius: 3px;
`;

const Actions = styled.div`
  display: flex;
  gap: 6px;
`;

const Stats = styled.div`
  display: flex;
  gap: 24px;
`;

const SocialLinks = styled.div`
  display: grid;
  gap: 9px;
`;

const FollowButtonWrapper = styled.div`
  flex: 1 0 auto;
  div,
  button {
    width: 100%;
  }
  @media (max-width: 1024px) {
    flex: 0 0 auto;
    div,
    button {
      width: auto;
    }
  }
`;

const Linktree = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  gap: 16;
  padding: 0 8px;
`;

return {
  Wrapper,
  Section,
  Avatar,
  Title,
  Text,
  TextLink,
  TextBadge,
  Actions,
  Stats,
  SocialLinks,
  FollowButtonWrapper,
  Linktree
};
