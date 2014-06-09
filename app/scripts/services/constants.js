'use strict';

angular.module('itytApp').service('Constants', function Constants() {
  return {
    monthNames: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
    meta: {
      SITE_NAME: 'ITyt'
    }
  }
});
