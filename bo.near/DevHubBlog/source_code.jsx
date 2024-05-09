/* Social DB Schema:
"x.community.devhub.near": {
  "devhub-blog": {
      "categories": {"guide": "", "intro": ""},
      "blogs": {
        "0": {"category": "guide", "content": ..., "deleted": true},
        "1": {},
      },
      "lists": {
        "page1": {"blogs": "[0,1]", "title": "aaa", "subtitle": ""},
        "page2": ...
      }
  }
}
*/

const blog_owner = props.community || context.accountId;
const data = Social.getr(`${blog_owner}/devhub-blog`);

if (data === null) {
  return "Loading ...";
}

let devhubBlog = data || {};

State.init({
  title: "",
  subtitle: "",
  category: null,
  author: "",
  date: "",
  content: "",
  id: null,
  category: "",
  listName: "",
  listTitle: "",
  listSubtitle: "",
  blogIds: "[]",
  currentSelect: null,
});

let categories = devhubBlog.categories || {};

let lists = devhubBlog.lists || {};

const saveBlog = () => {
  let nextId = Number(devhubBlog.nextId || "0");
  let id = state.id || nextId;
  let newBlog = {
    title: state.title,
    subtitle: state.subtitle,
    category: state.category,
    author: state.author,
    date: state.date,
    content: state.content,
  };
  State.update({
    title: "",
    subtitle: "",
    category: null,
    author: "",
    date: "",
    content: "",
    id: null,
  });
  Social.set({
    "devhub-blog": {
      blogs: { [id.toString()]: newBlog },
      nextId: id == nextId ? nextId + 1 : nextId,
    },
  });
};

const editBlog = (i, blog) => {
  State.update({
    title: blog.title,
    subtitle: blog.subtitle,
    category: blog.category,
    author: blog.author,
    date: blog.date,
    content: blog.content,
    id: i,
  });
};

const deleteBlog = (i) => {
  Social.set(
    {
      "devhub-blog": {
        blogs: {
          [i.toString()]: {
            title: null,
            subtitle: null,
            category: null,
            author: null,
            date: null,
            content: null,
          },
        },
      },
    },
    { force: true }
  );
};

const deleteCategory = (category) => {
  Social.set({
    "devhub-blog": {
      categories: {
        [category]: null,
      },
    },
  });
};

const renderBlogs = (blogs) => {
  return Object.entries(blogs)
    .filter(([i, blog]) => blog)
    .map(([i, blog]) => (
      <div class="card">
        <div class="card-body">
          <div class="card-title">
            <h5>{blog.title}</h5>
          </div>

          <p>author: {blog.author}</p>
          <button onClick={() => editBlog(i, blog)}>edit</button>
          <button class="btn btn-danger" onClick={() => deleteBlog(i)}>
            delete
          </button>
        </div>
      </div>
    ));
};

const renderCategories = (categories) => {
  return Object.entries(categories).map(([category, _]) => (
    <div class="card">
      <div class="card-body">
        <p>{category}</p>
        <button class="btn btn-danger" onClick={() => deleteCategory(category)}>
          delete
        </button>
      </div>
    </div>
  ));
};

const addCategory = () => {
  const category = state.category;
  State.update({ category: "" });
  Social.set({
    "devhub-blog": {
      categories: { [category]: "" },
    },
  });
};

function recursivelySetNull(obj) {
  for (var key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      recursivelySetNull(obj[key]);
    } else {
      obj[key] = null;
    }
  }
}

const addList = () => {
  const listName = state.listName;

  const listTitle = state.listTitle;
  const listSubtitle = state.listSubtitle;
  const blogIds = state.blogIds;
  State.update({
    listName: "",
    listTitle: "",
    listSubtitle: "",
    blogIds: "[]",
  });
  Social.set({
    "devhub-blog": {
      lists: {
        [listName]: {
          title: listTitle,
          subtitle: listSubtitle,
          blogs: blogIds,
        },
      },
    },
  });
};

const deleteList = (list, listData) => {
  Social.set({
    "devhub-blog": {
      lists: {
        [list]: { title: null, subtitle: null, blogs: null },
      },
    },
  });
};

const renderBlogLists = (lists) => {
  return Object.entries(lists).map(([list, listData]) => (
    <div class="card">
      <div class="card-body">
        <p>{list}</p>
        <button onClick={() => State.update({ currentSelect: listData })}>
          show
        </button>
        <button
          class="btn btn-danger"
          onClick={() => deleteList(list, listData)}
        >
          delete
        </button>
      </div>
    </div>
  ));
};

const renderBlogList = (data) => {
  console.log(data);
  const blogIds = JSON.parse(data.blogs);
  console.log(blogIds);
  const blogs = Social.getr(
    blogIds.map((blogId) => `${blog_owner}/devhub-blog/blogs/${blogId}`)
  );
  console.log(blogs);
  return (
    <div>
      <h3>{data.title}</h3>
      <h4>{data.subtitle}</h4>
      {renderBlogs(
        blogs.title
          ? { [blogIds[0]]: blogs }
          : blogs[blog_owner]["devhub-blog"].blogs
      )}
    </div>
  );
};

return (
  <div class="d-flex flex-column flex-1 align-items-start justify-content-evenly">
    <h1>Community Blog in SocialDB</h1>
    <h2>instance of blog list</h2>
    {renderBlogLists(lists)}
    {state.currentSelect
      ? renderBlogList(state.currentSelect)
      : "please select a blog list"}
    <input
      placeholder="list name"
      onChange={(e) => State.update({ listName: e.target.value })}
      value={state.listName}
    ></input>
    <input
      placeholder="list title"
      onChange={(e) => State.update({ listTitle: e.target.value })}
      value={state.listTitle}
    ></input>
    <input
      placeholder="list subtitle"
      onChange={(e) => State.update({ listSubtitle: e.target.value })}
      value={state.listSubtitle}
    ></input>
    <input
      placeholder="blogIds"
      onChange={(e) => State.update({ blogIds: e.target.value })}
      value={state.blogIds}
    ></input>
    <button onClick={addList}>add list</button>

    <h2>categories</h2>
    {renderCategories(categories)}
    <input
      placeholder="category"
      onChange={(e) => State.update({ category: e.target.value })}
      value={state.category}
    ></input>
    <button onClick={addCategory}>add category</button>

    <h2>editor</h2>
    <input
      placeholder="title"
      onChange={(e) => State.update({ title: e.target.value })}
      value={state.title}
    ></input>
    <input
      placeholder="subtitle"
      onChange={(e) => State.update({ subtitle: e.target.value })}
      value={state.subtitle}
    ></input>
    <div class="dropdown w-100">
      <button
        class="btn drop-btn text-truncate dropdown-toggle bg-white border rounded-2"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        category: {state.category}
      </button>
      <ul class="dropdown-menu dropdown-menu-end dropdown-menu-lg-start px-2 shadow">
        {Object.keys(categories).map((item) => (
          <li
            style={{ borderRadius: "5px" }}
            class="dropdown-item cursor-pointer link-underline link-underline-opacity-0"
            onClick={() => State.update({ category: item })}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
    <input
      placeholder="author"
      onChange={(e) => State.update({ author: e.target.value })}
      value={state.author}
    ></input>
    <input
      placeholder="date"
      onChange={(e) => State.update({ date: e.target.value })}
      value={state.date}
    ></input>

    <textarea
      placeholder="content"
      onInput={(e) => State.update({ content: e.target.value })}
      value={state.content}
    ></textarea>
    <button onClick={saveBlog}>save blog</button>
    <h2>all blogs</h2>
    <div>{devhubBlog.blogs ? renderBlogs(devhubBlog.blogs) : "no blogs"}</div>
  </div>
);
