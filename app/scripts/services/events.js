'use strict';

angular.module('itytApp').factory("EventCategory", ['$resource', function($resource) {
    return $resource("api/events_tag/:tagId",{}, {
        create: {method: "PUT", isArray: false}
    });
}]).factory("Event", ["$resource", function($resource) {
    return $resource("api/event/:slug", {} , {
        getByCategory: { url: "api/event/tag/:tag", isArray: true, method: "GET"},
        create: {method :"PUT", isArray: false}
    });
}]);
