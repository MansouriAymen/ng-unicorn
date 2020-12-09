import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Unicorn } from '../models/unicorn.model';
@Injectable({
    providedIn: 'root',
})
export class DataService {
    public subject = new BehaviorSubject<Unicorn[]>([]);

    public addToCart(unicorn: Unicorn): void {
        const currentCart = this.subject.getValue();
        const newCart = currentCart.concat(unicorn as Unicorn);
        this.subject.next(newCart);
    }

    public removeFromCart(unicornToRemove: Unicorn): void {
        const currentCart = this.subject.getValue();
        const newCart = currentCart.filter(unicorn => unicorn.id !== unicornToRemove.id);
        this.subject.next(newCart);
    }

    public isInCart(unicorn: Unicorn): boolean {
        const currentCart = this.subject.getValue();
        return currentCart.some(u => u.id === unicorn.id);
    }
}
