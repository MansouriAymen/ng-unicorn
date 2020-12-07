import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable()
export class DataService {
    private subject = new BehaviorSubject<any>(0);

    sendData(message: any) {
        this.subject.next(message);
    }

    clearData() {
        this.subject.next(0);
    }

    getData(): Observable<any> {
        return this.subject.getValue();
    }
}
