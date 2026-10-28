// 微博开屏去广告脚本 (Shadowrocket Script)
// 适配微博 14.x / 15.x 开屏与预加载广告接口
// 将广告对象置空并将 display delay 设置为一年，强制清除客户端本地缓存广告

const path1 = "/interface/sdk/sdkad.php";
const path2 = "/wbapplua/wbpullad.lua";

const url = $request.url;
let body = $response.body;

if (body) {
    try {
        if (url.indexOf(path1) !== -1) {
            let re = /\{.*\}/;
            let match = body.match(re);
            if (match) {
                let obj = JSON.parse(match[0]);
                obj.background_delay_display_time = 31536000;
                obj.show_push_splash_ad = false;
                obj.ads = [];
                body = JSON.stringify(obj) + 'OK';
            }
        } else if (url.indexOf(path2) !== -1) {
            let obj = JSON.parse(body);
            if (obj.cached_ad && obj.cached_ad.ads) {
                obj.cached_ad.ads = [];
            }
            obj.show_push_splash_ad = false;
            obj.background_delay_display_time = 31536000;
            body = JSON.stringify(obj);
        }
    } catch (e) {
        // Fallback
    }
}

$done({ body });
