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

const carouselProps = {
  slidesData: [
    {
      id: 1,
      image: "https://wireframes.design/slider1.jpeg",
      title: "Slide First ",
      text: "This is slide first",
      imageAlt: "Slide 1",
    },
    {
      id: 2,
      image: "https://wireframes.design/slider2.jpeg",
      title: "Slide Second",
      text: "This is slide second",
      imageAlt: "Slide 2",
    },
    {
      id: 3,
      image: "https://wireframes.design/slider3.jpeg",
      title: "Slide Third",
      text: "This is slide third",
      imageAlt: "Slide 3",
    },
  ],
  style: {
    contentBackgroundColor: "rgba(60, 60, 60,0.4)",
    headingFontColor: "white",
    textFontColor: "white",
  },
};

const detail = `const carouselProps ={
  slidesData: [
    {
      id: 1,
      image:
        "https://wireframes.design/slider1.jpeg",
      title: "Slide First ",
      text: "This is slide first",
      imageAlt: "Slide 1",
    },
    {
      id: 2,
      image:
        "https://wireframes.design/slider2.jpeg",
      title: "Slide Second",
      text: "This is slide second",
      imageAlt: "Slide 2",
    },
  ],
};
return(
<Widget src="v1.wireframes.near/widget/Components.Carousel.CaptionCarousel" props={carouselProps}/>
);`;
const explanation =
  "A 'Caption Carousel' is a type of carousel or slideshow component commonly used in web development to display a series of images along with captions or additional text for each image. It provides a visually appealing way to showcase content such as product images, portfolio items, or featured articles on a website.";

const propsExplanation = [
  {
    title: "slidesData",
    required: "true",
    content:
      "You can create an object array as like 'slidesData' to represents a slide with properties like 'id', 'image', 'title', 'text', and 'imageAlt'. e.g.",
    code: `const carouselProps = {
        slidesData:[
          {
            id: 1,
            image:
              "https://wireframes.design/slider1.jpeg",
            title: "Slide First ",
            text: "This is slide first",
            imageAlt: "Slide 1",
          },
          {
            id: 2,
            image:
              "https://wireframes.design/slider2.jpeg",
            title: "Slide Second",
            text: "This is slide second",
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
        title: "title",
        content:
          "The title property is typically used to provide a title or heading for a specific item, section, or component within a web application. e.g.",
        code: `const carouselProps = {
          slidesData:[
            {
              title: "First Slide",
            },
          ]
        };`,
      },
      {
        title: "text",
        content:
          "The text property is used to provide additional descriptive text or content for a specific item, section, or component within a web application.  e.g.",
        code: `const carouselProps = {
          slidesData:[
            {
              text: "This is slide first",
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
    title: "carouselContainerStyle",
    content:
      "You can use the carouselContainerStyle props to customize the container of carousel by adding more CSS properties is needed. e.g.",
    code: `const carouselProps = {
      carouselContainerStyle:{ 
        border: "none",
        padding: "0px",
      },
    };`,
  },
  {
    title: "carouselSlideStyle",
    content:
      "You can use the carouselSlideStyle props to customize the slide of carousel by adding more CSS properties is needed. e.g.",
    code: `const carouselProps = {
      carouselSlideStyle:{ 
        background: "transparent",
      },
    };`,
  },
  {
    title: "slideImageStyle",
    content:
      "You can use the props 'slideImageStyle' to customize the images of carousel according to you. e.g.",
    code: `const carouselProps = {
      slideImageStyle:{ 
        border: "none",
      },
    };`,
  },
  {
    title: "slideContentStyle",
    content:
      "You can use the props 'slideContentStyle' to customize the content of carousel accordingly. e.g.",
    code: `const carouselProps = {
      slideContentStyle:{ 
        color: "#000",
      },
    };`,
  },
  {
    title: "slideRowStyle",
    content:
      "You can use the props 'slideRowStyle' to customize the row of carousel. e.g.",
    code: `const carouselProps = {
      slideRowStyle:{ 
        height: "100%",
      },
    };`,
  },
  {
    title: "slideHeadingStyle",
    content:
      "The props 'slideHeadingStyle' is used for the heading element within a slide in a slideshow or carousel component. These styles are used to customize the appearance of the heading text within each slide. e.g.",
    code: `const carouselProps = {
      slideHeadingStyle:{ 
        padding: "2px",
      },
    };`,
  },
  {
    title: "slideTextStyle",
    content:
      "The 'slideTextStyle' props is used for the text content within each slide of a slideshow or carousel component. These styles help customize the appearance of the text to ensure it aligns with the overall design and layout of the slideshow. e.g.",
    code: `const carouselProps = {
      slideTextStyle:{ 
        padding: "2px 0px",
      },
    };`,
  },
  {
    title: "style",
    content:
      "You can use the style attribute to apply styles to components. e.g.",
    code: `const carouselProps = {
        style:{ 
          slideWidth: "100%",
          slideHeight: "600px",
        },
      };`,
    children: [
      {
        title: "slideWidth",
        content:
          "The props slideWidth typically refers to the width of individual slides in a slideshow or carousel component.You can use various units, such as pixels (px), percentages (%), em units (em), or other length units. e.g.",
        code: `const carouselProps = {
          style:{ 
            slideWidth: '100%',
          }, 
        };`,
      },
      {
        title: "slideHeight",
        content:
          "The props slideHeight typically refers to the height of individual slides in a slideshow or carousel component. e.g.",
        code: `const carouselProps = {
          style:{ 
            slideHeight: '600px',
          }, 
        };`,
      },
      {
        title: "slideImageWidth",
        content:
          "The props slideImageWidth typically refers to the width of images within individual slides in a slideshow or carousel component. e.g.",
        code: `const carouselProps = {
          style:{ 
            slideImageWidth: '100%',
          }, 
        };`,
      },
      {
        title: "slideImageHeight",
        content:
          "The props slideImageHeight typically refers to the height of images within individual slides in a slideshow or carousel component. e.g.",
        code: `const carouselProps = {
          style:{ 
            slideImageHeight: '100%',
          }, 
        };`,
      },
      {
        title: "slideImageObjectFit",
        content:
          "The props slideImageObjectFit refers to a configuration option used to specify how images within individual slides in a slideshow or carousel component should be resized and fitted within their container. e.g.",
        code: `const carouselProps = {
          style:{ 
            slideImageObjectFit: 'cover',
          }, 
        };`,
      },
      {
        title: "contentPosition",
        content:
          "The props contentPosition likely refers to a configuration option used to specify the position or alignment of content within individual slides in a slideshow or carousel component. e.g.",
        code: `const carouselProps = {
          style:{ 
            contentPosition: 'absolute',
          }, 
        };`,
      },
      {
        title: "contentTop",
        content:
          "The props contentTop refers to a configuration option used to specify the vertical position of content within individual slides in a slideshow or carousel component. It allows to control the placement of content, such as text or images, from the top edge of the slide's content area. e.g.",
        code: `const carouselProps = {
          style:{ 
            contentTop: '50%',
          }, 
        };`,
      },
      {
        title: "contentLeft",
        content:
          "The props contentLeft refers to a configuration option used to specify the horizontal position of content within individual slides in a slideshow or carousel component. It enables you to precisely control the placement of content, such as text or images, from the left edge of the slide's content area. e.g.",
        code: `const carouselProps = {
          style:{ 
            contentLeft: '50%',
          }, 
        };`,
      },
      {
        title: "contentTextAlign",
        content:
          "The props contentTextAlign refers to a configuration option used to specify the horizontal alignment of text content within individual slides in a slideshow or carousel component. It allows you to control how text is aligned within the slide's content area. e.g.",
        code: `const carouselProps = {
          style:{ 
            contentTextAlign: 'center',
          }, 
        };`,
      },
      {
        title: "contentBackgroundColor",
        content:
          "The props contentBackgroundColor refers to a configuration option used to specify the background color of the content area within individual slides in a slideshow or carousel component. It allows you to customize the background color behind the content, such as text or images, within each slide. e.g.",
        code: `const carouselProps = {
          style:{ 
            contentBackgroundColor: '#fff6f645',
          }, 
        };`,
      },
      {
        title: "contentMinHeight",
        content:
          "The props contentMinHeight refers to a configuration option used to specify the minimum height of the content area within individual slides in a slideshow or carousel component. It allows you to ensure that the content area has a minimum height, even if the content itself is smaller. e.g.",
        code: `const carouselProps = {
          style:{ 
            contentMinHeight: '200px',
          }, 
        };`,
      },
      {
        title: "contentWidth",
        content:
          "The props contentWidth is used to specify the width of the content area within each slide in the slideshow or carousel. It allows you to control the width of the content displayed within each slide. e.g.",
        code: `const carouselProps = {
          style:{ 
            contentWidth: '60%',
          }, 
        };`,
      },
      {
        title: "contentHeight",
        content:
          "The props contentHeight is used to specify the height of the content area within each slide in the slideshow or carousel. It allows you to control the height of the content displayed within each slide. e.g.",
        code: `const carouselProps = {
          style:{ 
            contentHeight: '300px',
          }, 
        };`,
      },
      {
        title: "contentDisplay",
        content:
          "The props contentDisplay is used to specify the display property for the content area within each slide in the slideshow or carousel. It allows you to control how the content is displayed within each slide. e.g.",
        code: `const carouselProps = {
          style:{ 
            contentDisplay: 'flex',
          }, 
        };`,
      },
      {
        title: "contentAlignItems",
        content:
          "The props contentAlignItems is used to specify the align-items property for the content area within each slide in the slideshow or carousel. It allows you to control the alignment of the content along the cross-axis within each slide. e.g.",
        code: `const carouselProps = {
          style:{ 
            contentAlignItems: 'center',
          }, 
        };`,
      },
      {
        title: "contentJustifyContent",
        content:
          "The props contentJustifyContent is used to specify the justify-content property for the content area within individual slides in a slideshow or carousel component. It allows you to control the alignment of the content along the main axis within each slide. e.g.",
        code: `const carouselProps = {
          style:{ 
            contentJustifyContent: 'center',
          }, 
        };`,
      },
      {
        title: "contentBorder",
        content:
          "The props contentBorder refers is used to specify the border property for the content area within individual slides in a slideshow or carousel component. It allows you to add borders around the content area to enhance its visual presentation. e.g.",
        code: `const carouselProps = {
          style:{ 
            contentBorder: '2px solid #ffffff00',
          }, 
        };`,
      },
      {
        title: "contentBorderRadius",
        content:
          "The props contentBorderRadius is used to the border-radius property for the content area within individual slides in a slideshow or carousel component. It allows you to add rounded corners to the borders of the content area. e.g.",
        code: `const carouselProps = {
          style:{ 
            contentBorderRadius: '20px',
          }, 
        };`,
      },
      {
        title: "rowWidth",
        content:
          "The props rowWidth is used to specify the width of a row containing multiple elements within a layout. It allows you to control the overall width of the row to ensure proper alignment and spacing of its child elements. e.g.",
        code: `const carouselProps = {
          style:{ 
            rowWidth: '100%',
          }, 
        };`,
      },
      {
        title: "headingMargin",
        content:
          "The props headingMargin is used to specify the margin around a heading element such as a <h1>, <h2>, <h3>, etc. It allows you to control the spacing between the heading element and surrounding content. e.g.",
        code: `const carouselProps = {
          style:{ 
            headingMargin: '0px',
          }, 
        };`,
      },
      {
        title: "headingFontColor",
        content:
          "The props headingFontColor is used to specify the color of the text within heading elements, such as <h1>, <h2>, etc. It allows developers to customize the color of the text displayed in headings. e.g.",
        code: `const carouselProps = {
          style:{ 
            headingFontColor: '#000',
          }, 
        };`,
      },
      {
        title: "headingFontSize",
        content:
          "The props headingFontSize is used to specify the size of the text within heading elements, such as <h1>, <h2>, etc. It allows you to customize the font size of the text displayed in headings. e.g.",
        code: `const carouselProps = {
          style:{ 
            headingFontSize: 'xxx-large',
          }, 
        };`,
      },
      {
        title: "headingFontFamily",
        content:
          "The props headingFontFamily is used to specify the font family for the text within heading elements, such as <h1>, <h2>, etc. It allows you to customize the typeface of the text displayed in headings. e.g.",
        code: `const carouselProps = {
          style:{ 
            headingFontFamily: 'Mona Sans',
          }, 
        };`,
      },
      {
        title: "headingFontWeight",
        content:
          "The headingFontWeight props is used to specify the font weight for the text within heading elements, such as <h1>, <h2>, etc. Font weight determines how thick or thin characters in text should be displayed. e.g.",
        code: `const carouselProps = {
          style:{ 
            headingFontWeight: '400',
          }, 
        };`,
      },
      {
        title: "headingTextAlign",
        content:
          "The props headingTextAlign is used to specify the alignment of the text within heading elements, such as <h1>, <h2>, <h3>, etc. It allows you to control the horizontal alignment of the text within the heading element. e.g.",
        code: `const carouselProps = {
          style:{ 
            headingTextAlign: 'center',
          }, 
        };`,
      },
      {
        title: "textMargin",
        content:
          "The textMargin props used to specify the margin around text elements. e.g.",
        code: `const carouselProps = {
          style:{ 
            textMargin: '5px 0 0',
          }, 
        };`,
      },
      {
        title: "textFontSize",
        content:
          "The textFontSize props is used to specify the size of the font for text elements. e.g.",
        code: `const carouselProps = {
          style:{ 
            textFontSize: '16px',
          }, 
        };`,
      },
      {
        title: "textFontColor",
        content:
          "The props textFontColor is used to specify the color of text elements. It allows you to customize the appearance of text by adjusting its color. e.g.",
        code: `const carouselProps = {
          style:{ 
            textFontColor: '#000',
          }, 
        };`,
      },
      {
        title: "textFontFamily",
        content:
          "The textFontSize props is used to define the font family for text elements. e.g.",
        code: `const carouselProps = {
          style:{ 
            textFontFamily: 'Mona Sans',
          }, 
        };`,
      },
      {
        title: "textFontWeight",
        content:
          "The textFontWeight props is used to specify the weight (thickness) of the font for text elements. e.g.",
        code: `const carouselProps = {
          style:{ 
            textFontWeight: '400',
          }, 
        };`,
      },
      {
        title: "textPadding",
        content:
          "Using textPadding props, you can adjust the spacing around text elements to achieve the desired layout and design. e.g.",
        code: `const carouselProps = {
          style:{ 
            textPadding: '0px 10px',
          }, 
        };`,
      },
      {
        title: "textTextAlign",
        content:
          "The textAlign props is used to specify the horizontal alignment of text within its containing element. e.g.",
        code: `const carouselProps = {
          style:{ 
            textTextAlign: 'center',
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
          src="v1.wireframes.near/widget/Components.Carousel.CaptionCarousel"
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
