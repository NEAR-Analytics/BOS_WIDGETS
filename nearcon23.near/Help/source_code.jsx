const CreateButton = styled.a`
    position: sticky;
    bottom: 20px;
    width: calc(100% - 40px);
    height: 48px;
    padding: 10px;
    margin: 0 20px;
    border-radius: 100px;
    border-width: 0px;
    font-size: 16px;
    font-weight: 600;
    background-color: #000000;
    color: #FFFFFF;

    display: flex; 
    align-items: center;
    justify-content: center;

    :hover {
      background-color: #000000dd;
      color: #FFFFFF;
    }
    :active {
      background-color: #000000aa;
      color: #FFFFFF;
    }
`;

return (
  <div
    style={{
      backgroundColor: "#3D434D",
      height: "100%",
      maxHeight: "calc(100vh - 96px)",
      position: "relative",
    }}
  >
    <img
      style={{
        objectFit: "contain",
        width: "100%",
        maxWidth: 400,
        // height: "80vh",
        // padding: 10,
        position: "absolute",
      }}
      src="https://nearpad-images.s3.amazonaws.com/help-map.png"
    />

    <div
      style={{
        position: "absolute",
        width: "100%",
        bottom: 40,
      }}
    >
      <CreateButton
        href="https://shortlink.near.foundation/nearcon23faq"
        target="_blank"
      >
        View FAQs
        <svg
          style={{ marginLeft: 10 }}
          width="19"
          height="18"
          viewBox="0 0 19 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.0938 6.9375C18.0938 7.211 17.9851 7.47331 17.7917 7.6667C17.5983 7.8601 17.336 7.96875 17.0625 7.96875C16.789 7.96875 16.5267 7.8601 16.3333 7.6667C16.1399 7.47331 16.0312 7.211 16.0312 6.9375V3.92969L10.9171 9.04383C10.7234 9.23756 10.4606 9.3464 10.1866 9.3464C9.91266 9.3464 9.6499 9.23756 9.45617 9.04383C9.26244 8.8501 9.1536 8.58734 9.1536 8.31336C9.1536 8.03938 9.26244 7.77662 9.45617 7.58289L14.5703 2.46875H11.5625C11.289 2.46875 11.0267 2.3601 10.8333 2.1667C10.6399 1.97331 10.5312 1.711 10.5312 1.4375C10.5312 1.164 10.6399 0.901693 10.8333 0.708296C11.0267 0.514899 11.289 0.40625 11.5625 0.40625H17.0625C17.336 0.40625 17.5983 0.514899 17.7917 0.708296C17.9851 0.901693 18.0938 1.164 18.0938 1.4375V6.9375ZM14.3125 9C14.039 9 13.7767 9.10865 13.5833 9.30205C13.3899 9.49544 13.2812 9.75775 13.2812 10.0312V15.5312H2.96875V5.21875H8.46875C8.74225 5.21875 9.00456 5.1101 9.19795 4.9167C9.39135 4.72331 9.5 4.461 9.5 4.1875C9.5 3.914 9.39135 3.65169 9.19795 3.4583C9.00456 3.2649 8.74225 3.15625 8.46875 3.15625H2.625C2.16916 3.15625 1.73199 3.33733 1.40966 3.65966C1.08733 3.98199 0.90625 4.41916 0.90625 4.875V15.875C0.90625 16.3308 1.08733 16.768 1.40966 17.0903C1.73199 17.4127 2.16916 17.5938 2.625 17.5938H13.625C14.0808 17.5938 14.518 17.4127 14.8403 17.0903C15.1627 16.768 15.3438 16.3308 15.3438 15.875V10.0312C15.3438 9.75775 15.2351 9.49544 15.0417 9.30205C14.8483 9.10865 14.586 9 14.3125 9Z"
            fill="white"
          />
        </svg>
      </CreateButton>
    </div>
  </div>
);
