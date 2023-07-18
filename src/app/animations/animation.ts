import { animate, state, style, transition, trigger } from "@angular/animations";

export const slide = trigger('slide', [
    state('close', style({ height: 0 })),
    state('open', style({ height: '*' })),
    transition('open <=> close', animate('200ms ease'))
]);
