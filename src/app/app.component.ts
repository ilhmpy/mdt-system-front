import { Component, signal, WritableSignal } from '@angular/core';
import { ContextService } from './services/context.service';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly isAuth: WritableSignal<boolean | null> = signal<boolean | null>(null);
  readonly isLoading: WritableSignal<boolean> = signal<boolean>(true);

  constructor(private ContextService: ContextService) {}

  ngOnInit() {
    this.ContextService.getIsAuth().subscribe((data: boolean) => {
      this.isAuth.set(data);
    });

    this.ContextService.getIsLoading().subscribe((data: boolean) => {
      this.isLoading.set(data);
    })
  } 
}
