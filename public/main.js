(function(){

  var fileInput;
  var fileInputButton;
  var urlDiv;
  var uriContainer;
  var contentDiv;
  var percentCompleteContainer;

  function uploadFiles(files){
    fileInput.disabled = true;
    contentDiv.setAttribute('state', 'uploading');

    Array.prototype.forEach.call(files, function(file){
      var xhr = new XMLHttpRequest();
      xhr.open("GET", "/request", true);

      xhr.addEventListener("load", function(){
        var json = JSON.parse(this.responseText);

        var showUrl = json.showUrl;

        var form = new FormData();

        // filename, not AWS key
        form.append('key', json.filenamePrefix);

        form.append('AWSAccessKeyId', json.awsKey);
        form.append('policy', json.policyBase64);
        form.append('signature', json.signature);
        form.append('Content-Type', 'text/plain');

        json.policy.conditions.forEach(function(condition){
          if(!Array.isArray(condition)){
            // it's an object like {key: value}
            Object.keys(condition).forEach(function(key){
              if(key === 'bucket'){
                bucket = condition[key];
              }
              form.append(key, condition[key]);
            });
          }
        });

        form.append('file', file);

        var formSubmitXHR = new XMLHttpRequest();

        formSubmitXHR.open('POST', window.location.protocol + '//' + json.bucket + '.s3.amazonaws.com/', true);

        formSubmitXHR.addEventListener('load', function(e){
          var url = 'http://s3.amazonaws.com/' + json.bucket + '/' + json.filenamePrefix;

          fileInput.disabled = false;

          if(showUrl){
            uriContainer.href = url;
            uriContainer.innerHTML = url;
            contentDiv.setAttribute('state', 'show-url');
          }
          else {
            contentDiv.setAttribute('state', 'idle');
          }
        }, false);

        formSubmitXHR.addEventListener('error', function(e){
          contentDiv.setAttribute('state', 'error');
        }, false);

        formSubmitXHR.upload.addEventListener('progress', function(e){
          percentCompleteContainer.innerHTML = Math.round(e.loaded / e.total * 100) + '%';
        }, false);

        formSubmitXHR.send(form);

      }, false);

      xhr.send();

      fileInput.value = '';

    });
  }

  function dropFiles(e){
    e.preventDefault();
    e.stopPropagation();
    uploadFiles(e.dataTransfer.files);
  }

  document.addEventListener('DOMContentLoaded', function(e){
    contentDiv = document.querySelector('.content');
    fileInput = document.querySelector('.file-input');
    fileInputButton = document.querySelector('.file-input-submit');
    urlDiv = document.querySelector('.url-div');
    uriContainer = document.querySelector('.uri-container');
    percentCompleteContainer = document.querySelector('.upload-percent');

    contentDiv.setAttribute('state', 'idle');

    fileInputButton.addEventListener('click', function(e){
      uploadFiles(fileInput.files);
    }, false);

    document.addEventListener('drop', dropFiles, false);
    document.querySelector('.wrapper').addEventListener('drop', dropFiles, false);
  }, false);

}());
