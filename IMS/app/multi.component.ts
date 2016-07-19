import {Component, Input, Output, EventEmitter,ViewChild,ContentChild} from '@angular/core';
@Component({
    selector: "user-badge",
    templateUrl: 'agview/userbadge.tp.html'
})
export class UserBadge { }

@Component({
    selector: "user-rating",
    templateUrl:"agview/userrating.tp.html"
})
export class UserRating { }

@Component({
    selector: "user-panel",
    template: "<user-badge></user-badge>",
    directives: [UserBadge]
})
export class UserPanel {
    @ViewChild(UserBadge)
    badge: UserBadge;

    @ContentChild(UserRating)
    rating: UserRating;

    constructor() {
        console.log("badge:" + this.badge + " rating:" + this.rating);
    }
}