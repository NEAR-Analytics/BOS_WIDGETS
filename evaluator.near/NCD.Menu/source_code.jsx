const menuLinks = props.menuLinks;
const selected = props.selected;
const onSelect = props.onSelect;

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
        {menuLinks.map(({ label, icon, component }) => (
          <li class="nav-item">
            <a
              href={`/#`}
              class={`nav-link ${selected !== label && "link-dark"}`}
              onClick={ () => onSelect(component)}
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
