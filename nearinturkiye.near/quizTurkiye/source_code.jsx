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
  Social.keys(`${context.accountId}.near/graph/follow/academy.near`) === true
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

if (state.answer3 === "nearinturkiye.near/widget/quizTurkiye") {
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
          <b>NEAR Türkiye QUIZ</b>
        </h2>
        <h4>
          Her biri 0.5 Near değerinde 5 soru ile toplamda 2.5 NEAR kazanma şansı
          🎁{" "}
        </h4>
      </div>
      <div className="m-2">
        <Widget
          src="mob.near/widget/Profile"
          props={{ accountId: "nearinturkiye.near" }}
        />
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
        placeholder="Your answer goes here :)"
        defaultValue={state.answer1}
        onChange={(e) => {
          State.update({
            answer1: e.target.value,
          });
        }}
      />
    </div>
    <br />
    {showQuestion2 && (
      <div>
        <h5>Soru 2:</h5>
        <p>BOS üzerinde hangi dil kullanılır?</p>
        <input
          className="form-control"
          placeholder="Cevabınızı buraya yazın :)"
          defaultValue={state.answer2}
          onChange={(e) => {
            State.update({
              answer2: e.target.value,
            });
          }}
        />
      </div>
    )}
    <br />
    {showQuestion3 && (
      <div>
        <h5>Soru 3:</h5>
        <p>Şu anda kullanmakta olduğunuz bu BOS bileşeninin url-yolu nedir?</p>
        <input
          className="form-control"
          placeholder="Cevabınızı buraya yazın :)"
          defaultValue={state.answer3}
          onChange={(e) => {
            State.update({
              answer3: e.target.value,
            });
          }}
        />
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
