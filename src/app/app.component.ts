import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'unicorn-ng';
    public nbUnicorn = 0;

    nbUnicorns(nbUnicorns: number) {
        this.nbUnicorn = nbUnicorns;
    }
}
