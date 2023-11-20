const Dialog = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: none;

  &.display {
    display: block;
  }
`;

const SearchIcon = (
  <svg
    width="17"
    height="15"
    viewBox="0 0 17 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="7" cy="7" r="6.5" stroke="#8E8E8E" />
    <path
      d="M15.7 14.4C15.9209 14.5657 16.2343 14.5209 16.4 14.3C16.5657 14.0791 16.5209 13.7657 16.3 13.6L15.7 14.4ZM11.7 11.4L15.7 14.4L16.3 13.6L12.3 10.6L11.7 11.4Z"
      fill="#8E8E8E"
    />
  </svg>
);

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  /* backdrop-filter: blur(10px); */
  position: absolute;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 900px) {
    align-items: flex-end;
  }
`;

const Content = styled.div`
  border-radius: 24px;
  border: 1px solid #3d363d;
  background: #131313;
  width: 393px;
  height: 330px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 900px) {
    width: 100%;
    border-radius: 16px 16px 0px 0px;
    background: #2b2b2b;
  }
`;
const Text = styled.div`
  color: #fff;
  text-align: center;
  font-family: Noto Sans;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  width: 333px;
  margin-top: 18px;
`;
const CurrencyLabel = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  cursor: pointer;
  gap: 6px;
`;

const CurrencySymbol = styled.div`
  font-size: 16px;
  font-weight: 500px;
  color: #fff;
`;
const AddressWrap = styled.div`
  font-size: 14px;
  color: #8e8e8e;
  opacity: 0.5;
  display: flex;
  gap: 4px;
`;
const CurrencyName = styled.a`
  font-size: 14px;
  color: #8e8e8e;
  opacity: 0.5;
`;
const Button = styled.button`
  border-radius: 18px;
  background: #5ee0ff;
  width: 200px;
  height: 36px;
  flex-shrink: 0;
  color: #131313;
  font-size: 16px;
  font-weight: 600;
  border: none;
  margin-top: 30px;
  cursor: pointer;
`;
const CancelButton = styled.div`
  color: #8e8e8e;
  text-align: center;
  font-family: Noto Sans;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 20px;
  cursor: pointer;
`;

const currency = props.currency || {};
const display = props.display;

return (
  <Dialog className={display ? "display" : ""}>
    <Overlay>
      <Content>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
        >
          <g clip-path="url(#clip0_144_505)">
            <path
              d="M20 0C8.955 0 0 8.955 0 20C0 31.045 8.955 40 20 40C31.045 40 40 31.045 40 20C40 8.955 31.045 0 20 0ZM20 3.33333C29.205 3.33333 36.6667 10.795 36.6667 20C36.6667 29.205 29.205 36.6667 20 36.6667C10.795 36.6667 3.33333 29.205 3.33333 20C3.33333 10.795 10.795 3.33333 20 3.33333ZM18.3333 21.6667C18.3333 22.1087 18.5089 22.5326 18.8215 22.8452C19.134 23.1577 19.558 23.3333 20 23.3333C20.442 23.3333 20.8659 23.1577 21.1785 22.8452C21.4911 22.5326 21.6667 22.1087 21.6667 21.6667V10C21.6667 9.55797 21.4911 9.13405 21.1785 8.82149C20.8659 8.50893 20.442 8.33333 20 8.33333C19.558 8.33333 19.134 8.50893 18.8215 8.82149C18.5089 9.13405 18.3333 9.55797 18.3333 10V21.6667ZM19.8333 27C19.2145 27 18.621 27.2458 18.1834 27.6834C17.7458 28.121 17.5 28.7145 17.5 29.3333C17.5 29.9522 17.7458 30.5457 18.1834 30.9832C18.621 31.4208 19.2145 31.6667 19.8333 31.6667C20.4522 31.6667 21.0457 31.4208 21.4832 30.9832C21.9208 30.5457 22.1667 29.9522 22.1667 29.3333C22.1667 28.7145 21.9208 28.121 21.4832 27.6834C21.0457 27.2458 20.4522 27 19.8333 27Z"
              fill="#FF5083"
            />
          </g>
          <defs>
            <clipPath id="clip0_144_505">
              <rect
                width="40"
                height="40"
                fill="white"
                transform="matrix(1 0 0 -1 0 40)"
              />
            </clipPath>
          </defs>
        </svg>
        <Text>
          This token isn’t frequently swapped. Please do your own research
          before trading.
        </Text>
        <CurrencyLabel>
          <Widget
            src="dapdapbos.near/widget/Linea.Uniswap.Swap.TokenIcon"
            props={{ size: 36, token: currency }}
          />
          <div>
            <CurrencySymbol>{currency.symbol}</CurrencySymbol>
            <AddressWrap>
              <div>Address: </div>
              <CurrencyName
                href={`${props.explor}/address/${currency.address}`}
                target="_blank"
              >
                {currency.address
                  ? currency.address.slice(0, 9) +
                    "..." +
                    currency.address.slice(-7)
                  : ""}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                >
                  <path
                    d="M9.44444 4.44444C9.2971 4.44444 9.15579 4.50298 9.05161 4.60716C8.94742 4.71135 8.88889 4.85266 8.88889 5V8.33333C8.88889 8.48068 8.83036 8.62198 8.72617 8.72617C8.62198 8.83036 8.48068 8.88889 8.33333 8.88889H1.66667C1.51932 8.88889 1.37802 8.83036 1.27383 8.72617C1.16964 8.62198 1.11111 8.48068 1.11111 8.33333V1.66667C1.11111 1.51932 1.16964 1.37802 1.27383 1.27383C1.37802 1.16964 1.51932 1.11111 1.66667 1.11111H5C5.14733 1.11109 5.28861 1.05255 5.39278 0.948363C5.49695 0.844178 5.55547 0.702883 5.55547 0.555556C5.55547 0.408228 5.49695 0.266933 5.39278 0.162748C5.28861 0.0585641 5.14733 2.25549e-05 5 0H1.66667C1.22464 0 0.800716 0.175595 0.488155 0.488155C0.175595 0.800716 0 1.22464 0 1.66667V8.33333C0 8.77536 0.175595 9.19928 0.488155 9.51184C0.800716 9.8244 1.22464 10 1.66667 10H8.33333C8.77536 10 9.19928 9.8244 9.51184 9.51184C9.8244 9.19928 10 8.77536 10 8.33333V5C10 4.85266 9.94147 4.71135 9.83728 4.60716C9.73309 4.50298 9.59179 4.44444 9.44444 4.44444Z"
                    fill="#8E8E8E"
                  />
                  <path
                    d="M7.22192 1.11111H8.09969L4.60525 4.6C4.55318 4.65165 4.51185 4.71309 4.48364 4.78079C4.45544 4.84849 4.44092 4.9211 4.44092 4.99444C4.44092 5.06778 4.45544 5.1404 4.48364 5.2081C4.51185 5.2758 4.55318 5.33724 4.60525 5.38889C4.6569 5.44096 4.71834 5.48229 4.78604 5.5105C4.85374 5.5387 4.92635 5.55322 4.99969 5.55322C5.07303 5.55322 5.14565 5.5387 5.21335 5.5105C5.28105 5.48229 5.34249 5.44096 5.39414 5.38889L8.88858 1.9V2.77778C8.88858 2.92512 8.94712 3.06643 9.0513 3.17062C9.15549 3.2748 9.2968 3.33333 9.44414 3.33333C9.59148 3.33333 9.73279 3.2748 9.83698 3.17062C9.94116 3.06643 9.99969 2.92512 9.99969 2.77778V0.555556C9.99969 0.408213 9.94116 0.266905 9.83698 0.162719C9.73279 0.0585316 9.59148 0 9.44414 0H7.22192C7.07459 2.25549e-05 6.9333 0.0585641 6.82913 0.162749C6.72497 0.266933 6.66645 0.408228 6.66645 0.555556C6.66645 0.702883 6.72497 0.844178 6.82913 0.948363C6.9333 1.05255 7.07459 1.11109 7.22192 1.11111Z"
                    fill="#8E8E8E"
                  />
                </svg>
              </CurrencyName>
            </AddressWrap>
          </div>
        </CurrencyLabel>
        <Button
          onClick={() => {
            props.onImport({ ...currency, isImport: true });
            props.onClose?.();
          }}
        >
          I understand
        </Button>
        <CancelButton
          onClick={() => {
            props.onClose?.();
          }}
        >
          Cancel
        </CancelButton>
      </Content>
    </Overlay>
  </Dialog>
);
