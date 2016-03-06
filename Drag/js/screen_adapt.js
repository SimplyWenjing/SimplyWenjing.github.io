          function getParameterByName(name, isDecode) {
              name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
              var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                      results = regex.exec(location.search);
              if (isDecode === false) {
                  return results === null ? "" : (results[1].replace(/\+/g, " "));
              }
              else {
                  return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
              }
          }
            var viewWidth = 640;
            var phoneWidth = parseInt(window.screen.width);
            var phoneHeight = parseInt(window.screen.height);
            var phoneScale = phoneWidth / viewWidth;
            var isAndroid = false;
            var androidVer = 4.0;
            var ua = navigator.userAgent;
            var meta = null;
            if (/Android (\d+\.\d+)/.test(ua)){
                isAndroid = true;
                var version = parseFloat(RegExp.$1);
                androidVer = version;
                if (phoneWidth <= phoneHeight) {
                        meta = '<meta name="viewport" content="width='+viewWidth+', initial-scale='+phoneScale+', minimum-scale='+phoneScale+', maximum-scale='+phoneScale+', target-densitydpi=device-dpi" />';
                } else {
                    phoneScale = phoneHeight / viewWidth;
                    var deviceWidth = viewWidth * phoneWidth / phoneHeight;
                    if(version > 2.3){
                        meta =  '<meta name="viewport" content="width='+deviceWidth+', initial-scale='+phoneScale+', minimum-scale='+phoneScale+', maximum-scale='+phoneScale+', target-densitydpi=device-dpi" />';

                    }else{
                        meta =  '<meta name="viewport" content="width='+deviceWidth+', target-densitydpi=device-dpi" />'
                    }
                }
            }
            else if (/iPhone|iPad/.test(ua)) {
               meta = '<meta name="viewport" content="width='+viewWidth+', initial-scale='+phoneScale+', minimum-scale='+phoneScale+', maximum-scale='+phoneScale+', target-densitydpi=device-dpi" />';
            }  
            else {
               var deviceWidth = viewWidth * phoneWidth / phoneHeight;
               meta =  '<meta name="viewport" content="width='+ deviceWidth + ',initial-scale=' + 1 + ',target-desitydpi=device-dpi" />'
            }
        document.write(meta);            