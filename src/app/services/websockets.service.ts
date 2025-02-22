import { Injectable } from "@angular/core";
import { io, Socket } from 'socket.io-client';
import { env } from "../../env";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class WebSocketsService {
    private socket: Socket;

    constructor() {
        this.socket = io(env.WEBSOCKETS_API_URL);
    }

    listen<T>(eventName: string): Observable<T> {
        return new Observable((subscriber) => {
            this.socket.on(eventName, (data: T) => {
                subscriber.next(data);
            });
        
            return () => {
                this.socket.off(eventName);
            };
        });
    }
}