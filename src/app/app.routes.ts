import { Routes } from '@angular/router';
import { ListRandomiserComponent } from './list-randomiser/list-randomiser.component';
import { JokeGeneratorComponent } from './joke-generator/joke-generator/joke-generator.component';
import { RandomiserComponent } from './list-randomiser/randomiser/randomiser.component';
import { ListEditorComponent } from './list-randomiser/list-editor/list-editor.component';
import { EmptyStateComponent } from './core/empty-state/empty-state.component';

export const routes: Routes = [
    {
        path: 'lists',
        component: ListRandomiserComponent,
        children: [
            
            {
                path: 'new',
                component: ListEditorComponent
            },
            {
                path: ':listId/edit',
                component: ListEditorComponent
            },
            {
                path: ':listId',
                component: RandomiserComponent
            },
            {
                path: '',
                component: EmptyStateComponent
            }
        ]
    },
    {
        path: 'jokes',
        component: JokeGeneratorComponent
    },
    {
        path: "**",
        redirectTo: 'lists'
    }
];
