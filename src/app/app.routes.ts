import { Routes } from '@angular/router';
import { ListRandomiserComponent } from './list-randomiser/list-randomiser.component';
import { JokeGeneratorComponent } from './joke-generator/joke-generator/joke-generator.component';

export const routes: Routes = [
    {
        path: '',
        component: ListRandomiserComponent
    },
    {
        path: 'jokes',
        component: JokeGeneratorComponent
    }
];
