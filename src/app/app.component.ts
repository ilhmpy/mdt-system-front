import { Component, signal, WritableSignal } from '@angular/core';
import { ContextService } from './services/context.service';
import { WebSocketsService } from './services/websockets.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly isAuth: WritableSignal<boolean | null> = signal<boolean | null>(null);
  readonly isLoading: WritableSignal<boolean> = signal<boolean>(true);
  readonly isNotAllowed: WritableSignal<boolean> = signal<boolean>(false);

  constructor(public ContextService: ContextService, private WebSocketsService: WebSocketsService, private router: Router) {}

  isNotAllowedSubscription!: Subscription;

  ngOnInit() {
    this.isNotAllowedSubscription = this.WebSocketsService.listen<undefined>("isNotAllowed")
      .subscribe(() => {
        this.router.navigate(["/officers"]);
        this.isNotAllowed.set(true)
      });

    if (!localStorage.getItem("token")) {
      //localStorage.setItem("token", "$argon2id$v=19$m=65536,t=3,p=4$7kZ1VcNGYrm2pLpejIarUg$v9FPZLrS9Y6Vz0vx6hvr6nk5e8RpUdC+NzSF79RyD/Y")
    }
    
    this.ContextService.getIsAuth().subscribe((data: boolean) => {
      this.isAuth.set(data);
    });

    this.ContextService.getIsLoading().subscribe((data: boolean) => {
      this.isLoading.set(data);
    })
  }
  
  ngOnDestroy(): void {
    if (this.isNotAllowedSubscription) {
      this.isNotAllowedSubscription.unsubscribe();
    }
  }
}
