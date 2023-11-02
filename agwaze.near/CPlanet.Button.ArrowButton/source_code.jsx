const whiteArrow = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="16"
    viewBox="0 0 17 16"
    fill="none"
  >
    <path
      d="M1.79146 15.8748L1.78884 15.8749C1.5734 15.8789 1.36433 15.7933 1.20847 15.6354C1.05005 15.4734 0.959961 15.251 0.959961 15.0179C0.959961 14.7846 1.05014 14.5621 1.20871 14.4001L1.20948 14.3993L13.0487 2.08845L13.2522 1.87681H12.9586H2.72921C2.27776 1.87681 1.90353 1.49483 1.90353 1.01325C1.90353 0.531668 2.27776 0.149686 2.72921 0.149686H15.0656H15.0802L15.0944 0.146322C15.2193 0.116742 15.3512 0.117429 15.4798 0.151581C15.7706 0.228801 16.0008 0.465982 16.0764 0.773791C16.1098 0.909702 16.1104 1.04922 16.0815 1.18128L16.0786 1.1945V1.20802L16.0786 14.0359L16.0786 14.0376C16.0817 14.2707 15.9932 14.4941 15.835 14.6564C15.6771 14.8186 15.4634 14.9057 15.2438 14.8995L15.2438 14.8995H15.2403C14.7888 14.8995 14.4146 14.5175 14.4146 14.0359V3.41376V3.10324L14.1994 3.32716L2.3742 15.6351C2.21566 15.79 2.00711 15.8753 1.79146 15.8748Z"
      fill="white"
      stroke="black"
      stroke-width="0.25"
    />
  </svg>
);

const blackArrow = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="16"
    viewBox="0 0 17 16"
    fill="none"
  >
    <path
      d="M1.12618 15.8748L1.12364 15.8749C0.899053 15.879 0.681963 15.7924 0.520774 15.634C0.357052 15.4718 0.264648 15.2498 0.264648 15.0179C0.264648 14.7859 0.357128 14.5638 0.520974 14.4015L0.521753 14.4007L12.7329 2.08984L12.9442 1.87681H12.6442H2.09341C1.62186 1.87681 1.23786 1.49114 1.23786 1.01325C1.23786 0.535355 1.62186 0.149686 2.09341 0.149686H14.8174H14.8315L14.8454 0.146516C14.9754 0.116666 15.1127 0.117362 15.2465 0.15182C15.5493 0.229771 15.7863 0.468326 15.8639 0.774672C15.8982 0.910047 15.8989 1.04896 15.8692 1.18048L15.8661 1.19408V1.20802L15.8661 14.0359L15.8661 14.0376C15.8693 14.2695 15.7786 14.4925 15.6151 14.6551C15.4518 14.8176 15.2299 14.9058 15.0009 14.8995L15.0009 14.8995H14.9975C14.5259 14.8995 14.1419 14.5138 14.1419 14.0359V3.41376V3.11003L13.9282 3.32577L1.73141 15.6337C1.56743 15.7891 1.35089 15.8753 1.12618 15.8748Z"
      fill="black"
      stroke="white"
      stroke-width="0.25"
    />
  </svg>
);

const Root = styled.a`
    display: flex;
    width: max-content;
    height: 64px;
    padding: 17px 52px 18px 52px;
    justify-content: center;
    align-items: center;
    border-radius: 32px;
    border: 1px solid ${() => (props.whiteBg ? "black" : "white")};
    background: ${() => (props.whiteBg ? "white" : "black")};
    color: white;
    margin: 10px;
    color: ${() => (props.whiteBg ? "black" : "white")};
    font-family: Helvetica Neue;
    font-size: 24px;
    text-decoration: none;
    font-style: normal;
    font-weight: 400;
    transition: 0.5 ease-in-out;
    line-height: normal;
    svg {
        margin-left: 10px;
    }
    :hover {
        color: ${() => (props.whiteBg ? "black" : "white")};
        opacity: 0.8;
    }
    @media (max-width: 500px) {
      font-size: 18px;
      padding: 8px 25px 8px 25px;
    }
`;

return (
  <Root target={isBlank ?? ""} href={props.href ?? "#"}>
    {props.text ?? "Get Funded"} {props.whiteBg ? blackArrow : whiteArrow}
  </Root>
);
