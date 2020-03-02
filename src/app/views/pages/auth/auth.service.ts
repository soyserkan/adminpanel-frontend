import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthData } from './auth.model';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthNoticeService } from './auth-notice/auth-notice.service';
import { environment } from '../../../../environments/environment';
import { PageNoticeService } from '../page-notices/page-notices.service';

const BACKEND_URL = environment.API + "/user";


@Injectable({ providedIn: "root" })
export class AuthService {
    private isAuthenticated = false;
    private token: string;
    private tokenTimer: any;
    private userId: string;
    private authStatusListener = new Subject<boolean>();




    constructor(
        private http: HttpClient,
        private router: Router,
        private authNoticeService: AuthNoticeService,
        private pageNoticeService: PageNoticeService,
    ) { }



    getToken() {
        return this.token;
    }

    getIsAuth() {
        return this.isAuthenticated;
    }

    getUserId() {
        return this.userId;
    }

    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }

    createUser(username, password, email, fullname) {
        const authData: AuthData = { username: username, password: password, email: email, fullname: fullname };
        this.http.post(BACKEND_URL + '/signup', authData)
            .subscribe(response => {
                this.authNoticeService.setNotice('Üye olma işleminiz başarıyla gerçekleşti. Lütfen giriş yapınız', 'success');
                this.router.navigateByUrl('/auth/login');
            }, error => {
                this.authStatusListener.next(false);
                console.log(error)
                if (error.status == 401) {
                    this.authNoticeService.setNotice('Bu kullancı adı veya email adresiyle daha önceden üye olunmuş!', 'danger');
                } else {
                    this.authNoticeService.setNotice('Üye olurken bir hata oluştu!', 'danger');
                }
            })
    }

    updateUserProfile(id: string, user: AuthData, image: File | string): Observable<{ data: AuthData }> {
        let userData: AuthData | FormData;
        if (typeof (image) === 'object') {
            userData = new FormData();
            userData.append("fullname", user.fullname);
            userData.append("email", user.email);
            userData.append("date_of_birth", user.date_of_birth);
            userData.append("phone", user.phone);
            userData.append("username", user.username);
            userData.append("pic", image, user.fullname);
            userData.append("id", user.id);
            userData.append("password", user.password);
        } else {
            userData = {
                id: id,
                username: user.username,
                password: user.password,
                email: user.email,
                fullname: user.fullname,
                pic: image,
                date_of_birth: user.date_of_birth,
                phone: user.phone
            }
        }
        return this.http
            .put<{ data: AuthData }>(BACKEND_URL + '/' + id, userData);

    }

    getUserByToken(): Observable<AuthData> {
        const userToken = this.getToken();
        const httpHeaders = new HttpHeaders();
        httpHeaders.set('Authorization', 'Bearer ' + userToken);
        return this.http.get<AuthData>(BACKEND_URL + '/getUserByToken', { headers: httpHeaders });
    }

    login(email: string, password: string) {
        const authData: AuthData = { email: email, password: password };
        this.http.post<{ token: string, expiresIn: number, userId: string }>(BACKEND_URL + "/login", authData)
            .subscribe(response => {
                const token = response.token;
                this.token = token;
                if (token) {
                    const expiresInDuration = response.expiresIn;
                    this.setAuthTimer(expiresInDuration);
                    this.isAuthenticated = true;
                    this.userId = response.userId;
                    this.authStatusListener.next(true);
                    const now = new Date();
                    const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
                    this.saveAuthData(token, expirationDate, this.userId);
                    this.router.navigate(['./dashboard']);
                }
            }, error => {
                this.authStatusListener.next(false);
                this.authNoticeService.setNotice('Kullanıcı adı veya parolası hatalı', 'danger');
            })
    }

    autoAuthUser() {
        const authInformation = this.getAuthDate();
        if (!authInformation) {
            return;
        }
        const now = new Date();
        const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
        if (expiresIn > 0) {
            this.token = authInformation.token;
            this.isAuthenticated = true;
            this.userId = authInformation.userId;
            this.setAuthTimer(expiresIn / 1000);
            this.authStatusListener.next(true);
        }
    }

    logout() {
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        this.userId = null;
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate(['./auth/login']);
    }

    private setAuthTimer(duration: number) {
        this.tokenTimer = setTimeout(() => {
            this.logout();
        }, duration * 1000);
    }

    private saveAuthData(token: string, expirationDate: Date, userId: string) {
        localStorage.setItem("token", token);
        localStorage.setItem("expiration", expirationDate.toISOString());
        localStorage.setItem("userId", userId);
    }

    private clearAuthData() {
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
        localStorage.removeItem("userId");
    }

    private getAuthDate() {
        const token = localStorage.getItem("token");
        const expirationDate = localStorage.getItem("expiration");
        const userId = localStorage.getItem("userId");
        if (!token || !expirationDate) {
            return;
        }
        return {
            token: token,
            expirationDate: new Date(expirationDate),
            userId: userId
        }
    }
}