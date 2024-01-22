const Wrapper = styled.div`
  /* Add styles that were previously in your CSS classes here */
  
`;

let Style = styled.div`

`;

const mainTitle = "Resources";
const mainSubtitle = "Learn more about NEAR Ecosystem from other data sources";
const cards = [
  {
    imageSrc: "https://picsum.photos/seed/picsum/200/300",
    imageAlt: "Your Alt Text",
    title: "Your Card Title",
    subtitle: "Your Card Subtitle",
    bgColor: "bg-yellow-500",
    items: ["Item 1", "Item 2", "Item 3"],
  },

  {
    imageSrc: "https://picsum.photos/seed/picsum/200/300",
    imageAlt: "Your Alt Text",
    title: "Your Card Title",
    subtitle: "Your Card Subtitle",
    bgColor: "bg-yellow-500",
    items: ["Item 1", "Item 2", "Item 3"],
  },

  {
    imageSrc: "https://picsum.photos/seed/picsum/200/300",
    imageAlt: "Your Alt Text",
    title: "Your Card Title",
    subtitle: "Your Card Subtitle",
    bgColor: "bg-yellow-500",
    items: ["Item 1", "Item 2", "Item 3"],
  },
];

return (
  <div className="bg-gray-900 text-white h-full">
    <div className="flex flex-col py-4 px-12">
      <div className="py-4">
        <div className="py-8">
          <div className="text-7xl">Welcome to NEAR Atlas!</div>
          <div className="text-xl font-light">
            NEAR Atlas is an analytics platform built on the BOS. <br />
            <br />
            It's open source and built by the team at{" "}
            <a
              href="https://github.com/NEAR-Analytics"
              target="_blank"
              className="text-yellow-400"
            >
              NEAR Analytics
            </a>
            ,{" "}
            <a
              href="https://github.com/0bserver07"
              target="_blank"
              className="text-yellow-400"
            >
              Yad
            </a>
            ,{" "}
            <a
              href="https://github.com/abhishekanirudhan"
              target="_blank"
              className="text-yellow-400"
            >
              Abhi
            </a>{" "}
            and{" "}
            <a
              href="https://twitter.com/dw_stein"
              target="_blank"
              className="text-yellow-400"
            >
              DW
            </a>
            <br />
            <br /> Here you will find your guide to NEAR to explore what is
            happening within the ecosystem. This is an evolving project so
            please feel free to leave your feedback at
            david.weinstein@near.foundation or @dweinstein on Telegram. - NEAR
            Foundation Analytics
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-20 md:px-10"></div>
    </div>
  </div>
);
