import {
    Component,
    input,
    output,
    computed,
    ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

// Tipos para las variantes de Card
export type CardElevation =
    | 'flat'      // Sin sombra, con borde sutil
    | 'raised'    // Con sombra (elevación)
    | 'outlined'; // Con borde, sin sombra

export type CardSize = 'sm' | 'md' | 'lg';

@Component({
    selector: 'bds-card',
    standalone: true,
    imports: [CommonModule, MatCardModule],
    changeDetection: ChangeDetectionStrategy.OnPush,

    host: {
        '[class.elevation-flat]': 'elevation() === "flat"',
        '[class.elevation-raised]': 'elevation() === "raised"',
        '[class.elevation-outlined]': 'elevation() === "outlined"',
        '[class.size-sm]': 'size() === "sm"',
        '[class.size-md]': 'size() === "md"',
        '[class.size-lg]': 'size() === "lg"',
        '[class.clickable]': 'clickable()',
        '[class.disabled]': 'disabled()'
    },
    templateUrl: './card.html',
    styleUrls: ['./card.scss']
})
export class CardComponent {

    elevation = input<CardElevation>('raised');
    size = input<CardSize>('md');
    clickable = input<boolean>(false);
    disabled = input<boolean>(false);

    cardClick = output<MouseEvent>();

    isInteractive = computed(() => this.clickable() && !this.disabled());

    handleClick(event: MouseEvent) {
        if (this.isInteractive()) {
            this.cardClick.emit(event);
        }
    }
}
