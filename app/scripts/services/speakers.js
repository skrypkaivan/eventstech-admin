'use strict';

angular.module('itytApp').factory("SpeakerCategory", ["$resource", function($resource) {
    return $resource("api/speakers_tag/:tagId", {}, {
        create: {method: "PUT", isArray: false}
    })
}]).factory("Speaker", ["$resource", function($resource) {
    return $resource("api/speaker/:slug", {}, {
        getByCategory: {method: "GET", isArray:true, url: "api/speaker/tag/:tag"},
        create: {method: "PUT", isArray:false}
    });
}]);
