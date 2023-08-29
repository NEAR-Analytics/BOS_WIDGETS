let greeting = "Have a great day";

State.init({
  text: `"b" + "a" + +"a" + "a"`,
});

const code = `
<h1>Todo</h1>

    <form id="sign">
      <input id="alias" placeholder="username">
      <input id="pass" type="password" placeholder="passphrase">
      <input id="in" type="submit" value="sign in">
      <input id="up" type="button" value="sign up">
    </form>

    <ul></ul>

    <form id="said">
        <input id="say">
        <input id="speak" type="submit" value="speak">
    </form>

    <script src="https://cdn.jsdelivr.net/npm/gun/examples/jquery.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gun/gun.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gun/sea.js"></script>
    <!-- script src="https://cdn.jsdelivr.net/npm/gun/lib/webrtc.js"></script -->
    <script>
    var gun = Gun(['http://localhost:8765/gun', 'https://gun-manhattan.herokuapp.com/gun']);
    var user = gun.user();

    $('#up').on('click', function(e){
      user.create($('#alias').val(), $('#pass').val());
    });

    $('#sign').on('submit', function(e){
      e.preventDefault();
      user.auth($('#alias').val(), $('#pass').val());
    });

    $('#said').on('submit', function(e){
      e.preventDefault();
      if(!user.is){ return }
      user.get('said').set($('#say').val());
      $('#say').val("");
    });

    function UI(say, id){
      var li = $('#' + id).get(0) || $('<li>').attr('id', id).appendTo('ul');
      $(li).text(say);
    };

    gun.on('auth', function(){
      $('#sign').hide();
      user.get('said').map().once(UI);
    });
    </script>
`;

function initWASM() {
  WebAssembly.instantiateStreaming(fetch("simple.wasm"), importObject).then(
    (results) => {
      // Do something with the results!
      console.log(results);
    },
  );
}

return (
  <>
    <div class="chat hue2 page">
      <h2 id='title' class="chat__heading hue2 whitet">Have a Conversation...</h2>
      <ul class="chat__message-list">
        <li class="none"></li>
      </ul>

      <div class="chat__form-container hue2 chat__form">
        {/* <form class="chat__form"> */}
          <label for="name-input" class="visually-hidden">Name</label>          
          <input id="name-input" class="chat__name-input" placeholder="Name"></input>
          <label for="message-input" class="visually-hidden">Message</label>
          <input id="message-input" class="chat__message-input" placeholder="Write a message..."></input>
          <button class="chat__submit say hue2" onClick={initWASM}>say</button>
        {/* </form> */}
      </div>

      <div class="model">
        <li class="chat__message white huet2 box">
          <b class="chat__name"></b>
          <p class="chat__message-text"></p>
          <span class="sort none">0</span>
          <div class="chat__when"></div>
        </li>
      </div>
    </div>

    <div>
    <input
      value={state.text || ""}
      onChange={(e) => State.update({ text: e.target.value })}
    />
    Iframes below
    <div className="d-flex">
      <iframe
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
        className="w-50 border"
        srcDoc={code}
        message={{ exp: state.text || "" }}
        onMessage={(res1) => State.update({ res1 })}
      />
      <iframe
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
        className="w-50 border"
        srcDoc={code}
        message={{ exp: (state.text || "") + " + ' banana'" }}
        onMessage={(res2) => State.update({ res2 })}
      />
    </div>
    Result:{" "}
    <pre>
      res1 = {JSON.stringify(state.res1)}
      res2 = {JSON.stringify(state.res2)}
    </pre>
  </div>
  </>
);
