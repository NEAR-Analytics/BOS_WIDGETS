// const menu = [
//   {
//     name: "Conjugar Nombre",
//     link: "/embed/gagdiez.near/widget/Darija.Nombre",
//   },
//   { name: "Posesivos", link: "/embed/gagdiez.near/widget/Darija.Posesivos" },
//   {
//     name: "Familia Nuclear",
//     link: "/embed/gagdiez.near/widget/Darija.FamiliaNucleo",
//   },
//   {
//     name: "Familia Extendida",
//     link: "/embed/gagdiez.near/widget/Darija.FamiliaExtendida",
//   },
// ];

const menu = JSON.parse(Social.get("gagdiez.near/darija/lessons")) || [];

return (
  <div className="p-3">
    <h4> Lecciones </h4>
    <ul className="list-group mt-3">
      {menu.map((item) => (
        <li class="list-group-item">
          <a
            href={`/embed/gagdiez.near/widget/Darija.Lessons.Lesson?uuid=${item.knowledge}&evaluator=${item.evaluator}`}
          >
            {item.name}
          </a>
        </li>
      ))}
    </ul>
  </div>
);
