(function() {
    window.zjnative = {
        init: function(callback) {
            if (!window.NativeEnvironment) {
                setTimeout(function() {
                    if (window.NativeEnvironment) {
                        callback(0);
                    } else {
                        callback(1);
                    }
                }, 500);
            } else {
                setTimeout(function(params) {
                    callback(0);
                }, 1);
            }
        },
        getUserInfo: function(callback) {
            try {
                var t = window.NativeEnvironment.getUserInfo();
                //alert("t: " + t);
                //callback(JSON.parse(t));
                return JSON.parse(t);
            } catch (err) {
                console.log("getUserInfo.exception: " + err)
               // callback({});
            }
            /*
            if(isIOS) {
                window.getUserInfoCallback = callback;
                this.IOSCall('fingertip4AAgetUserInfo');
                return true;
            }

            if(!cordova || !cordova.exec) {
                return false;
            }
            cordova.exec(success, error,"UserInfoPlug","getUserInfo", []);
            */
        },
        startShare: function(callback, data) {
            try {
              if(data.length == 4) {

                window.NativeEnvironment.startShare(data[0], data[1], data[2], data[3]);
              } else {
                window.NativeEnvironment.startShare(data[0], data[1], data[2]);
              }
            } catch (e) {
                console.log("startShare.exception." + e);
            }
            window.zredkey_startShareResult = function(result) {
                    callback(result);
                }
                //var iosData = 'fingertip4AAshare4AAparam4AA["'+data[0]+'","'+data[1]+'","'+data[2]+'","'+data[3]+'"]';
                //console.log(iosData);
                //if(isIOS) {
                //  this.IOSCall(iosData);
                //   return true;
                //}
                //if(!cordova || !cordova.exec) {
                //   return false;
                //}
                //data[title,summary,contentUrl,logoUrl] 分享的内容：1标题，2摘要(内容)，3分享内容的url，4分享的图标（没有默认当前应用图标）
                //cordova.exec(success, null,"SharePlug","share", data);
        },
        getVUID: function() {
            try {
                return window.NativeEnvironment.getVUID();
            } catch (e) {
                console.log("getVUID.exception." + e);
                return "";
            }
        },
        pickPic: function(callback) {
            try {
                window.NativeMedia.startPickerView(false);
            } catch (e) {
                console.log("pickPic.exception." + e);
            }
            window.callback_imageDidUploaded = function(result, url) {
                // console.log('callback_imageDidUploaded: ' + result + ", " + url);
                callback(result, url);
            }
        }
    }
})(window);