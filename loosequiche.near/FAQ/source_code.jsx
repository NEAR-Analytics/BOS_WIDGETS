const questions = props.questions || [
  {
    question: "What is NEAR India?",
    answer:
      " NEAR India refers to the community, initiatives, and activities related to the NEAR Protocol blockchain platform within India. It may include developers, enthusiasts, and organizations collaborating to promote and contribute to the NEAR ecosystem.",
  },
  {
    question: "What is NEAR Protocol?",
    answer:
      "NEAR Protocol is a decentralized application platform designed for building and deploying applications on the blockchain. It features scalability, developer-friendliness, and support for smart contracts.",
  },
  {
    question: "How can I get involved with NEAR India?",
    answer:
      "You can join NEAR India by participating in community events, contributing to projects, or engaging with the NEAR Protocol community. Follow NEAR India's official channels for announcements and opportunities.",
  },
  {
    question: "Are there meetups or events organized by NEAR India?",
    answer:
      "Yes, NEAR India may organize meetups, workshops, and events to foster collaboration and knowledge-sharing among the community. Stay tuned to official announcements for upcoming events",
  },
  {
    question: "Can I develop on the NEAR Protocol as an Indian developer?",
    answer:
      "Absolutely! NEAR Protocol is open to developers worldwide. You can start by exploring NEAR's developer documentation and joining the developer community for support and collaboration.",
  },
  {
    question: "What programming languages are supported on NEAR Protocol?",
    answer:
      "NEAR Protocol supports various programming languages, making it accessible to a broad range of developers. Common languages include Rust and AssemblyScript",
  },
  {
    question: "What is the NEAR Token used for?",
    answer:
      "The NEAR Token (NEAR) serves various purposes within the NEAR ecosystem, including transaction fees, staking for network security, and participation in governance decisions.",
  },
  {
    question: "How can I participate in governance on NEAR Protocol?",
    answer:
      "To participate in governance, you can stake NEAR tokens and engage in discussions and voting on governance proposals. Visit NEAR's official governance resources for detailed information.",
  },
  {
    question: "Where can I find more information about NEAR Protocol?",
    answer:
      "For the latest and detailed information about NEAR Protocol, visit the official NEAR Protocol website at near.org, and explore official documentation and community resources.",
  },
];

const questionSectionClass = {
  background: "#fff",
  border: "1px solid #d6e0f1",
  borderRadius: "10px",
  marginBottom: "16px",
  color: "#383e4d",
  overflow: "hidden",
};

const accordionItems = questions.map((item, id) => {
  const collapseTarget = `collapse${id}`;
  const headerTarget = `heading${id}`;

  return (
    <div className="accordion-item" style={questionSectionClass}>
      <h4 class="accordion-header" id={headerTarget}>
        <button
          className="accordion-button collapsed"
          style={{ fontSize: "21px", fontWeight: "500", boxShadow: "none" }}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#${collapseTarget}`}
          aria-expanded="false"
          aria-controls={collapseTarget}
        >
          {item.question}
        </button>
      </h4>
      <div
        id={collapseTarget}
        className="accordion-collapse collapse"
        aria-labelledby={headerTarget}
        data-bs-parent="#faq"
      >
        <div className="accordion-body">{item.answer}</div>
      </div>
    </div>
  );
});

const accordion = (
  <div class="accordion" id="faq">
    {accordionItems}
  </div>
);

const supportTeamSection = (
  <div className="mt-5 text-center">
    <h6 className="mb-3 text-uppercase" style={{ fontWeight: 600 }}>
      Support team
    </h6>
    <h3>Still have questions?</h3>
    <p className="h2-description mt-3 faq__support-text">
      If you cannot find an answer to your question in our FAQ, you can always
      contact us. We will answer you shortly!
    </p>
    <p className="mt-4 steps__btn-container">
      <a
        type="button"
        className="btn btn-primary"
        href="https://t.me/nearindia"
      >
        Contact Us
      </a>
    </p>
  </div>
);

return (
  <div className="row">
    <div className="col-12">{accordion}</div>
    <div className="col-12">{supportTeamSection}</div>
  </div>
);
