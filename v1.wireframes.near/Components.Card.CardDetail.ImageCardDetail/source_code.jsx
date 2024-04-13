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

const shareBtn = (
  <Widget
    src={`v1.wireframes.near/widget/Components.Button.SimpleButton`}
    props={{
      buttonTitle: "Share",
      style: {
        backgroundColor: "rgb(0, 123, 255)",
        activeColor: "rgb(0 123 255 / 72%)",
        hoverColor: "#0451c2",
        fontColor: "#fff",
        minWidth: "28%",
        width: "10%",
        padding: "8px 16px",
      },
      buttonHref: "https://wireframes.design",
    }}
  />
);
const learnMoreBtn = (
  <Widget
    src={`v1.wireframes.near/widget/Components.Button.SimpleButton`}
    props={{
      buttonTitle: "Learn More",
      style: {
        backgroundColor: "rgb(0, 123, 255)",
        activeColor: "rgb(0 123 255 / 72%)",
        hoverColor: "#0451c2",
        fontColor: "#fff",
        minWidth: "28%",
        width: "35%",
        padding: "8px 16px",
      },
    }}
  />
);
const cardsProps = {
  data: [
    {
      id: 1,
      title: "Card Title",
      content:
        "A card is a versatile and commonly used user interface component in web design. It serves as a container for organizing and presenting various types of content, such as text, images, links, or interactive elements.",
      imageUrl:
        "https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_1280.jpg",
      imageAlt: "Card_Image",
      btnShare: shareBtn,
      btnLearnMore: learnMoreBtn,
    },
  ],
};
const cardWithImageProps = {
  data: [
    {
      id: 2,
      title: "Card Title",
      content:
        "A card is a versatile and commonly used user interface component in web design. It serves as a container for organizing and presenting various types of content, such as text, images, links, or interactive elements.",
      imageUrl:
        "https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_1280.jpg",
      imageAlt: "Card_Image",
    },
  ],
};

const detail = `
const shareBtn = (
  <Widget
    src="v1.wireframes.near/widget/Components.Button.SimpleButton"
    props={{
      buttonTitle:"Share",
      style:{
        backgroundColor:"rgb(0, 123, 255)",
        activeColor:"rgb(0 123 255 / 72%)",
        hoverColor:"#0451c2",
        fontColor: "#fff",
        minWidth: "28%",
        width:"10%",
        padding: "8px 16px",
      },
      buttonHref: "https://wireframes.design",
    }}
  />
);
const learnMoreBtn = (
  <Widget
    src="v1.wireframes.near/widget/Components.Button.SimpleButton"
    props={{
      buttonTitle:"Learn More",
      style:{
        backgroundColor:"rgb(0, 123, 255)",
        activeColor:"rgb(0 123 255 / 72%)",
        hoverColor:"#0451c2",
        fontColor: "#fff",
        minWidth: "28%",
        width:"35%",
        padding: "8px 16px",
      },
    }}
  />
);
const cardsProps = {
  data: [
    {
      id: 1,
      title: "Card Title",
      content:
        "A card is a versatile and commonly used user interface component in web design. It serves as a container for organizing and presenting various types of content, such as text, images, links, or interactive elements.",
      imageUrl:
        "https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_1280.jpg",
      imageAlt: "Card_Image",
      btnShare: shareBtn,
      btnLearnMore: learnMoreBtn,
    },
  ],
};
return(
<Widget src="v1.wireframes.near/widget/Components.Card.ImageCard" props={cardsProps} />
);`;

const explanation =
  "An image card is a specific type of card component commonly used in web design to display visual content, particularly images, in a structured and visually appealing manner. It combines an image with additional descriptive or interactive elements to create a visually engaging presentation of information.";

const propsExplanation = [
  {
    title: "data",
    content:
      "The provided data is an array containing information about a single card. Each object in the array represents a card with properties such as id, title, content, imageUrl, imageAlt, btnShare, and btnLearnMore. e.g.",
    code: `const cardsProps = {
      data:[
        {
          id: 1,
          title: "Card Title",
          content:
            "A card is a versatile and commonly used user interface component in web design. It serves as a container for organizing and presenting various types of content, such as text, images, links, or interactive elements.",
          imageUrl:
            "https://cdn.pixabay.com/photo/2016/05/05/02/37/sunset-1373171_1280.jpg",
          imageAlt: "Card_Image",
          btnShare: shareBtn,
          btnLearnMore: learnMoreBtn,
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
      {
        title: "btnShare",
        content:
          "A button or action associated with sharing the card's content. This button could trigger a share dialog or provide options for users to share the card on social media platforms. e.g.",
        code: `const cardsProps = {
          data:[
            {
              btnShare: shareBtn,
            },
          ]
        };`,
      },
      {
        title: "btnLearnMore",
        content:
          "A button or action associated with learning more about the card's content. This button could link to additional information, related articles, or external resources for further exploration. e.g.",
        code: `const cardsProps = {
          data:[
            {
              btnLearnMore: learnMoreBtn,
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
        title: "cardBodyMargin",
        content:
          "The property cardBodyMargin would likely be used to specify the margins around a title element, such as a heading or text block. It allows developers to control the spacing between the title element and surrounding content, helping to create visually balanced layouts. e.g.",
        code: `const cardsProps = {
          style:{   
            cardBodyMargin: '0px',
          }, 
        };`,
      },
      {
        title: "cardBodyPadding",
        content:
          "The property cardBodyPadding refers to the padding applied to the content area of a card component. Padding is the space between the content of an element and its border. Setting cardPadding allows for control over the amount of space between the content and the edges of the card. e.g.",
        code: `const cardsProps = {
          style:{ 
            cardBodyPadding: '5px',
          }, 
        };`,
      },
      {
        title: "titleFontSize",
        content:
          "The property titleFontSize would likely be used to specify the size of the text in a title element, such as a heading or text block. It allows developers to control the visual size of titles, ensuring they are appropriately sized for readability and aesthetics. e.g.",
        code: `const cardsProps = {
          style:{   
            titleFontSize: '1.25rem',
          }, 
        };`,
      },
      {
        title: "titleFontColor",
        content:
          "The property titleFontColor would likely be used to specify the color of the text in a title element, such as a heading or text block. It allows developers to control the visual appearance of the text. e.g.",
        code: `const cardsProps = {
          style:{   
            titleFontColor: '#000',
          }, 
        };`,
      },
      {
        title: "titleFontWeight",
        content:
          "The property titleFontWeight would likely be used to specify the weight, or thickness, of the font used in a title element, such as a heading or text block. It allows developers to control the visual weight of the text, influencing its prominence and emphasis within the layout. e.g.",
        code: `const cardsProps = {
          style:{ 
            titleFontWeight: '600',
          }, 
        };`,
      },
      {
        title: "titleFontStyle",
        content:
          "The titleFontStyle property is used to specify the style of the font for a text element. It allows you to control whether the text should be displayed in a normal, italic, or oblique style. e.g.",
        code: `const cardsProps = {
          style:{   
            titleFontStyle: 'normal',
          }, 
        };`,
      },
      {
        title: "titleFontFamily",
        content:
          "The property titleFontFamily would likely be used to specify the font family for text in a title element, such as a heading or text block. e.g.",
        code: `const cardsProps = {
          style:{   
            titleFontFamily: 'Mona Sans',
          }, 
        };`,
      },
      {
        title: "titleTextAlign",
        content:
          "The property titleTextAlign is used to a configuration option used to specify the horizontal alignment of text content within individual slides in a slideshow or carousel component. e.g.",
        code: `const cardsProps = {
          style:{   
            titleTextAlign: 'start',
          }, 
        };`,
      },
      {
        title: "contentFontSize",
        content:
          "The property contentFontSize is used to specify the font size for text content within a container element, such as a <div> or a section. You can use the props to customize the font size. e.g.",
        code: `const cardsProps = {
          style:{   
            contentFontSize: '16px',
          }, 
        };`,
      },
      {
        title: "contentFontColor",
        content:
          "The property contentFontColor is used to specify the color of the text content within a container element, such as a <div> or a section. e.g.",
        code: `const cardsProps = {
          style:{   
            contentFontColor: '#000',
          }, 
        };`,
      },
      {
        title: "contentFontWeight",
        content:
          "The property contentFontWeight would likely be used to specify the weight, or thickness, of the font used in a title element, such as a heading or text block. It allows developers to control the visual weight of the text, influencing its prominence and emphasis within the layout. e.g.",
        code: `const cardsProps = {
          style:{ 
            contentFontWeight: '400',
          }, 
        };`,
      },
      {
        title: "contentFontStyle",
        content:
          "The contentFontStyle property is used to specify the style of the font for a text element. It allows you to control whether the text should be displayed in a normal, italic, or oblique style. e.g.",
        code: `const cardsProps = {
          style:{   
            contentFontStyle: 'normal',
          }, 
        };`,
      },
      {
        title: "contentFontFamily",
        content:
          "The property contentFontFamily would likely be used to specify the font family for text in a title element, such as a heading or text block. e.g.",
        code: `const cardsProps = {
          style:{   
            contentFontFamily: 'Mona Sans',
          }, 
        };`,
      },
      {
        title: "contentTextAlign",
        content:
          "The property contentTextAlign is used to a configuration option used to specify the horizontal alignment of text content within individual slides in a slideshow or carousel component. e.g.",
        code: `const cardsProps = {
          style:{   
            contentTextAlign: 'start',
          }, 
        };`,
      },
      {
        title: "contentMargin",
        content:
          "The property contentMargin would likely be used to specify the margins around a title element, such as a heading or text block. It allows developers to control the spacing between the title element and surrounding content, helping to create visually balanced layouts. e.g.",
        code: `const cardsProps = {
          style:{   
            contentMargin: '0px 0px',
          }, 
        };`,
      },
      {
        title: "cardFooterPadding",
        content:
          "The property cardFooterPadding is used to specify the padding around an icon within an element or container. e.g.",
        code: `const cardsProps = {
          style:{   
            cardFooterPadding: '5px',
          }, 
        };`,
      },
      {
        title: "cardFooterTextAlign",
        content:
          "The property cardFooterTextAlign is used to a configuration option used to specify the horizontal alignment of text content within individual slides in a slideshow or carousel component. e.g.",
        code: `const cardsProps = {
          style:{   
            cardFooterTextAlign: 'start',
          }, 
        };`,
      },
      {
        title: "cardFooterBackgroundColor",
        content:
          "You can use color names, hex codes, or RGB values to change background color of the card footer. e.g.",
        code: `const cardsProps = {
          style:{ 
            cardFooterBackgroundColor: '#eee',
          }, 
        };`,
      },
    ],
  },
];

const propsLists = [cardsProps, cardWithImageProps];
const props = {
  copyBtn: detail,
  component: (
    <div className="row d-flex justify-content-center">
      {propsLists.map((data) => (
        <div className="p-2" style={{ width: "fit-content" }}>
          <Widget
            src="v1.wireframes.near/widget/Components.Card.ImageCard"
            props={data}
          />
        </div>
      ))}
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
