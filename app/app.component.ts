/// <reference path="../typings/tsd.d.ts" />

import {Component} from 'angular2/core';
import {Observable} from 'rxjs/Rx';

@Component({
    selector: 'my-app',
    template: `
        <input id="search" type="text" class="form-control" placeholder="Search">
    `
})
export class AppComponent {
    constructor(){

        var debounced = _.debounce(function(text){
            $.getJSON(url, function (artists) {
                console.log(artists);
            })

        }, 400);

        var url = "https:api.spotify.com/v1/search?type=artist&q=" + text
        $("#search").keyup(function(e){
            var text = e.target.value;

            if(text.length < 3) {
                return;
            }

            debounced(text);
        });
    }
}