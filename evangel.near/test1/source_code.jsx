State.init({
  answer: "",
  showOptions: false,
  answer1: "",
  answer2: "",
  answer3: "",
  answer4: "",
  optionA: "",
  optionB: "",
  optionC: "",
});

const handleAnswer = (selectedAnswer) => {
  State.update({
    answer: selectedAnswer,
    showOptions: true,
  });
};

const handleOptionA = (selectedOption) => {
  State.update({
    answer: selectedOption,
    showOptions: false,
  });
};

const handleOptionB = (selectedOption) => {
  State.update({
    answer: selectedOption,
    showOptions: false,
  });
};

const handleOptionC = (selectedOption) => {
  State.update({
    answer: selectedOption,
    showOptions: false,
  });
};

const handleOptionD = (selectedOption) => {
  State.update({
    answer: selectedOption,
    showOptions: false,
  });
};

let showQuestion1 = false;

if (
  Social.keys(`${context.accountId}.near/graph/follow/evangel.near`) === true
) {
  showQuestion1 = true;
}

let showQuestion2 = false;
let showQuestion3 = false;
let showQuestion4 = false;
let showQuestion5 = false;

if (state.answer1.toLowerCase() === "blockchain operating system") {
  showQuestion2 = true;
}

if (state.answer2.toLowerCase() === "javascript") {
  showQuestion3 = true;
}

if (state.answer3 === "evangel.near/widget/test") {
  showQuestion4 = true;
}

if (state.answer4.toLowerCase() === "near") {
  showQuestion5 = true;
}

return (
  <div>
    <div className="d-flex flex-wrap justify-content-between mb-3">
      <div className="m-1">
        <h2>
          <b>test</b>
        </h2>
      </div>
      <div className="m-2">
        <Widget
          src="mob.near/widget/Profile"
          props={{ accountId: "evangel.near" }}
        />
        <br></br>
        <Widget
          src="near/widget/ShareButton"
          props={{ accountId: "evangel.near" }}
        />
        Share
      </div>
    </div>
    <hr />
    <div>
      {context.accountId ? (
        <Widget
          src="hack.near/widget/connect.button"
          props={{ accountId: "academy.near" }}
        />
      ) : (
        <Widget
          src="near/widget/DIG.Button"
          props={{
            href: "https://near.org/signup",
            label: "Create Account",
            variant: "outline-dark",
          }}
        />
      )}
    </div>
    <br />
    <div>
      <h5>Soru 1:</h5>
      <p>"BOS" kısaltması ne anlama geliyor?</p>
      <input
        className="form-control"
        placeholder="Cevabınızı buraya yazın :)"
        defaultValue={state.answer1}
        onChange={(e) => {
          State.update({
            answer1: e.target.value,
          });
        }}
      />
    </div>
    <br />
    {showQuestion5 && (
      <div>
        <h5>Question 5:</h5>
        <p>Which is NOT 1 of the 3 core pillars of the BOS?</p>
        <button onClick={() => handleAnswer("A")}>Components</button>
        <button onClick={() => handleAnswer("B")}>Smart Contracts</button>
        <button onClick={() => handleAnswer("C")}>Gateways</button>
        <button onClick={() => handleAnswer("D")}>Blockchains</button>
      </div>
    )}
    {state.showOptions && (
      <div>
        {state.answer === "A" && (
          <div>
            <br />
            <h5>TRY AGAIN </h5>
            <p>
              Components are small web 3 applications that are stored entirely
              on-chain. Developers can fork these apps and compose them to
              create full web applications.
            </p>
          </div>
        )}
        {state.answer === "B" && (
          <div>
            <br />
            <h5>CONGRATS 🎉</h5>
            <p>You got it right!</p>
            <p>
              Although BOS makes it easier for builders to facilitate user
              interactions with smart contracts, they are not considered one of
              the core pillars. However, you are just now beginning a journey to
              understand the SocialDB contract...
            </p>
            <Widget
              src="hack.near/widget/claim.badge"
              props={{ memberId: context.accountId }}
            />
          </div>
        )}
        {state.answer === "C" && (
          <div>
            <br />

            <h5>TRY AGAIN</h5>
            <p>
              Components can call functions on any blockchain, with current
              support for all EVM chains (e.g. Polygon, zkSync) and NEAR. The
              source code for the apps is on NEAR, due to its ability to very
              cheaply store HTML/CSS/JS (a few cents).
            </p>
          </div>
        )}
        {state.answer === "D" && (
          <div>
            <br />

            <h5>TRY AGAIN</h5>
            <p>
              Gateways make locally-run, decentralized front-ends available to
              the masses. A gateway consists of a specially designed virtual
              machine that loads and runs frontends for protocols built on
              Ethereum, L2s, and other Layer 1s like NEAR. The code for these
              frontends is stored on the NEAR blockchain.
            </p>
          </div>
        )}
      </div>
    )}
    <br />
    {showQuestion4 && (
      <div>
        <h5>Soru 4:</h5>
        <p>BOS'ta depolanan merkezi olmayan uygulamalar için kod nerede?</p>
        <input
          className="form-control"
          placeholder="Cevabınızı buraya yazın :)"
          defaultValue={state.answer4}
          onChange={(e) => {
            State.update({
              answer4: e.target.value,
            });
          }}
        />
      </div>
    )}
    <br />
    {showQuestion5 && (
      <div>
        <h5>Soru 5:</h5>
        <p>Hangisi BOS'un 3 temel direğinden biri DEĞİLDİR?</p>
        <button onClick={() => handleAnswer("A")}>Components</button>
        <button onClick={() => handleAnswer("B")}>Smart Contracts</button>
        <button onClick={() => handleAnswer("C")}>Gateways</button>
        <button onClick={() => handleAnswer("D")}>Blockchains</button>
      </div>
    )}
    {state.showOptions && (
      <div>
        {state.answer === "A" && (
          <div>
            <br />
            <h5>TEKRAR DENEYİN </h5>
            <p>
              Bileşenler, tamamen depolanan küçük web 3 uygulamalarıdır. zincir
              üzerinde. Geliştiriciler bu uygulamaları çatallayabilir ve tam web
              uygulamaları oluşturur.
            </p>
          </div>
        )}
        {state.answer === "B" && (
          <div>
            <br />
            <h5>TEBRIKLER 🎉</h5>
            <p>
              doğru cevapladın! Ödül için bizimle iletişime geç 👇
              <a href="https://t.me/near_tr" target="_blank">
                <h3>Near Türkiye Telegram</h3>
              </a>
              <a
                href="https://keypom.xyz/claim/v2.keypom.near#2vSPzAZVi4P1KGf15hiD1n9zhP4g1A3V4CgAC8CLiwmdj13TnaggpQdgQsFPLADDtaJi4JvqPd4pSSdXgWRE6xLs"
                target="_blank"
              >
                <h3> KEYPOM ÖDÜL LINKI ICIN TIKLA 🎁 </h3>
              </a>
            </p>
            <p>
              BOS, geliştiricilerin akıllı sözleşmelerle kullanıcı
              etkileşimlerini kolaylaştırmasını kolaylaştırsa da, sütunlardan
              biri olarak kabul edilmez. Ancak şimdi, Social DB sözleşmesini
              anlama yolculuğuna çıkın...
            </p>
            <Widget
              src="hack.near/widget/claim.badge"
              props={{ memberId: context.accountId }}
            />
          </div>
        )}
        {state.answer === "C" && (
          <div>
            <br />

            <h5>TEKRAR DENEYİN</h5>
            <p>
              Bileşenler, herhangi bir blok zincirindeki işlevleri çağırabilir,
              şu anda tüm EVM zincirleri (ör. Polygon, zkSync) ve NEAR
              desteklenmektedir. Uygulamaların kaynak kodu NEAR'da, çünkü
              HTML/CSS/JS'yi çok ucuza (birkaç sent) depolayabilir.
            </p>
          </div>
        )}
        {state.answer === "D" && (
          <div>
            <br />

            <h5>TEKRAR DENEYIN </h5>
            <p>
              Ağ geçitleri ( Gateway ), yerel olarak yürütülen, merkezi olmayan
              ön uçları geniş kitlelerin kullanımına sunar. Bir ağ geçidi,
              Ethereum, L2'ler ve NEAR gibi diğer Katman 1'ler üzerine kurulu
              protokoller için ön uçları yükleyen ve çalıştıran özel olarak
              tasarlanmış bir sanal makineden oluşur. Bu ön uçların kodu NEAR
              blok zincirinde saklanır.
            </p>
          </div>
        )}
      </div>
    )}
    <br />
  </div>
);
