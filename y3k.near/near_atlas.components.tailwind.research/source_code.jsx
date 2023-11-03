const blog_posts = [
  {
    index: 0,
    title: "NEAR Analytics Digests",
    description: "September 21st 2023",
    thumbnail: "https://placehold.co/300x200/d1d4ff/352cb5.png?text=NEAR-Sep21",
    link: "https://docs.google.com/presentation/d/1WAYL7Tohgssnta6pBQB0flb37fdtYZxh2l9zrHOeS9Y/edit#slide=id.g267a5067256_1_273",
  },
  {
    index: 1,
    title: "NEAR Analytics Digests",
    description: "September 25th 2023",
    thumbnail: "https://placehold.co/300x200/d1d4ff/352cb5.png?text=NEAR-Sep25",
    link: "https://docs.google.com/presentation/d/1aBZgiHnJXLupAGlyDVHOvwSv-mSs6jfM4qkLMhl6B60/edit#slide=id.g221fdd5ab52_6_561",
  },
  {
    index: 2,
    title: "NEAR Analytics Digests",
    description: "October 16th 2023",
    thumbnail: "https://placehold.co/300x200/d1d4ff/352cb5.png?text=NEAR-Oct16",
    link: "https://docs.google.com/presentation/d/1YgtrCvgHJhAuMD2Qu1vYC5h2q1oCLj1Ib4EgW-YexEs/edit#slide=id.g221fdd5ab52_6_561",
  },
  {
    index: 3,
    title: "Reflexivity Research",
    description: "NEAR Q3 Overview",
    thumbnail:
      "https://placehold.co/300x200/d1d4ff/352cb5.png?text=Reflexivity",
    link: "https://www.reflexivityresearch.com/free-reports/near-q3-overview",
  },
  {
    index: 4,
    title: "NF Transparency ",
    description: "Reports Q1 2023",
    thumbnail: "https://placehold.co/300x200/d1d4ff/352cb5.png?text=NEAR",
    link: "https://near.org/blog/near-foundation-transparency-report-q1-2023",
  },
  {
    index: 5,
    title: "NF Transparency",
    description: "Reports Q2 2023",
    thumbnail: "https://placehold.co/300x200/d1d4ff/352cb5.png?text=NEAR",
    link: "https://near.org/blog/near-foundation-transparency-report-q2-2023",
  },
];

return (
  <div className="bg-gradient-to-bl from-blue-900 to-violet-900 ">
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
        {blog_posts.map((post) => (
          <Widget
            key={post.index} // It's a good practice to provide a unique key when mapping over an array in React
            src="y3k.near/widget/near_atlas.components.tailwind.blog.card"
            props={{
              title: post.title,
              thumbnail: post.thumbnail,
              description: post.description,
              link: post.link, // I added this in case you want to use the link within the Widget component
            }}
          />
        ))}
      </div>
    </div>
  </div>
);
