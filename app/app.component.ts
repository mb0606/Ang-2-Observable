/// <reference path="../typings/tsd.d.ts" />

import {Component} from 'angular2/core';
import {Observable} from 'rxjs/Rx';
import {ControlGroup, FormBuilder}  from 'angular2/common';



@Component({
    selector: 'my-app',
    template: `
        <input id="search" type="text" class="form-control" placeholder="Search">
        <h1>Example 1</h1>
        <form	[ngFormModel]="form">
				<input	type="text"	ngControl="search">
        </form>	
    `
})
export class AppComponent {

    form: ControlGroup;
    constructor(fb: FormBuilder){
        this.form = fb.group({
            search: [];
        })

        var	search	=	this.form.find('search');
        search.valueChanges
            .debounceTime(400)
            .map(str	=>	(<string>str).replace(/\s/g,	'-'))
            .subscribe(x	=>	console.log(x));

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

        //
        var	startDates	=	[];
        var	startDate	=	new	Date();
        for	(var	day	=	-2;	day	<=	2;	day++)	{
            var	date	=	new	Date(
                startDate.getFullYear(),
                startDate.getMonth(),
                startDate.getDate()	+	day);
                startDates.push(date);
        }
        Observable
            .fromArray(startDates)
            .map(date	=>	"Getting	deals	for	date	"	+	date)
            .subscribe(x	=>	console.log("this is in sub ::: " + x));

        Observable.empty()
            .subscribe(x	=>	console.log("This is the empty OB " + x));
        Observable.range(1,	5)
            .subscribe(x	=>	console.log("This is the range " + x));
        Observable.fromArray([1,	2,	3])
            .subscribe(x	=>	console.log("This is from the array " + x));
        Observable.of([1,	2,	3])
            .subscribe(x	=>	console.log("This is the of " + x));

        Observable.interval(1000)
            .map((x,i)	=>	{
                return "calling	the	server	to	get	the	latest	news " + i;
            })
            .subscribe(news	=>	console.log(news));


    }
}