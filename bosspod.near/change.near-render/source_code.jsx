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
                1,234 / {changeBox.value.quantity} คน
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
          <div className="h-px bg-gray-200 border-0"></div>
          <div className="mt-5 mb-5 max-w-xl mx-auto">
            <div className="text-center text-2xl mb-10 text-green-800">
              ร่วมลงชื่อสนับสนุนการรณรงค์
            </div>
            <div className="mb-4">
              <label
                for="change_details"
                className="block mb-2 font-medium text-lg text-green-800"
              >
                เหตุผล
                <span className="text-sm text-green-600">
                  {" "}
                  ของการลงชื่อสนับสนุน
                </span>
              </label>
              <textarea
                id="change_details"
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
                id="sign_term"
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
