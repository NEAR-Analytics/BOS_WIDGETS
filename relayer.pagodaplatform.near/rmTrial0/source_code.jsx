const srcCode = `<!DOCTYPE html>
<html>
  <head>
    <title>Word Guessing Game</title>
    <style>
      canvas {
        border: 1px solid black;
      }
      .btn {
        border: none;
        font-family: inherit;
        font-size: inherit;
        color: inherit;
        background: none;
        cursor: pointer;
        padding: 25px 80px;
        display: inline-block;
        margin: 15px 30px;
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
    </style>
  </head>
  <body>
    <div
      style="
        display: flex;
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        justify-content: center;
        flex-direction: column;
        gap: 1em;
      "
    >
      <canvas id="gameCanvas" width="800" height="400"></canvas>
      <div style="text-align: center">
        <button class="btn btn-2 btn-2g" onclick="location.reload()">
          Restart
        </button>
      </div>
    </div>
    <script>
      // Game configuration
      const word = 'javascript';
      const maxGuesses = 7;
      const soilColor = '#8B4513';
      const skyColor = '#87CEEB';
      const carbonColor = '#FFFFFF';
      const wrongGuessColor = '#FF0000';
      const circleRadius = 30;

      // Game state
      let visibleLetters = [];
      let guessedLetters = [];
      let remainingGuesses = maxGuesses;
      let carbonLevels = 0;

      // Initialize visible letters with underscores
      for (let i = 0; i < word.length; i++) {
        visibleLetters.push('_');
      }

      // Get canvas element
      const canvas = document.getElementById('gameCanvas');
      const context = canvas.getContext('2d');

      // Draw the game scene
      function drawScene() {
        // Clear canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        drawSky(context, canvas, skyColor);
        drawSoil(context, canvas, soilColor);
        drawCarbonInSoil(
          remainingGuesses,
          context,
          canvas,
          maxGuesses,
          circleRadius,
          carbonColor
        );
        drawCarbonInSky(
          carbonLevels,
          context,
          canvas,
          maxGuesses,
          circleRadius,
          carbonColor
        );
        drawVisibleLetters(context, canvas, visibleLetters);
        displayRemainingGuesses(context, canvas, remainingGuesses);
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
        for (let i = 0; i < remainingGuesses; i++) {
          console.log(remainingGuesses);
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
        carbonColor
      ) {
        for (let i = 0; i < carbonLevels; i++) {
          context.fillStyle = 'red';
          const x = canvas.width - (i + 1) * (canvas.width / (maxGuesses + 1));
          const y = circleRadius + 20;
          context.beginPath();
          context.arc(x, y, circleRadius, 0, Math.PI * 2);
          context.closePath();
          context.fill();
          context.textAlign = 'left';
          context.fillStyle = carbonColor;
          context.fillText('c', x - 5, y + 8);
        }
      }

      // Handle user input
      function handleInput(event) {
        const guessedLetter = event.key.toLowerCase();

        // Check if the guessed letter is in the word
        let found = false;
        for (let i = 0; i < word.length; i++) {
          if (word[i] === guessedLetter) {
            visibleLetters[i] = guessedLetter;
            found = true;
          }
        }

        // Update game state
        if (!guessedLetters.includes(guessedLetter)) {
          if (!found) {
            remainingGuesses > 0 ? remainingGuesses-- : remainingGuesses;
            carbonLevels < maxGuesses ? carbonLevels++ : carbonLevels;
            if (remainingGuesses === 0) {
              // All guesses are wrong, game over
              setTimeout(() => {
                alert('Game over!');
              }, 1000);
              context.fillStyle = wrongGuessColor;
              context.fillRect(0, 0, canvas.width, canvas.height);
            }
          }
          guessedLetters.push(guessedLetter);
        }

        // Redraw the scene
        drawScene();

        // Check if the word is guessed
        if (visibleLetters.join('') === word) {
          alert('Congratulations! You guessed the word!');
        }
      }

      // Attach event listener for keypress
      document.addEventListener('keypress', handleInput);

      // Initial draw
      drawScene();
    </script>
  </body>
</html>`;

return (
  <>
    <iframe
      srcDoc={srcCode}
      style={{
        height: "80vh",
        width: "135vh",
      }}
    ></iframe>
  </>
);
