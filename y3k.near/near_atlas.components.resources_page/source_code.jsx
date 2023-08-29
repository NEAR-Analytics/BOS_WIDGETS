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
  <div className="bg-gray-900 text-white">
    <div className="flex flex-col py-4 px-12">
      <div className="py-4">
        <div className="pl-[116px] pr-[205px] py-8">
          <div className="text-7xl">{mainTitle}</div>
          <div className="text-xl font-light">{mainSubtitle}</div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-20 md:px-10">
        {cards.map((card, index) => (
          <div key={index}>
            <img
              src={card.imageSrc}
              alt={card.imageAlt}
              className="rounded-t-xl"
            />
            <div className={`px-9 pt-10 pb-14 ${card.bgColor} rounded-b-lg`}>
              <div className="text-white space-y-4">
                <h3 className="text-xl font-bold">{card.title}</h3>
                <div className="text-lg font-light">{card.subtitle}</div>
              </div>
              <div className="flex justify-between pt-8">
                <ul className="flex flex-col gap-y-2.5">
                  {card.items.map((item, i) => (
                    <li key={i} className="flex space-x-3">
                      {/* Removed icon as you requested */}
                      <span className="font-bold">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col justify-end">
                  <a
                    href="#"
                    className="py-3 px-6 bg-white text-black rounded-full"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
