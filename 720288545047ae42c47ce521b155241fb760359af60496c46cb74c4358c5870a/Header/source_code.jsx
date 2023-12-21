const ContentWarp = styled.div`
  background-color: #080d17;
  width: 100%;
  font-size: 14px;
  .header {
    display: flex;
    align-items: center;
    height: 60px;
    padding: 0 0.4rem;
    column-gap: 0.75rem;
    border-bottom: 1px solid #323232;
  }
  .logo {
    flex: none;
  }
  .nav {
    flex: 1 1 0%;
    display: flex;
    column-gap: 0.1rem;
    list-style: none;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      right: 0;
      height: 60px;
      width: 1px;
      overflow: hidden;
      background-color: #323232;
    }
  }

  .nav-link {
    color: #97969c;
    text-decoration: none;
    &.active,
    &:hover {
      color: #fff;
    }
  }
  .login {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .login-link {
    flex: none;
    color: #fff;
    width: 150px;
    height: 36px;
    line-height: 36px;
    text-decoration: none;
    border-radius: 10px;
    text-align: center;
    background-color: #617168;
  }
  .network-box {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #323232;
    border-radius: 10px;
    background-color: #252526;
    box-sizing: border-box;
    width: 36px;
    height: 36px;
    cursor: pointer;
  }
`;

const exUrl = "https://zksync.satori.finance/";

return (
  <>
    <ContentWarp>
      <div class="header">
        <div class="logo">
          <svg
            data-v-11a74a3f=""
            xmlns="http://www.w3.org/2000/svg"
            width="85"
            height="18"
            viewBox="0 0 85 18"
            fill="none"
          >
            <g clip-path="url(#clip0_7072_14335)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M83.8013 0H81.2371V2.76258H83.8013V0ZM83.7027 5.13056H81.3358V17.7592H83.7027V5.13056ZM32.4193 17.9574C36.9806 17.9574 39.3229 15.3922 39.3229 12.5804C39.3229 8.929 36.4627 8.04112 32.6416 7.52407C29.1159 7.05527 28.6473 5.99473 28.6473 4.93418C28.6473 3.7999 29.4859 2.36902 32.395 2.36902C35.2305 2.36902 36.2661 4.19423 36.2661 5.72334H38.6577C38.5838 2.91153 36.7098 0.198448 32.4445 0.198448C28.4255 0.198448 26.1079 2.36901 26.1079 5.08211C26.1079 8.0421 28.3516 9.44801 32.395 9.9413C35.797 10.3606 36.7588 11.1993 36.7588 12.7284C36.7588 14.0356 35.8218 15.7868 32.4193 15.7868C28.9428 15.7868 28.0296 13.3696 27.9811 11.6431H25.5156C25.5156 14.8497 27.6114 17.9574 32.4193 17.9574ZM45.8707 10.2163C45.4111 10.2323 44.9304 10.2489 44.4509 10.2854C42.0346 10.4579 39.9143 11.346 39.9145 14.2323C39.9145 16.3781 41.8625 17.9567 44.254 17.9567C46.5471 17.9567 48.2236 16.6987 48.9387 14.8242C48.9436 14.812 48.9485 14.799 48.9535 14.7856C48.9992 14.6643 49.0569 14.511 49.2345 14.5776C49.3732 14.6372 49.3356 14.7769 49.2904 14.945L49.2904 14.945C49.2795 14.9856 49.2681 15.0278 49.2587 15.0709C49.0359 15.7116 48.9874 16.0817 48.9874 16.5503V17.7595H51.3545V10.5566C51.3545 5.91955 48.7174 4.93298 45.881 4.93298C42.9716 4.93298 40.7526 6.19069 40.3087 9.07671H42.6264C42.799 7.84348 43.5633 7.00484 45.7823 7.00484C48.3712 7.00484 48.9632 8.0409 48.9874 9.07671C49.0069 10.1076 47.5852 10.1569 45.8707 10.2163ZM42.2811 14.1083C42.2811 12.9493 43.0702 12.4065 44.5988 12.1846C44.9381 12.1368 45.2705 12.0965 45.592 12.0577L45.5921 12.0576C47.093 11.8761 48.3576 11.7232 48.9877 10.9514C48.9632 14.1331 47.0892 15.539 45.166 15.7856C43.1194 16.057 42.2811 15.1196 42.2811 14.1083ZM56.2857 7.20242V13.8126C56.2857 15.2435 56.5814 15.6871 57.9623 15.6871H59.8351V17.7592H57.764C55.1506 17.7592 53.9179 16.7971 53.9179 14.0592V7.20242H51.5508V5.13054H53.9198V1.57856H56.2867V5.13054H59.8351V7.20242H56.2857ZM66.1478 17.9562C69.9695 17.9562 72.2624 15.0209 72.2624 11.4447C72.2624 7.86823 69.9695 4.93298 66.1478 4.93298C62.3262 4.93298 60.033 7.86774 60.033 11.4447C60.033 15.0217 62.3262 17.9562 66.1478 17.9562ZM66.1478 7.10355C68.5137 7.10355 69.8955 9.05198 69.8955 11.4447H69.8958C69.8958 13.8372 68.5149 15.7859 66.1478 15.7859C63.7808 15.7859 62.4001 13.8374 62.4001 11.4447C62.4001 9.05198 63.782 7.10355 66.1478 7.10355ZM75.666 7.84325C76.4549 5.82061 77.1691 4.93298 80.3505 4.93298V7.3502C76.6767 7.10355 75.6166 8.41075 75.6166 11.7156V17.7588H73.2497V5.13014H75.6166V5.96879C75.6166 6.48657 75.5681 6.8814 75.3453 7.62134C75.3427 7.63197 75.34 7.64259 75.3373 7.6532C75.3349 7.66238 75.3325 7.67155 75.3302 7.68068C75.2845 7.85672 75.242 8.02087 75.4195 8.06515C75.5421 8.08989 75.6161 7.96645 75.666 7.84325Z"
                fill="#fff"
              ></path>
              <path
                d="M2.17162 18L9.15527e-05 18L9.15225e-05 13.5469L7.66081 13.5469L7.66081 10.2768C7.66081 4.76622 12.0993 0.299458 17.5744 0.299458L20.6455 0.299458L20.6455 4.75123L12.086 4.75123L12.086 8.02137C12.0852 13.5328 7.64668 18 2.17162 18Z"
                fill="#fff"
              ></path>
            </g>
          </svg>
        </div>
        <ul class="nav">
          <li class="nav-item">
            <a
              class="nav-link"
              href={exUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Trade
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href={`${exUrl}portfolio/account`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Portfolio
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="https://docs.satori.finance/#introduction"
              target="_blank"
              rel="noopener noreferrer"
            >
              Docs
            </a>
          </li>
        </ul>
        <div class="network-box">
          <a href={exUrl} target="_blank" rel="noopener noreferrer">
            <svg
              width="20"
              viewBox="0 0 14 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              filter="invert(0)"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M14 3.92L10.066 0V2.87085L6.15997 5.74518L10.066 5.74789V7.84L14 3.92Z"
                fill="#fff"
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0 3.92L3.93396 7.84V4.99224L7.84 2.09479L3.93396 2.09211V0L0 3.92Z"
                fill="#fff"
              ></path>
            </svg>
          </a>
        </div>
        <div class="login">
          <a
            class="login-link"
            href={exUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Connect Wallet
          </a>
        </div>
      </div>
    </ContentWarp>
  </>
);
