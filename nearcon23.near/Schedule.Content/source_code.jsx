const accountId = "nearcon23.near";

const data = [
  {
    date: "Nov 7",
    time: "8 - 10:45 PM",
    title: "VIP Happy Hour",
    description: `This exclusive event for VIP members included 2 free drink tickets. Appetizers will also be served.`,
  },
  {
    date: "",
    time: "11 pm - late",
    title: "After Party",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.`,
  },
];

const imageLink =
  "https://plus.unsplash.com/premium_photo-1664541336896-b3d5f7dec9a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60";

const data2 = [
  {
    date: "Nov 8",
    time: "8:00 - 8:50 am",
    title: "Doors Open & Breakfast",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
  },
  {
    date: "",
    time: "9:00 - 9:05 am",
    title: "Opening Keynote",
    location: (
      <p>
        <span style={{ fontWeight: "600" }}>Nearcon HQ</span>{" "}
        <span style={{ textDecoration: "underline" }}>Conveto do Beato</span>
      </p>
    ),
    people: [
      {
        image: imageLink,
        name: "Illia Polosukhin",
        org: "NEAR",
      },
    ],
  },
  {
    date: "",
    time: "10 am",
    title: "Creators, Blockchain, Meet Lorem Ipsum ",
    active: true,
    location: (
      <p>
        <span style={{ fontWeight: "600" }}>Nearcon HQ</span>{" "}
        <span style={{ textDecoration: "underline" }}>Conveto do Beato</span>
      </p>
    ),
    people: [
      {
        image: imageLink,
        name: "Henrik Gebbing",
        org: "Finoa",
      },
    ],
  },
  {
    date: "",
    time: "11 am",
    active: true,
    title: "Creators, Blockchain, Meet Lorem Ipsum ",
    location: (
      <p>
        <span style={{ fontWeight: "600" }}>Nearcon HQ</span>{" "}
        <span style={{ textDecoration: "underline" }}>Conveto do Beato</span>
      </p>
    ),
    people: [
      {
        image: imageLink,
        name: "Henrik Gebbing",
        org: "Finoa",
      },
    ],
  },
  {
    date: "",
    time: "12 pm",
    title: "Lunch",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
  },
  {
    date: "",
    time: "1:30 pm",
    title: "Afternoon Panel",
    location: (
      <p>
        <span style={{ fontWeight: "600" }}>Nearcon HQ</span>{" "}
        <span style={{ textDecoration: "underline" }}>Conveto do Beato</span>
      </p>
    ),
    people: [
      {
        image: imageLink,
        name: "Illia Polosukhin",
        org: "NEAR",
      },
      {
        image: imageLink,
        name: "Lyllah Ledesma",
        org: "NEAR",
      },
      {
        image: imageLink,
        name: "Mary Beth Buchanan",
        org: "NEAR",
      },
      {
        image: imageLink,
        name: "Henrik Gebbing",
        org: "Finoa",
      },
      {
        image: imageLink,
        name: "Josh Klayman",
        org: "Linklates LLP",
      },
      {
        image: imageLink,
        name: "Jance Yang",
        org: "Gold Coin Research",
      },
    ],
  },
  {
    date: "",
    time: "2:30 pm",
    active: true,
    title: "Creators, Blockchain, Meet Lorem Ipsum ",
    location: (
      <p>
        <span style={{ fontWeight: "600" }}>Nearcon HQ</span>{" "}
        <span style={{ textDecoration: "underline" }}>Conveto do Beato</span>
      </p>
    ),
    people: [
      {
        image: imageLink,
        name: "Henrik Gebbing",
        org: "Finoa",
      },
    ],
  },
  {
    date: "",
    time: "3:30 pm",
    active: true,
    title: "Creators, Blockchain, Meet Lorem Ipsum ",
    location: (
      <p>
        <span style={{ fontWeight: "600" }}>Nearcon HQ</span>{" "}
        <span style={{ textDecoration: "underline" }}>Conveto do Beato</span>
      </p>
    ),
    people: [
      {
        image: imageLink,
        name: "Henrik Gebbing",
        org: "Finoa",
      },
    ],
  },
  {
    date: "",
    time: "4:30 pm",
    title: "Closing Keynote",
    location: (
      <p>
        <span style={{ fontWeight: "600" }}>Nearcon HQ</span>{" "}
        <span style={{ textDecoration: "underline" }}>Conveto do Beato</span>
      </p>
    ),
    people: [
      {
        image: imageLink,
        name: "Illia Polosukhin",
        org: "Finoa",
      },
    ],
  },
  {
    date: "",
    time: "8 - 10:45 pm",
    title: "VIP Happy Hour",
    description: `This exclusive event for VIP members included 2 free drink tickets. Appetizers will also be served.`,
  },
  {
    date: "",
    time: "11 pm",
    title: "After Party",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
  },
];

const jsxToMap = [data, data2];

return (
  <>
    <Widget src={`${accountId}/widget/Schedule.Filters`} />
    {jsxToMap.map((dateData, index) => {
      return (
        <Widget
          src={`${accountId}/widget/Schedule.ContentScheduleShow`}
          props={{ dateData, index }}
        />
      );
    })}
  </>
);
