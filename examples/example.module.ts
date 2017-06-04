import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ExampleComponent } from './example.component';
import { NgUploaderModule } from '../index';

@NgModule({
    declarations: [
        ExampleComponent
    ],
    imports: [
        BrowserModule,
        NgUploaderModule
    ],
    providers: [],
    bootstrap: [ExampleComponent]
})
export class ExampleModule {

}
