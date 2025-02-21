import { HttpClient } from "@angular/common/http";
import { env } from "../../env";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    constructor(private http: HttpClient) {}

    isAuth() {
        return this.http.get<boolean>(`${env.API_URL}/auth/is-auth`);
    }
}