const Wrapper = styled.div`
    display: flex;
    align-items: flex-start;
    -webkit-box-pack: justify;
    justify-content: space-between;
    flex-direction: column;

    gap: 0px;
    padding: 16px;
    border-radius: 16px;
    background: rgb(247, 249, 251);
    width: 100%;
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 50%;
  
  button {
    border-radius: 1000px;
    height: 34px;
    padding: 8px 16px;
    border: 2px solid rgb(12, 34, 70);    line-height: 1.2;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    color: black;
    :hover {
      background: transparent;
      border: 2px solid rgb(12, 34, 70);    line-height: 1.2;
      color: black;
    }
  }
`;

const Right = styled.div`
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    width: 100%;
    gap: 10px;
    
    .value {
      font-size: 40px;
    }
    input {
      text-align: end;
      outline: none;
      border: none;
      font-size: 40px;

      /* Removes the arrows in number inputs in most browsers */
      ::-webkit-inner-spin-button, ::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      /* Removes the arrows in Firefox */
      appearance: none;

      /* Removes the highlight around the input on some browsers when active */
      &:focus {
        outline: none;
        box-shadow: none;
      }
    }
`;

const mpETHImage = (
  <svg
    width="204"
    height="204"
    viewBox="0 0 204 204"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="0.25"
      y="0.235352"
      width="203.501"
      height="203.501"
      rx="101.751"
      fill="#BAC2E2"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M102.001 39.6226L86.8763 54.54L102.001 69.4575L117.126 54.54L102.001 39.6226ZM77.8967 63.2419L63.257 77.9581L101.794 116.696L140.331 77.9581L125.691 63.242L101.794 87.2638L77.8967 63.2419ZM54.6541 86.8613L39.6377 101.899L102.001 164.349L164.364 101.899L149.348 86.8614L102.001 134.274L54.6541 86.8613Z"
      fill="#0C2246"
    />
  </svg>
);

const RightContainer = styled.div`
    display: flex;
    align-items: end;
    justify-content: end;
    flex-direction: row;
    gap: 10px;
    font-size: 32px;
`;

const Top = styled.div`
    display: flex;
    align-items: flex-start;
    -webkit-box-pack: justify;
    justify-content: space-between;
    flex-direction: row;

    gap: 20px;
    border-radius: 16px;
    background: rgb(247, 249, 251);
    width: 100%;
`;

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    width: 100%;
    gap: 10px;
    font-size: 16x;
`;

const Icon = ({ iconUrl }) => (
  <img src={iconUrl} width={40} height={40} alt="coin icon" />
);

const Highlight = styled.div`
  font-weight: bold;
`;

return (
  <Wrapper>
    <Top>
      <Left>
        <Highlight>You'll get</Highlight>
      </Left>
      <Right>
        <RightContainer>
          <svg
            width="32"
            height="32"
            viewBox="0 0 204 204"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.25"
              y="0.235352"
              width="203.501"
              height="203.501"
              rx="101.751"
              fill="#BAC2E2"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M102.001 39.6226L86.8763 54.54L102.001 69.4575L117.126 54.54L102.001 39.6226ZM77.8967 63.2419L63.257 77.9581L101.794 116.696L140.331 77.9581L125.691 63.242L101.794 87.2638L77.8967 63.2419ZM54.6541 86.8613L39.6377 101.899L102.001 164.349L164.364 101.899L149.348 86.8614L102.001 134.274L54.6541 86.8613Z"
              fill="#0C2246"
            />
          </svg>{" "}
          <div style={{ alignSelf: "end" }}>{props.value || 0}</div>
        </RightContainer>
      </Right>
    </Top>
    <Bottom>
      <div>1 mpETH = {props.price.toFixed(5) || 0} ETH</div>
      <div styled={{ textAlign: "end" }}>{props.iconName}</div>
    </Bottom>
  </Wrapper>
);
