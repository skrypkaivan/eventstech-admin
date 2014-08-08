'use strict';

angular.module('itytApp').directive('imageFileUpload', [function () {
  return {
    restrict: 'E',
    templateUrl: 'partials/imageFileUploader.html',
    replace: true,
    scope: {
      src: '=',
      type: '@',
      callback: '&'
    },
    controller: function($scope, $element) {

      var timestamp = (new Date()).getTime(),
          uploader = $element.find('.uploader'),
          fileInput = $element.find('.file-control'),
          canvas = $element.find('canvas').get(0),
          img, ctx = canvas.getContext('2d');

      fileInput.attr("id", "fileUploaderId" + timestamp);

      function onImageUploaded(src) {
        img = new Image();
        img.onload = function(){
          canvas.width = img.width;
          canvas.height = img.height;
          $element.css({width: img.width + 'px', height: img.height + 'px'});
          uploader.find('.uploadify-button').css('lineHeight', img.height + 'px');
          ctx.drawImage(img,0,0);
          $scope.callback()(src);
        };
        img.src = src;
      }

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

    }
  };
}]);
