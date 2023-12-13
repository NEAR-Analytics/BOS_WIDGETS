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
  height: 120px;
  flex-direction: row;
  align-items: center;
`;

const Logo = styled.div`
  width: 172px;
  position: relative;
  & > img {
    top: -10px;
    width: 170px;
    position: relative;
  }
  & > svg {
    left: 0;
    top: 105px;
    position: absolute;
  }
`;

return (
  <Header>
    <Logo>
      <img src="https://s3-alpha-sig.figma.com/img/56bf/02c0/a9f986a3ae162db6b9983347ef39f076?Expires=1703462400&Signature=hl62UIJat6mKNiTuCmg3UzK2jnti9wQEfgcEHH29J7OO77B4ysboaNt60fdyDN5tNEiIZHFe1hFlE4hq7AqiRo-YG~cRVAgMJk7UvFVGlLhu~lnT8c8HzLTS4Zs~RbcMp~zYkeRECXzLDDtv4JTskU0Ffi7hOCXzK3X3T~iHUKzEmZ8I8uQdoVqWn5L4AQW81wmUfMakt~H6rK~NnJXPGUyNMAzrshcv~zuawUdJJYCkuQ9j87LV9G9rqzMnNCqMMnKK0KJoVXkPhMadQRh-UDmLDnNabLDY8EdvKlYzsVZ7MYU3NKT8mmILPAsS00vHmKBXj9tXmSFDJPMFCBNWLg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="172"
        height="24"
        viewBox="0 0 172 24"
        fill="none"
      >
        <path
          d="M8.85828 23.86C7.47773 23.86 6.1944 23.6 5.00828 23.08C3.84162 22.56 2.83051 21.84 1.97495 20.92C1.13884 19.98 0.52634 18.89 0.137451 17.65L3.43328 16.18C3.95828 17.46 4.71662 18.47 5.70828 19.21C6.69995 19.93 7.81801 20.29 9.06245 20.29C9.76245 20.29 10.3652 20.18 10.8708 19.96C11.3958 19.72 11.7944 19.4 12.0666 19C12.3583 18.6 12.5041 18.12 12.5041 17.56C12.5041 16.9 12.3097 16.36 11.9208 15.94C11.5513 15.5 10.9874 15.16 10.2291 14.92L6.05828 13.54C4.36662 13 3.09301 12.19 2.23745 11.11C1.3819 10.03 0.954118 8.76001 0.954118 7.30001C0.954118 6.02001 1.25551 4.89001 1.85828 3.91001C2.48051 2.93001 3.33606 2.17 4.42495 1.63C5.53328 1.07 6.79717 0.790009 8.21662 0.790009C9.51939 0.790009 10.7152 1.03 11.8041 1.51C12.893 1.97 13.8263 2.62001 14.6041 3.46001C15.4013 4.28001 15.9944 5.25 16.3833 6.37L13.1166 7.87001C12.6888 6.75001 12.0472 5.89001 11.1916 5.29001C10.3361 4.67001 9.34439 4.36001 8.21662 4.36001C7.55551 4.36001 6.97217 4.48 6.46662 4.72C5.96106 4.94 5.56245 5.26001 5.27078 5.68001C4.99856 6.08001 4.86245 6.56001 4.86245 7.12001C4.86245 7.74001 5.0569 8.29001 5.44578 8.77001C5.83467 9.23001 6.42773 9.59001 7.22495 9.85001L11.2208 11.14C12.9513 11.72 14.2444 12.52 15.0999 13.54C15.9749 14.56 16.4125 15.82 16.4125 17.32C16.4125 18.6 16.0916 19.73 15.45 20.71C14.8083 21.69 13.9236 22.46 12.7958 23.02C11.668 23.58 10.3555 23.86 8.85828 23.86ZM30.6883 23.86C29.0939 23.86 27.6064 23.57 26.2258 22.99C24.8453 22.41 23.6397 21.6 22.6092 20.56C21.5787 19.52 20.7717 18.3 20.1884 16.9C19.6245 15.48 19.3426 13.95 19.3426 12.31C19.3426 10.65 19.6245 9.12001 20.1884 7.72001C20.7523 6.32001 21.5495 5.1 22.5801 4.06C23.6105 3.02 24.8161 2.22001 26.1966 1.66001C27.5772 1.08001 29.0744 0.790009 30.6883 0.790009C32.3022 0.790009 33.7994 1.08001 35.18 1.66001C36.5605 2.24001 37.7661 3.05001 38.7966 4.09001C39.8272 5.11001 40.6244 6.32001 41.1883 7.72001C41.7716 9.12001 42.0633 10.65 42.0633 12.31C42.0633 13.95 41.7716 15.48 41.1883 16.9C40.605 18.3 39.798 19.52 38.7675 20.56C37.7369 21.6 36.5314 22.41 35.1508 22.99C33.7897 23.57 32.3022 23.86 30.6883 23.86ZM30.6883 20.14C31.7578 20.14 32.7397 19.95 33.6341 19.57C34.5286 19.17 35.3064 18.62 35.9675 17.92C36.648 17.22 37.1633 16.39 37.5133 15.43C37.8828 14.47 38.0675 13.43 38.0675 12.31C38.0675 11.19 37.8828 10.16 37.5133 9.22C37.1633 8.26 36.648 7.43001 35.9675 6.73001C35.3064 6.01001 34.5286 5.46001 33.6341 5.08001C32.7397 4.70001 31.7578 4.51001 30.6883 4.51001C29.6383 4.51001 28.6661 4.70001 27.7716 5.08001C26.8772 5.46001 26.0897 6.01001 25.4092 6.73001C24.748 7.43001 24.2328 8.26 23.8633 9.22C23.4939 10.16 23.3092 11.19 23.3092 12.31C23.3092 13.43 23.4939 14.47 23.8633 15.43C24.2328 16.39 24.748 17.22 25.4092 17.92C26.0897 18.62 26.8772 19.17 27.7716 19.57C28.6661 19.95 29.6383 20.14 30.6883 20.14ZM55.7989 23.86C54.2433 23.86 52.8044 23.57 51.4822 22.99C50.1794 22.41 49.0322 21.6 48.0405 20.56C47.0683 19.52 46.31 18.3 45.7655 16.9C45.2211 15.5 44.9489 13.97 44.9489 12.31C44.9489 10.65 45.2114 9.12001 45.7364 7.72001C46.2808 6.30001 47.0391 5.08 48.0114 4.06C49.003 3.02 50.16 2.22001 51.4822 1.66001C52.8044 1.08001 54.2433 0.790009 55.7989 0.790009C57.3544 0.790009 58.7447 1.06001 59.9697 1.60001C61.2141 2.14001 62.2641 2.86001 63.1197 3.76001C63.9753 4.64001 64.5878 5.61001 64.9572 6.67001L61.3989 8.38001C60.9905 7.26001 60.3003 6.34001 59.328 5.62001C58.3558 4.88001 57.1794 4.51001 55.7989 4.51001C54.4378 4.51001 53.2322 4.84001 52.1822 5.50001C51.1516 6.16001 50.3447 7.07 49.7614 8.23C49.1975 9.39 48.9155 10.75 48.9155 12.31C48.9155 13.87 49.1975 15.24 49.7614 16.42C50.3447 17.58 51.1516 18.49 52.1822 19.15C53.2322 19.81 54.4378 20.14 55.7989 20.14C57.1794 20.14 58.3558 19.78 59.328 19.06C60.3003 18.32 60.9905 17.39 61.3989 16.27L64.9572 17.98C64.5878 19.04 63.9753 20.02 63.1197 20.92C62.2641 21.8 61.2141 22.51 59.9697 23.05C58.7447 23.59 57.3544 23.86 55.7989 23.86ZM68.1777 23.5V1.15001H72.1444V23.5H68.1777ZM74.5445 23.5L82.0404 1.15001H87.1737L94.6695 23.5H90.3529L88.807 18.7H80.407L78.832 23.5H74.5445ZM81.5445 15.1H87.6695L84.0529 3.97001H85.1612L81.5445 15.1ZM97.0879 23.5V1.15001H101.055V19.9H110.359V23.5H97.0879ZM112.924 23.5V1.15001H116.891V23.5H112.924ZM119.379 23.5V20.29L129.908 4.75001H119.992V1.15001H134.954V4.36001L124.454 19.9H135.246V23.5H119.379ZM137.733 23.5V1.15001H152.171V4.75001H141.7V10.48H151.587V14.08H141.7V19.9H152.171V23.5H137.733ZM155.08 23.5V1.15001H163.159C164.636 1.15001 165.939 1.43001 167.067 1.99001C168.214 2.53001 169.109 3.33 169.75 4.39C170.392 5.43 170.713 6.70001 170.713 8.20001C170.713 9.74001 170.353 11.05 169.634 12.13C168.934 13.21 167.981 14.01 166.775 14.53L171.763 23.5H167.271L161.934 13.69L164.5 15.25H159.046V23.5H155.08ZM159.046 11.65H163.217C163.936 11.65 164.559 11.51 165.084 11.23C165.609 10.93 166.017 10.52 166.309 10C166.6 9.48 166.746 8.88001 166.746 8.20001C166.746 7.50001 166.6 6.90001 166.309 6.40001C166.017 5.88001 165.609 5.48001 165.084 5.20001C164.559 4.90001 163.936 4.75001 163.217 4.75001H159.046V11.65Z"
          fill="black"
        />
      </svg>
    </Logo>
  </Header>
);
