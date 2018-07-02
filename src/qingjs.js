(function() {

    if (window.XuntongJSBridge) {
        // Android鍔犱笂浜嗚繖涓猧f鍒ゆ柇锛屽鏋滃綋鍓峸indow宸茬粡瀹氫箟浜哫untongBridge瀵硅薄锛屼笉鍐嶉噸鏂板姞杞�
        // 閬垮厤閲嶆柊鍒濆鍖朹callback_map绛夊彉閲忥紝瀵艰嚧涔嬪墠鐨勬秷鎭洖璋冨け璐ワ紝杩斿洖cb404
        //alert('window already has a XuntongBridge object!!!');
        return;
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////鏈湴璋冪敤鐨勫疄闄呴€昏緫////////////////////////////////////////////
    var _CUSTOM_PROTOCOL_SCHEME = 'xuntong',
        callbacksCount = 1,
        iframe = null,
        callbacks = {};
    var iframeArray;
    var init = false;
    var functionCount = 0;
    var mWatchFlag = false;

    function _handleMessageFromXT(callbackId, message) {

        try {
            var callback = callbacks[callbackId];
            if (!callback) return;
            callback.apply(null, [message]);
        } catch (e) {
            alert(e)
        }
    }

    /**
     * 鑾峰彇鐢ㄦ埛ua淇℃伅,鍒ゆ柇OS
     * @returns {string}
     */
    function getOS() {
        var userAgent = navigator.userAgent;
        return userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ? 'ios' : userAgent.match(/Android/i) ? 'android' : '';
    }
    /**
     * 鍒ゆ柇鐢ㄦ埛鏄惁鍦ㄤ簯涔嬪妗岄潰绔腑
     * @returns {Array|{index: number, input: string}}
     */
    function isCloudHub() {
        var userAgent = navigator.userAgent;
        return userAgent.match(/App\/cloudhub/);
    }

    // Use this in javascript to request native objective-c code
    // functionName : string (I think the name is explicit :p)
    // args : array of arguments
    // callback : function with n-arguments that is going to be called when the native code returned
    function _call(functionName, message, callback) {
        var hasCallback = callback && typeof callback == "function";
        var callbackId = hasCallback ? callbacksCount++ : 0;

        if (hasCallback)
            callbacks[callbackId] = callback;

        //web绔殑js妗ユ柟娉曡皟鐢�
        if (!(getOS() || isCloudHub())) {
            if(window.name === 'webViewShell') {//鍚屾簮
                if(!(window.parent.webJsBridge && window.parent.webJsBridge)[functionName]) {
                    return;
                }
                window.parent.webJsBridge[functionName](callbackId, message);
                return;
            }else if(!!window.name){
                window.parent.postMessage({
                    fName: functionName,
                    cbId: callbackId,
                    message: message
                }, window.name);
                return;
            }
            return;
        }

        if(!init){
            iframeArray = new Array(4);
            for(var i = 0;i < iframeArray.length;i++){
                var frame = window.document.createElement("IFRAME");
                frame.setAttribute("height", "1px");
                frame.setAttribute("width", "1px");
                frame.style.display = 'none';
                window.document.documentElement.appendChild(frame);
                iframeArray[i] = frame;
            }
            init = true;
        }
        var index = functionCount % 4;
        var frameTemp = iframeArray[index];
        frameTemp.src = _CUSTOM_PROTOCOL_SCHEME + ":" + functionName + ":" + callbackId + ":" + encodeURIComponent(JSON.stringify(message));
        functionCount++;
    }

    var __XuntongJSBridge = {
        // public
        invoke: _call,
        call: _call,
        handleMessageFromXT: _handleMessageFromXT,
        common: {
            back: function() {
                if(history.length > 1) {
                    history.go(-1);
                }
            },
            refresh: function () {
                location.reload();
            }
        }
    };

    window.XuntongJSBridge = __XuntongJSBridge;

    //web绔痡s妗ョ洃鍚�
    if (!(getOS() || isCloudHub())) {
        window.addEventListener('message', function(e) {
            var obj = e.data;
            if(isNaN(parseInt(obj.cbId))) {
                __XuntongJSBridge.common[obj.cbId]();
                return;
            }
            _handleMessageFromXT(obj.cbId, obj.data);
        },false);
    }
})();



