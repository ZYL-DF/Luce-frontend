import {type Middleware} from "openapi-fetch";
import storage from "./storage.ts";


export function useAuthMiddleware() {
    const token = storage.load({
        key: 'loginState'
    }).then(ret => {
        return ret.token;
    })
    const middleware: Middleware = {
        async onRequest(req) {
            // 在每个请求中添加 Authorization 标头
            req.headers.set("Authorization", `Bearer ${token}`);
            return req;
        }
    }
    return middleware;
}
