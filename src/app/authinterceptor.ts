import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Injectable, Injector } from "@angular/core";
import { AppService } from "./app.service";

@Injectable()
export class Authinterceptor implements HttpInterceptor{
    constructor(private injector: Injector){}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        const appService = this.injector.get(AppService);
        const authRequest = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + appService.token)
        });
        return next.handle(authRequest);
    }
}
