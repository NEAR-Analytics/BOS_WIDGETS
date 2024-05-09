const Crafted = styled.div`
*{
    text-decoration: none;
    list-style-type: none;
}

#crafted{
    padding: 4em 0;
    background-color: rgba(246, 227, 219, 1);
}

#crafting{
    text-align: center;
    width: 80%;
    margin-left: 10%;
}

#crafting h1{
    font-size: 2em;
    line-height: 1.2;
    margin-bottom: 0.3em;
    font-weight: 600;
}

#text{
    width: 80%;
    margin-left: 10%; 
}

#text p{
    font-size: 1.1em;
    line-height: 1.4;
    opacity: 0.9;
    color: #3d3d3d;
    font-weight: 200;
    padding: 10px 0;
    text-align: center;
}

#mars_type{
    width: 80%;
    margin-left: 10%; 
}

#mars_type ul li {
    margin: 2em 0;
}

#mars_type ul li div .range{
    display: flex;
    flex-direction: row;
    align-items: baseline;
}

#mars_type ul li div .range h1{
    font-size: 35px;
    font-weight: 700;
}

#mars_type ul li div .range span{
    vertical-align: baseline;
    margin-left: 15px;
    font-size: 16px;
    font-weight: 200;
}

#mars_type ul li div .base_line{
    width: 40px;
    font-size: 16px;
    line-height: 1.15;
    height: 3px;
    background-color: rgba(240, 190, 178, 1);
    margin-top: 10px;
}

#mars_type ul li div .text{
    margin: 20px 0;
    color: #3d3d3d;
    font-weight: 200;
}

/*  setting media query  */
@media only screen and (min-width: 750px) {
    #crafting{
        width: 60%;
        margin-left: 20%;
    }
    
    #crafting h1{
        font-size: 4.2em;
    }

    #text{
        width: 60%;
        margin-left: 20%; 
    }

    #mars_type ul{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    #mars_type ul li{
        width: 30%;
    }

    #mars_type ul li div .range h1{
        font-size: 40px;
    }
}
`;

return (
  <>
    <Crafted>
      <div id="crafted">
        <div id="crafting">
          <h1>Crafted by Builders for Builders</h1>
        </div>
        <div id="text">
          <p>
            Experience Africans building the dots that connects web2 and Web3.
          </p>
        </div>
        <div id="mars_type">
          <ul>
            <li>
              <div>
                <div className="range">
                  <h1>Onboard</h1>
                  {/* <span>Identification and Mapping</span> */}
                </div>
                <div className="base_line"></div>
                <div className="text">
                  <p>
                    Identification, mapping and onboarding of active web2 buidl
                    communities in Africa into web3.
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div>
                <div className="range">
                  <h1>Training</h1>
                  {/* <span>3-4 weeks Educational Program (3-4 Weeks).</span> */}
                </div>
                <div className="base_line"></div>
                <div className="text">
                  <p>
                    3-4 weeks Program designed to equip builders with the
                    necessary skills and knowledge to engage effectively with
                    Near's technology and opportunities.
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div>
                <div className="range">
                  <h1>Integration</h1>
                  {/* <span>Grants and Ecosystem access</span> */}
                </div>
                <div className="base_line"></div>
                <div className="text">
                  <p>
                    {" "}
                    Facilitate the seamless integration of onboarded communities
                    into the web3 and Near ecosystem. This involves providing
                    access to funds and resources through the necessary funding
                    channels on Near.
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Crafted>
  </>
);
