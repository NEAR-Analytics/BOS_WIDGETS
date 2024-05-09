/* -------------------------------------------------------------------------- */
/*
 __        ___           __                               
 \ \      / (_)_ __ ___ / _|_ __ __ _ _ __ ___   ___  ___ 
  \ \ /\ / /| | '__/ _ \ |_| '__/ _` | '_ ` _ \ / _ \/ __|
   \ V  V / | | | |  __/  _| | | (_| | | | | | |  __/\__ \
    \_/\_/  |_|_|  \___|_| |_|  \__,_|_| |_| |_|\___||___/

  =========================================================
  * Wireframes - v1.0.0
  =========================================================
  * Product Page: https://wireframes.design
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

                                                                                 */
/* -------------------------------------------------------------------------- */

const logoStyle = {
  height: "50%",
  width: "100%",
};
const ourtPartnerProps = [
  {
    cardBody: (
      <>
        <img
          src="https://wireframes.design/wireframes-logo.png"
          alt="logo_image"
          style={logoStyle}
        />
      </>
    ),
    cardBodyStyle: {
      textAlign: "center",
      border: "none",
    },
  },
  {
    cardBody: (
      <>
        <img
          src="https://wireframes.design/wireframes-logo.png"
          alt="logo_image"
          style={logoStyle}
        />
      </>
    ),
    cardBodyStyle: {
      textAlign: "center",
    },
  },
  {
    cardBody: (
      <>
        <img
          src="https://wireframes.design/wireframes-logo.png"
          alt="logo_image"
          style={logoStyle}
        />
      </>
    ),
    cardBodyStyle: {
      textAlign: "center",
    },
  },
  {
    cardBody: (
      <>
        <img
          src="https://wireframes.design/wireframes-logo.png"
          alt="logo_image"
          style={logoStyle}
        />
      </>
    ),
    cardBodyStyle: {
      textAlign: "center",
    },
  },
  {
    cardBody: (
      <>
        <img
          src="https://wireframes.design/wireframes-logo.png"
          alt="logo_image"
          style={logoStyle}
        />
      </>
    ),
    cardBodyStyle: {
      textAlign: "center",
    },
  },
  {
    cardBody: (
      <>
        <img
          src="https://wireframes.design/wireframes-logo.png"
          alt="logo_image"
          style={logoStyle}
        />
      </>
    ),
    cardBodyStyle: {
      textAlign: "center",
    },
  },
];

const partners = (
  <>
    <h3
      className="d-flex justify-content-center mt-3"
      style={{ color: "#fff" }}
    >
      Our Partners
    </h3>
    <div
      className="row mt-3"
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "0 3rem 0 3rem",
      }}
    >
      {ourtPartnerProps.map((data) => (
        <div className="col-4 col-sm-4 col-md-4 col-lg-2 p-2">
          <Widget
            src={`v1.wireframes.near/widget/Components.Card.TitleCard`}
            props={data}
          />
        </div>
      ))}
    </div>
  </>
);

const profileProps = {
  data: [
    {
      id: 1,
      content:
        "Explore our collection today and unlock the potential of your design journey with Wireframes.",
      imageUrl:
        "https://cdn.pixabay.com/animation/2023/02/13/09/42/09-42-58-584_512.gif",
      imageAlt: "Gif",
      logoUrl:
        "https://firebasestorage.googleapis.com/v0/b/conferencedapp.appspot.com/o/oxb_logo.png?alt=media&token=3279c462-bc93-4960-b577-55748504d089",
      ourPartner: partners,
    },
  ],
};

const detail = `
const logoStyle = {
  height: "50%",
  width: "100%",
};

const ourtPartnerProps = [
  {
    cardBody: (
      <>
        <img
          src="https://wireframes.design/wireframes-logo.png"
          alt="logo_image"
          style={logoStyle}
        />
      </>
    ),
    cardBodyStyle: {
      textAlign: "center",
      border: "none",
    },
  },
  {
    cardBody: (
      <>
        <img
          src="https://wireframes.design/wireframes-logo.png"
          alt="logo_image"
          style={logoStyle}
        />
      </>
    ),
    cardBodyStyle: {
      textAlign: "center",
    },
  },
  {
    cardBody: (
      <>
        <img
          src="https://wireframes.design/wireframes-logo.png"
          alt="logo_image"
          style={logoStyle}
        />
      </>
    ),
    cardBodyStyle: {
      textAlign: "center",
    },
  },
  {
    cardBody: (
      <>
        <img
          src="https://wireframes.design/wireframes-logo.png"
          alt="logo_image"
          style={logoStyle}
        />
      </>
    ),
    cardBodyStyle: {
      textAlign: "center",
    },
  },
  {
    cardBody: (
      <>
        <img
          src="https://wireframes.design/wireframes-logo.png"
          alt="logo_image"
          style={logoStyle}
        />
      </>
    ),
    cardBodyStyle: {
      textAlign: "center",
    },
  },
  {
    cardBody: (
      <>
        <img
          src="https://wireframes.design/wireframes-logo.png"
          alt="logo_image"
          style={logoStyle}
        />
      </>
    ),
    cardBodyStyle: {
      textAlign: "center",
    },
  },
];

const profileProps = {
  data: [
    {
      id: 1,
      content:
        "Explore our collection today and unlock the potential of your design journey with Wireframes.",
      imageUrl:
        "https://cdn.pixabay.com/animation/2023/02/13/09/42/09-42-58-584_512.gif",
      imageAlt: "Gif",
      logoUrl:
        "https://firebasestorage.googleapis.com/v0/b/conferencedapp.appspot.com/o/oxb_logo.png?alt=media&token=3279c462-bc93-4960-b577-55748504d089",
      ourPartner: partners,
    },
  ],
};
return(
<Widget src="v1.wireframes.near/widget/Components.Card.ImageCard" props={cardsProps} />
);`;

const propsExplanation = [
  {
    title: "data",
    content:
      "The provided data is an array containing information about a single card. Each object in the array represents a card with properties such as id, title, content, imageUrl, imageAlt, btnShare, and btnLearnMore. e.g.",
    code: `const cardsProps = {
      data: [
        {
          id: 1,
          content:
            "Explore our collection today and unlock the potential of your design journey with Wireframes.",
          imageUrl:
            "https://cdn.pixabay.com/animation/2023/02/13/09/42/09-42-58-584_512.gif",
          imageAlt: "Gif",
          logoUrl:
            "https://firebasestorage.googleapis.com/v0/b/conferencedapp.appspot.com/o/oxb_logo.png?alt=media&token=3279c462-bc93-4960-b577-55748504d089",
          ourPartner: partners,
        },
      ],
    };`,
    children: [
      {
        title: "id",
        content:
          "This property uniquely identifies the card. It can be used for tasks such as data manipulation, tracking user interactions, or linking related data. e.g.",
        code: `const cardsProps = {
          data:[
            {
              id: 1,
            },
          ]
        };`,
      },
      {
        title: "title",
        content:
          "The title of the card, which typically provides a brief description or summary of the content. It's often displayed prominently at the top of the card to grab the user's attention. e.g.",
        code: `const cardsProps = {
          data:[
            {
              title: 'Card Title',
            },
          ]
        };`,
      },
      {
        title: "content",
        content:
          "The main content of the card, which may include text, descriptions, or other relevant information. It provides additional details about the card's topic or subject matter. e.g.",
        code: `const cardsProps = {
          data:[
            {
              content: 'A card is a versatile and commonly used user interface component in web design.',
            },
          ]
        };`,
      },
      {
        title: "imageUrl",
        content:
          "The URL of the image associated with the card. Images are commonly used in cards to provide visual context or enhance the presentation of content. e.g.",
        code: `const cardsProps = {
          data:[
            {
              imageUrl: 'https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_1280.jpg',
            },
          ]
        };`,
      },
      {
        title: "imageAlt",
        content:
          "The alternative text for the card's image. Alt text is important for accessibility purposes and is displayed when the image fails to load or for users using screen readers. e.g.",
        code: `const cardsProps = {
          data:[
            {
              imageAlt: "Card_Image",
            },
          ]
        };`,
      },
    ],
  },
  {
    title: "style",
    content:
      "You can use the style attribute to apply styles to components. e.g.",
    code: `const cardsProps = {
      style:{ 
        cardMaxWidth: '345px',
        cardBorderRadius: '15px',
      }, 
    };`,
    children: [
      {
        title: "cardWidth",
        content:
          "The property cardWidth likely refers to the width of a card element. It's used to specify the width of the card displayed on a web page or application. e.g.",
        code: `const cardsProps = {
          style:{ 
            cardWidth: '100%',
          }, 
        };`,
      },
      {
        title: "cardHeight",
        content:
          "The property cardHeight likely refers to the height of a card element. It's used to specify the height of the card. e.g.",
        code: `const cardsProps = {
          style:{ 
            cardHeight: '100vh',
          }, 
        };`,
      },
      {
        title: "cardMaxWidth",
        content:
          "The property cardMaxWidth is used to set the maximum width of an element. It specifies the maximum width that an element can take up within its containing element or the viewport, depending on its context. e.g.",
        code: `const cardsProps = {
          style:{ 
            cardMaxWidth: '345px',
          }, 
        };`,
      },
      {
        title: "cardBorder",
        content:
          "The property cardBorder likely refers to the border style applied to a card component. Borders are used to visually separate elements and provide a visual distinction between them. e.g.",
        code: `const cardsProps = {
          style:{ 
            cardBorder: '2px solid #b4b4b4fc',
          }, 
        };`,
      },
      {
        title: "cardBorderRadius",
        content:
          "The property cardBorderRadius is likely used to specify the radius of the rounded corners of a card component. Rounded corners can enhance the visual appeal of elements and soften their appearance. e.g.",
        code: `const cardsProps = {
          style:{ 
            cardBorderRadius: '15px',
          }, 
        };`,
      },
      {
        title: "cardPadding",
        content:
          "The property cardPadding refers to the padding applied to the content area of a card component. Padding is the space between the content of an element and its border. Setting cardPadding allows for control over the amount of space between the content and the edges of the card. e.g.",
        code: `const cardsProps = {
          style:{ 
            cardPadding: '0px',
          }, 
        };`,
      },
      {
        title: "cardBackgroundColor",
        content:
          "You can use color names, hex codes, or RGB values to change background color of the card. e.g.",
        code: `const cardsProps = {
          style:{ 
            cardBackgroundColor: '#eee',
          }, 
        };`,
      },
      {
        title: "cardOverflow",
        content:
          "The cardOverflow CSS property specifies how content that exceeds the dimensions of an element's content area should be handled. It determines whether scrollbars should appear, content should be clipped, or overflow should be displayed in other ways. e.g.",
        code: `const cardsProps = {
          style:{ 
            cardOverflow: 'hidden',
          }, 
        };`,
      },
      {
        title: "imageWidth",
        content:
          "The property imageWidth likely refers to the width of an image element. It's used to specify the width of the image displayed on a web page or application. e.g.",
        code: `const cardsProps = {
          style:{ 
            imageWidth: '100%',
          }, 
        };`,
      },
      {
        title: "imageHeight",
        content:
          "The property imageHeight likely refers to the height of an image element. It's used to specify the height of the image. e.g.",
        code: `const cardsProps = {
          style:{ 
            imageHeight: '170px',
          }, 
        };`,
      },
      {
        title: "imageObjectFit",
        content:
          "The property imageObjectFit is likely used to specify how an image should be resized to fit its container while preserving its aspect ratio. It's a CSS property that determines how an image should be scaled and positioned within its containing element. e.g.",
        code: `const cardsProps = {
          style:{ 
            imageObjectFit: 'cover',
          }, 
        };`,
      },
      {
        title: "imageBorderRadius",
        content:
          "The property imageBorderRadius is likely used to specify the radius of the rounded corners of an image element. It allows developers to apply rounded corners to images, enhancing their visual appearance and integrating them better. e.g.",
        code: `const cardsProps = {
          style:{ 
            imageBorderRadius: '12px 12px 0px 0px',
          }, 
        };`,
      },
      {
        title: "imageBorder",
        content:
          "The property cardBorder likely refers to the border style applied to a card component. Borders are used to visually separate elements and provide a visual distinction between them. e.g.",
        code: `const cardsProps = {
          style:{ 
            imageBorder: 'none',
          }, 
        };`,
      },
      {
        title: "logoWidth",
        content:
          "The property logoWidth likely refers to the width of the logo. It's used to specify the width of the logo displayed on a web page or application. e.g.",
        code: `const cardsProps = {
          style:{ 
            logoWidth: '160px',
          }, 
        };`,
      },
      {
        title: "logoHeight",
        content:
          "The property logoHeight likely refers to the height of the logo. It's used to specify the height of the logo. e.g.",
        code: `const cardsProps = {
          style:{ 
            logoHeight: '150px',
          }, 
        };`,
      },
      {
        title: "logoBorderRadius",
        content:
          "The property logoBorderRadius is likely used to specify the radius of the rounded corners of the logo. It allows developers to apply rounded corners to images, enhancing their visual appearance and integrating them better. e.g.",
        code: `const cardsProps = {
          style:{ 
            logoBorderRadius: '60%',
          }, 
        };`,
      },
      {
        title: "logoBorder",
        content:
          "The property logoBorder likely refers to the border style applied to the logo. Borders are used to visually separate elements and provide a visual distinction between them. e.g.",
        code: `const cardsProps = {
          style:{ 
            logoBorder: '2px solid #fff',
          }, 
        };`,
      },
      {
        title: "logoPadding",
        content:
          "The property logoPadding refers to the padding applied to the logo area of a card component. Padding is the space between the content of an element and its border. Setting cardPadding allows for control over the amount of space between the content and the edges of the card. e.g.",
        code: `const cardsProps = {
          style:{ 
            logoPadding: '0',
          }, 
        };`,
      },
    ],
  },
];

const props = {
  copyBtn: detail,
  component: (
    <div className="row d-flex justify-content-center">
      <div style={{ width: "100%", height: "100vh", overflowY: "scroll" }}>
        <Widget
          src="v1.wireframes.near/widget/Components.Profile.ProfileCard"
          props={profileProps}
        />
      </div>
    </div>
  ),
  text: detail,
  explanation: explanation,
  propsExplanation: propsExplanation,
};

return (
  <>
    <Widget
      src={`v1.wireframes.near/widget/Components.Learning.LearningCard`}
      props={props}
    />
  </>
);
