let greeting = "Have a great day";

State.init({
  text: `"b" + "a" + +"a" + "a"`,
});

// 'http://localhost:8765/gun'

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
    <script src="https://cdn.jsdelivr.net/npm/gun/lib/webrtc.js"></script>
    <script>
    var gun = Gun(['https://gun-manhattan.herokuapp.com/gun']);
    var user = gun.user();

    console.log(gun);
    console.log(user);

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
    Iframes below
    <div className="d-flex">
      <iframe
        sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
        className="w-50 border"
        srcDoc={code}
      />
    </div>
  </>
);
