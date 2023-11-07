let data = {
  targetPanel: props.targetPanel || "None Target Panel",
  text: props.text || "Text",
  active: props.active || false,
};
return (
  <>
    <li class="nav-item">
      <a
        href={`#${data.targetPanel}`}
        role="tab"
        data-bs-toggle="tab"
        class={data.active == true ? "nav-link active" : "nav-link"}
      >
        {data.text}
      </a>
    </li>
  </>
);
