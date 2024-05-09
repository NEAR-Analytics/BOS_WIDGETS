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
      iconName: "arrow-left-circle",
      iconSize: "25px",
      iconColor: "#fff",
    }}
  />
);
const rightArrow = (
  <Widget
    src={`v1.wireframes.near/widget/Components.Icon.BootstrapIcons`}
    props={{
      iconName: "arrow-right-circle",
      iconSize: "25px",
      iconColor: "#fff",
    }}
  />
);
const carouselProps = {
  arrowLeft: leftArrow,
  arrowRight: rightArrow,
  slidesData: [
    {
      id: 1,
      image: "https://wireframes.design/slider1.jpeg",
      imageAlt: "Slide 1",
    },
    {
      id: 2,
      image: "https://wireframes.design/slider2.jpeg",
      imageAlt: "Slide 2",
    },
    {
      id: 3,
      image: "https://wireframes.design/slider3.jpeg",
      imageAlt: "Slide 3",
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
  slidesData: [
    {
      id: 1,
      image:
        "https://wireframes.design/slider1.jpeg",
      imageAlt: "Slide 1",
    },
    {
      id: 2,
      image:
        "https://wireframes.design/slider2.jpeg",
      imageAlt: "Slide 2",
    },
  ],
};
return(
<Widget src="v1.wireframes.near/widget/Components.Carousel.AutoSlideCarousel" props={carouselProps}/>
);`;
const explanation =
  "An 'Auto Slide Carousel' is a type of carousel or slideshow component commonly used to automatically transition between slides at regular intervals without requiring user interaction. It provides a dynamic way to showcase content such as images, products, or featured articles.";

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
    title: "slidesData",
    required: "true",
    content:
      "You can create an object array as like 'slidesData' to represents a slide with properties like 'id', 'image', and 'imageAlt'. e.g.",
    code: `const carouselProps = {
        slidesData:[
          {
            id: 1,
            image:
              "https://wireframes.design/slider1.jpeg",
            imageAlt: "Slide 1",
          },
          {
            id: 2,
            image:
              "https://wireframes.design/slider2.jpeg",
            imageAlt: "Slide 2",
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
        title: "image",
        content:
          "The image property is used to specify the URL of an image that will be displayed in a slideshow, carousel, or any other component that renders images dynamically on a webpage.  e.g.",
        code: `const carouselProps = {
          slidesData:[
            {
              image: "https://wireframes.design/slider2.jpeg",
            },
          ]
        };`,
      },
      {
        title: "imageAlt",
        content:
          "The imageAlt property is used to provide alternative text (often abbreviated as 'alt text') for an image within a webpage. e.g.",
        code: `const carouselProps = {
          slidesData:[
            {
              imageAlt: "Slide 1",
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
          itemWidth: "100%",
          itemHeight: "600px",
        },
      };`,
    children: [
      {
        title: "itemWidth",
        content:
          "The props itemWidth typically refers to the width of individual slides in a slideshow or carousel component.You can use various units, such as pixels (px), percentages (%), em units (em), or other length units. e.g.",
        code: `const carouselProps = {
          style:{ 
            itemWidth: '100%',
          }, 
        };`,
      },
      {
        title: "itemHeight",
        content:
          "The props itemHeight typically refers to the height of individual slides in a slideshow or carousel component. e.g.",
        code: `const carouselProps = {
          style:{ 
            itemHeight: '600px',
          }, 
        };`,
      },
      {
        title: "imageWidth",
        content:
          "The props imageWidth typically refers to the width of images within individual slides in a slideshow or carousel component. e.g.",
        code: `const carouselProps = {
          style:{ 
            imageWidth: '100%',
          }, 
        };`,
      },
      {
        title: "imageHeight",
        content:
          "The props imageHeight typically refers to the height of images within individual slides in a slideshow or carousel component. e.g.",
        code: `const carouselProps = {
          style:{ 
            imageHeight: '100%',
          }, 
        };`,
      },
      {
        title: "imageObjectFit",
        content:
          "The props imageObjectFit refers to a configuration option used to specify how images within individual slides in a slideshow or carousel component should be resized and fitted within their container. e.g.",
        code: `const carouselProps = {
          style:{ 
            imageObjectFit: 'cover',
          }, 
        };`,
      },
      {
        title: "btnBackgroundColor",
        content:
          "The props btnBackgroundColor is used for specifying the background color of a button. t allows you to define the color that fills the background area of a button element. e.g.",
        code: `const carouselProps = {
          style:{ 
            btnBackgroundColor: 'transparent',
          }, 
        };`,
      },
      {
        title: "btnBorder",
        content:
          "The btnBorder props is used for specifying the border style, width, and color of a button. e.g.",
        code: `const carouselProps = {
          style:{ 
            btnBorder: 'none',
          }, 
        };`,
      },
      {
        title: "btnBorderRadius",
        content:
          "The props btnBorderRadius is used to define the radius of the border corners of a button. It allows you to create buttons with rounded corners. e.g.",
        code: `const carouselProps = {
          style:{ 
            btnBorderRadius: '9999px',
          }, 
        };`,
      },
      {
        title: "btnFontColor",
        content:
          "The props btnColor is used for specifying the color of a button. e.g.",
        code: `const carouselProps = {
          style:{ 
            btnColor: '#fff',
          }, 
        };`,
      },
      {
        title: "btnPadding",
        content:
          "The props btnPadding is used to define the padding (spacing) between the content (text or icon) and the edges of a button. e.g.",
        code: `const carouselProps = {
          style:{ 
            btnPadding: '4px 12px',
          }, 
        };`,
      },
      {
        title: "btnPosition",
        content:
          "The props btnPosition is used to the positioning of a button element within a layout or container. e.g.",
        code: `const carouselProps = {
          style:{ 
            btnPosition: 'absolute',
          }, 
        };`,
      },
      {
        title: "btnTop",
        content:
          "The props btnTop is used to control the vertical position of a button element within a layout or container. e.g.",
        code: `const carouselProps = {
          style:{ 
            btnTop: '50%',
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
          src="v1.wireframes.near/widget/Components.Carousel.AutoSlideCarousel"
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
