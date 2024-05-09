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
  cardHeader: (
    <>
      <h4>Card Header</h4>
    </>
  ),
  cardBody: (
    <>
      <p>Card Body Sample Text</p>
    </>
  ),
  cardStyle: {
    backgroundColor: "#31303052",
    borderColor: "white",
  },
  cardHeaderStyle: {
    color: "white",
  },
  cardBodyStyle: {
    color: "white",
  },
};

const detail = `const cardsProps ={
  cardHeader:(<><h4>Card Header</h4></>),
  cardBody:(
    <>
    <p>Card Body Sample Text</p>
    </>),
  cardStyle: {
    backgroundColor: "#31303052",
    borderColor: "white",
  },
  cardHeaderStyle:{
    color: "white",
  },
  cardBodyStyle: {
    color: "white",
  }
};
return(
<Widget src="v1.wireframes.near/widget/Components.Card.TitleCard" props={cardsProps}/>
);`;
const explanation =
  "A 'card' is a versatile and commonly used component for displaying content in a structured and visually appealing manner. Cards are often used to present various types of information, such as articles, products, user profiles, or any other type of content that benefits from a compact and organized presentation.";

const propsExplanation = [
  {
    title: "cardHeader",
    required: "false",
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
          src="v1.wireframes.near/widget/Components.Card.TitleCard"
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
