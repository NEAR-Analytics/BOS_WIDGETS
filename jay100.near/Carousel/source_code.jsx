const Carousel = () => {
  const CarouselSrc = ` 
  <style>
    @import url('https://fonts.googleapis.com/css?family=Press+Start+2P');

    * {
        box-sizing: border-box;
    }

    html, body{
        font-family: "Pixel Emulator", "Press Start 2P", Courier new, monospace;
        overflow: hidden;
        width: 100%;
        height: 100%;
        margin: auto;
    }

    .mySlides {
        display: none;
    }

    /* Slideshow container */
    .slideshow-container {
        max-width: 1000px;
        position: relative;
        margin: auto;
        height: 100%;
    }

    /* Caption text */
    .text {
        color: #f2f2f2;
        font-size: 15px;
        padding: 8px 12px;
        bottom: 8px;
        width: 50%;
        height: auto;
        text-align: center;
    }

    .active {
        background-color: #717171;
    }

    .sliderStyle {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        height: 100%;
    }

    .welcomeTips {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: .8rem;
    }

    .slideImg {
        width: 70%;
    }

    /* Fading animation */
    .fade {
        animation-name: fade;
        animation-duration: 1.5s;
    }

    @keyframes fade {
        from {
            opacity: .4
        }

        to {
            opacity: 1
        }
    }

    
</style>

<body>
    <div class="slideshow-container">
        <div class="mySlides fade">
            <img class="slideImg" src="https://user-images.githubusercontent.com/100770363/241330819-010617e4-b2b3-4d34-a59c-c1b58bf92d8d.png">
            <div class="welcomeTips">
                <h2 style="color: white;">The Basics</h2>
            </div>
        </div>
        <div class="mySlides fade">
            <img class="slideImg" src="https://user-images.githubusercontent.com/100770363/241331374-56bd3f0c-7ed3-4923-bd48-4aac7367b280.png">
            <div class="welcomeTips">
                <h2 style="color: white;">Main Menu</h2>
                <span style="color: white;">From the main menu, you can see all of the main things you can do in the game. Battle, Mint Unit, Check the Leaderboard, Check Active Rooms, and the market. On the right hand side of your image, this is where the troops that you own will be displayed.</span>
            </div>
        </div>
        <div class="mySlides fade">
            <img class="slideImg" src="https://user-images.githubusercontent.com/100770363/241335354-eaf25884-de02-4d7a-a8f2-3c4e59214d5f.png">
            <div class="welcomeTips">
                <h2 style="color: white;">Battles</h2>
                <span style="color: white;">This is what you'll see when you select battle. You will have the option to create a new challenge, or fight against someone's challenge. These matches are best 2 out of 3</span>
            </div>
        </div>
        <div class="mySlides fade">
            <img class="slideImg" src="https://user-images.githubusercontent.com/100770363/241335498-727bf24d-a65c-4bff-b404-8bcadc558512.png">
            <div class="welcomeTips">
                <span style="color: white; padding: 1rem;">This is the challenge you chose to accept. As you can see the opponent already set the field for the first round, and it is your job to assemble your own side so that you can attempt to take the first round.</span>
            </div>
        </div>
        <div class="mySlides fade">
            <img class="slideImg" src="https://user-images.githubusercontent.com/100770363/241335871-e9c8e5fe-db38-4ada-b1ff-7d895e61f44e.png">
            <div class="welcomeTips">
                <span style="color: white; padding: 1rem;">Thanks to the cheeky placement of the warlock, You were able to take the first round. From here, you will have to wait for the opponent to respond before you can attack again.</span>
            </div>
        </div>
    </div>
    <br>
    <script>
        let slideIndex = 0;
        showSlides();

        function showSlides() {
            let i;
            let slides = document.getElementsByClassName("mySlides");
            for (i = 0; i < slides.length; i++) {
                slides[i].classList.remove("sliderStyle");
            }
            slideIndex++;
            if (slideIndex > slides.length) {
                slideIndex = 1
            }
            slides[slideIndex - 1].classList.add("sliderStyle");
            setTimeout(showSlides, 7000); // Change image every 2 seconds
        }
    </script>
</body> `;
  return (
    <iframe style={{ height: "100vh", width: "100%" }} srcDoc={CarouselSrc} />
  );
};

return (
  <>
    <Carousel />
  </>
);
