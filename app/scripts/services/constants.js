'use strict';

angular.module('itytApp').service('Constants', function() {
  return {
    monthNames: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
    meta: {
      SITE_NAME: 'ITyt'
    },
    urls: {
      dataSpeakersUrl: 'mock_data/dataSpeakers.json',
      dataSpeakersCategories: 'mock_data/dataSpeakersCategories.json',
      speakersCategoryMaintainanceURL: 'speakers/categories',
      speakerMaintainanceURL: 'speakers',
      dataEventsUrl: 'mock_data/dataEvents.json',
      dataEventsCategories: 'mock_data/dataEventsCategories.json',
      eventsCategoryMaintainanceURL: 'events/categories',
      eventMaintainanceURL: 'events'
    }
  };
});
