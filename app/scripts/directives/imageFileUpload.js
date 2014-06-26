'use strict';

angular.module('itytApp').directive('imageFileUpload', [function () {
  return {
    restrict: 'E',
    templateUrl: 'views/imageFileUploader.html',
    replace: true,
    scope: {
      src: '=',
      type: '@'
    },
    controller: function($scope, $element) {

      var fileUploaderId = 'fileUploader' + (new Date()).getTime(),
          uploader = $element.find('.uploader'),
          fileInput = $('<input type="file" id="' + fileUploaderId + '" name="file" />'),
          canvas = $element.find('canvas').get(0),
          img, ctx = canvas.getContext('2d');

      function onImageUploaded(src) {
        img = new Image();
        img.onload = function(){
          canvas.width = img.width;
          canvas.height = img.height;
          $element.css({width: img.width + 'px', height: img.height + 'px'});
          uploader.find('.uploadify-button').css('lineHeight', img.height + 'px');
          ctx.drawImage(img,0,0);
        };
        img.src = src;
      }

      fileInput.prependTo(uploader);

      fileInput.uploadify({
        buttonText: 'Загрузить',
        buttonCursor: 'hand',
        fileTypeExts: '*.jpg; *.png; *.gif',
        uploader: '/upload',
        multi: false,
        formData: {type: $scope.type},
        swf: 'bower_components/uploadify/uploadify.swf',
        wmode: 'transparent',
        onInit: function() {
          if ($scope.src) {
            onImageUploaded($scope.src);
          }
          else {
            canvas.width = 100;
            canvas.height = 100;
            $element.css({width: '100px', height: '100px'});
            uploader.find('.uploadify-button').css('lineHeight', '100px');
          }
        },
        onUploadSuccess: function(file, filePath) {
          if (file && filePath) {
            onImageUploaded(filePath);
          }
        }
      });

      uploader.css('padding', 0);

    }
  };
}]);
