const { config, from } = props;

const ModalWrapper = styled.div`
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  background: rgba(0, 0, 0, 0.73);

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0 20px;
`;

const ModalContainer = styled.div`
  width: 100%;
  background: var(--agg-bg-color, #151718);
  border-radius: 16px;

  @media (min-width: 640px) {
    width: 450px;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 14px 18px 14px;

  img {
    cursor: pointer;
  }
`;

const CloseImage = () => (
  <img
    onClick={props.onRequestClose}
    height={20}
    width={20}
    src={
      from === "layer"
        ? `${config.ipfsPrefix}/bafkreiarl7nhluzuyzvew72lc4l5cepbcphdgkvedbgjdieysf6lqyiuhq`
        : `${config.ipfsPrefix}/bafkreibxrur3pqmc4pnf5yeutvr22q2cgbtov2prwcyuammf5hxazhl52e`
    }
  />
);

const Title = styled.div`
  font-size: 15px;
  font-weight: bold;
  color: var(--agg-primary-color, #fff);
`;

const ModalBody = styled.div`
  border-top: 1px solid var(--agg-primary-color, rgba(255, 255, 255, 0.16));
  padding: 30px 14px;
`;
return (
  <ModalWrapper>
    <ModalContainer>
      <Header>
        <Title>{props.title}</Title>
        <CloseImage />
      </Header>
      <ModalBody>{props.children}</ModalBody>
    </ModalContainer>
  </ModalWrapper>
);
