
<!doctype html>
<html lang="en">
  <head>
    
<link href="/docs/5.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

  
    
    <!-- Custom styles for this template -->
    <link href="form-validation.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
  </head>
  <body class="bg-light">
    
<div class="container">
  <main>
    <div class="py-5 text-center">
      <h2>DONACION</h2>
      <p class="lead">Propuesta hecha para beneficiar personas</p>
    </div>

        <form id="donationForm" onsubmit="handleDonation(event)"></form>
            <div class="col-md-3">
                <label for="amount">Monto de la Donación:</label>
                <input type="number" id="amount" step="0.01" required>
              <div class="invalid-feedback">
                code required
              </div>
            </div>

            <div class="col-md-3">
                <label for="walletAddress">Dirección de la Billetera:</label>
                <input type="text" id="walletAddress" required>
            
              <div class="invalid-feedback">
                code required
              </div>
            </div>
          <hr class="my-4">
          <button class="w-100 btn btn-primary btn-lg" type="submit">Realizar Donación</button>
        </form>
    </main>
</div>
    
  



    <script src="/docs/5.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

      <script src="form-validation.js"></script>
  </body>
</html>