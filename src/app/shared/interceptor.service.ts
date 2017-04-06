
import { Injectable } from '@angular/core';
import {
  Http,
  ConnectionBackend,
  RequestOptions,
  RequestOptionsArgs,
  Response,
  Headers,
  Request
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import {CookieService} from 'angular2-cookie/core';
import {GlobalVars} from './globalVars'
import {Router} from '@angular/router';


@Injectable()
export class HttpInterceptor extends Http {

  constructor(
    backend: ConnectionBackend,
    defaultOptions: RequestOptions,
    private cookies: CookieService,
    private router: Router
    
  ) {
    super(backend, defaultOptions);
  }

  /**
   * Performs a request with `get` http method.
   * @param url
   * @param options
   * @returns {Observable<>}
   */
  get(url: string, options?: RequestOptionsArgs): Observable<any> {
    this.beforeRequest();
    return super.get(this.getFullUrl(url), this.requestOptions(options))
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSuccess(res);
      }, (error: any) => {
        this.router.navigate(['/login'])
      })
      .finally(() => {
        this.onFinally();
      });
  }
      post(url: string, data: any, options?: RequestOptionsArgs): Observable<any> {
    this.beforeRequest();
    return super.post(this.getFullUrl(url), data, this.requestOptions(options))
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSuccess(res);
      }, (error: any) => {
        
      })
      .finally(() => {
        this.onFinally();
      });
  }
    
  // Implement POST, PUT, DELETE HERE

  /**
   * Request options.
   * @param options
   * @returns {RequestOptionsArgs}
   */
  private requestOptions(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }
     let authData:any = this.cookies.getObject('authorizationData');
     if(authData){
     
         if (options.headers == null) {
              options.headers = new Headers({
            'Authorization': `Basic ${authData.token}`
      });
          
    
    }
    else{
        options.headers['Authorization'] = `Barer ${authData.token}`;
    }
     }
  
    return options;
  }

  /**
   * Build API url.
   * @param url
   * @returns {string}
   */
  private getFullUrl(url: string): string {
    return GlobalVars.apiBase + url;
  }

  /**
   * Before any Request.
   */
  private beforeRequest(): void {
    //this.notifyService.showPreloader();
  }

  /**
   * After any request.
   */
  private afterRequest(): void {
   // this.notifyService.hidePreloader();
  }

  /**
   * Error handler.
   * @param error
   * @param caught
   * @returns {ErrorObservable}
   */
  private onCatch(error: any, caught: Observable<any>) {
     
    //this.notifyService.popError();
    return Observable.throw(error);
    
  }

  /**
   * onSuccess
   * @param res
   */
  private onSuccess(res: Response): void {
    //console.log(res);
  }

  /**
   * onError
   * @param error
   */
  private onError(error: any): void {
    //this.notifyService.popError();
   
  }

  /**
   * onFinally
   */
  private onFinally(): void {
    this.afterRequest();
  }
}
