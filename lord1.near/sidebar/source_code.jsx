const styles = props.styles || {};
const bootstrapClassName = props.className || "";
const activeSidebarIcon = props.activeIcon || "";
State.init({
  wichPage: 0,
  showFullSide: false,
});
let a = 0;

const pageHandler = (target) => {
  State.update({
    wichPage: target,
  });
  a = target;
};

const sidebarHandler = () => {
  State.update({
    showFullSide: !state.showFullSide,
  });
};

const X = styled.div` cursor:pointer;
border-left:5px solid #fff;

>div {
  margin-left: -5px
}

`;
const SideBarBody = styled.div`
visibility : ${state.showFullSide ? "visible" : "hidden"};
opacity : ${state.showFullSide ? "1" : "0"};
position:absolute;
min-height : 80vh;
background: ${props.backgroundColor};
display: flex;
z-index:10;
justify-content: space-between;
flex-direction:column;
align-items: center;
align-self: stretch;
border-radius:15px;
transition:500ms all;
-webkit-box-shadow: 0px 0px 14px -1px rgba(0, 0, 0, 0.8);
  box-shadow: 0px 0px 20px -1px rgba(210, 200, 250, 100);
width:${state.showFullSide ? "150px" : "0"};

@media (min-width: 576px) {
width:${state.showFullSide ? "150px" : "80px"};
visibility : visible;
opacity : 1;
position:relative;
}
`;
const SidebarItems = styled.div`
 align-items:"center";
justify-content:spacce-between;
`;
const SidebarItem = styled.div` text-align:center;
margin:1rem 0;
alignItems:center;
width:${state.showFullSide ? "150px" : "80px"};
justify-content:${state.showFullSide ? "flex-start" : "center"};
flex-direction:row;
display:flex;
padding-left:${state.showFullSide ? "1rem" : "0"};

&:hover {

  transition: 500ms all;
  cursor: pointer;
  border-left: 5px solid #fff;
}

a {
  color: ${props.textcolor};
}

a:hover {
  text-decoration: none;

}

a>div>span {
  display: ${state.showFullSide ? "inline" : "none"};

}

`;

const GrowSidebarBtn = styled.div` 
transition:500ms all;

position:absolute;
right:${state.showFullSide ? "calc(-2rem - 150px)" : "-3rem"};
border-radius:50%;
background-color:#fff;
overflow:hidden;
width:35px;
height : 35px;
display:flex;
align-items:center;
justify-content:center;
cursor:pointer;
top:1rem;
box-shadow: 0px 0px 20px -1px rgba(210, 200, 250, 100);
z-index: 11;

@media (min-width: 576px) {
right:-12px;
top : 10vh;
width:25px;
height : 25px;
}
`;
return (
  <div
    style={{ zIndex: 5, ...styles }}
    className={`position-sticky top-0 ${bootstrapClassName}`}
  >
    <GrowSidebarBtn onClick={sidebarHandler}>
      {!state.showFullSide ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 448 512"
        >
          <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 448 512"
        >
          <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
        </svg>
      )}
    </GrowSidebarBtn>
    <SideBarBody>
      <SidebarItems>
        <SidebarItem>
          <a href="https://flipsidecrypto.xyz/" target="_blank">
            <div>
              <img
                width="50"
                height="50"
                src={props.headerIcon}
                style={{
                  "box-shadow": "0 0px 20px rgba(1300, 60, 231, 20)",
                  "border-radius": "250px",
                }}
              />
              <span> {props.headerText}</span>
            </div>
          </a>
        </SidebarItem>
      </SidebarItems>
      <SidebarItems>
        {props.links.map((data, index) => {
          return (
            <>
              {data.text === activeSidebarIcon ? (
                <X>
                  <SidebarItem onClick={() => pageHandler(0)}>
                    <a href={data.link}>
                      <div>
                        <img width="31" height="30" src={data.image} />
                        <span> {data.text}</span>
                      </div>
                    </a>
                  </SidebarItem>
                </X>
              ) : (
                <SidebarItem onClick={() => pageHandler(0)}>
                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>{data.title}</Tooltip>}
                  >
                    <a href={data.link}>
                      <div>
                        <img width="31" height="30" src={data.image} />
                        <span> {data.text}</span>
                      </div>
                    </a>
                  </OverlayTrigger>
                </SidebarItem>
              )}
            </>
          );
        })}
      </SidebarItems>
      <SidebarItems>
        <SidebarItem>
          <a href="test">
            <div>
              <img width="31" height="30" src={props.footerIcon} />
              <span> {props.footerText}</span>
            </div>
          </a>
        </SidebarItem>
      </SidebarItems>
    </SideBarBody>
  </div>
);
