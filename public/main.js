(function(){
  
  var fileInput;
  var fileInputButton;
  var loadingDiv;
  var inputDiv;
  var urlDiv;
  var uriContainer;

  function upload(dataURI){
    setTimeout(function(){
      inputDiv.parentNode.removeChild(inputDiv);
      uriContainer.innerHTML = "blarpy";
      urlDiv.classList.add('on');
      loadingDiv.classList.remove('on');
    }, 1000);
  }

  function prepareFiles(files){
    loadingDiv.classList.add('on');
    fileInput.disabled = true;
    inputDiv.classList.add('off');

    Array.prototype.forEach.call(files, function(file){
      var reader = new FileReader();
      reader.onload = function(e){
        upload(e.target.data);
      };
      reader.readAsDataURL(file);
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