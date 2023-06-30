<!DOCTYPE html>
<html>
<head>
  <style>
	@import url('https://fonts.googleapis.com/css?family=Mulish&display=swap');
	
    body {
      width: 300px;
      height: 1000px;
	  color: #f6f7fc;
	  font-family: "Mulish";
	  text-align: center;
    }
	
	button {
		display: inline-box;
		width: 167px;
		border-radius: 5px; 
		background-color: #7342cc;
		color: #FFFFFF;
		border: none;
		padding-top: 5px;
		padding-bottom: 5px;
	}
	
	input{
		width: 160px;
		border-radius: 5px;
		margin-bottom: 5px;
		padding-top: 3px;
		padding-bottom: 3px;
		text-align: center;
	}
	
	h1 {
		color: #7342cc;
		font-size: 95%;
	}
	
	#logo{
		width: auto;
		height: auto;
		margin: auto;
		text-align: center;
	}
	
	#logo img{
		width: 50px;
	}
	
	.card{
		width: 200px;
		margin: 0 auto;
		padding-top: 20px;
		padding-bottom: 20px;
		background-color: #FFFFFF;
		border-radius: 5px;
		box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.05);
	}
	
	.message{
		width: 167px;
		margin: auto auto 20px auto;
		padding: 3px;
		background-color: #ffd24d;
		border-radius: 5px;
		color: #000000;
		font-size: 60%;
	}
	
	.item{
		margin-bottom: 20px;
	}
	
  </style>
</head>
<body>
<div id="logo"><img src="myriadlogo.png"></div>
  <h1>Myriad Social Importer</h1>
  
  <div class="card">
	  <div class="message">
	  Log-in by inputing your e-mail address, and copy the link you will receive into the 'magic link' field. 
	  Don't forget to check your spam box!
	  </div>
	  <div id="emailfield" class="item">
		<input id="email" type="text" placeholder="Enter your Myriad email">
		<button id="send_magic_link">Send Magic Link</button>
	  </div>
	  <div id="magiclink" class="item">
		<input id="magic_link" type="text" placeholder="Enter the magic link here">
		<button id="submit_magic_link">Submit Magic Link</button>
	  </div> 
  </div>
  
  <div id="import">
	<button id="import_post">Import Post</button>
  </div>
  <script src="popup.js"></script>
</body>
</html>
