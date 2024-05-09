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

const leftArrow = (
  <Widget
    src={`v1.wireframes.near/widget/Components.Icon.BootstrapIcons`}
    props={{
      iconName: "arrow-left-short",
      iconSize: "25px",
      iconColor: "#fff",
    }}
  />
);
const rightArrow = (
  <Widget
    src={`v1.wireframes.near/widget/Components.Icon.BootstrapIcons`}
    props={{
      iconName: "arrow-right-short",
      iconSize: "25px",
      iconColor: "#fff",
    }}
  />
);

const carouselProps = {
  arrowLeft: leftArrow,
  arrowRight: rightArrow,
  images: [
    {
      id: 1,
      imageUrl: "https://wireframes.design/slider1.jpeg",
      imageAlt: "Image 1",
    },
    {
      id: 2,
      imageUrl: "https://wireframes.design/slider2.jpeg",
      imageAlt: "Image 2",
    },
    {
      id: 3,
      imageUrl: "https://wireframes.design/slider3.jpeg",
      imageAlt: "Image 3",
    },
  ],
};

const detail = `
const leftArrow = (
  <Widget
    src="v1.wireframes.near/widget/Components.Icon.BootstrapIcons"
    props={{
      iconName: "arrow-left-circle",
      iconSize: "25px",
      iconColor: "#fff",
    }}
  />
);
const rightArrow = (
  <Widget
    src="v1.wireframes.near/widget/Components.Icon.BootstrapIcons"
    props={{
      iconName: "arrow-right-circle",
      iconSize: "25px",
      iconColor: "#fff",
    }}
  />
);

const carouselProps ={
  arrowLeft: leftArrow,
  arrowRight: rightArrow,
  images: [
    {
      id: 1,
      imageUrl:
        "https://wireframes.design/slider1.jpeg",
      imageAlt: "Image 1",
    },
    {
      id: 2,
      imageUrl:
        "https://wireframes.design/slider2.jpeg",
      imageAlt: "Image 2",
    },
  ]
};
return(
<Widget src="v1.wireframes.near/widget/Components.Carousel.Carousel" props={carouselProps}/>
);`;
const explanation =
  "A carousel, also known as an image slider or slideshow, is a commonly used UI component in web development for displaying a series of images or content items in a rotating or sequential manner.";

const propsExplanation = [
  {
    title: "arrowLeft",
    content:
      "The 'arrowLeft' simply be a variable name used to hold a reference to an arrow icon or some other representation of a left arrow. e.g.",
    code: `const carouselProps = {
      arrowLeft: leftArrow,
    };`,
  },
  {
    title: "arrowRight",
    content:
      "The 'arrowRight' simply be a variable name used to hold a reference to an arrow icon or some other representation of a left arrow. e.g.",
    code: `const carouselProps = {
      arrowRight: rightArrow,
    };`,
  },
  {
    title: "images",
    required: "true",
    content:
      "You can create an object array as like 'slidesData' to represents a slide with properties like 'id', 'image', and 'imageAlt'. e.g.",
    code: `const carouselProps = {
        images:[
          {
            id: 1,
            imageUrl:
              "https://wireframes.design/slider1.jpeg",
            imageAlt: "Image 1",
          },
          {
            id: 2,
            imageUrl:
              "https://wireframes.design/slider2.jpeg",
            imageAlt: "Image 2",
          },
        ],
      };`,
    children: [
      {
        title: "id",
        content:
          "The 'id' property with a value of '1' likely serves as a unique identifier for a specific item or entity within a system or dataset. e.g.",
        code: `const carouselProps = {
          slidesData:[
            {
              id: 1,
            },
          ]
        };`,
      },
      {
        title: "imageUrl",
        content:
          "The imageUrl property is used to specify the URL of an image that will be displayed in a slideshow, carousel, or any other component that renders images dynamically on a webpage.  e.g.",
        code: `const carouselProps = {
          images:[
            {
              imageUrl: "https://wireframes.design/slider1.jpeg",
            },
          ]
        };`,
      },
      {
        title: "imageAlt",
        content:
          "The imageAlt property is used to provide alternative text (often abbreviated as 'alt text') for an image within a webpage. e.g.",
        code: `const carouselProps = {
          images:[
            {
              imageAlt: "Image 1",
            },
          ]
        };`,
      },
    ],
  },
  {
    title: "carouselWrapperStyle",
    content:
      "You can use 'carouselWrapperStyle' props to customize or apply the additional CSS to the carousel wrapper. e.g.",
    code: `const carouselProps = {
      carouselWrapperStyle:{
        border: "none",
      },
    };`,
  },
  {
    title: "carouselItemStyle",
    content:
      "You can use 'carouselItemStyle' props to customize or apply the additional CSS to the carousel image wrapper. e.g.",
    code: `const carouselProps = {
      carouselItemStyle: {
        border: "none",
      },
    };`,
  },
  {
    title: "carouselImageStyle",
    content:
      "You can use 'carouselImageStyle' props to customize or apply the additional CSS to the carousel images. e.g.",
    code: `const carouselProps = {
      carouselImageStyle: {
        border: "none",
      },
    };`,
  },
  {
    title: "carouselIButtonStyle",
    content:
      "You can use 'carouselIButtonStyle' props to customize or apply the additional CSS to the carousel buttons. e.g.",
    code: `const carouselProps = {
      carouselIButtonStyle: {
        margin: "0px 0px 0px 0px",
      },
    };`,
  },
  {
    title: "style",
    content:
      "You can use the style attribute to apply styles to components. e.g.",
    code: `const carouselProps = {
        style:{ 
          carouselItemWidth: "100%",
          carouselImageHeight: "600px",
        }, 
      };`,
    children: [
      {
        title: "carouselWrapperWidth",
        content:
          "You can set the carouselWrapperWidth using various units, such as pixels (px), percentages (%), em units (em), or other length units. e.g.",
        code: `const carouselProps = {
          style:{ 
            carouselWrapperWidth: '100%',
          }, 
        };`,
      },
      {
        title: "carouselWrapperHeight",
        content:
          "The carouselWrapperHeight props is used to set the height of carousel wrapper div. e.g.",
        code: `const carouselProps = {
          style:{ 
            carouselWrapperHeight: '600px',
          }, 
        };`,
      },
      {
        title: "carouselWrapperMaxHeight",
        content:
          "The carouselWrapperMaxHeight property is used to set the maximum height of an element. It specifies the maximum height that an element can have, and if its content exceeds this limit, the overflow behavior will be applied to handle the excess content. e.g.",
        code: `const carouselProps = {
          style:{ 
            carouselWrapperMaxHeight: '100%',
          }, 
        };`,
      },
      {
        title: "carouselWrapperOverflow",
        content:
          "The carouselWrapperOverflow props specifies how content that exceeds the dimensions of an element's content area should be handled. It determines whether scrollbars should appear, content should be clipped, or overflow should be displayed in other ways. e.g.",
        code: `const carouselProps = {
          style:{ 
            carouselWrapperOverflow: 'hidden',
          }, 
        };`,
      },
      {
        title: "carouselWrapperPosition",
        content:
          "The carouselWrapperPosition props is used to specify the positioning method of an element within its containing element or the document as a whole. e.g.",
        code: `const carouselProps = {
          style:{ 
            carouselWrapperPosition: 'relative',
          }, 
        };`,
      },
      {
        title: "carouselInnerDisplay",
        content:
          "The carouselInnerDisplay props is used to specify the type of box an element generates, controlling its layout behavior. It determines how an element is rendered in the document, affecting its visibility, positioning, and interaction with other elements. e.g.",
        code: `const carouselProps = {
          style:{ 
            carouselInnerDisplay: 'flex',
          }, 
        };`,
      },
      {
        title: "carouselItemWidth",
        content:
          "You can set the carouselItemWidth using various units, such as pixels (px), percentages (%), em units (em), or other length units. e.g.",
        code: `const carouselProps = {
          style:{ 
            carouselItemWidth: '100%',
          }, 
        };`,
      },
      {
        title: "carouselItemOverflow",
        content:
          "The carouselItemOverflow props specifies how content that exceeds the dimensions of an element's content area should be handled. It determines whether scrollbars should appear, content should be clipped, or overflow should be displayed in other ways. e.g.",
        code: `const carouselProps = {
          style:{ 
            carouselItemOverflow: 'hidden',
          }, 
        };`,
      },
      {
        title: "carouselItemDisplay",
        content:
          "The carouselItemDisplay props is used to specify the type of box an element generates, controlling its layout behavior. It determines how an element is rendered in the document, affecting its visibility, positioning, and interaction with other elements. e.g.",
        code: `const carouselProps = {
          style:{ 
            carouselItemDisplay: 'flex',
          }, 
        };`,
      },
      {
        title: "carouselItemJustifyContent",
        content:
          "The carouselItemJustifyContent props is used in flexbox layouts to align flex items along the main axis of the flex container e.g.",
        code: `const carouselProps = {
          style:{ 
            carouselItemJustifyContent: 'center',
          }, 
        };`,
      },
      {
        title: "carouselItemAlignItems",
        content:
          "The carouselItemAlignItems props is used to define how flex items are aligned along the cross axis of their flex container. It applies to flex containers, which are elements with a display property set to flex or inline-flex. e.g.",
        code: `const carouselProps = {
          style:{ 
            carouselItemAlignItems: 'center',
          }, 
        };`,
      },
      {
        title: "carouselItemBackgroundColor",
        content:
          "You can use color names, hex codes, or RGB values to change background color. e.g.",
        code: `const carouselProps = {
          style:{ 
            carouselItemBackgroundColor: '#000'
          }, 
        };`,
      },
      {
        title: "carouselImageWidth",
        content:
          "You can set the carouselImageWidth using various units, such as pixels (px), percentages (%), em units (em), or other length units. e.g.",
        code: `const carouselProps = {
          style:{ 
            carouselImageWidth: '100%',
          }, 
        };`,
      },
      {
        title: "carouselImageHeight",
        content:
          "The carouselImageHeight props is used to set the height of carousel wrapper div. e.g.",
        code: `const carouselProps = {
          style:{ 
            carouselImageHeight: '600px',
          }, 
        };`,
      },
      {
        title: "carouselImageObjectFit",
        content:
          "The carouselImageObjectFit props is used to fix an image element's content should be resized and fitted within its container. e.g.",
        code: `const carouselProps = {
          style:{ 
            carouselImageObjectFit: 'contain',
          }, 
        };`,
      },
      {
        title: "carouselButtonBackgroundColor",
        content:
          "You can use color names, hex codes, or RGB values to change background color. e.g.",
        code: `const carouselProps = {
          style:{ 
            carouselButtonBackgroundColor: 'rgb(255 255 255 / 26%)'
          }, 
        };`,
      },
      {
        title: "carouselButtonBorder",
        content:
          "The carouselButtonBorder props is used to set the border of an element. e.g.",
        code: `const carouselProps = {
          style:{ 
            carouselButtonBorder: 'none',
          }, 
        };`,
      },
      {
        title: "carouselButtonBorderRadius",
        content:
          "The carouselButtonBorderRadius props is used to create rounded corners for an element's box. It allows you to control the curvature of the corners, giving a softer and more visually appealing look to elements. e.g.",
        code: `const carouselProps = {
          style:{ 
            carouselButtonBorderRadius: '9999px',
          }, 
        };`,
      },
      {
        title: "carouselButtonFontColor",
        content:
          "You can use carouselButtonFontColor props to set the color of an element. It can accept color values in various formats, such as color names, hex codes, RGB, or HSL values. e.g.",
        code: `const carouselProps = {
          style:{ 
            carouselButtonFontColor: '#fff',
          }, 
        };`,
      },
      {
        title: "carouselButtonPadding",
        content:
          "The carouselButtonPadding props is used to define the space between the content of an element and its borders. It determines the internal spacing within an element and contributes to its overall size. Padding can be applied to all four sides of an element (top, right, bottom, left) or individually. e.g.",
        code: `const carouselProps = {
          style:{ 
            carouselButtonPadding: '4px 12px',
          }, 
        };`,
      },
      {
        title: "carouselButtonPosition",
        content:
          "The carouselButtonPosition props is used to specify the positioning method of an element within its containing element or the document as a whole. e.g.",
        code: `const carouselProps = {
          style:{ 
            carouselButtonPosition: 'absolute',
          }, 
        };`,
      },
      {
        title: "carouselButtonTop",
        content:
          "The carouselButtonTop props is used to specify the vertical position of an absolutely positioned element relative to its containing block. It defines the distance between the top edge of the positioned element and the top edge of its containing block. e.g.",
        code: `const carouselProps = {
          style:{ 
            carouselButtonTop: '50%',
          }, 
        };`,
      },
      {
        title: "carouselButtonLineHeight",
        content:
          "The carouselButtonLineHeight props might be used to control the line height of these buttons, ensuring they align properly within the layout of the carousel. e.g.",
        code: `const carouselProps = {
          style:{ 
            carouselButtonLineHeight: '0px',
          }, 
        };`,
      },
    ],
  },
];

const props = {
  copyBtn: detail,
  component: (
    <div className="row">
      <div className="p-2">
        <Widget
          src="v1.wireframes.near/widget/Components.Carousel.Carousel"
          props={carouselProps}
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
