const accountId = context.accountId;

State.init({
  avatar:
    "https://i.near.social/magic/large/https://near.social/magic/img/account/" +
    accountId,
});

const setAvatar = () => {
  State.update({
    avatar:
      "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm",
  });
};

const Header = styled.div`
  display: flex;
  width: 100%;
  height: 96px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 24px;
`;

const Logo = styled.img`
  width: 52px;
  height: 52px;
  border-radius : 50%;
`;

const AlarmIcon = () => (
  <svg
    width="52"
    height="52"
    viewBox="0 0 52 52"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M17.5008 27.7871V27.5681C17.533 26.9202 17.7406 26.2925 18.1024 25.7496C18.7045 25.0975 19.1167 24.2983 19.2957 23.436C19.2957 22.7695 19.2957 22.0935 19.3539 21.427C19.6547 18.2184 22.8273 16 25.9611 16H26.0387C29.1725 16 32.345 18.2184 32.6555 21.427C32.7137 22.0935 32.6555 22.7695 32.704 23.436C32.8854 24.3003 33.2972 25.1019 33.8974 25.7591C34.2618 26.2972 34.4698 26.9227 34.4989 27.5681V27.7776C34.5206 28.648 34.2208 29.4968 33.6548 30.1674C32.907 30.9515 31.8921 31.4393 30.8024 31.5384C27.607 31.8812 24.383 31.8812 21.1876 31.5384C20.0991 31.435 19.0858 30.9479 18.3352 30.1674C17.778 29.4963 17.4822 28.6526 17.5008 27.7871Z"
      stroke="#808080"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M23.5549 34.8518C24.0542 35.4784 24.7874 35.884 25.5922 35.9787C26.3971 36.0734 27.2072 35.8495 27.8433 35.3564C28.0389 35.2106 28.2149 35.041 28.3672 34.8518"
      stroke="#808080"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <circle cx="32" cy="19" r="4" fill="#FF4D5E" />
    <rect x="0.5" y="0.5" width="51" height="51" rx="25.5" stroke="#F3F3F3" />
  </svg>
);

return <Header>{`Header`}</Header>;
