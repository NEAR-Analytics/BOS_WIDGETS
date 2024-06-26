const Css = styled.div`
  .embed-responsive-item {
    width: 103%;
  }
  .near-item-sm {
    align-items: center;
    border-radius: 0.8rem;
    display: block;
    flex-direction: column;
    padding: 0.5rem;
    transition: all 0.15s ease;
    float: left;
  }
  .near-item-sm:focus,
  .near-item-sm:hover {
    background: rgba(34, 34, 34, 0.05);
    text-decoration: none;
  }
  .near-item-sm .tile-icon {
    box-shadow: 0 0.5rem 1.2rem rgba(34, 34, 34, 0.2);
    border-radius: 50%;
    height: 3.2rem;
    margin: 0.5rem auto;
    width: 3.2rem;
  }
  .near-item-sm .tile-icon img {
    border-radius: 50%;
    height: 100%;
    width: 100%;
  }
  .near-item-sm .tile-content {
    width: 100%;
  }
  .near-item-sm .tile-title {
    font-size: 0.7rem;
    text-align: center;
    color: rgb(34, 34, 34);
    font-weight: bold;
  }
  h1 {
    font-size: 2em;
    margin: 0.67em 0;
  }
  a {
    background-color: transparent;
    -webkit-text-decoration-skip: objects;
  }
  a:active,
  a:hover {
    outline-width: 0;
  }
  strong {
    font-weight: inherit;
    font-weight: bolder;
  }
  small {
    font-size: 80%;
    font-weight: 400;
  }
  img {
    border-style: none;
  }
  svg:not(:root) {
    overflow: hidden;
  }
  *,
  :after,
  :before {
    box-sizing: inherit;
  }
  a {
    color: #222;
    outline: none;
    text-decoration: none;
  }
  a:active,
  a:focus,
  a:hover {
    color: #090909;
    text-decoration: underline;
  }
  :focus {
    outline: 0;
  }
  h1,
  h2,
  h3 {
    color: inherit;
    font-weight: 500;
    line-height: 1.2;
    margin-bottom: 0.5em;
    margin-top: 0;
  }
  .h4 {
    font-weight: 500;
  }
  h1 {
    font-size: 2rem;
  }
  h2 {
    font-size: 1.6rem;
  }
  h3 {
    font-size: 1.4rem;
  }
  .h4 {
    font-size: 1.2rem;
  }
  p {
    margin: 0 0 1.2rem;
  }
  a {
    -webkit-text-decoration-skip: ink edges;
    text-decoration-skip: ink edges;
  }
  ol,
  ul {
    padding: 0;
  }
  ol,
  ul {
    margin: 0.8rem 0 0.8rem 0.8rem;
  }
  ol li,
  ul li {
    margin-top: 0.4rem;
  }
  ul {
    list-style: disc inside;
  }
  ol {
    list-style: decimal inside;
  }
  .btn {
    align-items: center;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: rgba(34, 34, 34, 0.05);
    border: 0.1rem solid transparent;
    border-radius: 0.4rem;
    color: #222;
    cursor: pointer;
    display: inline-flex;
    font-size: 0.7rem;
    height: 1.8rem;
    line-height: 1.2rem;
    outline: none;
    padding: 0.2rem 0.4rem;
    text-align: center;
    text-decoration: none;
    transition: background 0.2s, border 0.2s, box-shadow 0.2s, color 0.2s;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    vertical-align: middle;
    white-space: nowrap;
  }
  .btn:focus {
    box-shadow: 0 0 0 0.1rem rgba(34, 34, 34, 0.2);
  }
  .btn:focus,
  .btn:hover {
    background: rgba(34, 34, 34, 0.1);
    border-color: transparent;
    text-decoration: none;
  }
  .btn:active {
    background: rgba(34, 34, 34, 0.15);
    border-color: rgba(34, 34, 34, 0.05);
    text-decoration: none;
  }
  .btn:disabled {
    cursor: default;
    opacity: 0.5;
    pointer-events: none;
  }
  .btn.btn-primary {
    background: #222;
    border-color: #1d1d1d;
    box-shadow: 0 0.1rem 0.4rem rgba(34, 34, 34, 0.25);
    color: #fff;
  }
  .btn.btn-primary:focus,
  .btn.btn-primary:hover {
    background: #0052cc;
    border-color: #004cbd;
    color: #fff;
  }
  .btn.btn-primary:active {
    background: #004cbd;
    border-color: #0046ad;
    color: #fff;
  }
  .btn.btn-link {
    background: transparent;
    border-color: transparent;
    color: #222;
  }
  .btn.btn-link:active,
  .btn.btn-link:focus,
  .btn.btn-link:hover {
    color: #222;
  }
  .btn.btn-lg {
    font-size: 0.8rem;
    height: 2rem;
    padding: 0.3rem 0.6rem;
  }
  .btn-group {
    display: inline-flex;
    flex-wrap: wrap;
  }
  .btn-group .btn {
    flex: 1 0 auto;
  }
  .btn-group .btn:first-child:not(:last-child) {
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
  }
  .btn-group .btn:last-child:not(:first-child) {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
    margin-left: -0.1rem;
  }
  .btn-group .btn:active,
  .btn-group .btn:focus,
  .btn-group .btn:hover {
    z-index: 1;
  }
  .markdown {
    font-size: 0.8rem;
    font-weight: 400;
    line-height: 1.25rem;
    word-break: break-word;
  }
  .markdown > :first-child {
    margin-top: 0;
  }
  .markdown h2,
  .markdown h3 {
    font-weight: 700;
    line-height: 1.5;
    margin-bottom: 1.2rem;
    margin-top: 0.4rem;
  }
  .markdown h2 {
    font-size: 24px;
  }
  .markdown h3 {
    font-size: 22px;
  }
  .markdown p {
    margin: 0 0 1rem;
  }
  .markdown ul {
    margin: 1.6rem 0 1.6rem 1.6rem;
    padding: 0;
    list-style: disc !important;
  }
  .markdown ul li {
    margin-top: 0.4rem;
  }
  .container {
    margin-left: auto;
    margin-right: auto;
    padding-left: 0.8rem;
    padding-right: 0.8rem;
    width: 100%;
  }
  .container.grid-xl {
    max-width: calc(0.8rem + 1200px);
  }
  .columns {
    display: flex;
    flex-wrap: wrap;
    margin-left: -0.8rem;
    margin-right: -0.8rem;
  }
  .column {
    flex: 1;
    max-width: 100%;
    padding-left: 0.8rem;
    padding-right: 0.8rem;
  }
  .column.col-12,
  .column.col-4,
  .column.col-8 {
    flex: none;
  }
  .col-12 {
    width: 100%;
  }
  .col-8 {
    width: 66.66666667%;
  }
  .col-4 {
    width: 33.33333333%;
  }
  @media (max-width: 960px) {
    .col-lg-12 {
      flex: none;
    }
    .col-lg-12 {
      width: 100%;
    }
  }
  @media (max-width: 840px) {
    .col-md-12 {
      flex: none;
    }
    .col-md-12 {
      width: 100%;
    }
  }
  .breadcrumb {
    font-size: 0.6rem;
    list-style: none;
    margin: 0.2rem 0;
    padding: 0.2rem 0;
  }
  .breadcrumb .breadcrumb-item {
    color: #888;
    display: inline-block;
    margin: 0 0.2rem 0 0;
    padding: 0.2rem 0;
  }
  .breadcrumb .breadcrumb-item a {
    color: #888;
  }
  .breadcrumb .breadcrumb-item:not(:first-child):before {
    color: #888;
    content: "→";
    padding-right: 0.2rem;
  }
  .dropdown {
    display: inline-block;
    position: relative;
  }
  .dropdown .menu {
    animation: slide-down 0.15s ease 1;
    display: none;
    left: 0;
    max-height: 50vh;
    overflow-y: auto;
    position: absolute;
    top: 90%;
  }
  .dropdown.dropdown-right .menu {
    left: auto;
    right: 0;
  }
  .dropdown .menu:hover,
  .dropdown:focus .menu,
  .dropdown:hover .menu {
    display: block;
  }
  .menu {
    box-shadow: 0 1rem 3rem rgba(34, 34, 34, 0.3);
    background: #fff;
    border-radius: 0.8rem;
    list-style: none;
    margin: 0;
    min-width: 180px;
    padding: 0.8rem;
    transform: translateY(0.2rem);
    z-index: 300;
  }
  .menu .menu-item {
    margin-top: 0;
    padding: 0;
    text-decoration: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
  }
  .menu .menu-item > a {
    align-items: center;
    color: inherit;
    display: flex;
    margin: 0;
    padding: 0.1rem;
    text-decoration: none;
  }
  .menu .menu-item > a:active,
  .menu .menu-item > a:focus,
  .menu .menu-item > a:hover {
    color: rgba(34, 34, 34, 0.75);
  }
  .menu .menu-item > span {
    align-items: center;
    color: inherit;
    display: flex;
    margin: 0;
    padding: 0.4rem;
  }
  .tile {
    align-content: space-between;
    align-items: flex-start;
    display: flex;
  }
  .tile .tile-icon {
    flex: 0 0 auto;
  }
  .tile .tile-content {
    flex: 1 1 auto;
  }
  .tile .tile-content:not(:first-child) {
    padding-left: 0.4rem;
  }
  .tile .tile-title {
    line-height: 1.2rem;
  }
  .tooltip {
    position: relative;
  }
  .tooltip:after {
    background: rgba(34, 34, 34, 0.95);
    border-radius: 0.4rem;
    bottom: 100%;
    color: #fff;
    content: attr(data-tooltip);
    display: block;
    font-size: 0.6rem;
    left: 50%;
    max-width: 320px;
    opacity: 0;
    overflow: hidden;
    padding: 0.2rem 0.4rem;
    pointer-events: none;
    position: absolute;
    text-overflow: ellipsis;
    transform: translate(-50%, 0.4rem);
    transition: opacity 0.2s, transform 0.2s;
    white-space: pre;
    z-index: 300;
  }
  .tooltip:focus:after,
  .tooltip:hover:after {
    opacity: 1;
    transform: translate(-50%, -0.2rem);
  }
  .text-gray {
    color: #888 !important;
  }
  a.text-gray:focus,
  a.text-gray:hover {
    color: #7b7b7b;
  }
  a.text-gray:visited {
    color: #959595;
  }
  .c-hand {
    cursor: pointer;
  }
  .text-assistive {
    border: 0;
    clip: rect(0, 0, 0, 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    width: 1px;
  }
  .divider {
    display: block;
    position: relative;
  }
  .divider[data-content]:after {
    background: #fff;
    color: #c8c8c8;
    content: attr(data-content);
    display: inline-block;
    font-size: 0.6rem;
    line-height: 0.6rem;
    padding: 0 0.4rem;
    transform: translateY(-0.6rem);
  }
  .divider {
    border-top: 0.05rem solid #d5d5d5;
    height: 0.1rem;
    margin: 0.4rem 0;
  }
  .divider[data-content] {
    margin: 0.8rem 0;
  }
  .ml-1 {
    margin-left: 0.2rem !important;
  }
  .ml-2 {
    margin-left: 0.4rem !important;
  }
  .mr-2 {
    margin-right: 0.4rem !important;
  }
  .text-small {
    font-size: 0.8em;
  }
  .awesome-hero {
    border-radius: 0.8rem;
    color: #222;
    display: flex;
    padding: 1rem 0;
    position: relative;
    z-index: 1;
  }
  .awesome-hero .hero-content {
    display: flex;
    flex-direction: column;
    flex: 1;
    justify-content: center;
    margin-right: auto;
    max-width: 840px;
  }
  .awesome-hero .hero-img {
    height: 6rem;
    margin: 1.8rem 1rem 1rem 0;
    width: 6rem;
  }
  .awesome-hero .hero-img img {
    border-radius: 50%;
    box-shadow: 0 0.2rem 0.6rem rgba(34, 34, 34, 0.05);
    height: 6rem;
    width: 6rem;
  }
  @media screen and (max-width: 960px) {
    .awesome-hero .hero-img {
      margin-top: 0;
    }
  }
  .awesome-hero .hero-title {
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 1.25;
    margin-bottom: 0;
  }
  .awesome-hero .hero-title small {
    border-radius: 0.2rem;
    color: rgba(34, 34, 34, 0.9);
    font-size: 0.75rem;
    font-weight: 500;
    padding: 0.2rem;
    vertical-align: middle;
  }
  .awesome-hero .hero-subtitle {
    color: #222;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    margin: 0.5rem 0 1rem;
  }
  .awesome-hero .hero-series {
    display: inline-flex;
    margin-bottom: 0.4rem;
    order: -1;
  }
  .awesome-hero .hero-actions {
    flex: 0 0 auto;
    margin-left: 1rem;
    margin-top: 1rem;
  }
  .awesome-hero .hero-tags {
    margin: 0.4rem 0;
  }
  .awesome-hero .hero-tags .tag-item + .tag-item {
    margin-left: 0.25rem;
  }
  .awesome-hero .hero-links {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    margin: 0.5rem 0;
  }
  @media screen and (max-width: 960px) {
    .awesome-hero .hero-links {
      justify-content: flex-start;
    }
  }
  .awesome-hero .hero-links .link-item {
    align-items: center;
    display: inline-flex;
    height: 2rem;
    font-size: 1rem;
    margin-bottom: 0.2rem;
    margin-right: 0.2rem;
    text-decoration: none;
  }
  .awesome-hero .hero-links .link-item span {
    line-height: 1;
    margin-left: 0.4rem;
  }
  .awesome-hero .hero-links .link-item small {
    opacity: 0.5;
  }
  .awesome-hero .hero-links .link-item.btn.btn-lg {
    padding: 0.3rem 0.5rem;
  }
  .awesome-hero .hero-links .menu {
    color: #222;
    width: 14rem;
  }
  @media screen and (max-width: 960px) {
    .awesome-hero {
      flex-wrap: wrap;
      flex-direction: column;
    }
    .awesome-hero .hero-actions {
      flex: 1 0 100%;
      margin-left: 0;
      width: 100%;
    }
  }
  @media screen and (max-width: 600px) {
    .awesome-hero {
      padding: 1rem 0;
    }
  }
  .hero-links .link-item.btn.btn-lg.btn-link {
    font-size: 1.2rem;
  }
  .label-series {
    align-items: center;
    background: rgba(0, 82, 204, 0.1);
    border: 0.05rem solid transparent;
    border-radius: 1rem;
    cursor: default;
    display: inline-flex;
    font-size: 0.6rem;
    font-weight: 500;
    height: 1rem;
    margin-bottom: 0;
    margin-right: 0.2rem;
    padding: 0.1rem 0.3rem;
  }
  .label-series .icon-series {
    height: 0.6rem;
    margin-right: 0.1rem;
    width: 0.6rem;
  }
  .label-series.trending {
    background: rgba(0, 82, 204, 0.1);
    color: #0052cc;
  }
  .label-series.near {
    background: rgba(38, 38, 38, 0.075);
    color: #262626;
  }
  .label-series.aurora {
    background: rgba(120, 214, 75, 0.2);
    color: #5dc22c;
  }
  .section-project .awesome-hero .hero-content {
    max-width: 600px;
  }
  .near-content .content-widget {
    background: #fff;
    border: 0.05rem solid #eee;
    border-radius: 0.8rem;
    box-shadow: 0 0.1rem 1.4rem rgba(34, 34, 34, 0.05);
    font-size: 0.9rem;
    margin-bottom: 1rem;
    padding: 2rem;
  }
  .near-content .twitter-widget {
    padding-bottom: 0.5rem;
  }
  .near-content .related-widget .content-body {
    margin: auto -0.5rem;
  }
  @media screen and (max-width: 600px) {
    .near-content .content-widget {
      padding: 1.5rem 1rem;
    }
  }
  .near-content .content-title {
    font-size: 0.8rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  .near-content .stats-widget {
    display: flex;
    flex-wrap: nowrap;
    font-size: 0.7rem;
    justify-content: space-between;
    align-items: baseline;
    margin: 0.3rem 0;
  }
  .near-content .stats-widget:last-child {
    margin-bottom: 0;
  }
  .near-content .stats-widget .stats-widget-label {
    color: rgba(34, 34, 34, 0.5);
    font-size: 0.6rem;
    font-weight: 500;
    margin-bottom: 0.2rem;
  }
  .near-content .stats-widget .stats-widget-value {
    font-weight: 700;
    color: #222;
    text-align: right;
    overflow: hidden;
  }
  .near-content .stats-widget .stats-widget-source {
    color: #888;
    font-size: 0.6rem;
    margin-top: 0.4rem;
    text-align: right;
    width: 100%;
  }
  .near-content .token-widget {
    display: flex;
    flex-direction: column;
  }
  .near-content .token-widget:not(:last-child) {
    margin-bottom: 1rem;
  }
  .near-content .token-widget .token-widget-label {
    color: rgba(51, 51, 51, 0.5);
    font-size: 0.6rem;
    font-weight: 500;
  }
  .near-content .token-widget .token-widget-value {
    background: #f6f6f6;
    border: 0.05rem solid #eee;
    border-radius: 0.4rem;
    color: #333;
    font-size: 0.6rem;
    font-weight: 700;
    margin-top: 0.2rem;
    padding: 0.2rem 0.4rem;
    -webkit-user-select: all;
    -moz-user-select: all;
    user-select: all;
    word-break: break-all;
  }
  .near-content .token-widget .token-widget-value:hover {
    background: #f3f3f3;
  }
  .near-content .content-grants {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
  }
  .near-content .content-grants:not(:last-child) {
    margin-bottom: 0.5rem;
  }
  .label-grants {
    align-items: center;
    border: 0.05rem solid rgba(34, 34, 34, 0.075);
    border-radius: 0.4rem;
    color: #222;
    display: flex;
    font-size: 0.7rem;
    margin: 0.25rem;
    padding: 0.25rem 0.5rem 0.25rem 0.25rem;
  }
  .label-grants .icon-grants {
    border-radius: 50%;
    margin-right: 0.25rem;
  }
  .label-grants.near .icon-grants {
    background: rgba(38, 38, 38, 0.075);
    color: #262626;
  }
  .label-grants.proximity .icon-grants {
    background: linear-gradient(
      45deg,
      rgba(216, 46, 135, 0.25),
      rgba(255, 173, 1, 0.25)
    );
    color: #d82e87;
  }
  .markdown p:last-child {
    margin-bottom: 0;
  }
  .near-item {
    background: #fff;
    border: 0.05rem solid #eee;
    box-shadow: 0 0.05rem 0.05rem rgba(34, 34, 34, 0.05),
      0 0.2rem 0.8rem rgba(34, 34, 34, 0.075);
    border-radius: 0.8rem;
    color: #222;
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 8.5rem;
    padding: 1rem;
    position: relative;
    transition: box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out;
  }
  .near-item:focus,
  .near-item:hover {
    box-shadow: 0 0.1rem 0.2rem rgba(34, 34, 34, 0.05),
      0 0.4rem 1.6rem rgba(34, 34, 34, 0.15);
    text-decoration: none;
    transform: translateY(-0.1rem);
  }
  .near-item .tile-icon {
    box-shadow: 0 0.5rem 1.2rem rgba(34, 34, 34, 0.2);
  }
  .near-item .tile-icon,
  .near-item .tile-icon img {
    border-radius: 50%;
    height: 2rem;
    width: 2rem;
  }
  .near-item .tile-content {
    overflow: hidden;
  }
  .near-item .tile-content:not(:first-child) {
    padding-left: 0.8rem;
  }
  .near-item .near-item-header {
    display: flex;
    flex: 1 1;
    flex-direction: column;
  }
  .near-item .tile-title {
    color: #222;
    font-size: 0.8rem;
    font-weight: 700;
    margin-bottom: 0;
    padding-bottom: 0.1rem;
  }
  .near-item .tile-tags,
  .near-item .tile-title {
    line-height: 0.9rem;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .near-item .tile-tags {
    font-size: 0.8rem;
  }
  .near-item-list {
    background: transparent;
    border: 0;
    box-shadow: none;
    min-height: auto;
    padding: 0.5rem;
  }
  .awesome-tag {
    background: rgba(34, 34, 34, 0.05);
    border-radius: 0.4rem;
    color: #3c3c3c;
    font-size: 0.7rem;
    line-height: 1.5rem;
    padding: 0.25rem 0.35rem;
  }
  .awesome-tag:focus,
  .awesome-tag:hover {
    background: rgba(34, 34, 34, 0.08);
    border-color: rgba(34, 34, 34, 0.08);
    text-decoration: none;
  }
  .articles-container {
    display: flex;
    flex-direction: column;
  }
  .articles-container .article-item {
    display: flex;
    padding-bottom: 0.8rem;
  }
  .articles-container .article-item:focus,
  .articles-container .article-item:hover {
    text-decoration: none;
  }
  .articles-container .article-item:focus .article-title,
  .articles-container .article-item:hover .article-title {
    text-decoration: underline;
  }
  .articles-container .article-image {
    border-radius: 0.4rem;
    box-shadow: 0 0.2rem 0.4rem rgba(34, 34, 34, 0.1);
    height: 2rem;
    margin-right: 0.4rem;
    -o-object-fit: cover;
    object-fit: cover;
    width: 2.4rem;
  }
  .articles-container .article-detail {
    display: flex;
    flex-direction: column;
  }
  .articles-container .article-title {
    padding-left: 0.2rem;
    font-weight: 700;
    font-size: 0.7rem;
  }
  .articles-container .article-info {
    color: #888;
    padding-left: 0.2rem;
    font-weight: 400;
    font-size: 0.6rem;
  }
  .tile-tags .badge {
    text-transform: capitalize;
    margin-right: 0.4rem;
    opacity: 0.8;
    min-width: 4rem;
    cursor: pointer;
  }
  /*! CSS Used keyframes */
  @keyframes slide-down {
    0% {
      opacity: 0;
      transform: translateY(-1.6rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .near-bg:before {
    background: linear-gradient(270deg, #fff0e2 35%, #d7dbff);
    right: 15vh;
    top: 10vh;
  }
  .near-bg:after,
  .near-bg:before {
    border-radius: 50%;
    content: "";
    display: block;
    filter: blur(3rem);
    height: 50vh;
    position: fixed;
    width: 50vh;
    z-index: -1;
  }
  .near-bg:after {
    background: linear-gradient(180deg, #e1d7ff 25%, #e1f4f8);
    bottom: 10vh;
    left: 15vh;
  }
`;
if (!props.id) {
  return " 🐲 🐉 Loading~ ";
}
const componentPath = props.componentPath;
const indexPath = props.indexPath;
const storageBookmark = Storage.get(
  "nearcatalogBookmark",
  componentPath + ".Project"
);
if (state.bookmark == null && storageBookmark) {
  State.update({
    bookmark: storageBookmark,
  });
  // console.log("loaded storage bookmark to state: ", storageBookmark);
}
const isInBookmark = (p) => {
  if (!state.bookmark) return false;
  var isFound = false;
  var keys = Object.keys(state.bookmark);
  if (keys.length > 0) {
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] == p.slug) {
        isFound = true;
        break;
      }
    }
  }
  return isFound;
};
const toggleBookmark = (p) => {
  var isFound = isInBookmark(p);
  var bookmark = state.bookmark ? state.bookmark : {};
  isFound ? delete bookmark[p.slug] : (bookmark[p.slug] = p);
  State.update({
    bookmarkStatus: isFound ? "removed" : "added",
    bookmark: bookmark,
  });
  Storage.set("nearcatalogBookmark", bookmark);
}; //toggleBookmark
const deepMerge = (target, sourcesArr) => {
  for (let i = 0; i < sourcesArr.length; i++) {
    const source = sourcesArr[i];
    const keys = Object.keys(source);
    for (let j = 0; j < keys.length; j++) {
      const key = keys[j];
      if (
        source[key] !== null &&
        typeof source[key] !== "undefined" &&
        source[key] !== ""
      ) {
        if (
          typeof target[key] === "object" &&
          typeof source[key] === "object"
        ) {
          if (Array.isArray(target[key]) && Array.isArray(source[key])) {
            target[key] = target[key].concat(source[key]);
          } else {
            target[key] = deepMerge(target[key], [source[key]]);
          }
        } else {
          target[key] = source[key];
        }
      }
    }
  }
  return target;
};
State.init({
  bookmark: null,
  bookmarkStatus: isInBookmark(mergedProject) ? "added" : "removed",
  relatedProjects: [],
});
const nearSocialProfile = Social.getr(
  props.project.profile.linktree.nearsocial + "/profile"
);
const mergedProject = props.project.profile?.linktree?.nearsocial
  ? deepMerge({}, [props.project, { profile: nearSocialProfile }])
  : props.project;
// console.log("social profile: ", nearSocialProfile, "| indexer profile: ", props.project, "| merged project profile info: ", mergedProject);
setTimeout(() => {
  State.update({
    relatedProjects: fetch(
      `${props.indexer}/related-projects?pid=${mergedProject.slug}`
    ).body,
  });
}, 1000);
const tags = mergedProject.profile.tags;
const tokenTicket = mergedProject.profile.tokens
  ? Object.keys(mergedProject.profile.tokens)[0]
  : false;
const tokenInfo =
  tokenTicket && mergedProject.profile.tokens
    ? mergedProject.profile.tokens[tokenTicket]
    : {};
const twtIframe = `<div align="center"><a class="twitter-timeline"  data-dnt="true"  data-tweet-limit="10"
 href="https://twitter.com/${mergedProject.profile.linktree?.twitter}">X</a>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</div>`;
return (
  <Css>
    <div className="container grid-xl near-bg">
      <Widget
        src={`${componentPath}.Layout.Navbar`}
        props={{
          indexPath,
        }}
      />
      <Widget
        src={`${componentPath}.Layout.SearchBar`}
        props={{
          indexPath,
          indexer: props.indexer,
          defaultImg: props.defaultImg,
        }}
      />
      <div className="columns">
        <div className="hero-container column col-md-12">
          <div className="awesome-hero">
            <div className="hero-img">
              {props.project.profile.linktree.nearsocial ? (
                <Widget
                  src="mob.near/widget/Image"
                  props={{
                    image: nearSocialProfile.image,
                  }}
                />
              ) : (
                <img
                  src={mergedProject.profile.image.url}
                  alt={mergedProject.profile.name}
                />
              )}
            </div>
            <div className="hero-content">
              <h1 className="hero-title">
                {mergedProject.profile.name}{" "}
                {tokenTicket && <small>({tokenTicket})</small>}{" "}
              </h1>
              <h2 className="hero-subtitle">{mergedProject.profile.tagline}</h2>
              <div className="tile-tags">
                {Object.keys(props.project.profile.tags).length > 0 &&
                  Object.keys(props.project.profile.tags).map((e) => {
                    return (
                      <a
                        href={"/" + props.indexPath + "?cat=" + e}
                        className="badge bg-secondary text-light"
                        title={props.project.profile.tags[e]}
                      >
                        {props.project.profile.tags[e]}
                      </a>
                    );
                  })}
              </div>
            </div>
            <div className="hero-actions">
              <div className="hero-links">
                <div className="btn-group">
                  <a
                    onClick={() => toggleBookmark(props.project)}
                    className="link-item btn btn-lg"
                  >
                    <i
                      class={
                        isInBookmark(props.project)
                          ? "bi bi-star-fill"
                          : "bi bi-star"
                      }
                    ></i>
                  </a>
                  {mergedProject.profile.linktree.website && (
                    <a
                      href={
                        mergedProject.profile.linktree.website.indexOf("://") >
                        -1
                          ? mergedProject.profile.linktree.website
                          : "https://" + mergedProject.profile.linktree.website
                      }
                      className="link-item btn btn-lg btn-primary"
                      target="_blank"
                    >
                      <i class="bi bi-globe mx-1"></i>Website
                    </a>
                  )}
                  {mergedProject.profile.dapp && (
                    <a
                      href={
                        mergedProject.profile.dapp.indexOf("://") > -1
                          ? mergedProject.profile.dapp
                          : "https://" + mergedProject.profile.dapp
                      }
                      target="_blank"
                      className="link-item btn btn-lg btn-primary"
                      title="Open App"
                    >
                      <i class="bi bi-app-indicator mx-1"></i>App
                    </a>
                  )}
                </div>
                <div className="btn-group">
                  <div
                    className="link-item btn btn-lg dropdown dropdown-right dropdown-toggle c-hand"
                    tabindex="0"
                  >
                    <i class="bi bi-three-dots-vertical"></i>
                    <ul className="menu">
                      <li className="menu-item">
                        <a
                          href={`https://submit.nearcatalog.xyz/?pid=${props.id}&pname=${mergedProject.profile.name}&title=${mergedProject.profile.name}`}
                          target="_blank"
                        >
                          <i class="bi bi-flag me-1"></i> Report or give
                          feedback
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="hero-links">
                {mergedProject.profile.linktree.nearsocial && (
                  <a
                    href={
                      "/mob.near/widget/ProfilePage?accountId=" +
                      mergedProject.profile.linktree.nearsocial
                    }
                    target="_blank"
                    className="link-item btn btn-lg btn-link"
                    title="NEAR Social"
                  >
                    <i
                      class="bi bi-code"
                      style={{
                        background: "rgb(61, 127, 255)",
                        color: "white",
                        padding: "2px",
                      }}
                    ></i>
                  </a>
                )}
                {mergedProject.profile.linktree.twitter && (
                  <a
                    href={
                      mergedProject.profile.linktree.twitter.indexOf("://") > -1
                        ? mergedProject.profile.linktree.twitter
                        : "https://x.com/" +
                          mergedProject.profile.linktree.twitter
                    }
                    target="_blank"
                    className="link-item btn btn-lg btn-link"
                    title="Twitter/X"
                  >
                    <i class="bi bi-twitter"></i>
                  </a>
                )}
                {mergedProject.profile.linktree.medium && (
                  <a
                    href={mergedProject.profile.linktree.medium}
                    target="_blank"
                    className="link-item btn btn-lg btn-link"
                    title="Blog, news"
                  >
                    <i class="bi bi-stickies-fill"></i>
                  </a>
                )}
                {mergedProject.profile.linktree.telegram && (
                  <a
                    href={
                      mergedProject.profile.linktree.telegram.indexOf("://") >
                      -1
                        ? mergedProject.profile.linktree.telegram
                        : "https://t.me/" +
                          mergedProject.profile.linktree.telegram
                    }
                    target="_blank"
                    className="link-item btn btn-lg btn-link"
                    title="Telegram"
                  >
                    <i class="bi bi-telegram"></i>
                  </a>
                )}
                {mergedProject.profile.linktree.github && (
                  <a
                    href={
                      mergedProject.profile.linktree.github.indexOf("://") > -1
                        ? mergedProject.profile.linktree.github
                        : "https://github.com/" +
                          mergedProject.profile.linktree.github
                    }
                    target="_blank"
                    className="link-item btn btn-lg btn-link"
                    title="Source code repos"
                  >
                    <i class="bi bi-git"></i>
                  </a>
                )}
                {mergedProject.profile.linktree.linkedin && (
                  <a
                    href={
                      mergedProject.profile.linktree.linkedin.indexOf("://") >
                      -1
                        ? mergedProject.profile.linktree.linkedin
                        : "https://linkedin.com/in/" +
                          mergedProject.profile.linktree.linkedin
                    }
                    target="_blank"
                    className="link-item btn btn-lg btn-link"
                    title="Ref Finance LinkedIn company page"
                  >
                    <i class="bi bi-linkedin"></i>
                  </a>
                )}
                {mergedProject.profile.linktree.astrodao && (
                  <a
                    href={mergedProject.profile.linktree.astrodao}
                    target="_blank"
                    className="link-item btn btn-lg btn-link"
                    title="AstroDAO"
                  >
                    <i class="bi bi-people-fill"></i>
                  </a>
                )}
                {mergedProject.profile.linktree.whitepaper && (
                  <a
                    href={mergedProject.profile.linktree.whitepaper}
                    target="_blank"
                    className="link-item btn btn-lg btn-link"
                    title="Whitepaper"
                  >
                    <i class="bi bi-journal-code"></i>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="content-container column col-12">
          <div
            className="columns content-container"
            id="stats-columns-container-sidebar"
          >
            <div className="column col-lg-12 col-8">
              <div className="near-content">
                <div className="content-widget markdown">
                  <h2 className="content-title">
                    About {mergedProject.profile.name}
                  </h2>
                  <div className="content-desc">
                    <Markdown
                      text={mergedProject.profile?.description?.replace(
                        /\n/g,
                        "\n\n"
                      )}
                    />
                  </div>
                </div>
              </div>
              {/*   <div className="near-content">
                  <div className="content-widget article-widget">
                      <h2 className="content-title"> News</h2>
                      <div className="articles-container">
                          <a className="article-item"">
                              <img className="article-image" />
                              <div className="article-detail">
                                  <h3 className="article-title">news</h3>
                                  <div className="article-info">date</div>
                              </div>
                          </a>
                      </div>
                  </div>
                </div> */}
              <div className="near-content">
                <div className="content-widget related-widget">
                  <h2 className="content-title">Discover More</h2>
                  <div className="content-body row">
                    {state.relatedProjects &&
                      Object.keys(state.relatedProjects).map((e) => {
                        let p = state.relatedProjects[e];
                        return (
                          <a
                            className="near-item near-item-list col-md-4 p-2"
                            title={p.profile.name}
                            href={"/" + indexPath + "?id=" + p.slug}
                          >
                            <div className="near-item-header">
                              <div className="tile">
                                <div className="tile-icon">
                                  <img
                                    src={p.profile.image.url}
                                    alt={p.profile.name}
                                  />
                                </div>
                                <div className="tile-content">
                                  <h3 className="tile-title">
                                    {p.profile.name}
                                  </h3>
                                  <div className="tile-tags text-gray">
                                    {p.profile.tagline}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </a>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
            <div className="column col-lg-12 col-4">
              {tokenTicket && (
                <div className="near-content">
                  <div className="content-widget chart-widget">
                    <h2 className="content-title">
                      {mergedProject.profile.name} Token Stats
                    </h2>
                    <div className="stats-widget">
                      <div class="embed-responsive embed-responsive-4by3">
                        <Widget
                          src={`${componentPath}.Layout.PriceWidget`}
                          props={tokenInfo}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {(tokenInfo.address.near ||
                tokenInfo.address.aurora ||
                tokenInfo.address.ethereum) && (
                <div className="near-content">
                  <div className="content-widget">
                    <h2 className="content-title">Token Contract</h2>
                    {tokenInfo.address.near && (
                      <div className="token-widget">
                        <h3 className="token-widget-label">
                          NEAR Chain (NEP-141)
                          <a
                            href={`https://nearblocks.io/address/${tokenInfo.address.near}`}
                            target="_blank"
                            className="text-gray ml-2"
                            title="NEAR Explorer"
                          >
                            ↗
                          </a>
                        </h3>
                        <div className="token-widget-value">
                          {tokenInfo.address.near}
                        </div>
                      </div>
                    )}
                    {tokenInfo.address.aurora && (
                      <div className="token-widget">
                        <h3 className="token-widget-label">
                          Aurora
                          <a
                            href={`https://explorer.aurora.dev/address/${tokenInfo.address.aurora}`}
                            target="_blank"
                            className="text-gray ml-2"
                            title="Aurorascan Explorer"
                          >
                            ↗
                          </a>
                        </h3>
                        <div className="token-widget-value">
                          {tokenInfo.address.aurora}
                        </div>
                      </div>
                    )}
                    {tokenInfo.address.ethereum && (
                      <div className="token-widget">
                        <h3 className="token-widget-label">
                          Ethereum
                          <a
                            href={`https://etherscan.io/address/${tokenInfo.address.ethereum}`}
                            target="_blank"
                            className="text-gray ml-2"
                            title="Etherscan"
                          >
                            ↗
                          </a>
                        </h3>
                        <div className="token-widget-value">
                          {tokenInfo.address.ethereum}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {mergedProject.profile.linktree.twitter && (
                <div className="near-content">
                  <div className="content-widget twitter-widget">
                    {
                      <h2 className="content-title">
                        <a
                          href={mergedProject.profile.linktree.twitter}
                          target="_blank"
                          title="Twitter"
                        >
                          <i class="bi bi-twitter-x"></i>
                          {mergedProject.profile.name} Twitter
                        </a>
                      </h2>
                    }
                    <div className="twitter-content embed-responsive embed-responsive-4by3">
                      <small>
                        <i>Open link in new tab with right click or hold</i>{" "}
                      </small>
                      <iframe
                        style={{ minHeight: "500px", width: "103%" }}
                        srcDoc={twtIframe}
                        className="embed-responsive-item"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </Css>
);
