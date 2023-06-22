const ownerId = "williamxx.near";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: nowrap;
  gap: 2em;
  background: #fff;
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  h2 {
    font-family: "FK Grotesk";
    font-style: normal;
    font-weight: 500;
    font-size: 2em;
    line-height: 1.4em;
    color: #000000;
  }
`;

const Tracks = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  flex-wrap: wrap;
  width: 100%;

  @media screen and (max-width: 768px) {
    gap: 1em;
  }

  div {
    width: 100%;
    margin: 0;
  }

  @media (min-width: 768px) {
    div {
      width: 48%;
    }
  }

  @media (min-width: 1024px) {
    div {
      width: 24%;
    }
  }
`;

return (
  <Container>
    <Title>
      <h2></h2>
      {/*<Widget
        src={`${ownerId}/widget/Home.BlackButton`}
        props={{ text: "View Full Schedule" }}
      />*/}
    </Title>
    <Tracks>
      <Widget
        src={`${ownerId}/widget/Home.TrackCard`}
        props={{
          icon: (
            <svg
              width="56"
              height="56"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M49.5,17.3C47.2,7.8,37.2,2,26.2,2C12.8,2,2,12.7,2,26s10.8,24,24.2,24c18.6,0,17.1-9.4,11.2-13.1  c-3.5-2.2-5.4-7.3-1.9-10.9C42,19.3,52.5,30,49.5,17.3z M13,34c-2.8,0-5-2.2-5-5s2.2-5,5-5s5,2.2,5,5S15.8,34,13,34z M14,15  c0-2.8,2.2-5,5-5s5,2.2,5,5s-2.2,5-5,5S14,17.8,14,15z M25,44c-2.8,0-5-2.2-5-5s2.2-5,5-5s5,2.2,5,5S27.8,44,25,44z M34,18  c-2.8,0-5-2.2-5-5s2.2-5,5-5s5,2.2,5,5S36.8,18,34,18z"
                fill="#91284F"
              />
            </svg>
          ),
          title: "Creative works",
          description: (
            <>
              Do you want to create more opportunities for your artist
              community? Creatives Constellation funds your projects,
              competitions, bounties to introduce more creators into NEAR.
            </>
          ),
          color: "#91284F",
        }}
      />
      <Widget
        src={`${ownerId}/widget/Home.TrackCard`}
        props={{
          icon: (
            <svg
              width="57"
              height="56"
              viewBox="0 0 57 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M28.2566 20.1786C33.8054 20.1786 38.3214 15.6516 38.3214 10.0893C38.3214 4.52702 33.8054 0 28.2566 0C22.7078 0 18.1917 4.52702 18.1917 10.0893C18.1917 15.6516 22.7078 20.1786 28.2566 20.1786ZM10.9187 26.434C14.5377 26.434 17.4828 23.4817 17.4828 19.854C17.4828 16.2262 14.5377 13.274 10.9187 13.274C7.29978 13.274 4.35471 16.2262 4.35471 19.854C4.35471 23.4817 7.29978 26.434 10.9187 26.434ZM45.2574 26.434C48.8764 26.434 51.8215 23.4817 51.8215 19.854C51.8215 16.2262 48.8764 13.274 45.2574 13.274C41.6384 13.274 38.6934 16.2262 38.6934 19.854C38.6934 23.4817 41.6384 26.434 45.2574 26.434ZM50.5743 29.316H40.9645C40.5751 26.548 38.2076 24.4161 35.337 24.4161H21.6094C18.7387 24.4161 16.3713 26.548 15.9818 29.316H5.93883C2.79685 29.316 0.25 31.869 0.25 35.0186V47.7092C0.25 48.5646 0.740115 49.3411 1.50592 49.7227C4.70042 51.3107 8.05245 52.6267 11.5314 53.6356C11.7896 53.7102 12.0565 53.5347 12.0871 53.2671L12.5816 49.42L14.3627 35.4705C14.4458 35.0888 14.7697 34.7862 15.181 34.7862H15.2204C15.588 34.7862 15.9162 35.1678 15.9162 35.7249V54.3594C15.9162 54.5699 16.065 54.7498 16.2663 54.7937C20.139 55.5789 24.1431 56 28.2478 56C32.3525 56 36.6717 55.5438 40.6889 54.7015C40.8902 54.6577 41.0389 54.4778 41.0389 54.2673V49.42V35.7249C41.0389 35.1722 41.3803 34.7862 41.761 34.7862H41.8047C42.2292 34.7862 42.5705 35.0844 42.6537 35.4705L44.8505 53.1311C44.8855 53.3987 45.1524 53.5786 45.4106 53.4996C48.732 52.5126 51.9352 51.2449 54.9897 49.7227C55.7555 49.3411 56.25 48.5646 56.25 47.7048V35.0143C56.25 31.8646 53.7032 29.3116 50.5612 29.3116L50.5743 29.316Z"
                fill="#17D9D4"
              />
            </svg>
          ),
          title: "Education",
          description: (
            <>
              We provides financial support for educational initiatives for
              Artists on the NEAR blockchain. This includes, but not limited to
              workshops, mentorship & training programs
            </>
          ),
          color: "#17D9D4",
        }}
      />
      <Widget
        src={`${ownerId}/widget/Home.TrackCard`}
        props={{
          icon: (
            <svg
              width="57"
              height="56"
              viewBox="0 0 57 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M48.1932 30.1863C52.5726 30.1863 56.0813 26.3801 55.5826 21.9001C55.2019 18.492 52.4501 15.7401 49.0419 15.3595C44.5619 14.8607 40.7557 18.3695 40.7557 22.7488C40.7557 22.9632 40.7688 23.1732 40.7863 23.3832L35.1557 24.897C34.4732 23.2345 33.3751 21.7863 31.9969 20.6795L35.8688 14.3576C37.0676 14.8257 38.4107 15.0051 39.8238 14.7645C43.0701 14.2045 45.6207 11.5051 45.9619 8.22822C46.4651 3.43322 42.3701 -0.578654 37.5444 0.0688461C34.2632 0.506346 31.6251 3.1576 31.1963 6.43885C30.8551 9.04197 31.8744 11.422 33.6332 12.9882L29.7613 19.3101C28.4444 18.7107 26.9832 18.3782 25.4432 18.3782C23.3694 18.3782 21.4357 18.9863 19.8038 20.0276L14.0594 13.1063C15.3938 11.527 16.0894 9.38322 15.7176 7.08635C15.2013 3.8926 12.5851 1.36385 9.37818 0.943846C4.52193 0.305096 0.409432 4.39135 1.00006 9.24322C1.39818 12.5245 4.01006 15.1932 7.28256 15.6701C9.02381 15.9238 10.6688 15.5607 12.0426 14.7776L17.7869 21.6988C16.0282 23.5757 14.9432 26.1001 14.9432 28.8738C14.9432 31.0482 15.6082 33.0651 16.7413 34.7451L12.5807 38.3851C11.1019 37.1995 9.16381 36.5651 7.07693 36.8013C3.72131 37.182 0.991307 39.8638 0.562557 43.2151C-0.0586933 48.0713 4.03631 52.1751 8.88818 51.567C12.0819 51.1688 14.6938 48.6838 15.2538 45.5163C15.5907 43.6176 15.1838 41.8282 14.3001 40.3626L18.4651 36.7182C20.3201 38.3676 22.7613 39.3738 25.4344 39.3738C27.7269 39.3738 29.8488 38.6345 31.5769 37.3788L37.8594 44.112C36.6694 45.6957 36.0876 47.7651 36.4988 49.9701C37.0544 52.9276 39.4126 55.3032 42.3701 55.8588C47.4319 56.8126 51.8244 52.5951 51.1813 47.577C50.7657 44.3526 48.2282 41.732 45.0213 41.2157C43.0788 40.9051 41.2501 41.3601 39.7801 42.3138L27.0576 28.9001C26.6769 28.502 26.6551 27.9901 26.9351 27.7232L26.9657 27.6926C27.2719 27.3995 27.7269 27.3776 28.0507 27.5963L34.5563 32.807C34.7882 32.9951 35.1338 32.8945 35.2432 32.6145C35.6894 31.4507 35.9388 30.1907 35.9388 28.8695C35.9388 28.3795 35.9038 27.8982 35.8382 27.4301L41.4688 25.912C42.6632 28.432 45.2226 30.182 48.1888 30.182L48.1932 30.1863Z"
                fill="#00EC97"
              />
            </svg>
          ),
          title: "Engagement",
          description: (
            <>
              Are you a leader of an artist community or aspiring to start an
              artist group? We support you in finding valuable resources on NEAR
              to foster meaningful engagement within your community.{" "}
            </>
          ),
          color: "#00EC97",
        }}
      />
      <Widget
        src={`${ownerId}/widget/Home.TrackCard`}
        props={{
          icon: (
            <svg
              width="57"
              height="56"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.417 9.57a7.917 7.917 0 1 1-8.144-7.908 1.758 1.758 0 0 1 .451 0 7.913 7.913 0 0 1 7.693 7.907zM5.85 15.838q.254.107.515.193a11.772 11.772 0 0 1-1.572-5.92h-3.08a6.816 6.816 0 0 0 4.137 5.727zM2.226 6.922a6.727 6.727 0 0 0-.511 2.082h3.078a11.83 11.83 0 0 1 1.55-5.89q-.249.083-.493.186a6.834 6.834 0 0 0-3.624 3.622zm8.87 2.082a14.405 14.405 0 0 0-.261-2.31 9.847 9.847 0 0 0-.713-2.26c-.447-.952-1.009-1.573-1.497-1.667a8.468 8.468 0 0 0-.253 0c-.488.094-1.05.715-1.497 1.668a9.847 9.847 0 0 0-.712 2.26 14.404 14.404 0 0 0-.261 2.309zm-.974 5.676a9.844 9.844 0 0 0 .713-2.26 14.413 14.413 0 0 0 .26-2.309H5.903a14.412 14.412 0 0 0 .261 2.31 9.844 9.844 0 0 0 .712 2.259c.487 1.036 1.109 1.68 1.624 1.68s1.137-.644 1.623-1.68zm4.652-2.462a6.737 6.737 0 0 0 .513-2.107h-3.082a11.77 11.77 0 0 1-1.572 5.922q.261-.086.517-.194a6.834 6.834 0 0 0 3.624-3.621zM11.15 3.3a6.82 6.82 0 0 0-.496-.187 11.828 11.828 0 0 1 1.55 5.89h3.081A6.815 6.815 0 0 0 11.15 3.3z"
                fill="#FF7966"
              />
            </svg>
          ),
          title: "Web2 to Web3",
          description: (
            <>
              Do you lead an established artist community and have a curiosity
              about the possibilities of blockchain in the art world? We support
              you in transitioning your community into a pioneering Web3
              community.
            </>
          ),
          color: "#FF7966",
        }}
      />
    </Tracks>
  </Container>
);
