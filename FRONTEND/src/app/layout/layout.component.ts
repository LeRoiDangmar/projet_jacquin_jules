import { Component } from '@angular/core';
import { NavigationModule } from '../features/navigation/navigation.module';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.css'],
    imports: [
        NavigationModule,
    ]
})
export class LayoutComponent {}
