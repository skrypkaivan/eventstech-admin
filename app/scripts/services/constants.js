'use strict';

angular.module('itytApp').service('Constants', function() {
  return {
    meta: {
      SITE_NAME: 'ITtyt'
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
