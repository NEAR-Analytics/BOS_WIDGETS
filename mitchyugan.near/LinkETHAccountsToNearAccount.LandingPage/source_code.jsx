const LandingPage = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;700&display=swap');

    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .landingpagecontents{
        width: min(700px, 60%);
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 40px;

        .landingpagecontentstexts{
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
        }

        h1{
            color: #000;
            font-size: 55px;
            font-style: normal;
            font-weight: 700;
            line-height: 120%;
        }

        p{
            color: #000;
            font-size: 20px;
            font-style: normal;
            font-weight: 300;
            line-height: normal;
        }

        button{
            background: none;
            color: #0d6efd;
        }

        button:hover{
            background: #0d6efd;
            color: white;
        }
    }

    img{
        width: 500px;
    }
`;

return (
  <>
    <LandingPage>
      <div class="landingpagecontents">
        <div class="landingpagecontentstexts">
          <h1>Your EVM Gateway to the NEAR ecosystem</h1>
          <p>
            Seamlessly connect your ethereum wallets to a NEAR account securely
            and access multiple EVM chains
          </p>
        </div>
        <button>Get Started</button>
      </div>
      <img
        src="https://i.ibb.co/Rvfppv3/31133574-iso0101-ai-1.png"
        alt="31133574-iso0101-ai-1"
      />
    </LandingPage>
  </>
);
