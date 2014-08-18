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
      dataEventsUrl: 'api/event',
      dataEventsCategories: 'api/events_tag',
      eventsCategoryMaintainanceURL: 'api/events_tag',
      eventMaintainanceURL: 'events'
    }
  };
}).constant("AUTH_EVENTS", {
    NOT_AUTHORIZED: "not_authorized",
    FORBIDDEN: "Forbidden"
}).constant("ACCEPTABLE_USER_ROLES", ["ROLE_ADMIN", "ROLE_MANAGER"]);
