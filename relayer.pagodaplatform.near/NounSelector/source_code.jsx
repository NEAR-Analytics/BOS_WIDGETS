const PARAMETERS = ["ACCESSORY", "BODY", "GLASSES", "HEAD"];

const OPTIONS_ACCESSORY = [
  "1n",
  "aardvark",
  "axe",
  "belly-chameleon",
  "bird-flying",
  "bird-side",
  "bling-anchor",
  "bling-anvil",
  "bling-arrow",
  "bling-cheese",
  "bling-gold-ingot",
  "bling-love",
  "bling-mask",
  "bling-rings",
  "bling-scissors",
  "bling-sparkles",
  "body-gradient-checkerdisco",
  "body-gradient-dawn",
  "body-gradient-dusk",
  "body-gradient-glacier",
  "body-gradient-ice",
  "body-gradient-pride",
  "body-gradient-redpink",
  "body-gradient-sunset",
  "carrot",
  "chain-logo",
  "checker-RGB",
  "checker-bigwalk-blue-prime",
  "checker-bigwalk-greylight",
  "checker-bigwalk-rainbow",
  "checker-spaced-black",
  "checker-spaced-white",
  "checker-vibrant",
  "checkers-big-green",
  "checkers-big-red-cold",
  "checkers-black",
  "checkers-blue",
  "checkers-magenta-80",
  "chicken",
  "cloud",
  "clover",
  "collar-sunset",
  "cow",
  "decay-gray-dark",
  "decay-pride",
  "dinosaur",
  "dollar-bling",
  "dragon",
  "ducky",
  "eth",
  "eye",
  "flash",
  "fries",
  "glasses-logo-sun",
  "glasses-logo",
  "glasses",
  "grid-simple-bege",
  "heart",
  "hoodiestrings-uneven",
  "id",
  "infinity",
  "insignia",
  "leaf",
  "lightbulb",
  "lines-45-greens",
  "lines-45-rose",
  "lp",
  "marsface",
  "matrix-white",
  "moon-block",
  "none",
  "oldshirt",
  "pizza-bling",
  "pocket-pencil",
  "rain",
  "rainbow-steps",
  "rgb",
  "robot",
  "safety-vest",
  "scarf-clown",
  "secret-x",
  "shirt-black",
  "shrimp",
  "slimesplat",
  "small-bling",
  "snowflake",
  "stains-blood",
  "stains-zombie",
  "stripes-and-checks",
  "stripes-big-red",
  "stripes-blit",
  "stripes-blue-med",
  "stripes-brown",
  "stripes-olive",
  "stripes-red-cold",
  "sunset",
  "taxi-checkers",
  "tee-yo",
  "text-yolo",
  "think",
  "tie-black-on-white",
  "tie-dye",
  "tie-purple-on-white",
  "tie-red",
  "txt-a2+b2",
  "txt-cc",
  "txt-cc2",
  "txt-copy",
  "txt-dao-black",
  "txt-doom",
  "txt-dope-text",
  "txt-foo-black",
  "txt-ico",
  "txt-io",
  "txt-lmao",
  "txt-lol",
  "txt-mint",
  "txt-nil-grey-dark",
  "txt-noun-f0f",
  "txt-noun-green",
  "txt-noun-multicolor",
  "None",
];

const OPTIONS_BODY = [
  "bege-bsod",
  "bege-crt",
  "blue-sky",
  "bluegrey",
  "cold",
  "computerblue",
  "darkbrown",
  "darkpink",
  "foggrey",
  "gold",
  "grayscale-1",
  "grayscale-7",
  "grayscale-8",
  "grayscale-9",
  "green",
  "gunk",
  "hotbrown",
  "magenta",
  "orange-yellow",
  "orange",
  "peachy-B",
  "peachy-a",
  "purple",
  "red",
  "redpinkish",
  "rust",
  "slimegreen",
  "teal-light",
  "teal",
  "yellow",
  "none",
];

const OPTIONS_GLASSES = [
  "Hip Rose",
  "Black, Red Eyes",
  "Black, RGB",
  "Black",
  "Blue",
  "Dark Purple",
  "Green",
  "Black, Sunglasses",
  "Green & Blue",
  "Light Gray",
  "Guava",
  "Honey",
  "Magenta",
  "Orange",
  "Pink & Purple",
  "Red",
  "Smoke",
  "Teal",
  "Watermelon",
  "Yellow & Orange",
  "Yellow",
  "None",
];

const OPTIONS_HEAD = [
  "aardvark",
  "abstract",
  "ape",
  "bag",
  "bagpipe",
  "banana",
  "bank",
  "baseball-gameball",
  "basketball",
  "bat",
  "bear",
  "beer",
  "beet",
  "bell",
  "bigfoot-yeti",
  "bigfoot",
  "blackhole",
  "blueberry",
  "bomb",
  "bonsai",
  "boombox",
  "boot",
  "box",
  "boxingglove",
  "brain",
  "bubble-speech",
  "bubblegum",
  "burger-dollarmenu",
  "cake",
  "calculator",
  "calendar",
  "camcorder",
  "cannedham",
  "car",
  "cash-register",
  "cassettetape",
  "cat",
  "cd",
  "chain",
  "chainsaw",
  "chameleon",
  "chart-bars",
  "cheese",
  "chefhat",
  "cherry",
  "chicken",
  "chilli",
  "chipboard",
  "chips",
  "chocolate",
  "cloud",
  "clover",
  "clutch",
  "coffeebean",
  "cone",
  "console-handheld",
  "cookie",
  "cordlessphone",
  "cottonball",
  "cow",
  "crab",
  "crane",
  "croc-hat",
  "crown",
  "crt-bsod",
  "crystalball",
  "diamond-blue",
  "diamond-red",
  "dictionary",
  "dino",
  "dna",
  "dog",
  "doughnut",
  "drill",
  "duck",
  "ducky",
  "earth",
  "egg",
  "faberge",
  "factory-dark",
  "fan",
  "fence",
  "film-35mm",
  "film-strip",
  "fir",
  "firehydrant",
  "flamingo",
  "flower",
  "fox",
  "frog",
  "garlic",
  "gavel",
  "ghost-B",
  "glasses-big",
  "gnome",
  "goat",
  "goldcoin",
  "goldfish",
  "grouper",
  "hair",
  "hardhat",
  "heart",
  "helicopter",
  "highheel",
  "hockeypuck",
  "horse-deepfried",
  "hotdog",
  "house",
  "icepop-b",
  "igloo",
  "island",
  "jellyfish",
  "jupiter",
  "kangaroo",
  "ketchup",
  "laptop",
  "lightning-bolt",
  "lint",
  "lips",
  "lipstick2",
  "lock",
  "macaroni",
  "mailbox",
  "maze",
  "microwave",
  "milk",
  "mirror",
  "mixer",
  "moon",
  "moose",
  "mosquito",
  "mountain-snowcap",
  "mouse",
  "mug",
  "mushroom",
  "mustard",
  "nigiri",
  "noodles",
  "onion",
  "orangutan",
  "orca",
  "otter",
  "outlet",
  "owl",
  "oyster",
  "paintbrush",
  "panda",
  "paperclip",
  "peanut",
  "pencil-tip",
  "peyote",
  "piano",
  "pickle",
  "pie",
  "piggybank",
  "pill",
  "pillow",
  "pineapple",
  "pipe",
  "pirateship",
  "pizza",
  "plane",
  "pop",
  "porkbao",
  "potato",
  "pufferfish",
  "pumpkin",
  "pyramid",
  "queencrown",
  "rabbit",
  "rainbow",
  "rangefinder",
  "raven",
  "retainer",
  "rgb",
  "ring",
  "road",
  "robot",
  "rock",
  "rosebud",
  "ruler-triangular",
  "saguaro",
  "sailboat",
  "sandwich",
  "saturn",
  "saw",
  "scorpion",
  "shark",
  "shower",
  "skateboard",
  "skeleton-hat",
  "skilift",
  "smile",
  "snowglobe",
  "snowmobile",
  "spaghetti",
  "sponge",
  "squid",
  "stapler",
  "star-sparkles",
  "steak",
  "sunset",
  "taco-classic",
  "taxi",
  "thumbsup",
  "toaster",
  "toiletpaper-full",
  "tooth",
  "toothbrush-fresh",
  "tornado",
  "trashcan",
  "turing",
  "ufo",
  "undead",
  "unicorn",
  "vent",
  "void",
  "volcano",
  "volleyball",
  "wall",
  "wallet",
  "wallsafe",
  "washingmachine",
  "watch",
  "watermelon",
  "wave",
  "weed",
  "weight",
  "werewolf",
  "whale-alive",
  "whale",
  "wine",
  "wizardhat",
  "zebra",
  "none",
];

const OPTIONS = {
  ACCESSORY: OPTIONS_ACCESSORY,
  BODY: OPTIONS_BODY,
  GLASSES: OPTIONS_GLASSES,
  HEAD: OPTIONS_HEAD,
};

const { onSelect } = props;

const Container = styled.div`
    padding: 20px;
    overflow: auto;
    background-color: blue;
    color: white;
    margin: 20px;
    border-radius: 25px;
    max-width: 500px;
    min-width: 400px;
    margin-left: auto;
    margin-right: auto;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
`;

const LeftCol = styled.div`
    width: 25%;
    min-width: 250px;
`;

const NounImage = styled.img`
    width: 100%;
    border-radius: 25px;
`;

const Centered = styled.div`
    display: flex;
    flex-direction: flex-col;
    width: 100%;
    padding: auto;
    align-items: center;
    justify-content: center;
    margin-top: 24px;
`;

State.init({ params: {} });

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLocaleLowerCase();
}

const handleSeedChange = (event) => {
  State.update({
    inputSeed: event.target.value,
  });
};

const handleChangeGenerator = (key) => (value) => {
  if (value.length === 0) {
    delete state.params[key];
    State.update({
      params: state.params,
    });
  } else {
    State.update({
      params: {
        ...state.params,
        [key]: value.map((v) => {
          if (v === "None") return "n";
          return OPTIONS[key].findIndex((e) => e === v);
        }),
      },
    });
  }
};

const getNounUrl = (params) => {
  const urlObject = new URL("https://api.cloudnouns.com/v1/pfp");
  state?.inputSeed && urlObject.searchParams.append("text", state.inputSeed);
  Object.keys(params ?? {}).forEach((key) => {
    urlObject.searchParams.append(
      key.toLocaleLowerCase(),
      state.params[key].join(",")
    );
  });
  return urlObject;
};

return (
  <Container>
    <Row>
      <LeftCol>
        <label>Text Seed</label>
        <input
          placeholder="Enter a seed phrase..."
          onChange={handleSeedChange}
        />
        <br />
        {Object.keys(OPTIONS).map((key) => (
          <>
            <label>{capitalizeFirstLetter(key)}</label>
            <Typeahead
              options={OPTIONS[key]}
              multiple
              onChange={handleChangeGenerator(key)}
              placeholder={`Choose ${key.toLocaleLowerCase()}...`}
            />
            <br />
          </>
        ))}
      </LeftCol>
      <div>
        <NounImage src={getNounUrl(state.params).href} />
        <Centered>
          <Widget
            src="near/widget/DIG.Button"
            props={{
              fill: "outline",
              iconLeft: "ph-bold ph-floppy-disk",
              label: "Use Noun",
              variant: "secondary",
            }}
            onClick={() => {
              const nounURL = getNounUrl(state.params);
              // Storage.set("nounHref", nounURL.href);
              // Storage.set("nounParams", nounURL.params);
              onSelect?.(nounURL);
            }}
          />
        </Centered>
      </div>
    </Row>
  </Container>
);
