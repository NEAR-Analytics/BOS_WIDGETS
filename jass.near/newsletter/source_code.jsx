return (
  <iframe
    iframeResizer
    style={{ height: "500px", width: "700px" }}
    srcDoc={`
    <div id="mc_embed_shell">
      <link href="//cdn-images.mailchimp.com/embedcode/classic-061523.css" rel="stylesheet" type="text/css">
      <style type="text/css">
        #mc_embed_signup {
            background: #00EC97;
            clear: left; 
            font: 14px Helvetica, Arial, sans-serif; 
            width: 600px;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
        }
        #mc_embed_signup h2 {
            font-size: 24px;
            margin-bottom: 20px;
        }
        #mc_embed_signup .mc-field-group {
            margin-bottom: 20px;
        }
        #mc-embedded-subscribe {
            background-color: #000000;
            color: #FFF;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
      </style>
      <div id="mc_embed_signup">
        <h2>/dev/hub newsletter</h2>
        <p>Stay in the loop. Get the latest updates, announcements, opportunities, and insights from the ecosystem in your inbox</p>
        <form action="https://gmail.us13.list-manage.com/subscribe/post?u=a52895422d000733a8dedc526&amp;id=5addef27c3&amp;f_id=00aa37e2f0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank">
          <div class="mc-field-group">
            <input type="email" name="EMAIL" class="required email" id="mce-EMAIL" required="" value="">
          </div>
          <div id="mce-responses" class="clear foot">
            <div class="response" id="mce-error-response" style="display: none;"></div>
            <div class="response" id="mce-success-response" style="display: none;"></div>
          </div>
          <div aria-hidden="true" style="position: absolute; left: -5000px;">
            <input type="text" name="b_a52895422d000733a8dedc526_5addef27c3" tabindex="-1" value="">
          </div>
          <div class="optionalParent">
            <div class="clear foot">
              <input type="submit" name="subscribe" id="mc-embedded-subscribe" class="button" value="Subscribe">
            </div>
          </div>
        </form>
        
      </div>
      <script type="text/javascript" src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"></script>
      <script type="text/javascript">(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';fnames[3]='ADDRESS';ftypes[3]='address';fnames[4]='PHONE';ftypes[4]='phone';fnames[5]='BIRTHDAY';ftypes[5]='birthday';}(jQuery));var $mcj = jQuery.noConflict(true);</script>
    </div>
    `}
  />
);
