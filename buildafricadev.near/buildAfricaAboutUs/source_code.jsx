const About = styled.div`
#about{
    margin-top: 80px;
    background-color: rgb(255, 255, 255);
    padding: 60px 0;
}

#about-container{
    width: 70%;
    margin-left: 15%;
}

#about-head h1{
    font-size: 2.3rem;
    font-weight: 300;
    line-height: 1.1;
    color: rgb(7, 7, 7);
    margin-bottom: 20px;
}

#about-head p{
    font-size: 1.25rem;
    color: #111111;
    margin-bottom: 20px;
}

#funture-container{
    background-color: rgb(229, 229, 229);
    padding: 0 20px 20px 20px;
}

.about-flex h2{
    font-size: 1.5rem;
    line-height: 1.2;
    color: rgb(17, 17, 17);
    padding-top: 20px;
}

.about-flex p{
    margin-top: 20px;
    line-height: 2;
}

/*  setting media query  */
@media only screen and (min-width: 750px) {
    #about-head p{
       margin-right: 25%;
       margin-bottom: 30px;
    }

    #about-container{
        width: 90%;
        margin-left: 5%;
    }

    #funture-container{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;  
    }

    .about-flex{
        width: 45%;
    }

    .about-flex p{
        font-size: 16px;
    }
}
`;

return (
  <>
    <About id="about">
      <div id="about-container">
        <div id="about-head">
          <h1>About</h1>
          <p>
            BuidlAfrica is an ecosystem of African buidl communities building
            for the openweb.{" "}
          </p>
        </div>
        <div id="funture-container">
          <div className="about-flex">
            <h2>Primary Objective</h2>
            <p>
              Our primary objective is to successfully onboard, train and retain
              active buidl communities outside the the web3 ecosystem in Africa,
              starting with Nigeria. This is with a particular emphasis on
              fostering a thriving developer and builder community of Africans
              in the web3 ecosystem.
            </p>
          </div>
          <div className="about-flex">
            <h2>Outcome</h2>
            <p>
              By following this comprehensive onboarding approach, we ensure
              that our efforts go beyond mere community onboarding. Instead, we
              are actively onboarding and nurturing trained communities,
              creating a sustainable and impactful ecosystem for web3 coming out
              of Africa, starting with Nigeria.
            </p>
          </div>
        </div>
      </div>
    </About>
  </>
);
