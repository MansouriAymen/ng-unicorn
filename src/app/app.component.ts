import { Component } from '@angular/core';
import { from } from 'rxjs';
import { filter, map, reduce } from 'rxjs/operators';
import { Unicorn } from './shared/models/unicorn.model';
import { UnicornsService } from './shared/services/unicorns.service';

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
    constructor(private service: UnicornsService) {
        fetch(' http://[::1]:3000/unicorns')
            .then(rep => rep.json())
            .then(unicorns =>
                from(unicorns)
                    .pipe(
                        filter((unicorn: Unicorn) => unicorn.weight > 20),
                        //map(unicorn => ({ ...unicorn, name: unicorn.name.toUpperCase() })),
                        reduce((acc, value) => acc + value.weight, 0),
                    )
                    .subscribe(e => {}),
            );
        this.service.getUnicornWithCapacities().subscribe(res => {
            console.log(res);
        });
    }
}
