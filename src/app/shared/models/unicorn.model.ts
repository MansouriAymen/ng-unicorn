import { Capacitie } from './capacitie.model';

export interface Unicorn {
    id: number;
    name: string;
    birthyear: number;
    weight: number;
    photo: string;
    hobbies: string[];
    capacities: number[];
    capacitiesLabels: Capacitie[];
}
export function compareUnicorns(u1: Unicorn, u2: Unicorn) {
    const compare = u1.birthyear - u2.birthyear;

    if (compare > 0) {
        return 1;
    } else if (compare < 0) {
        return -1;
    } else return 0;
}
