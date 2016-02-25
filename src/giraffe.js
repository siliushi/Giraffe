var _log = function(msg) {
  if (typeof console != "undefined" && typeof console.log != "undefined") {
      console.log(msg);
  }
},
Giraffe;

Giraffe = (function() {
  function Giraffe(options) {
    options = options || {};
    // 服务地址
    this.server = options['server'];
    if(!this.server)return false;
    // 是否自动连接
    this.autoReconnect = options['autoReconnect'] || false;
    //socket连接状态
    this.connected = false;
  }
  /**
   * 初始化
   * @date   2016-02-25
   * @param  {[type]}   initCallback      [description]
   * @param  {[type]}   reconnectCallback [description]
   * @return {[type]}                     [description]
   */
  Giraffe.prototype.init = function(initCallback, reconnectCallback) {
    var _this = this;

    // 操作回调
    _this.publish_cb = function() {};
    _this.publication_cb = function() {};

    initCallback = initCallback || function() {};
    reconnectCallback = reconnectCallback || function() {};
    var socketioConnect = function() {
      try{
        _log('scoketio start init');
        _this.socket = io.connect(_this.server);
        _this.socket.on('connect', function () {
            _log('scoketio init success.');
            _this.connected = true;
            initCallback(true);
        });

        _this.socket.on('error', function (e) {
            if (_this.autoReconnect) {
                setTimeout(function () {
                    socketioConnect();
                }, 1000);
            } else {
                _log('socket init error:', e);
                _this.connected = false;
                initCallback(false);
            }
        });

        _this.socket.on('disconnect', function () {
            if (_this.autoReconnect) {
                setTimeout(function () {
                    socketioConnect();
                }, 1000);
            } else {
              _log('socket disconnect.');
              _this.connected = false;
              initCallback(false);
            }
        });
        _this.socket.on('reconnect', function () {
            _log('socket reconnect.');
            if (reconnectCallback) {
              reconnectCallback();
            }
        });
        _this.socket.on('reconnect_failed', function () {
            if (_this.autoReconnect) {
              setTimeout(function () {
                socketioConnect();
              }, 1000);
            } else {
              _log('socket reconnect failed.');
            }
        });

        _this.socket.on('publish', function(res) {
          try{
            _this.publish_cb(res);
          } catch(err) {
            _log(err);
          }
        });

        _this.socket.on('publication', function(res) {
          try{
            _this.publication_cb(res);
          } catch(err) {
            _log(err);
          }
        });

      } catch(err) {
        if (_this.autoReconnect) {
            setTimeout(function () {
                socketioConnect();
            }, 1000);
        } else {
            return _log('socket连接失败') && initCallback(false, 'socket连接失败');
        }
      }
    };
    socketioConnect();
  };


  Giraffe.prototype.publish = function(data, callback) {
    if (this.connected === false) {
      return false;
    }
    try {
        this.socket.emit('publish', data);
    } catch (err) {
        return _log(err) && callback(false, err);
    }
  };

  Giraffe.prototype.receive = function(callback) {
    this.publish_cb = callback || function() {};
  };

  Giraffe.prototype.publication = function(data, callback) {
    if (this.connected === false) {
      return false;
    }
    this.publication_cb = callback || function() {};
    try {
        this.socket.emit('publication', data);
    } catch (err) {
        return _log(err);
    }
  };
  
  // cmd || node.js
  if ( typeof module === "object" && module && typeof module.exports === "object" ) {
      module.exports = Giraffe;
  } else {
      window.Giraffe = Giraffe;
      // amd
      if ( typeof define === "function" && define.amd ) {
          define( "Giraffe", [], function () { return Giraffe; } );
      }
  }

  return Giraffe;
})();
