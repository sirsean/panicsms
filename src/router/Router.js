function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20')) || null;
}

/* the following is a polyfill for IE (non-Edge), older Android Browser, and iOS < 9.0, which don't have String.startsWith */
if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(searchString, position){
      position = position || 0;
      return this.substr(position, searchString.length) === searchString;
  };
}

function getPathString() {
    var path = location.pathname;
    if (path.startsWith("/")) {
        path = path.substring(1);
    }
    if (path == "") {
        return null;
    }
    return path;
}

function getPath() {
    var path = getPathString();
    if (path == null) {
        return null;
    }
    var parts = path.split("/");
    return parts;
}

function isPrettyRouting() {
    return (getPathString() != null);
}

var builderFuncs = {
    home: function(opts) {
        return "/";
    },
    newAlert: function(opts) {
        return "/newAlert";
    }
};

module.exports = {
    getPage: function() {
        var page = function() {
            if (isPrettyRouting()) {
                return getPath()[0];
            } else {
                return null;
            }
        }();

        // we always have a default
        if (!page) {
            return "home";
        } else {
            return page;
        }
    },
    buildURL: function(page, query, episode, timestamp, memeText, start, end) {
        var builderFunc = builderFuncs[page];
        return builderFunc({
        });
    }
};
