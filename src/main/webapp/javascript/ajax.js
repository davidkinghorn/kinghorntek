var Ajax = (function() {
    var doAjax = function(method, url, data, successCallback, failureCallback, completeCallback) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300) {
                    if (successCallback) {
                        successCallback(xhr.responseText, xhr.status);
                    }
                } else if (xhr.status == 401) {

                    sessionExpired();
                } else {
                    if (failureCallback) {
                        failureCallback(xhr.responseText, xhr.status);
                    }
                }
                if (completeCallback) {
                    completeCallback(xhr.responseText, xhr.status);
                }
            }
        };
        xhr.open(method, url, true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send(data);
    };
    var convertData = function(data) {
        var str = "";
        if (data) {
            for (var prop in data) {
                if (data.hasOwnProperty(prop) && data[prop]) {
                    if (str) {
                        str += "&";
                    }
                    var value = (typeof(data[prop]) == "object") ? JSON.stringify(data[prop]) : data[prop];
                    str += encodeURIComponent(prop) + "=" + encodeURIComponent(value);
                }
            }
        }
        return str;
    };

    return {
        doGet: function(url, data, successCallback, failureCallback, completeCallback) {
            doAjax("GET", data ? (url + "?" + convertData(data)) : url, null, successCallback, failureCallback, completeCallback);
        },
        doPost: function(url, data, successCallback, failureCallback, completeCallback) {
            doAjax("POST", url, convertData(data), successCallback, failureCallback, completeCallback);
        }
    };
})();