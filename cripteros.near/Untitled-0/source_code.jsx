/**
 * Project: Create
 * By: efiz.near, sking.near
 * Repository: https://github.com/near-everything/bos-workspace
 */

const widget = (src, props, other) => (
  <Widget src={src} props={props} {...other} />
);

const Url = {
  construct: (url, params) => {
    let query = "";
    Object.keys(params || {}).forEach((key) => {
      if (params.hasOwnProperty(key)) {
        query += Url.encode(key) + "=" + Url.encode(params[key]);
        if (key !== Object.keys(params || {}).slice(-1)[0]) {
          query += "&";
        }
      }
    });
    return url + "?" + query;
  },
  encode: (str) => {
    return `${str}`
      .replace(/[!'()*]/g, (c) => {
        return "%" + c.charCodeAt(0).toString(16);
      })
      .replace(/[^!'\(\)~\*A-Za-z0-9\-_\.~]/g, (c) => {
        return "%" + c.charCodeAt(0).toString(16);
      });
  },
};

State.init({
  page: props.page ?? "projects",
  project: props.project ?? null,
});

// Alias más legible para el preview
const projectTitle = "My Project Title"; // Este es el alias más legible
const final_id = "1afd4e7f-37fd-f85a-81d6-a2338b0fd4e5";
const final_by = "mundoaurora.near";

// Mantén el UUID para operaciones internas
const id = final_id;
const by = final_by;

if (final_id !== "??replace_with_id??") {
  id = final_id;
}
if (final_by !== "??replace_with_account??") {
  by = final_by;
}

const project = Social.get(`${by}/thing/project/${id}/**`);
const docs = Social.get(`${by}/document/${id}/*/title`);

if (project === null || docs === null) return <></>;
if (project === undefined) return <>Project not found</>;

State.init({ doc: props.doc, data: null });

if (state.doc) {
  State.update({ data: Social.get(`${by}/document/${id}/${state.doc}/**`) });
} else {
  State.update({ doc: Object.keys(docs || {})?.[0] });
}

const goTo = ({ doc }) => {
  doc && State.update({ doc: doc });
};

const href = ({ doc }) => {
  return `#/createit.near/widget/p?id=${id}&by=${by}&doc=${doc}`;
};

const unflattenDocuments = (inputObject) => {
  if (!inputObject) {
    return inputObject;
  }
  const result = {};
  Object.keys(inputObject).forEach((key) => {
    const keys = key.split(".");
    let currentLevel = result;

    keys.forEach((k, i) => {
      if (i === keys.length - 1) {
        if (currentLevel[k] && Object.keys(currentLevel[k] || {}).length > 0) {
          Object.assign(currentLevel[k], inputObject[key]);
        } else {
          currentLevel[k] = inputObject[key];
        }
        currentLevel[k].path = key;
      } else {
        currentLevel[k] = currentLevel[k] || {};
        currentLevel[k].children = currentLevel[k].children || {};
        currentLevel = currentLevel[k].children;
      }
    });
  });

  return result;
};

const pages = [
  {
    id: "projects",
    title: "Projects",
    active: state.page === "projects",
    widget: "createit.near/widget/manager.index",
    provider: "createit.near/widget/Provider",
  },
  {
    id: "editor",
    title: "Editor",
    active: state.page === "editor",
    widget: "createit.near/widget/editor.index",
    provider: "createit.near/widget/Provider",
  },
  {
    id: "manage",
    title: "Manage",
    active: state.page === "manage",
    widget: "createit.near/widget/project.index",
    provider: "createit.near/widget/Provider",
  },
];
const activePage = pages.find((p) => p.active);

const navigate = (v, params) => {
  State.update({ page: v, project: params?.project });
  const url = Url.construct("#/createit.near/widget/home", params);
  Storage.set("url", url);
};

return (
  <>
    <div className="row">
      {widget("createit.near/widget/ui.navbar", {
        template: "createit.near/widget/templates.ui.navbar.default",
        onPageChange: navigate,
        pages: ["projects"],
      })}
      <div className="col">
        <h1>{projectTitle}</h1>{" "}
        {/* Muestra el alias más legible en la interfaz */}
        {activePage.provider
          ? widget(activePage.provider, {
              Children: (p) => widget(activePage.widget, p),
              navigate,
              project,
              ...props,
              templates: {
                Folders: "createit.near/widget/editor.uiFolders",
              },
            })
          : widget(activePage.widget, { ...props, navigate, project })}
      </div>
    </div>
  </>
);
