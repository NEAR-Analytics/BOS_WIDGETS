const topics = props.topics;
const menuLinks = props.menuLinks;
const selected = props.selected;

const capitalize = (words) => {
  return words.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}
console.log(menuLinks)
return (
  <>
    <div class="">
      <ul class="nav nav-pills flex-column mb-auto">
        {menuLinks.map(({ label, icon }) =>
          <li class="nav-item">
            <a href={`/?selected=${label}`} class={`nav-link ${selected !== label && "link-dark"}`}>
              <i class={`bi bi-${icon} me-1`} />
              {capitalize(label)}
            </a>
          </li>
        )}
        <li>
          <a
            href="#"
            class="nav-link link-dark btn-toggle"
            data-bs-toggle="collapse"
            data-bs-target="#collapse"
            aria-expanded="true"
          >
            <i class="bi bi-chat-right-text me-1" />
            Channels
          </a>
          <ul class="list-unstyled fw-normal pb-1 ps-4 small show" >

            {
              topics.map(topic =>
                <li>
                  <a href={`/?selected=discussion&identifier=${topic}`} class={`nav-link ${selected !== topic && "link-dark"}`}>
                    {capitalize(topic)}
                  </a>
                </li>
              )
            }
          </ul>
        </li>
      </ul>
    </div>
  </>
);
