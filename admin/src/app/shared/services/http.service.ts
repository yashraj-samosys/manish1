import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpClient, HttpHandler, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, pipe, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoaderService } from './loader.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class HttpService implements HttpInterceptor {

  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
  public url = environment.apiURL;
  loader: boolean;
  constructor(
    private http: HttpClient,
    private router: Router,
    private loaderService: LoaderService,
    private toastr: ToastrService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // if (req.body != null && req.body.isLoaderShow == false) this.loaderService.hide();
    if (req.urlWithParams) this.loader = req.urlWithParams.includes("isLoaderShow=false");
    if (req.body != null && req.body.isLoaderShow == false || this.loader) this.loaderService.hide();
    
    else this.loaderService.show();
    return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) this.loaderService.hide();
    },
      (err) => this.loaderService.hide())); //Hide Loader
  }

  post(url, data) { return this.http.post(this.url + url, data, this.httpOptions).pipe(catchError(this.errorHandler.bind(this))).toPromise() }

  // get(url) { return this.http.get(this.url + url, this.httpOptions).pipe(catchError(this.errorHandler.bind(this))).toPromise() }
  get(url,data?) { return this.http.get(this.url + url, {params:data}).pipe(catchError(this.errorHandler.bind(this))).toPromise() }


  Post(url, value) { return this.http.post(this.url + url, value).pipe(catchError(this.errorHandler.bind(this))).toPromise() }

  errorHandler(err) {
    this.toastr.error(err.message, '', { timeOut: 2000 });
    return throwError({ status: false, msg: err.message });
  }
}
