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
        //
        var keyups = Observable.fromEvent($("#search"), "keyup")
            .map( (e) => e.target.value)
            .filter( (text) => text.length >= 3 )
            .debounceTime(400)
            .distinctUntilChanged()
            .flatMap(searchTerm => {
                var url = "https:api.spotify.com/v1/search?type=artist&q=" + searchTerm
                var promise = $.getJSON(url);
                return Observable.fromPromise(promise);
            });

        keyups.subscribe((data) => {
            console.log(data);
        })



        // var debounced = _.debounce(function(text){
        // var url = "https:api.spotify.com/v1/search?type=artist&q=" + text
        //     $.getJSON(url, function (artists) {
        //         console.log(artists);
        //     })
        //
        // }, 400);
        //
        // $("#search").keyup(function(e){
        //     var text = e.target.value;
        //
        //     if(text.length < 3) {
        //         return;
        //     }
        //
        //     debounced(text);
        // });
    }
}