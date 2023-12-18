const css = fetch(
  "https://cdn.jsdelivr.net/npm/tailwindcss@2.2/dist/tailwind.min.css"
).body;

const font = fetch("https://fonts.googleapis.com/css?family=Kanit").body;

if (!css && !font) return "Cannot load CSS & Font.";

State.init({
  theme: null,
  change_title: "",
  change_topic: "",
  change_quantity: "",
  change_postdate: Date.now(),
  change_enddate: "",
  change_picture: "",
  change_term: "",
  change_details: "",
  hover_element: "",
  show_error_create_form: "No",
  send_post: false,
  uploading: "คลิกเพื่ออัปโหลดรูปภาพ",
  title_now: "",
  sign_reason: "",
  sign_term: "",
  sign_title: "",
  sign_postdate: Date.now(),
  hover_element_sign: "",
  show_error_sign_form: "No",
  send_post_sign: false,
  donate_amount: "",
  comment_chack: true,
});

const getTimestamp = (date) => new Date(`${date}`).getTime();

const getCreateChangeData = (isCreate) => {
  if (
    state.change_title == "" ||
    state.change_topic == "" ||
    state.change_quantity == "" ||
    state.change_postdate == "" ||
    state.change_enddate == "" ||
    state.change_picture == "" ||
    state.change_term == "" ||
    state.change_details == ""
  ) {
    State.update({ show_error_create_form: "" });
  } else {
    State.update({ show_error_create_form: "No" });
    return {
      index: {
        change: JSON.stringify(
          {
            key: "change.near-v1.0",
            value: {
              isCreate,
              title: state.change_title,
              topic: state.change_topic,
              quantity: state.change_quantity,
              postdate: state.change_postdate,
              enddate: getTimestamp(state.change_enddate),
              picture: state.change_picture,
              term: state.change_term,
              details: state.change_details,
            },
          },
          undefined,
          0
        ),
      },
    };
  }
};
const getCreateSignData = (isSign) => {
  if (state.sign_reason == "" || state.sign_term == "" || state.sign.postdate) {
    State.update({ show_error_sign_form: "" });
  } else {
    State.update({ show_error_sign_form: "No" });
    return {
      index: {
        change: JSON.stringify(
          {
            key: "sign.near-v1.0",
            value: {
              isSign,
              title: state.sign_title,
              reason: state.sign_reason,
              term: state.sign_term,
              postdate: state.sign_postdate,
            },
          },
          undefined,
          0
        ),
      },
    };
  }
};

if (!state.theme) {
  State.update({
    theme: styled.div`
    * {
    font-family: 'Kanit';
    }
    #home_box{
        display: ;
    }
    #create_box, #start_box, #support_box, #my_box , #details_box{
        display:none;
    }
      ${font}
      ${css}
    `,
  });
}

const Theme = state.theme;

const picurl = (cid) => `https://ipfs.near.social/ipfs/${cid}`;

function makeTitleShort(c_title) {
  if (c_title.length > 25) {
    return c_title.slice(0, 25) + "...";
  }
  return c_title;
}
function makeDetailsShort(c_details) {
  if (c_details.length > 100) {
    return c_details.slice(0, 100) + "...";
  }
  return c_details;
}

let changeList = Social.index("change", "change.near-v1.0");
let changeBox = props;

let signList = Social.index("change", "sign.near-v1.0");
let signBox = props;

let dateFormat = {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
  hour12: "false",
};

if (JSON.stringify(changeList) != JSON.stringify(state.changeList)) {
  State.update({ changeList: changeList });
}
if (!changeBox) {
  return "Error ChangeBox";
}
if (!changeList) {
  return "Error ChangeList";
}
changeList = changeList.sort((c1, c2) => {
  const isC1 = c1.value.postdate < Date.now();
  const isC2 = c2.value.postdate < Date.now();
  if (isC1 && !isC2) return 1;
  if (!isC1 && isC2) return -1;
  if (isC1 && isC2) return c2.value.postdate - c1.value.postdate;
  return c1.value.postdate - c2.value.postdate;
});
const getCommentCount = () => {
  const comments = signList.filter((signBox) => {
    return signBox.value.title === state.title_now;
  });

  const commentCount = comments.length;
  return commentCount;
};
const formatnumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
const renderChangeData = () => {
  return changeList.map((changeBox, index) => {
    return (
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow mr-2 ml-2 mb-2 mt-2 p-3">
        <a className="flex items-center justify-center" href="#">
          <img
            className="rounded-t-lg h-60"
            src={picurl(changeBox.value.picture)}
            alt=""
          />
        </a>

        <div className="flex items-center justify-center mt-6 space-x-3">
          <img
            className="w-6 h-6 rounded-full"
            src={`https://i.near.social/magic/thumbnail/https://near.social/magic/img/account/${changeBox.accountId}`}
            alt="Profile Picture"
          />

          <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-500">
            <div className="pe-3 font-medium text-green-900">
              {changeBox.accountId}
            </div>
            <div className="ps-3 text-sm text-green-500">
              {new Date(changeBox.value.postdate).toLocaleDateString(
                [],
                dateFormat
              )}
            </div>
          </div>
        </div>
        <div className="p-3">
          <a href="#">
            <div className="mb-2 text-2xl font-bold tracking-tight text-center text-green-900">
              {makeTitleShort(changeBox.value.title)}
            </div>
          </a>
          <div className="mb-3 font-normal text-center text-green-600">
            {makeDetailsShort(changeBox.value.details)}
          </div>
          <div className="text-center">
            <a
              href="#"
              className="inline-flex text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              onClick={() => {
                State.update({
                  theme: styled.div`
                        * {
                        font-family: 'Kanit';
                        }
                        #details_box{
                            display: ;
                        }
                        #create_box,#start_box, #home_box, #my_box, #support_box{
                            display:none;
                        }
                        ${font}
                        ${css}
                        `,
                  title_now: changeBox.value.title,
                });
              }}
            >
              รณรงค์เรื่องนี้
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    );
  });
};

const renderMyData = () => {
  return changeList.map((changeBox, index) => {
    if (changeBox.accountId == context.accountId)
      return (
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow mr-2 ml-2 mb-2 mt-2 p-3">
          <a className="flex items-center justify-center" href="#">
            <img
              className="rounded-t-lg h-60"
              src={picurl(changeBox.value.picture)}
              alt=""
            />
          </a>

          <div className="flex items-center justify-center mt-6 space-x-3">
            <img
              className="w-6 h-6 rounded-full"
              src={`https://i.near.social/magic/thumbnail/https://near.social/magic/img/account/${changeBox.accountId}`}
              alt="Profile Picture"
            />

            <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-500">
              <div className="pe-3 font-medium text-green-900">
                {changeBox.accountId}
              </div>
              <div className="ps-3 text-sm text-green-500">
                {new Date(changeBox.value.postdate).toLocaleDateString(
                  [],
                  dateFormat
                )}
              </div>
            </div>
          </div>
          <div className="p-3">
            <a href="#">
              <div className="mb-2 text-2xl font-bold tracking-tight text-center text-green-900">
                {makeTitleShort(changeBox.value.title)}
              </div>
            </a>
            <div className="mb-3 font-normal text-center text-green-600">
              {makeDetailsShort(changeBox.value.details)}
            </div>
            <div className="text-center">
              <a
                href="#"
                className="inline-flex text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                onClick={() => {
                  State.update({
                    theme: styled.div`
                        * {
                        font-family: 'Kanit';
                        }
                        #details_box{
                            display: ;
                        }
                        #create_box,#start_box, #home_box, #my_box, #support_box{
                            display:none;
                        }
                        ${font}
                        ${css}
                        `,
                    title_now: changeBox.value.title,
                  });
                }}
              >
                ดูเรื่องนี้
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      );
  });
};
const commentchack = () => {
  const hasComment = signList.some((signBox) => {
    return (
      signBox.accountId === context.accountId &&
      signBox.value.title === state.title_now
    );
  });

  State.update({ comment_chack: !hasComment });
};

const rendercomment = () => {
  return changeList.map((changeBox, index) => {
    if (
      changeBox.accountId != context.accountId &&
      changeBox.value.title == state.title_now &&
      state.comment_chack == true
    )
      return (
        <div className="mt-5 mb-5 max-w-xl mx-auto">
          <div className="text-center text-2xl mb-10 text-green-800">
            ร่วมลงชื่อสนับสนุนการรณรงค์
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-medium text-lg text-green-800">
              เหตุผล
              <span className="text-sm text-green-600">
                {" "}
                ของการลงชื่อสนับสนุน
              </span>
            </label>
            <textarea
              rows="4"
              className="block p-2.5 w-full text-sm text-green-800 bg-gray-50 rounded-lg border border-green-300 focus:ring-green-500 focus:border-green-500"
              placeholder="ข้อความของคุณ ..."
              onChange={(e) => {
                State.update({ sign_reason: e.target.value });
              }}
            ></textarea>
          </div>

          <div className="mb-4">
            <input
              type="radio"
              value="yes"
              className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
              onChange={(e) => {
                State.update({
                  sign_term: e.target.value,
                  sign_title: changeBox.value.title,
                });
              }}
            />
            <label
              for="sign_term"
              className="ms-2 text-sm font-medium text-green-900"
            >
              ฉันยอมรับ{" "}
              <a href="#" className="text-green-600 hover:underline">
                ข้อกำหนดและเงื่อนไข
              </a>
            </label>
          </div>

          <div className="mb-4 text-center">
            <CommitButton
              type="submit"
              className={
                !state.show_error_sign_form
                  ? "text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  : "text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              }
              data={getCreateSignData(false)}
              onMouseEnter={() => {
                State.update({ hover_element_sign: "Yes" });
              }}
              onMouseLeave={() => {
                State.update({ hover_element_sign: "" });
              }}
              onClick={() => {
                State.update({
                  send_post_sign: true,
                });
              }}
            >
              สนับสนุนประเด็นนี้
            </CommitButton>
          </div>
        </div>
      );
  });
};

const rendereachData = () => {
  return changeList.map((changeBox, index) => {
    if (changeBox.value.title == state.title_now)
      return (
        <div className="w-full p-4 text-center bg-white sm:p-8">
          <div className="flex flex-col items-center justify-center mb-5">
            <img
              className="rounded-t-lg max-w-2xl "
              src={picurl(changeBox.value.picture)}
              alt=""
            />
          </div>
          <div className="mb-2 text-3xl font-bold text-green-800">
            {changeBox.value.title}
          </div>
          <div className="flex justify-center max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900">
            <div className="flex flex-col items-center justify-center mr-3 ml-3">
              <div className="mb-2 text-2xl text-green-700 font-extrabold">
                {formatnumber(getCommentCount())} /{" "}
                {formatnumber(changeBox.value.quantity)} คน
              </div>
              <div className="text-green-500">ผู้ร่วมสนับสนุนประเด็น</div>
            </div>
            <div className="flex flex-col items-center justify-center mr-3 ml-3">
              <div className="mb-2 text-2xl text-green-700 font-extrabold">
                {new Date(changeBox.value.enddate).toLocaleDateString(
                  [],
                  dateFormat
                )}
              </div>
              <div className="text-green-500">วันที่สิ้นสุด</div>
            </div>
            <div className="flex flex-col items-center justify-center mr-3 ml-3">
              <div className="mb-2 text-2xl text-green-700 font-extrabold">
                {changeBox.value.topic}
              </div>
              <div className="text-green-500">ประเภทของประเด็น</div>
            </div>
          </div>
          <p className="mb-2 text-base text-green-500 sm:text-lg">
            {changeBox.value.details}
          </p>
          <div className="flex items-center justify-center mt-6 space-x-3 mb-5">
            <img
              className="w-6 h-6 rounded-full"
              src={`https://i.near.social/magic/thumbnail/https://near.social/magic/img/account/${changeBox.accountId}`}
              alt="profile picture"
            />

            <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-500">
              <div className="pe-3 font-medium text-green-900">
                {changeBox.accountId}
              </div>
              <div className="ps-3 text-sm text-green-500">
                {new Date(changeBox.value.postdate).toLocaleDateString(
                  [],
                  dateFormat
                )}
              </div>
            </div>
          </div>
          {commentchack()}
          <div className="h-px bg-gray-200 border-0"></div>
          {rendercomment()}
          <div className="h-px bg-gray-200 border-0"></div>
          <div className="mt-5 mb-5 max-w-xl mx-auto">
            <div className="text-center text-2xl mb-10 text-green-800">
              รายชื่อและคอมเม้นของผู้ร่วมลงชื่อสนับสนุนการรณรงค์
            </div>
            <div>{rendereachsignData(changeBox.value.title)}</div>
          </div>
        </div>
      );
  });
};

const rendereachsignData = (title) => {
  return signList.map((signBox, index) => {
    if (title == signBox.value.title)
      return (
        <div className="text-left boarder shadow p-3 mt-4">
          <div className="flex items-center mb-4">
            <img
              className="w-10 h-10 me-4 rounded-full"
              src={`https://i.near.social/magic/thumbnail/https://near.social/magic/img/account/${signBox.accountId}`}
              alt=""
            />
            <div className="font-medium">
              <p>
                {signBox.accountId}
                <div
                  datetime="2014-08-16 19:00"
                  className="block text-sm text-gray-500"
                >
                  {new Date(signBox.value.postdate).toLocaleDateString(
                    [],
                    dateFormat
                  )}
                </div>
              </p>
            </div>
          </div>
          <p className="mb-2 text-gray-500">{signBox.value.reason}</p>
        </div>
      );
  });
};

const donate = () => {
  Near.call(
    "bosspod.near",
    "donate",
    {},
    "30000000000000",
    state.donate_amount * 1e24
  );
};

return (
  <Theme>
    <div className="border-gray-200 text-center">
      <div className="max-w-screen-xl flex flex-wrap items-center lg:justify-center xl:justify-between mx-auto p-4">
        <a
          href="#"
          onClick={() => {
            State.update({
              theme: styled.div`
                * {
                font-family: 'Kanit';
                }
                #home_box{
                    display: ;
                }
                #create_box, #start_box, #details_box, #support_box, #my_box{
                    display:none;
                }
                ${font}
                ${css}
                `,
            });
          }}
          className="flex items-center r space-x-3"
        >
          <img
            src="https://podsawee.com/change/logo.svg"
            className="h-8"
            alt="change.near Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-green-700">
            Change.near
          </span>
        </a>
        <div className="w-full md:block md:w-auto">
          <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-transparent">
            <li>
              <a
                href="#"
                onClick={() => {
                  State.update({
                    theme: styled.div`
                        * {
                        font-family: 'Kanit';
                        }
                        #start_box{
                            display: ;
                        }
                        #create_box, #home_box, #details_box, #support_box, #my_box{
                            display:none;
                        }
                        #start_change{
                            text-decoration: underline;
                        }
                        ${font}
                        ${css}
                        `,
                  });
                }}
                className="block py-2 px-3 md:p-0 text-green-800 rounded hover:underline hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700"
              >
                เริ่มการรณรงค์
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => {
                  State.update({
                    theme: styled.div`
                        * {
                        font-family: 'Kanit';
                        }
                        #create_box{
                            display: ;
                        }
                        #start_box, #home_box, #details_box, #support_box, #my_box{
                            display:none;
                        }
                        #create_change{
                            text-decoration: underline;
                        }
                        ${font}
                        ${css}
                        `,
                  });
                }}
                className="block py-2 px-3 md:p-0 text-green-800 rounded hover:underline hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green--700"
              >
                สร้างการรณรงค์
              </a>
            </li>
            <li>
              <a
                href="#"
                onClick={() => {
                  State.update({
                    theme: styled.div`
                        * {
                        font-family: 'Kanit';
                        }
                        #my_box{
                            display: ;
                        }
                        #create_box,#start_box, #home_box, #details_box, #support_box{
                            display:none;
                        }
                        #my_change{
                            text-decoration: underline;
                        }
                        ${font}
                        ${css}
                        `,
                  });
                }}
                className="block py-2 px-3 md:p-0 text-green-800 rounded hover:underline hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700"
              >
                การรณรงค์ของฉัน
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="h-px bg-gray-200 border-0"></div>
    </div>

    <div id="home_box" className="relative pt-36 ml-auto">
      <div className="lg:w-2/3 text-center mx-auto">
        <div className="flex justify-center mb-4">
          <img
            src="https://podsawee.com/change/logo.svg"
            className="h-32"
            alt="change.near Logo"
          />
        </div>
        <h1 className="text-green-900 font-bold text-5xl md:text-6xl xl:text-7xl">
          มาร่วมเปลี่ยนแปลงกันกับ{" "}
          <span className="text-green-400">Change.near</span>
        </h1>
        <p className="mt-8 text-green-700">
          ขอเรียนเชิญชวนท่านทุกท่านร่วมมาเป็นส่วนหนึ่งในการเปลี่ยนแปลงที่ดีที่สุด!
          เราเชื่อว่าการทำงานร่วมกันและการแบ่งปันความคิดเห็นจะสร้างพลังที่มากขึ้นในการสร้างการเปลี่ยนแปลงที่เชื่อมโยงกันอย่างมีประสิทธิภาพ
        </p>
        <div className="mt-16 flex flex-wrap justify-center gap-y-4 gap-x-6">
          <a
            href="#"
            onClick={() => {
              State.update({
                theme: styled.div`
                * {
                font-family: 'Kanit';
                }
                #start_box{
                    display: ;
                }
                #create_box, #home_box, #details_box, #support_box, #my_box{
                    display:none;
                }
                #start_change{
                    text-decoration: underline;
                }
                ${font}
                ${css}
                `,
              });
            }}
            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            <span className="relative text-base font-semibold text-white">
              เริ่มการรณรงค์
            </span>
          </a>
          <a
            href="#"
            onClick={() => {
              State.update({
                theme: styled.div`
                * {
                font-family: 'Kanit';
                }
                #support_box{
                    display: ;
                }
                #create_box, #home_box, #details_box, #start_box, #my_box{
                    display:none;
                }
                #start_change{
                    text-decoration: underline;
                }
                ${font}
                ${css}
                `,
              });
            }}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-green-900 rounded-lg group bg-gradient-to-br from-green-400 to-green-800 group-hover:from-green-400 group-hover:to-blue-600 hover:text-green-400 focus:ring-4 focus:outline-none focus:ring-green-200"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
              สนับสนุนเรา
            </span>
          </a>
        </div>
        <div className="hidden py-8 mt-16 border-y border-gray-100 sm:flex justify-between">
          <div className="text-center">
            <div className="text-2xl font-semibold text-green-700">
              โปร่งใส่
            </div>
            <p className="mt-2 text-green-500">ถกประเด็นได้อย่างตรงไป</p>
          </div>
          <div className="text-center">
            <div className="text-2xl font-semibold text-green-700">
              พัฒนาสังคม
            </div>
            <p className="mt-2 text-green-500">สร้างสังคมที่ดีต่อทุกคน</p>
          </div>{" "}
          <div className="text-center">
            <div className="text-2xl font-semibold text-green-700">
              ความยั่งยืน
            </div>
            <p className="mt-2 text-green-500">
              พัฒนาโลกอย่างยั่งยืนตามเป้า SDGs
            </p>
          </div>
        </div>
      </div>
    </div>

    <div id="create_box" className="mt-10 mb-10 max-w-xl mx-auto">
      <div className="text-center text-4xl mb-10 text-green-800">
        สร้างการรณรงค์
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-lg font-medium text-green-800 ">
          หัวข้อ
          <span className="text-sm text-green-600"> ของประเด็นที่จะรณรงค์</span>
        </label>
        <input
          type="text"
          className="bg-gray-50 border border-green-300 text-green-800 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
          value={state.change_title}
          onChange={(e) => {
            State.update({ change_title: e.target.value });
          }}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-lg font-medium text-green-800">
          ประเภท
          <span className="text-sm text-green-600"> ของประเด็นที่จะรณรงค์</span>
        </label>
        <select
          className="bg-gray-50 border border-green-300 text-green-600 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
          onChange={(e) => {
            State.update({ change_topic: e.target.value });
          }}
        >
          <option value="ไม่ระบุประเด็น">ไม่ระบุประเด็น</option>
          <option value="เรื่องเพศ">เรื่องเพศ</option>
          <option value="กฏหมาย / การเมือง">กฏหมาย / การเมือง</option>
          <option value="เศรษฐกิจ">เศรษฐกิจ</option>
          <option value="สุขภาพ">สุขภาพ</option>
          <option value="สิ่งแวดล้อม">สิ่งแวดล้อม</option>
          <option value="ประเด็นอื่นๆ">ประเด็นอื่นๆ</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-lg font-medium text-green-800 ">
          จำนวนผู้สนับสนุนที่ต้องการ
          <span className="text-sm text-green-600"> ของประเด็นที่จะรณรงค์</span>
        </label>
        <input
          type="number"
          className="bg-gray-50 border border-green-300 text-green-800 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
          value={state.change_quantity}
          onChange={(e) => {
            State.update({ change_quantity: e.target.value });
          }}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-lg font-medium text-green-800 ">
          วันที่สิ้นสุด
          <span className="text-sm text-green-600"> ของประเด็นที่จะรณรงค์</span>
        </label>
        <input
          type="date"
          className="bg-gray-50 border border-green-300 text-green-800 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
          value={state.change_enddate}
          onChange={(e) => {
            State.update({ change_enddate: e.target.value });
          }}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-medium text-lg text-green-800">
          รายละเอียด
          <span className="text-sm text-green-600"> ของประเด็นที่จะรณรงค์</span>
        </label>
        <textarea
          rows="4"
          className="block p-2.5 w-full text-sm text-green-800 bg-gray-50 rounded-lg border border-green-300 focus:ring-green-500 focus:border-green-500"
          placeholder="ข้อความของคุณ ..."
          value={state.change_details}
          onChange={(e) => {
            State.update({ change_details: e.target.value });
          }}
        ></textarea>
      </div>
      <div className="mb-4">
        <label
          className="block mb-2 text-lg font-medium text-green-800"
          for="change_picture"
        >
          รูปภาพหน้าปก
          <span className="text-sm text-green-600"> ของประเด็นที่จะรณรงค์</span>
        </label>
        <Files
          className="block p-2.5 w-full text-sm text-green-800 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          multiple={false}
          accepts={["image/*"]}
          onChange={(files) => {
            if (!files || !files.length) return;

            const [body] = files;

            State.update({ uploading: true, cid: null });
            asyncFetch("https://ipfs.near.social/add", {
              method: "POST",
              headers: { Accept: "application/json" },
              body,
            }).then(({ body: { cid } }) => {
              State.update({
                change_picture: cid,
                uploading: false,
              });
            });
          }}
        >
          {state.uploading
            ? "คลิกเพื่ออัปโหลดรูปภาพ"
            : state.change_picture
            ? "คลิกเพื่อเปลี่ยนรูปภาพ"
            : buttonText}
        </Files>
        <div className="mt-1 text-sm text-gray-800">
          * ขนาดรูปภาพที่เหมาะสม 1920x1080px
        </div>
      </div>
      <div className="mb-4">
        <input
          type="radio"
          value="yes"
          className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
          onChange={(e) => {
            State.update({ change_term: e.target.value });
          }}
        />
        <label className="ms-2 text-sm font-medium text-green-900">
          ฉันยอมรับ{" "}
          <a href="#" className="text-green-600 hover:underline">
            ข้อกำหนดและเงื่อนไข
          </a>
        </label>
      </div>
      <div className="mb-4 text-center">
        <CommitButton
          type="submit"
          className={
            !state.show_error_create_form
              ? "text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              : "text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          }
          data={getCreateChangeData(false)}
          onMouseEnter={() => {
            State.update({ hover_element: "Yes" });
          }}
          onMouseLeave={() => {
            State.update({ hover_element: "" });
          }}
          onClick={() => {
            State.update({
              send_post: true,
            });
          }}
        >
          เริ่มการรณรงค์
        </CommitButton>
      </div>
    </div>
    <div id="start_box" className="mt-10 mb-10">
      <div className="text-center text-4xl mb-10 text-green-800">
        ประเด็นการรณรงค์ทั้งหมด
      </div>
      <div className=" flex flex-wrap justify-center">{renderChangeData()}</div>
    </div>
    <div id="my_box" className="mt-10 mb-10">
      <div className="text-center text-4xl mb-10 text-green-800">
        การรณรงค์ของฉัน
      </div>
      <div className=" flex flex-wrap justify-center">{renderMyData()}</div>
    </div>
    <div id="details_box" className="mt-10 mb-10">
      {rendereachData()}
    </div>
    <div id="support_box" className="mt-10 mb-10">
      <div className="text-center text-4xl mb-10 text-green-800">
        ร่วมสนับสนุนเรา
      </div>
      <div className="flex justify-center">
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <img
              className="pt-8 pr-8 pl-8 rounded-t-lg"
              src="https://podsawee.com/change/bitkub.jpg"
              alt="Support Us"
            />
          </a>
          <div className="text-green-500 text-xl text-center"> KUB Coin </div>
          <div className="text-green-400 text-sm text-center pb-4">
            Network BKC - Bitkub Chain (Kap20)
          </div>

          <div className="text-center text-green-700 text-2xl text-bold">
            หรือ
          </div>
          <div className="flex justify-center m-3">
            <button
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              onClick={() => {
                State.update({
                  donate_amount: "1.0",
                });
                donate();
              }}
            >
              สนับสนุน 1.0 Near
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-white rounded-lg">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="text-2xl text-green-700 text-center">
          ขอบคุณสปอนเซอร์
        </div>
        <div className="flex flex-wrap items-center justify-center">
          <div className="mt-4 mr-5 ml-5">
            <img
              src="https://www.bitkubacademy.com/_next/image?url=%2F_next%2Fstatic%2Fimages%2Fbitkub-v2-logo-bg-black-ce27a300a0e320980e8cfeec15ea7d40.png&w=3840&q=75"
              className="h-8"
              alt="Bitkub Acadamy Logo"
            />
          </div>
          <div className="mt-4 mr-5 ml-5">
            <img
              src="https://app.killswitch.finance/images/token/KSW.svg"
              className="h-8"
              alt="Killswitch Logo"
            />
          </div>
          <div className="mt-4 mr-5 ml-5">
            <img
              src="https://near.org/_next/static/media/near-logo.1416a213.svg"
              className="h-8"
              alt="Near Logo"
            />
          </div>
        </div>
        <hr className="my-6 border-gray-700 sm:mx-auto lg:my-8" />
        <div className="flex justify-center">
          <img
            src="https://podsawee.com/change/logo.svg"
            className="h-32"
            alt="change.near Logo"
          />
        </div>
        <span className="block text-sm text-gray-500 sm:text-center">
          © 2023{" "}
          <a href="https://podsawee.com/" className="hover:underline">
            BITBOS
          </a>
          สงวนลิขสิทธิ์
        </span>
      </div>
    </div>
  </Theme>
);
