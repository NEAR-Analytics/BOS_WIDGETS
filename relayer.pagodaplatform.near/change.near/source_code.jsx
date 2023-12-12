const css = fetch(
  "https://cdn.jsdelivr.net/npm/tailwindcss@2.2/dist/tailwind.min.css"
).body;

const font = fetch("https://fonts.googleapis.com/css?family=Kanit").body;

if (!css && !font) return "Cannot load CSS & Font.";

State.init({
  theme: null,
});

if (!state.theme) {
  State.update({
    theme: styled.div`
    * {
    font-family: 'Kanit';
    }
      ${font}
      ${css}
    `,
  });
}

const Theme = state.theme;

return (
  <Theme>
    <div className="border-gray-200 text-center">
      <div className="max-w-screen-xl flex flex-wrap items-center lg:justify-center xl:justify-between mx-auto p-4">
        <a
          href="#"
          className="flex items-center r space-x-3 rtl:space-x-reverse"
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
        <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
          <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent">
            <li>
              <a
                href="#"
                className="block py-2 px-3 md:p-0 text-green-800 rounded hover:underline hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700"
              >
                เริ่มการรณรงค์
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 px-3 md:p-0 text-green-800 rounded hover:underline hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green--700"
              >
                สร้างการรณรงค์
              </a>
            </li>
            <li>
              <a
                href="#"
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

    <div className="relative pt-36 ml-auto">
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
            className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            <span className="relative text-base font-semibold text-white">
              เริ่มการรณรงค์
            </span>
          </a>
          <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-green-900 rounded-lg group bg-gradient-to-br from-green-400 to-green-800 group-hover:from-green-400 group-hover:to-blue-600 hover:text-green-400 focus:ring-4 focus:outline-none focus:ring-green-200">
            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
              สนับสนุนเรา
            </span>
          </button>
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

    <div className="mt-10 mb-10 max-w-xl mx-auto">
      <div className="text-center text-4xl mb-10 text-green-800">
        สร้างการรณรงค์
      </div>
      <div className="mb-4">
        <label
          for="change_title"
          className="block mb-2 text-lg font-medium text-green-800 "
        >
          หัวข้อ
          <span className="text-sm text-green-600"> ของประเด็นที่จะรณรงค์</span>
        </label>
        <input
          type="text"
          id="change_title"
          className="bg-gray-50 border border-green-300 text-green-800 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
        />
      </div>
      <div className="mb-4">
        <label
          for="change_topic"
          className="block mb-2 text-lg font-medium text-green-800"
        >
          ประเภท
          <span className="text-sm text-green-600"> ของประเด็นที่จะรณรงค์</span>
        </label>
        <select
          id="change_topic"
          className="bg-gray-50 border border-green-300 text-green-600 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
        >
          <option value="na">ไม่ระบุประเด็น</option>
          <option value="issues_1">เรื่องเพศ</option>
          <option value="issues_2">กฏหมาย / การเมือง</option>
          <option value="issues_3">การศึกษา</option>
          <option value="issues_other">ประเด็นอื่นๆ</option>
        </select>
      </div>
      <div className="mb-4">
        <label
          for="change_quantity"
          className="block mb-2 text-lg font-medium text-green-800 "
        >
          จำนวนผู้สนับสนุนที่ต้องการ
          <span className="text-sm text-green-600"> ของประเด็นที่จะรณรงค์</span>
        </label>
        <input
          type="number"
          id="change_quantity"
          className="bg-gray-50 border border-green-300 text-green-800 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
        />
      </div>
      <div className="mb-4">
        <label
          for="change_quantity"
          className="block mb-2 text-lg font-medium text-green-800 "
        >
          วันที่สิ้นสุด
          <span className="text-sm text-green-600"> ของประเด็นที่จะรณรงค์</span>
        </label>
        <input
          type="date"
          id="change_quantity"
          className="bg-gray-50 border border-green-300 text-green-800 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
        />
      </div>
      <div className="mb-4">
        <label
          for="change_details"
          className="block mb-2 font-medium text-lg text-green-800"
        >
          รายละเอียด
          <span className="text-sm text-green-600"> ของประเด็นที่จะรณรงค์</span>
        </label>
        <textarea
          id="change_details"
          rows="4"
          className="block p-2.5 w-full text-sm text-green-800 bg-gray-50 rounded-lg border border-green-300 focus:ring-green-500 focus:border-green-500"
          placeholder="ข้อความของคุณ ..."
        ></textarea>
      </div>
      <div className="mb-4">
        <label
          className="block mb-2 text-lg font-medium text-green-800"
          for="user_avatar"
        >
          รูปภาพหน้าปก
          <span className="text-sm text-green-600"> ของประเด็นที่จะรณรงค์</span>
        </label>
        <input
          className="block p-2.5 w-full text-sm text-green-800 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          aria-describedby="user_avatar_help"
          id="user_avatar"
          type="file"
        />
        <div className="mt-1 text-sm text-gray-800" id="user_avatar_help">
          * ขนาดรูปภาพที่เหมาะสม 1920x1080px
        </div>
      </div>
      <div className="mb-4">
        <input
          id="change_term"
          type="checkbox"
          value=""
          className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
        />
        <label
          for="change_term"
          className="ms-2 text-sm font-medium text-green-900"
        >
          ฉันยอมรับ{" "}
          <a href="#" className="text-green-600 hover:underline">
            ข้อกำหนดและเงื่อนไข
          </a>
        </label>
      </div>
      <div className="mb-4 text-center">
        <button
          type="submit"
          className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          เริ่มการรณรงค์
        </button>
      </div>
       
    </div>

    <div className="mt-10 mb-10">
      <div className="text-center text-4xl mb-10 text-green-800">
        ประเด็นการรณรงค์ทั้งหมด
      </div>
      <div className=" flex flex-wrap justify-center">
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow mr-2 ml-2 mb-2 mt-2">
          <a href="#">
            <img
              className="rounded-t-lg"
              src="https://wallpaperset.com/w/full/3/2/a/458324.jpg"
              alt=""
            />
          </a>
          <div className="p-5">
            <a href="#">
              <div className="mb-2 text-2xl font-bold tracking-tight text-center text-green-900">
                ชื่อประเด็นที่จะรณรงค์
              </div>
            </a>
            <div className="mb-3 font-normal text-center text-green-600">
              รายละเอียดเรื่องที่จะรณรงค์
            </div>
            <div className="text-center">
              <a
                href="#"
                className="inline-flex text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
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
      </div>
    </div>

    <div className="mt-10 mb-10">
      <div className="w-full p-4 text-center bg-white sm:p-8">
        <div className="flex flex-col items-center justify-center mb-5">
          <img
            className="rounded-t-lg max-w-2xl "
            src="https://wallpaperset.com/w/full/3/2/a/458324.jpg"
            alt=""
          />
        </div>
        <div className="mb-2 text-3xl font-bold text-green-800">
          ชื่อประเด็นที่จะรณรงค์
        </div>
        <div className="flex justify-center max-w-screen-xl grid-cols-2 gap-8 p-4 mx-auto text-gray-900">
          <div className="flex flex-col items-center justify-center mr-3 ml-3">
            <div className="mb-2 text-2xl text-green-700 font-extrabold">
              1,234 / 2,000 คน
            </div>
            <div className="text-green-500">ผู้ร่วมสนับสนุนประเด็น</div>
          </div>
          <div className="flex flex-col items-center justify-center mr-3 ml-3">
            <div className="mb-2 text-2xl text-green-700 font-extrabold">
              07 ตุลาคม 2567
            </div>
            <div className="text-green-500">วันที่สิ้นสุด</div>
          </div>
        </div>

        <p className="mb-2 text-base text-green-500 sm:text-lg">
          รายละเอียดเรื่องที่จะรณรงค์
        </p>
        <div className="flex items-center justify-center mt-6 space-x-3 mb-5">
          <img
            className="w-6 h-6 rounded-full"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png"
            alt="profile picture"
          />

          <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-500">
            <div className="pe-3 font-medium text-green-900">ชื่อคนโพสต์</div>
            <div className="ps-3 text-sm text-green-500">เวลาที่โพสต์</div>
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
                ของการลงชื่อสนันสนุน
              </span>
            </label>
            <textarea
              id="change_details"
              rows="4"
              className="block p-2.5 w-full text-sm text-green-800 bg-gray-50 rounded-lg border border-green-300 focus:ring-green-500 focus:border-green-500"
              placeholder="ข้อความของคุณ ..."
            ></textarea>
          </div>

          <div className="mb-4">
            <input
              id="change_term"
              type="checkbox"
              value=""
              className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
            />
            <label
              for="change_term"
              className="ms-2 text-sm font-medium text-green-900"
            >
              ฉันยอมรับ{" "}
              <a href="#" className="text-green-600 hover:underline">
                ข้อกำหนดและเงื่อนไข
              </a>
            </label>
          </div>

          <div className="mb-4 text-center">
            <button
              type="submit"
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              สนันสนุนประเด็นนี้
            </button>
          </div>
        </div>
        <div className="h-px bg-gray-200 border-0"></div>
        <div className="mt-5 mb-5 max-w-xl mx-auto">
          <div className="text-center text-2xl mb-10 text-green-800">
            รายชื่อและคอมเม้นของผู้ร่วมลงชื่อสนับสนุนการรณรงค์
          </div>

          <div className="text-left boarder shadow p-3">
            <div className="flex items-center mb-4">
              <img
                className="w-10 h-10 me-4 rounded-full"
                src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gouch.png"
                alt=""
              />
              <div className="font-medium">
                <p>
                  ชื่อผู้สนับสนุน{" "}
                  <div
                    datetime="2014-08-16 19:00"
                    className="block text-sm text-gray-500"
                  >
                    สนับสนุนเมื่อวันที่
                  </div>
                </p>
              </div>
            </div>
            <p className="mb-2 text-gray-500">คอมเม้นของผู้สนับสนุน</p>
          </div>
        </div>
      </div>
    </div>
    <div className="mt-10 mb-10">
      <div className="text-center text-4xl mb-10 text-green-800">
        ร่วมสนับสนุนเรา
      </div>
      <div className="flex justify-center">
        <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <img
              class="p-8 rounded-t-lg"
              src="https://podsawee.com/change/binance.png"
              alt="product image"
            />
          </a>
          <div className="text-center text-green-700 text-2xl text-bold">
            หรือ
          </div>
          <div className="flex justify-center mt-3 mb-3">
            <Web3Connect
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              connectLabel="เชื่อมต่อกระเป๋าตังดิจิทัลของคุณ"
            />
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
