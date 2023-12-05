const topics = props.topics;
const menuLinks = props.menuLinks;
const selected = props.selected;

const capitalize = (words) => {
  return words
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
};

return (
  <>
    <div class="">
      <ul class="nav nav-pills flex-column mb-auto">
        {menuLinks.map(({ label, icon }) => (
          <li class="nav-item">
            <a
              href={`/?selected=${label}`}
              class={`nav-link ${selected !== label && "link-dark"}`}
            >
              <i class={`bi bi-${icon} me-1`} />
              {capitalize(label)}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </>
);
