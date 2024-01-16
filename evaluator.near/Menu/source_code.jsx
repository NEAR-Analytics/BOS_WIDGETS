const { menuLinks, curriculumLinks, progress, selected, onSelect } = props;

const capitalize = (words) => {
  return words
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
};


return (
  <>
    <div class="flex items-center">
      <div class="flex w-full">
        <ul class="flex flex-col w-full">
          <li>
            <span class="flex font-medium text-sm text-gray-400 px-4 my-2 uppercase bg-gray-800 text-gray-100 rounded py-1">Pages</span>
          </li>
          {menuLinks.map(({ label, icon, component }) => (
            <li class="my-px">
              <a
                href={`#`}
                class={`flex flex-row items-center h-12 px-2 rounded-lg text-gray-600  ${selected.path === component.path ? "bg-gray-100" : "hover:bg-gray-100"}`}
                onClick={() => onSelect(component)}
              >
                <span class="flex items-center justify-center text-lg text-gray-400">
                  <i class={`bi bi-${icon} me-1`} />
                </span>
                <span class="ml-3">{capitalize(label)}</span>
              </a>
            </li>
          ))}
          <li>
            <span class="flex font-medium text-sm text-gray-400 px-4 my-2 uppercase bg-gray-800 text-gray-100 rounded py-1">Curriculum</span>
          </li>
          {curriculumLinks.map(({ label, component }, index) => (
            <li class="my-px">
              <a
                href={`#`}
                class={`flex flex-row items-center h-12 px-2 rounded-lg text-gray-600  ${selected.path === component.path ? "bg-gray-100" : "hover:bg-gray-100"}`}
                onClick={() => onSelect(component)}
              >
                <span class="flex items-center justify-center text-lg text-gray-400">
                  {progress[index] ? <i class="bi bi-check-circle-fill text-primary" ></i> : <i class="bi bi-circle text-primary"></i>}
                </span>
                <span class="ml-3">{capitalize(label)}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </>
);
