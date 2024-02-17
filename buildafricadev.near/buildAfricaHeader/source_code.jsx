const Header = styled.div`
*{
    text-decoration: none;
    list-style-type: none;
}
 *:hover{
    text-decoration: none;
 }

#header-container{
    background-color: rgba(246, 227, 219, 1);
    padding: 20px 0;
}

#header{
    width: 90%;
    margin-left: 5%;  
}

#heading{
    text-align: center;
}

#heading h1{
    font-size: 2em;
    line-height: 1.2;
    margin-bottom: 0.4em;
    font-weight: 700;
} 

#text{
    font-size: 1.1em;
    line-height: 1.4;
    text-align: center;
    color: #3d3d3d;
    z-index: 0;
}

#link {
    margin-top: 20px;
}

#link ul li{
    text-align: center;
    padding: 20px 0;
    margin-bottom: 20px;
    border-radius: 10px;
    border: 3px solid black;
    box-shadow: 4px 6px 0 0 #000000;
    transition: .2s ease;
    color: rgb(21, 19, 19)
}

#link ul li a{
    color: rgb(21, 19, 19)
}

#link ul li:hover{
    transform: translate(0, -6px);
}

#link ul li:last-child{
    background-color: #f6f6f6;
   
}

#link ul li a{
    font-size: 16px;
    font-weight: 700;
    text-transform: capitalize;
}

/*  setting media query  */

@media only screen and (min-width: 750px) {
    #header{
        width: 80%;
        margin-left: 10%;
        margin-top: 110px;
    }

    #heading h1{
        font-size: 4.6em;
        line-height: 1.2;
        margin-bottom: 0.4em;
        font-weight: 700;
    } 

    #link ul{
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: center;
    }

    #link ul li{
        padding: 20px 40px;
        margin: 15px 0.5em;
    }
}
`;

return (
  <>
    <Header>
      <div id="header-container">
        <div id="header">
          <div id="heading">
            <h1>Supercharging African Communities Building for the OpenWeb</h1>
          </div>
          <div id="text">
            <p>
              Experience the future of the openweb through the African lens.
            </p>
          </div>
          <div id="link">
            <ul>
              <li>
                <a href="#">get started now</a>
              </li>
              <li>
                <a href="#">Discover Our Buidl Communities</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Header>
  </>
);
