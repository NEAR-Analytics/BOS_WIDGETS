const srcCode = `<!DOCTYPE html>
<html>
  <head>
    <title>Guess The RegenWise Word Game</title>
    <style>
      .canvas-container {
        position: relative;
        width: 90%;
        aspect-ratio: 2;
        max-width: 1000px;
        margin: 0 auto;
      }

      canvas {
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
      }

      #bgCanvas {
        z-index: 1;
      }

      #fgCanvas {
        z-index: 2;
      }
      .btn {
        border: none;
        font-family: inherit;
        font-size: inherit;
        color: inherit;
        background: none;
        cursor: pointer;
        padding: 20px 80px;
        display: inline-block;
        margin: 0px 30px;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-weight: 700;
        outline: none;
        position: relative;
        -webkit-transition: all 0.3s;
        -moz-transition: all 0.3s;
        transition: all 0.3s;
      }

      .btn:after {
        content: '';
        position: absolute;
        z-index: -1;
        -webkit-transition: all 0.3s;
        -moz-transition: all 0.3s;
        transition: all 0.3s;
      }

      /* Pseudo elements for icons */
      .btn:before,
      .icon-heart:after,
      .icon-star:after,
      .icon-plus:after,
      .icon-file:before {
        font-family: 'icomoon';
        font-style: normal;
        font-weight: normal;
        font-variant: normal;
        text-transform: none;
        line-height: 1;
        position: relative;
        -webkit-font-smoothing: antialiased;
      }
      .btn-2 {
        background: #cb4e4e;
        color: #fff;
        box-shadow: 0 6px #ab3c3c;
        -webkit-transition: none;
        -moz-transition: none;
        transition: none;
      }
      .btn-2g {
        border-radius: 40px;
      }

      .btn-2g:hover {
        box-shadow: 0 4px #ab3c3c;
        top: 2px;
      }

      .btn-2g:active {
        box-shadow: 0 0 #ab3c3c;
        top: 6px;
      }

      #dialogOverlay {
        position: fixed;
        z-index: 1000;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: none;
        align-items: center;
        justify-content: center;
      }

      #dialogBox {
        max-width: 600px;
        width: 100%;
        margin: auto 1em;
        background-color: white;
        padding: 20px;
        border-radius: 5px;
        text-align: center;
      }

      #dialogTitle {
        font-size: 24px;
        margin-top: 0;
      }

      #dialogMessage {
        font-size: 18px;
      }

      #dialogButton {
        margin-top: 20px;
        padding: 10px 20px;
        font-size: 16px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }

      #dialogButton:hover {
        background-color: #0056b3;
      }
    </style>
  </head>
  <body>
    <div style="text-align: center;     
    background-color: #ffffff;
    color: #000000;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    font-weight: bolder;
    font-size: 2vw;
    line-height: 1.5em;">
        Guess The RegenWise Word Game (GTRWG)
    </div>
    <div
      style="
        display: flex;
        width: 100%;
        max-width: 1000px;
        margin: 0 auto;
        justify-content: center;
        flex-direction: column;
        gap: 1em;
      "
    >
      <div class="canvas-container">
        <canvas id="bgCanvas" width="1000" height="500"></canvas>
        <canvas id="fgCanvas" width="1000" height="500"></canvas>
      </div>
      <div id="dialogOverlay">
        <div id="dialogBox">
          <h2 id="dialogTitle"></h2>
          <p id="dialogMessage"></p>
          <button id="dialogButton">Continue</button>
        </div>
      </div>
    </div>
    <script>
      // Game configuration
      const maxGuesses = 7;
      const wrongGuessColor = '#FF0000';
      const circleRadius = 30;
      const carbonColor = '#FFFFFF';

      // Game state
      let visibleLetters = [];
      let guessedLetters = [];
      let remainingGuesses = maxGuesses;
      let carbonLevels = 0;

      // Get canvas element
      const bgCanvas = document.getElementById('bgCanvas');
      const fgCanvas = document.getElementById('fgCanvas');
      const backgroundContext = bgCanvas.getContext('2d');
      const foregroundContext = fgCanvas.getContext('2d');

      let carbonY = fgCanvas.height - 100 - circleRadius; // Initial y-coordinate of the carbon circle

      // Draw background canvas
      function drawBackground() {
        const soilColor = '#8B4513';
        const skyColor = '#87CEEB';
        backgroundContext.clearRect(0, 0, bgCanvas.width, bgCanvas.height);

        // Draw the background elements (soil, sky and others)
        drawSky(backgroundContext, bgCanvas, skyColor);
        drawSoil(backgroundContext, bgCanvas, soilColor);
      }

      // Draw foreground canvas
      function drawForeground(found) {
        foregroundContext.clearRect(0, 0, fgCanvas.width, fgCanvas.height);

        // Draw the dynamic objects (carbons in the soil and sky)
        drawCarbonInSoil(
          remainingGuesses,
          foregroundContext,
          fgCanvas,
          maxGuesses,
          circleRadius,
          carbonColor
        );
        drawCarbonInSky(
          carbonLevels,
          foregroundContext,
          fgCanvas,
          maxGuesses,
          circleRadius,
          carbonColor,
          found
        );
        drawVisibleLetters(foregroundContext, fgCanvas, visibleLetters);
        displayRemainingGuesses(foregroundContext, fgCanvas, remainingGuesses);
        // Rest of the drawing functions for the dynamic objects
      }

      // Initialize visible letters with underscores
      function displayVisibleLetters(word, visibleLetters) {
        for (let i = 0; i < word.length; i++) {
          visibleLetters.push('_');
        }
      }

      // Draw the game scene
      function drawScene() {
        drawBackground();
        drawForeground(true);
      }


      // Draw sky
      function drawSky(context, canvas, skyColor) {
        context.fillStyle = skyColor;
        context.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Draw soil
      function drawSoil(context, canvas, soilColor) {
        context.fillStyle = soilColor;
        context.fillRect(0, canvas.height - 100, canvas.width, 100);
        context.font = '24px Arial';

      }

      // Draw visible letters
      function drawVisibleLetters(context, canvas, visibleLetters) {
        context.font = '48px Arial';
        context.textAlign = 'center'; // Center the text
        context.fillStyle = 'black';
        context.fillText(
          visibleLetters.join(' '),
          canvas.width / 2,
          canvas.height / 2
        );
      }

      // Display remaining guesses
      function displayRemainingGuesses(context, canvas, remainingGuesses) {
        context.font = '24px Arial';
        context.textAlign = 'center'; // Center the text
        context.fillText(
          'Remaining Guesses:' + remainingGuesses,
          canvas.width / 2,
          canvas.height / 2 + 50
        );
      }

      // Draw carbon characters in soil
      function drawCarbonInSoil(
        remainingGuesses,
        context,
        canvas,
        maxGuesses,
        circleRadius,
        carbonColor
      ) {
        context.font = '24px Arial';
        for (let i = 0; i < remainingGuesses; i++) {
          context.fillStyle = 'green';
          const x = (canvas.width / (maxGuesses + 1)) * (1 + i);
          const y = canvas.height - (circleRadius + 20);
          context.beginPath();
          context.arc(x, y, circleRadius, 0, Math.PI * 2);
          context.closePath();
          context.fill();
          context.textAlign = 'left';
          context.fillStyle = carbonColor;
          context.fillText('c', x - 5, y + 8);
        }
      }

      // Draw carbon characters rising to the sky
      function drawCarbonInSky(
        carbonLevels,
        context,
        canvas,
        maxGuesses,
        circleRadius,
        carbonColor,
        found
      ) {
        for (let i = 0; i < carbonLevels; i++) {
          if (i === carbonLevels - 1 && !found) {
            context.fillStyle = 'red';
            let x = canvas.width - (i + 1) * (canvas.width / (maxGuesses + 1));
            let y = carbonY;
            context.beginPath();
            context.arc(x, y, circleRadius, 0, Math.PI * 2);
            context.closePath();
            context.fill();
            context.textAlign = 'left';
            context.fillStyle = carbonColor;
            context.fillText('c', x - 5, y + 8);
          } else {
            context.fillStyle = 'red';
            const x =
              canvas.width - (i + 1) * (canvas.width / (maxGuesses + 1));
            const y = circleRadius + 50;
            context.beginPath();
            context.arc(x, y, circleRadius, 0, Math.PI * 2);
            context.closePath();
            context.fill();
            context.textAlign = 'left';
            context.fillStyle = carbonColor;
            context.fillText('c', x - 5, y + 8);
          }
        }
      }

      //Animate the carbon circles rising to the sky
      function animateCarbonCircle() {
        carbonY -= 5; // Adjust the amount of movement here (e.g., increase or decrease the value)

        // Redraw the scene with the updated carbon circle position
        drawForeground(false);

        // Continue the animation until the circle reaches the top of the canvas
        if (carbonY > circleRadius + 50) {
          requestAnimationFrame(animateCarbonCircle);
        } else {
          carbonY = fgCanvas.height - (circleRadius + 20);
        }
      }

      // Handle user input
      function handleInput(event, word) {
        // Redraw the scene

        const guessedLetter = event.key.toLowerCase();

        // Check if the guessed letter is in the word
        let found = false;
        for (let i = 0; i < word.length; i++) {
          if (word[i] === guessedLetter) {
            visibleLetters[i] = guessedLetter;
            found = true;
          }
        }

        if (found) {
          drawForeground(true);
        }

        // Update game state
        if (!guessedLetters.includes(guessedLetter)) {
          if (!found) {
            animateCarbonCircle(fgCanvas);
            carbonY = fgCanvas.height - (circleRadius + 20);
            remainingGuesses > 0 ? remainingGuesses-- : remainingGuesses;
            carbonLevels < maxGuesses ? carbonLevels++ : carbonLevels;
            if (remainingGuesses === 0) {
              // All guesses are wrong, game over
              setTimeout(() => {
                showDialog('No worries!', 'You just ran out of guesses, try again.');
              }, 1000);
              context.fillStyle = wrongGuessColor;
              context.fillRect(0, 0, canvas.width, canvas.height);
            }
          }
          guessedLetters.push(guessedLetter);
        }

        // Check if the word is guessed
        if (visibleLetters.join('') === word) {
          showDialog('Congratulations!', 'You guessed the word "' +word+'" correctly!');
        }
      }

      // Dialog component
      function showDialog(title, message) {
        const dialogOverlay = document.getElementById('dialogOverlay');
        const dialogTitle = document.getElementById('dialogTitle');
        const dialogMessage = document.getElementById('dialogMessage');
        const dialogButton = document.getElementById('dialogButton');

        dialogTitle.textContent = title;
        dialogMessage.textContent = message;

        dialogOverlay.style.display = 'flex';

        dialogButton.addEventListener('click', function () {
          dialogOverlay.style.display = 'none';
          location.reload();
        });
      }

      // Initial draw
      fetch('https://regenwise.xyz/api/words').then((res) => {
        res.json().then((word) => {
          formattedWord = word.toLowerCase();
          console.log(formattedWord);
          displayVisibleLetters(formattedWord, visibleLetters);
          drawScene(formattedWord);
          document.addEventListener('keypress', (event) =>
            handleInput(event, formattedWord)
          );
        });
      });
    </script>
  </body>
</html>
`;

return (
  <>
    <iframe
      class="responsive-iframe"
      srcDoc={srcCode}
      style={{
        height: "100vh",
        width: "100vw",
      }}
    ></iframe>
  </>
);
