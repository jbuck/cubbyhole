(function(){

  var fileInput;
  var fileInputButton;
  var loadingDiv;
  var inputDiv;
  var urlDiv;
  var uriContainer;

  function upload(dataURI){

  }

  function prepareFiles(files){
    loadingDiv.classList.add('on');
    fileInput.disabled = true;
    inputDiv.classList.add('off');

    Array.prototype.forEach.call(files, function(file){
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "/request", true);
      xhr.addEventListener("load", function() {
        var json = JSON.parse(this.responseText);

        var form = new FormData();

        form.append("policy", json.policyBase64);
        form.append("signature", json.signature);
        form.append("AWSAccessKeyId", json.key);

        json.policy.conditions.forEach(function(condition) {
          if (Array.isArray(condition)) {
            switch (condition[0]) {
            case "starts-with"

              break;
            }
          } else {
            // it's an object like {key: value}
            Object.keys(condition).forEach(function(value) {
              form.append(value, condition[value]);
            });
          }
        });

        form.append("file", file);


      }, false);
      xhr.send();

      /*var reader = new FileReader();
      reader.onload = function(e){
        upload(e.target.data);
      };
      reader.readAsDataURL(file);*/
    });
  }

  function dropFiles(e){
    e.preventDefault();
    e.stopPropagation();
  }

  document.addEventListener('DOMContentLoaded', function(e){

    fileInput = document.querySelector('.file-input');
    fileInputButton = document.querySelector('.file-input-submit');
    loadingDiv = document.querySelector('.loading-div');
    inputDiv = document.querySelector('.input-div');
    urlDiv = document.querySelector('.url-div');
    uriContainer = document.querySelector('.uri-container');

    fileInputButton.addEventListener('click', function(e){
      prepareFiles(fileInput.files);
    }, false);


    document.addEventListener('drop', dropFiles, false);
    document.querySelector('.wrapper').addEventListener('drop', dropFiles, false);
  }, false);

}());
