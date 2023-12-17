const BoxIcon = styled.div`
width: 60px;
height: 60px;
border-radius: 14px;
background: #9DC4F8;
padding:10px;
cursor:pointer;

`;
const BoxCallIcon = styled.div`
width: 60px;
height: 60px;
border-radius: 14px;
background: #F77A88;
padding:10px;
cursor:pointer;
`;

const tapBar = (
  <div
    style={{
      display: "flex",
      gap: "14px",
      backgroundColor: "white",
      borderRadius: "25px",
      boxShadow: "5px 4px 20px 0px rgba(0, 0, 0, 0.15)",
      backdropFilter: "blur(3.5px)",
      padding: "10px",
      maxWidth: "228px",
    }}
  >
    <div>
      <BoxIcon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M26.2504 7.49999C26.2503 6.3377 26.6551 5.21168 27.3953 4.31552C28.1355 3.41937 29.1647 2.80907 30.3061 2.58956C31.4475 2.37005 32.6297 2.55503 33.6494 3.11271C34.6692 3.67039 35.4628 4.56592 35.8939 5.64534C36.3249 6.72476 36.3664 7.92062 36.0113 9.02733C35.6561 10.134 34.9265 11.0825 33.9479 11.7095C32.9692 12.3366 31.8027 12.6031 30.6489 12.4633C29.495 12.3234 28.4259 11.786 27.6254 10.9433L13.5904 18.7417C13.8048 19.5668 13.8048 20.4331 13.5904 21.2583L27.6254 29.0567C28.4641 28.1748 29.5957 27.6291 30.808 27.522C32.0203 27.4148 33.2301 27.7534 34.2106 28.4745C35.191 29.1955 35.8748 30.2493 36.1338 31.4385C36.3928 32.6276 36.2092 33.8704 35.6174 34.9339C35.0256 35.9973 34.0663 36.8084 32.9192 37.2151C31.7721 37.6218 30.5161 37.5962 29.3866 37.143C28.2571 36.6898 27.3316 35.8403 26.7837 34.7535C26.2358 33.6668 26.1031 32.4176 26.4104 31.24L12.3754 23.4433C11.6868 24.1683 10.7967 24.6702 9.81997 24.8842C8.84326 25.0981 7.82483 25.0144 6.89621 24.6436C5.9676 24.2729 5.17146 23.6323 4.61062 22.8046C4.04978 21.9768 3.75 20.9999 3.75 20C3.75 19.0001 4.04978 18.0232 4.61062 17.1954C5.17146 16.3677 5.9676 15.7271 6.89621 15.3563C7.82483 14.9856 8.84326 14.9019 9.81997 15.1158C10.7967 15.3298 11.6868 15.8317 12.3754 16.5567L26.4104 8.75833C26.3039 8.34738 26.2501 7.92453 26.2504 7.49999Z"
            fill="white"
          />
        </svg>
      </BoxIcon>
    </div>
    <div onClick={() => props.processCallContract()}>
      <BoxCallIcon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3.75 20C3.75 11.025 11.025 3.75 20 3.75C28.975 3.75 36.25 11.025 36.25 20C36.25 28.975 28.975 36.25 20 36.25C11.025 36.25 3.75 28.975 3.75 20ZM27.1233 18.3617C27.4153 18.5242 27.6585 18.7617 27.8279 19.0498C27.9972 19.3378 28.0865 19.6659 28.0865 20C28.0865 20.3341 27.9972 20.6622 27.8279 20.9502C27.6585 21.2383 27.4153 21.4758 27.1233 21.6383L17.785 26.8267C17.4996 26.9851 17.1779 27.0662 16.8516 27.0622C16.5252 27.0581 16.2056 26.9689 15.9243 26.8034C15.643 26.6379 15.4098 26.4019 15.2477 26.1186C15.0855 25.8354 15.0002 25.5147 15 25.1883V14.8117C15 13.3833 16.535 12.4783 17.785 13.1733L27.1233 18.3617Z"
            fill="white"
          />
        </svg>
      </BoxCallIcon>
    </div>
    <div style={{ cursor: "pointer" }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill="none"
      >
        <rect width="60" height="60" rx="14" fill="#9DC4F8" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M16 18C16 15.7899 17.8044 14 20.0278 14H40.9722C43.1977 14 45 15.792 45 18V42C45 44.208 43.1956 46 40.9722 46H20.0278C18.9595 46 17.9351 45.5786 17.1797 44.8284C16.4244 44.0783 16 43.0609 16 42V18ZM22.4444 23.6C22.4444 23.1757 22.6142 22.7687 22.9163 22.4686C23.2185 22.1686 23.6283 22 24.0556 22H24.0727C24.5 22 24.9098 22.1686 25.212 22.4686C25.5141 22.7687 25.6839 23.1757 25.6839 23.6V23.6171C25.6839 24.0414 25.5141 24.4484 25.212 24.7484C24.9098 25.0485 24.5 25.2171 24.0727 25.2171H24.0556C23.6283 25.2171 23.2185 25.0485 22.9163 24.7484C22.6142 24.4484 22.4444 24.0414 22.4444 23.6171V23.6ZM27.2778 23.6C27.2778 23.1757 27.4475 22.7687 27.7497 22.4686C28.0518 22.1686 28.4616 22 28.8889 22H36.9444C37.3717 22 37.7815 22.1686 38.0837 22.4686C38.3858 22.7687 38.5556 23.1757 38.5556 23.6C38.5556 24.0243 38.3858 24.4313 38.0837 24.7314C37.7815 25.0314 37.3717 25.2 36.9444 25.2H28.8889C28.4616 25.2 28.0518 25.0314 27.7497 24.7314C27.4475 24.4313 27.2778 24.0243 27.2778 23.6ZM22.4444 30C22.4444 29.5757 22.6142 29.1687 22.9163 28.8686C23.2185 28.5686 23.6283 28.4 24.0556 28.4H24.0727C24.5 28.4 24.9098 28.5686 25.212 28.8686C25.5141 29.1687 25.6839 29.5757 25.6839 30V30.0171C25.6839 30.4414 25.5141 30.8484 25.212 31.1484C24.9098 31.4485 24.5 31.6171 24.0727 31.6171H24.0556C23.6283 31.6171 23.2185 31.4485 22.9163 31.1484C22.6142 30.8484 22.4444 30.4414 22.4444 30.0171V30ZM27.2778 30C27.2778 29.5757 27.4475 29.1687 27.7497 28.8686C28.0518 28.5686 28.4616 28.4 28.8889 28.4H36.9444C37.3717 28.4 37.7815 28.5686 38.0837 28.8686C38.3858 29.1687 38.5556 29.5757 38.5556 30C38.5556 30.4243 38.3858 30.8313 38.0837 31.1314C37.7815 31.4314 37.3717 31.6 36.9444 31.6H28.8889C28.4616 31.6 28.0518 31.4314 27.7497 31.1314C27.4475 30.8313 27.2778 30.4243 27.2778 30ZM22.4444 36.4C22.4444 35.9757 22.6142 35.5687 22.9163 35.2686C23.2185 34.9686 23.6283 34.8 24.0556 34.8H24.0727C24.5 34.8 24.9098 34.9686 25.212 35.2686C25.5141 35.5687 25.6839 35.9757 25.6839 36.4V36.4171C25.6839 36.8414 25.5141 37.2484 25.212 37.5484C24.9098 37.8485 24.5 38.0171 24.0727 38.0171H24.0556C23.6283 38.0171 23.2185 37.8485 22.9163 37.5484C22.6142 37.2484 22.4444 36.8414 22.4444 36.4171V36.4ZM27.2778 36.4C27.2778 35.9757 27.4475 35.5687 27.7497 35.2686C28.0518 34.9686 28.4616 34.8 28.8889 34.8H36.9444C37.3717 34.8 37.7815 34.9686 38.0837 35.2686C38.3858 35.5687 38.5556 35.9757 38.5556 36.4C38.5556 36.8243 38.3858 37.2313 38.0837 37.5314C37.7815 37.8314 37.3717 38 36.9444 38H28.8889C28.4616 38 28.0518 37.8314 27.7497 37.5314C27.4475 37.2313 27.2778 36.8243 27.2778 36.4Z"
          fill="white"
        />
      </svg>
    </div>
  </div>
);
return <>{tapBar}</>;
