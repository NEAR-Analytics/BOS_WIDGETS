const NorthPanel = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2000;
  width: 192px;
  height: 30px;
  border-radius: 0px 0px 10px 10px;
  background: #3d7fff;
  padding: 4px 10px;
`;
const ItemBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
const TextBlock = styled.span`
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 150px;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 149%;
`;
const icon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <g clip-path="url(#clip0_20_3389)">
      <path
        d="M7.99998 14.6668C11.6819 14.6668 14.6666 11.6821 14.6666 8.00016C14.6666 4.31826 11.6819 1.3335 7.99998 1.3335C4.31808 1.3335 1.33331 4.31826 1.33331 8.00016C1.33331 11.6821 4.31808 14.6668 7.99998 14.6668Z"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8 10.6667V8"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8 5.3335H8.00667"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_20_3389">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
const Icon = styled.div`
  display: flex;
  align-items: center;
  width: 16px;
  height: 16px;
  margin-bottom: 3px;
  cursor: pointer;
`;
return (
  <NorthPanel>
    <ItemBlock>
      <TextBlock>Ac lacinia duis vulputate lectus-v3</TextBlock>
      <Icon>{icon}</Icon>
    </ItemBlock>
  </NorthPanel>
);
