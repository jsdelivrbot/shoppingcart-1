import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ContentChild} from '@angular/core';
import { TabContentDirective } from '@tranzform/common/tabs/tab-content.directive';

/**import { ActivatedRoute } from '@angular/router' Use in case of resolver;*/

@Component({
  selector: 'app-progress-tab',
  templateUrl: './progressTab.component.html',
  styleUrls: ['./progressTab.component.scss']
})
export class ProgressTabComponent implements OnInit {

  private _disabled;

  @Output() next = new EventEmitter<any>();

  @ContentChild(TabContentDirective) tab: any;

  /**
   * Text to display on the Next button.
   */
  @Input() nextButtonText = 'Next';

  /**
   * Disable next button
   */
  @Input('disableNext')
  get disabled() {
    return this._disabled;
  }

  set disabled(val) {
      this._disabled = val;
  }

  @Input() actions;

  @Output() action = new EventEmitter<any>();

  constructor() {
    /**
      The Entry point for this Component and its DI declaration
    **/
  }

  ngOnChanges(...args: any[]) {

  }

  ngOnInit() {
    /** Logic to get data from resolver modify to use
      this.route.data
      .subscribe((data: { replacewithresolvername: replacewithModelObject }) => {
        this.demo = data.demo;
      });
  */

  }

  ngAfterViewInit() {
    /**
      Fired after the component template has been initialized by the model
    **/
  }

  ngAfterViewChecked() {
    /**
      Fired after the component template has been fully updated by the model
    **/
  }

  onNext() {
    this.next.emit(this.tab.id);
    //this.goToNextTab();
  }

  doAction(id) {
    this.action.emit(id);
  }

  public goToNextTab() {
    const currentTabIndex = this.tab._parent.items.findIndex(item => item.id === this.tab._parent.selected);
    if (currentTabIndex < (this.tab._parent.items.length - 1)) {
      this.tab._parent.select(this.tab._parent.items[currentTabIndex + 1].instance);
    }
  }

  public goToTab(id) {
    const currentTabIndex = this.tab._parent.items.findIndex(item => item.id === id);
    if (currentTabIndex <= (this.tab._parent.items.length - 1)) {
      this.tab._parent.select(this.tab._parent.items[currentTabIndex].instance);
    }
  }

}
