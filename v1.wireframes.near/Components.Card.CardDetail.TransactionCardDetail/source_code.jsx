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

const cardsProps = {
  isSend: true,
  amount: 100,
  accountId: "wireframes",
  currency: "ETH",
};

const detail = `
const cardsProps = {
  isSend: true,
  amount: 100,
  accountId: "wireframes",
  currency: "ETH",
};
return(
<Widget src="v1.wireframes.near/widget/Components.Card.TransactionCard" props={cardsProps} />
);`;

const explanation =
  "A transaction card is a user interface component commonly used in financial applications, e-commerce platforms, and other systems where users perform transactions. It provides a concise summary of a specific transaction, displaying key details such as the transaction amount, date, description, and any related information.";

const propsExplanation = [
  {
    title: "receiveIconName",
    content:
      "You can use receiveIconName to dynamically determine which icon to display based on certain conditions. e.g.",
    code: `const cardsProps = {
      receiveIconName: 'arrow-down-left',
    };`,
  },
  {
    title: "receiveIconSize",
    content:
      "You can use the props receiveIconSize typically refers to the dimensions or size of an icon in a user interface. e.g.",
    code: `const cardsProps = { 
      receiveIconSize: '20px',
    };`,
  },
  {
    title: "receiveIconColor",
    content:
      "You can use the props receiveIconColor is commonly used to specify the color of an icon in a user interface. It allows developers to control the visual appearance of icons by setting their color to match the design. e.g.",
    code: `const cardsProps = {
      receiveIconColor: '#30c730',
    };`,
  },
  {
    title: "sendIconName",
    content:
      "You can use sendIconName to dynamically determine which icon to display based on certain conditions. e.g.",
    code: `const cardsProps = {
      sendIconName: 'arrow-up-right',
    };`,
  },
  {
    title: "sendIconSize",
    content:
      "You can use the props sendIconSize typically refers to the dimensions or size of an icon in a user interface. e.g.",
    code: `const cardsProps = { 
      sendIconSize: '20px',
    };`,
  },
  {
    title: "sendIconColor",
    content:
      "You can use the props sendIconColor is commonly used to specify the color of an icon in a user interface. It allows developers to control the visual appearance of icons by setting their color to match the design. e.g.",
    code: `const cardsProps = {
      sendIconColor: '#e9050d',
    };`,
  },
  {
    title: "isSend",
    content:
      "The 'isSend: true' props is likely used as a boolean indicator to signify that an amount, action or operation is in the process of sending data or information from the client to another destination. e.g.",
    code: `const cardsProps = {
      isSend: true,
    };`,
  },
  {
    title: "amount",
    content:
      "The term 'amount' typically refers to a numerical value that represents a quantity of amount or something, often in the context of financial transactions or measurements. e.g.",
    code: `const cardsProps = {
      amount: 100,
    };`,
  },
  {
    title: "accountId",
    content:
      "The term 'accountId' typically refers to a unique identifier associated with a specific account in a system or platform. e.g.",
    code: `const cardsProps = {
      accountId: 'wireframe',
    };`,
  },
  {
    title: "currency",
    content:
      "The term 'currency' refers to a system of money that is used in a particular country or region for transactions, trade, and commerce. e.g.",
    code: `const cardsProps = {
      currency: 'ETH',
    };`,
  },
  {
    title: "style",
    content:
      "You can use the style attribute to apply styles to components. e.g.",
    code: `const cardsProps = {
      style:{ 
        cardWidth: '100%',
        cardPadding: '15px 10px 0px',
      }, 
    };`,
    children: [
      {
        title: "cardWidth",
        content:
          "The property cardWidth likely refers to the width of a card component in a user interface. This property is used to specify the horizontal dimension of the card, determining how wide it appears on the screen. e.g.",
        code: `const cardsProps = {
          style:{ 
            cardWidth: '100%',
          }, 
        };`,
      },
      {
        title: "cardDisplay",
        content:
          "The property cardDisplay likely refers to how card components are displayed. It used to control the layout or arrangement of card elements on the screen. e.g.",
        code: `const cardsProps = {
          style:{ 
            cardDisplay: 'flex',
          }, 
        };`,
      },
      {
        title: "cardPadding",
        content:
          "The property cardPadding refers to the padding applied to the content area of a card component. Padding is the space between the content of an element and its border. Setting cardPadding allows for control over the amount of space between the content and the edges of the card. e.g.",
        code: `const cardsProps = {
          style:{ 
            cardPadding: '15px 10px 0px',
          }, 
        };`,
      },
      {
        title: "cardAlignItems",
        content:
          "The property cardAlignItems likely refers to how the items inside a card component are aligned along the cross-axis. This property is typically used in conjunction with a flexbox or grid layout to control the vertical alignment of elements within the card. e.g.",
        code: `const cardsProps = {
          style:{ 
            cardAlignItems: 'center',
          }, 
        };`,
      },
      {
        title: "cardBorder",
        content:
          "The property cardBorder likely refers to the border style applied to a card component. Borders are used to visually separate elements and provide a visual distinction between them. e.g.",
        code: `const cardsProps = {
          style:{ 
            cardBorder: '1px solid #00000012',
          }, 
        };`,
      },
      {
        title: "cardBorderRadius",
        content:
          "The property cardBorderRadius is likely used to specify the radius of the rounded corners of a card component. Rounded corners can enhance the visual appeal of elements and soften their appearance. e.g.",
        code: `const cardsProps = {
          style:{ 
            cardBorderRadius: '0px',
          }, 
        };`,
      },
      {
        title: "cardJustifyContent",
        content:
          "The property cardJustifyContent is likely used to control the horizontal alignment of items within a card component. It's commonly used in conjunction with flexbox layout to distribute space between and around items along the main axis of the card. e.g.",
        code: `const cardsProps = {
          style:{ 
            cardJustifyContent: 'space-between',
          }, 
        };`,
      },
      {
        title: "cardBorderBottomWidth",
        content:
          "The property cardBorderBottomWidth likely refers to the width of the bottom border of a card component. This property allows developers to specify the thickness of the border line along the bottom edge of the card. e.g.",
        code: `const cardsProps = {
          style:{ 
            cardBorderBottomWidth: '1px',
          }, 
        };`,
      },
      {
        title: "cardBackgroundColor",
        content:
          "You can use color names, hex codes, or RGB values to change background color of the card. e.g.",
        code: `const cardsProps = {
          style:{ 
            cardBackgroundColor: '#ececec',
          }, 
        };`,
      },
      {
        title: "bodyWidth",
        content:
          "The property bodyWidth likely refers to the width of the body content or main content area in a web page or application. It is used to control the width of the content displayed to the user. e.g.",
        code: `const cardsProps = {
          style:{ 
            bodyWidth: '80%',
          }, 
        };`,
      },
      {
        title: "bodyDisplay",
        content:
          "The property bodyDisplay is likely used to control the display behavior of the body element. It specifies how the body content is rendered in the browser window. e.g.",
        code: `const cardsProps = {
          style:{ 
            bodyDisplay: 'flex',
          }, 
        };`,
      },
      {
        title: "bodyGap",
        content:
          "The property bodyGap is used to specify the gap or spacing between elements within the body of a web page or application. e.g.",
        code: `const cardsProps = {
          style:{ 
            bodyGap: '10px',
          }, 
        };`,
      },
      {
        title: "imageWidth",
        content:
          "The property imageWidth likely refers to the width of an image element. It's used to specify the width of the image displayed on a web page or application. e.g.",
        code: `const cardsProps = {
          style:{ 
            imageWidth: '40px',
          }, 
        };`,
      },
      {
        title: "imageHeight",
        content:
          "The property imageHeight likely refers to the height of an image element. It's used to specify the height of the image. e.g.",
        code: `const cardsProps = {
          style:{ 
            imageHeight: '40px',
          }, 
        };`,
      },
      {
        title: "imageObjectFit",
        content:
          "The property imageObjectFit is likely used to specify how an image should be resized to fit its container while preserving its aspect ratio. It's a CSS property that determines how an image should be scaled and positioned within its containing element. e.g.",
        code: `const cardsProps = {
          style:{ 
            imageObjectFit: 'contain',
          }, 
        };`,
      },
      {
        title: "imageBorderRadius",
        content:
          "The property imageBorderRadius is likely used to specify the radius of the rounded corners of an image element. It allows developers to apply rounded corners to images, enhancing their visual appearance and integrating them better. e.g.",
        code: `const cardsProps = {
          style:{ 
            imageBorderRadius: '100%',
          }, 
        };`,
      },
      {
        title: "titleWidth",
        content:
          "The property titleWidth is used to specify the width of a title element, such as a heading or a text block. This property would allow developers to control the width of titles, ensuring consistent alignment and layout. e.g.",
        code: `const cardsProps = {
          style:{ 
            titleWidth: '100%',
          }, 
        };`,
      },
      {
        title: "titleMinWidth",
        content:
          "The property titleMinWidth would likely be used to specify the minimum width of a title element, such as a heading or text block. It allows developers to ensure that the title element maintains a certain minimum width, preventing it from becoming too narrow and potentially affecting readability or layout. e.g.",
        code: `const cardsProps = {
          style:{ 
            titleMinWidth: '160px',
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
        title: "titleFontSize",
        content:
          "The property titleFontSize would likely be used to specify the size of the text in a title element, such as a heading or text block. It allows developers to control the visual size of titles, ensuring they are appropriately sized for readability and aesthetics. e.g.",
        code: `const cardsProps = {
          style:{   
            titleFontSize: '16px',
          }, 
        };`,
      },
      {
        title: "titleMargin",
        content:
          "The property titleMargin would likely be used to specify the margins around a title element, such as a heading or text block. It allows developers to control the spacing between the title element and surrounding content, helping to create visually balanced layouts. e.g.",
        code: `const cardsProps = {
          style:{   
            titleMargin: '0px 5px 0px 0px',
          }, 
        };`,
      },
      {
        title: "titleWordBreak",
        content:
          "The property titleWordBreak would likely be used to specify how words should break or wrap within a title element, such as a heading or text block. It allows developers to control how long words are handled when they exceed the width of their container. e.g.",
        code: `const cardsProps = {
          style:{   
            titleWordBreak: 'break-all',
          }, 
        };`,
      },
      {
        title: "containerWidth",
        content:
          "The property containerWidth would likely be used to specify the width of a container element, such as a <div> or a section. It allows developers to control the size of the container, influencing the layout of its contents within a webpage or application. e.g.",
        code: `const cardsProps = {
          style:{   
            containerWidth: 'fit-content',
          }, 
        };`,
      },
      {
        title: "containerDisplay",
        content:
          "The containerDisplay property would likely be used to specify the CSS display property for a container element, such as a <div> or a section. The display property determines how an element is rendered in the document layout. e.g.",
        code: `const cardsProps = {
          style:{   
            containerDisplay: 'flex',
          }, 
        };`,
      },
      {
        title: "containerJustifyContent",
        content:
          "The property containerJustifyContent would likely be used to specify justify-content property for a container element, such as a <div> or a section. This property property is used in flexbox layouts to align flex items along the main axis of the container. e.g.",
        code: `const cardsProps = {
          style:{   
            containerJustifyContent: 'end',
          }, 
        };`,
      },
      {
        title: "contentFontSize",
        content:
          "The property contentFontSize is used to specify the font size for text content within a container element, such as a <div> or a section. You can use the props to customize the font size. e.g.",
        code: `const cardsProps = {
          style:{   
            contentFontSize: '28px',
          }, 
        };`,
      },
      {
        title: "contentDisplay",
        content:
          "The property contentDisplay is used to specify the display property for content elements within a container element, such as a <div> or a section. The display property determines how an element is rendered in the document layout. e.g.",
        code: `const cardsProps = {
          style:{   
            contentDisplay: 'flex',
          }, 
        };`,
      },
      {
        title: "contentAlignItems",
        content:
          "The property contentAlignItems is used to specify the align-items property for content elements within a container element, such as a <div> or a section. The align-items property is used in flexbox layouts to align content items along the cross axis of the container. e.g.",
        code: `const cardsProps = {
          style:{   
            contentAlignItems: 'end',
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
        title: "spanFontSize",
        content:
          "The property spanFontSize is used to specify the font size of <span> elements within a container or a specific context. It allows developers to control the size of text within <span> elements, providing finer-grained control over text styling. e.g.",
        code: `const cardsProps = {
          style:{   
            spanFontSize: '20px',
          }, 
        };`,
      },
      {
        title: "spanFontWeight",
        content:
          "The property spanFontWeight is used to specify the font weight of <span> elements within a container or a specific context. It allows developers to control the thickness of text within <span> elements, providing finer-grained control over text styling. e.g.",
        code: `const cardsProps = {
          style:{   
            spanFontWeight: '400',
          }, 
        };`,
      },
      {
        title: "spanFontColor",
        content:
          "The property spanFontColor is used to specify the color of text within <span> elements, providing finer-grained control over text styling within a container or a specific context. e.g.",
        code: `const cardsProps = {
          style:{   
            spanFontColor: '#A1A09A',
          }, 
        };`,
      },
      {
        title: "spanMarginBottom",
        content:
          "The property spanMarginBottom is used to specify the bottom margin for <span> elements within a container or a specific context. It allows developers to control the spacing between <span> elements and other elements around them. e.g.",
        code: `const cardsProps = {
          style:{   
            spanMarginBottom: '4px',
          }, 
        };`,
      },
      {
        title: "spanMarginLeft",
        content:
          "The property spanMarginLeft is used to specify the left margin for <span> elements within a container or a specific context. It allows developers to control the spacing between <span> elements and other elements around them. e.g.",
        code: `const cardsProps = {
          style:{   
            spanMarginLeft: '2px',
          }, 
        };`,
      },
      {
        title: "iconBoxPadding",
        content:
          "The property iconBoxPadding is used to specify the padding around an icon within an icon box or container. It allows developers to control the spacing between the icon and the edges of its containing element. e.g.",
        code: `const cardsProps = {
          style:{   
            iconBoxPadding: '10px',
          }, 
        };`,
      },
      {
        title: "iconBoxMarginBottom",
        content:
          "The property iconBoxMarginBottom is used to specify the bottom margin for an icon box or container. It allows developers to control the spacing between icon boxes and other elements below them. e.g.",
        code: `const cardsProps = {
          style:{   
            iconBoxMarginBottom: '1px',
          }, 
        };`,
      },
    ],
  },
  {
    title: "cardHeader",
    content:
      "The cardHeader props refers to the top section of a card component. You can pass the code to set the card header. e.g.",
    code: `const cardsProps = { 
      cardHeader: (
        <>
          <h1>Card Header</h1>
        </>
      ),
    };`,
  },
  {
    title: "cardHeaderStyle",
    content:
      "The cardHeaderStyle props refers to the top section of a card component. You can customize the card by using this prop. e.g.",
    code: `const cardsProps = { 
      cardHeaderStyle: {
        color: "white",
      },
    };`,
  },
  {
    title: "cardBody",
    required: "true",
    content:
      "The cardBody props is used to define the main content area of a card component. You can pass the code to set the card body. e.g.",
    code: `const cardsProps = { 
      cardBody: (
        <>
          <h1>Card Body Sample Text</h1>
        </>
      ),
    };`,
  },
  {
    title: "cardBodyStyle",
    content:
      "The cardBodyStyle props refers to the main content area of a card component. You can customize the card body by using this prop. e.g.",
    code: `const cardsProps = { 
      cardBodyStyle: {
        color: "white",
      },
    };`,
  },
];

const props = {
  copyBtn: detail,
  component: (
    <div className="row">
      <div className="p-2">
        <Widget
          src="v1.wireframes.near/widget/Components.Card.TransactionCard"
          props={cardsProps}
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
