const srcCode = `<!DOCTYPE html>
<html>
  <head>
    <title>Word Guessing Game</title>
    <style>
      canvas {
        border: 1px solid black;
      }
    </style>
  </head>
  <body>
    
    <canvas id="gameCanvas" width="800" height="400"></canvas>

    <script>
      // Game configuration
      const word = 'regeneration';
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

        // Draw sky
        context.fillStyle = skyColor;
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Draw soil
        context.fillStyle = soilColor;
        context.fillRect(0, canvas.height - 100, canvas.width, 100);
        context.font = '24px Arial';

        // Draw carbon characters in the soil
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

        // Draw carbon characters rising to the sky
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

        // Draw visible letters
        context.font = '48px Arial';
        context.fillStyle = '#000000';
        context.textAlign = 'center'; // Center the text
        context.fillText(
          visibleLetters.join(' '),
          canvas.width / 2,
          canvas.height / 2
        );

        // Display remaining guesses
        context.font = '24px Arial';
        context.textAlign = 'center'; // Center the text
        context.fillText(
          'Remaining Guesses:' + remainingGuesses,
          canvas.width / 2,
          canvas.height / 2 + 50
        );
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
            remainingGuesses--;
            carbonLevels++;
            if (remainingGuesses === 0) {
              // All guesses are wrong, game over
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
</html>
`;

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
