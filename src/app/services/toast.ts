import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  message$ = new BehaviorSubject<string>('');
  show$ = new BehaviorSubject<boolean>(false);

  show(message: string): void {
    this.message$.next(message);
    this.show$.next(true);

    setTimeout(() => {
      this.show$.next(false);
    }, 3000);
  }
}