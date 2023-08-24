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
let imgurl;
let header;
let subHeader;
let description;
let amount;
let participants;

props.projectDetails.map((projectDetail, index) => {
  imgurl = projectDetail[index][0];
  header = projectDetail[index][1];
  subHeader = projectDetail[index][2];
  description = projectDetail[index][3];
  amount = projectDetail[index][4];
  participants = projectDetail[index][5];
});
return (
  <ProjectCardContainer>
    <ProjectCardImageContainer>
      <img class="project-img" src={imgurl} />
    </ProjectCardImageContainer>
    <ProjectCardDetails>
      <h3>{header}</h3>
      <h6 class="sub-header">{subHeader}</h6>
      <p>{description}</p>
      <div class="line"></div>

      <div>
        <span class="span-txt">Total raised</span>
        <span class="span-dot">
          ...............................................................................................
        </span>
        <span class="span-txt">${amount}</span>
      </div>
      <div>
        <span class="span-txt">Participants</span>
        <span class="span-dot">
          ..................................................
        </span>
        <span class="span-txt">{participants}</span>
      </div>
    </ProjectCardDetails>
    <div>
      <p>Token Sale</p>
    </div>
  </ProjectCardContainer>
);
