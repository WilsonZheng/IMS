import {Component, Input, Output, EventEmitter, ContentChildren, ViewChildren,QueryList} from '@angular/core';
import {TabTitle} from './tabtitle.component';
import {TabContent} from './tabcontent.component';
@Component({
    selector: "jay-tabs",
    templateUrl: 'agview/tabs.tp.html',
    directives: [TabTitle, TabContent]
})
export class Tabs{
    @Output('changed')tabChanged: EventEmitter<number> = new EventEmitter<number>();

    @ContentChildren(TabTitle)
    tabTitles: QueryList<TabTitle>;

    @ContentChildren(TabContent)
    tabContents: QueryList<TabContent>;

    active: number;
    select(index: number) {
        let contents: TabContent[] = this.tabContents.toArray();
        contents[this.active].isActive = false;
        this.active = index;
        contents[this.active].isActive = true;
        this.tabChanged.emit(index);
    }
    ngAfterViewInit() { }
    ngAfterContentInit() {
        this.tabTitles.map(t => t.tabSelected).forEach((t, i) => {
            t.subscribe(_ => { this.select(i); });
        });
        this.active = 0;
        this.select(0);
    }
}