const Gradient = styled.div`
   {
    margin-top: -25px;
    margin-bottom: 25px;
    height: ${props.height};
    text-align: ${props.align};
    background: ${props.background};
    padding-left:5%;
    padding-right:5%;
    font-family: ${props.fontbrand};
  }

  .text-primary-gradient {
    -webkit-text-fill-color: transparent;
    background-image: linear-gradient(${props.color1brand}, ${props.color2brand} );
    -webkit-background-clip: text;
    background-clip: text;
  }

  .subtitle-above {
    font-size: 18px;
    letter-spacing: 1px;
    font-family:${props.fontsubtitle};
  }

  .subtitle-below {
    font-size: 16px;
  }

  .slogan {
    font-weight: ${props.fontweight} ;
    font-size:${props.fontsize}  ;
    color: ${props.afterbrandcolor} 
  }
`;
let header = (
  <Gradient
    className="d-flex flex-column justify-content-center"
    style={{ "border-radius": "15px", "margin-top": "10px" }}
  >
    <h1 class="mb-3 slogan">
      <span></span>
      <span class="text-primary-gradient">{props.brand}</span>
      {props.afterbrand}
    </h1>
    <div class="subtitle-above" style={{ color: `${props.colordescription}` }}>
      {props.description}
    </div>
  </Gradient>
);

return <div>{header}</div>;

//{
//  "height": "150px",
//  "align": "left",
//  "description": "Access the most reliable blockchain data, for free. Discover analyses on leading protocols from expert analysts.",
//  "brand": "Flipside",
//  "fontsize": "400",
//  "fontweight": "30px",
//  "afterbrand": "Crypto",
//  "afterbrandcolor": "#789efb",
//  "fontbrand": " Arial, sans-serif",
//  "color1brand": "#000",
//  "color2brand": "#789efb",
//  "colordescription": "#789efb",
//  "fontsubtitle": "Courier, monospace",
//  "background": "radial-gradient(circle, rgba(210,202,250,1) 0%, rgba(230,230,231,0.01) 0%, rgba(235,238,255,1) 100%, rgba(8,38,7,1) 100%, rgba(255,241,241,1) 100%, rgba(46,52,90,1) 100%);"
//}
