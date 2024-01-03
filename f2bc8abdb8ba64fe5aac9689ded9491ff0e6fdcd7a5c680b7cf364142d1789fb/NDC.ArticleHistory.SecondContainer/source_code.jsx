const {
  pathToCurrentArticle,
  pathToPrevArticle,
  currentBlockHeight,
  prevBlockHeight,
  widgets,
} = props;

const authorForWidget =
  "f2bc8abdb8ba64fe5aac9689ded9491ff0e6fdcd7a5c680b7cf364142d1789fb";

if (!pathToCurrentArticle || !pathToPrevArticle || !currentBlockHeight)
  return "send pathToCurrentArticle and pathToPrevArticle and currentBlockHeight in props";

const currentArticle = JSON.parse(
  Social.get(`${pathToCurrentArticle}`, currentBlockHeight)
);

const currentCode = currentArticle.body;

if (currentCode === null) return "Loading";

const prevCode = prevBlockHeight
  ? JSON.parse(Social.get(`${pathToPrevArticle}`, prevBlockHeight)).body
  : undefined;

if (prevCode === null) return "Loading";

return (
  <Widget
    src={widgets.articleHistory.codeDiff}
    props={{ currentCode, prevCode, ...props }}
  />
);
