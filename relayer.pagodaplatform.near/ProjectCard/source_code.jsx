const ProjectCardContainer = styled.div`
        border-radius: 12px;
// background: url(<path-to-image>), lightgray 50% / cover no-repeat;
background: var(--background-colour, #130B2B);
border-radius: 12px;
border: 1px solid #FFF;
background: #241842;

`;
const ProjectCardImageContainer = styled.div`
        margin-bottom: 20px;
        background-image: url("https://i.ibb.co/XVPkfnt/Frame-626790.png")
       width:100%;
        background-size: 100% auto;
        background-position: center;
        background-repeat: no-repeat;
        object-fit: cover;


        .project-img{
            width: 100%
        }
           
        

`;
const ProjectCardDetails = styled.div`

        margin: 0 20px;
    .sub-header{
        color: #FFC798;
        font-family: Open Sans;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px; /* 137.5% */
            }
            h3{
                color: var(--grey-1, #F8F8FA);

/* Bold text big semi bold */
font-family: Open Sans;
font-size: 20px;
font-style: normal;
font-weight: 600;
line-height: 28px; /* 140% */
            }
            p{
                color: #F2F2F2;

/* Bold text base regular */
font-family: Open Sans;
font-size: 16px;
font-style: normal;
font-weight: 400;
line-height: 22px; /* 137.5% */
            }
            .span-txt{
                color: #FFC798;
font-family: Open Sans;
font-size: 16px;
font-style: normal;
font-weight: 600;
line-height: 22px; /* 137.5% */
            }

            .line{
                width:100%;
                height:1px;
                background-color: #FFFFFF;
                margin: 16px 0;
            }
            .span-dot{
                color:#FFFFFF;
            }
`;
return (
  <ProjectCardContainer>
    <ProjectCardImageContainer>
      <img
        class="project-img"
        src="https://i.ibb.co/XVPkfnt/Frame-626790.png"
      />
    </ProjectCardImageContainer>
    <ProjectCardDetails>
      <h3>BrainWave</h3>
      <h6 class="sub-header">0.003 ETH</h6>
      <p>
        A start-up that uses neuroscience to develop AI algorithms for better
        decision-making.
      </p>
      <div class="line"></div>

      <div>
        <span class="span-txt">Total raised</span>
        <span class="span-dot">
          ...............................................................................................
        </span>
        <span class="span-txt">$3,003,212</span>
      </div>
      <div>
        <span class="span-txt">Participants</span>
        <span class="span-dot">
          ..................................................
        </span>
        <span class="span-txt">3498</span>
      </div>
    </ProjectCardDetails>
    <div>
      <p>Token Sale</p>
    </div>
  </ProjectCardContainer>
);
