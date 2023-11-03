const { onClose } = props;

const ModalContainer = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  z-index: 1000;
  position: absolute;
  align-items: center;
  background: #2f2b2b78;
  flex-direction: column;
  justify-content: center;
`;

const ModalOverlay = styled.div`
  width: 750px;
  padding: 40px;
  display: flex;
  position: relative;
  border-radius: 12px;
  flex-direction: column;
  background-color: #191a1a;
  border: 1px solid rgb(255, 255, 255);
  @media (max-width: 510px) {
    width: 90%;
    height: 95%;
    padding: 40px 20px 20px 20px;
  }
`;

const ModalContent = styled.div`
  gap:20px;
  width: 100%;
  color: white;
  display: flex;
  border-radius: 4px;
  flex-direction: column;
  @media (max-width: 510px) {
    height: 87%;
  }
`;

const ModalAction = styled.div`
  display: flex;
  padding: 10px;
  justify-content: center;
`;

const ModalTitle = styled.h4`
  margin-bottom: 10px;
  text-align: center;
`;

const Button = styled.a`
  color: #191a1a;
  font-weight: 600;
  padding: 10px 22px;
  border-radius: 6px;
  background-color:white;
  text-decoration: none !important;
  &:hover {
    background-color: grey;
    color: #191a1a;
  }
`;

return (
  <ModalContainer>
    <ModalOverlay>
      <ModalContent>
        <div
          style={{
            position: "absolute",
            left: 15,
            top: 15,
          }}
        >
          <img src="https://humans.nearverselabs.com/Logo_NFT_WG.png" />
        </div>
        <button
          style={{
            position: "absolute",
            right: 15,
            top: 15,
            background: "unset",
            border: 0,
          }}
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8zm3.59-13L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41z"
            />
          </svg>
        </button>
        <ModalTitle>{`Hello Human!`}</ModalTitle>
        <div>
          <p style={{ fontSize: 15 }}>
            Humans of Near is a gamified social directory of Near users powered
            by the NFT Work Group. You can browse through the map and connect
            with Near in your region/anywhere in the world using the social
            links in their profile.
          </p>
          <p style={{ fontSize: 15 }}>
            <b>Caution:</b> We do not expect/want you to give your exact
            location for privacy purposes.
          </p>
          <p>
            <b>What can you do?</b>
          </p>
          <p style={{ fontSize: 15 }}>
            1. Any Near user can pin their location ‘anywhere’ on the map <br />
            2. Update your bio, social links, customize your icon by region in
            your profile.
            <br />
            3. Filter the users by regions, user roles (Devs,Founders, etc.)
            <br />
            4. Connect with community members’ socials!
            <br />
          </p>
        </div>
      </ModalContent>
      <ModalAction>
        <Button
          href="https://linktr.ee/NFTWG"
          target="_blank"
          className="btn"
        >{`NFT WG LinkTree`}</Button>
      </ModalAction>
    </ModalOverlay>
  </ModalContainer>
);
