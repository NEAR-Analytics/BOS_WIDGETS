const activeLink = props.activeLink;
const navData ={
    navMode:"light",
    logoHref : "https://wireframes.design",
    companyName:"Wireframes",
    isToggle:true,
    navStyle:{
      background:"white",
      boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
    },
    inlineStyle:{
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        fontFamily:"Exo"
    },
    menuInlineStyle:{
      fontSize:"20px",
      fontWeight:"500",
      textDecoration:"none"
    },
    linksData:[{
      menuHref : "/embed/v1.wireframes.near/widget/Pages.ButtonIndex",
      menuName : "Button",
  },{
    menuHref : "/embed/v1.wireframes.near/widget/Pages.CardIndex",
    menuName : "Card",
},{
  menuHref : "/embed/v1.wireframes.near/widget/Pages.IconIndex",
  menuName : "Icon",

},{
    menuHref : "/embed/v1.wireframes.near/widget/Pages.LayoutIndex",
    menuName : "Layout",

}]

  };


  return(
    <>
     <Widget
        src={`v1.wireframes.near/widget/Components.Navigations.Navbar`}
        props={navData}
      />
      </>
  )