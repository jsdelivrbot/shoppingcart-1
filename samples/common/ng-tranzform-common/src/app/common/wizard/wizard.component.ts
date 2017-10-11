import {
  Component,
  Input,
  Output,
  ViewChild,
  ElementRef,
  ContentChildren,
  AfterContentInit,
  QueryList,
  HostListener,
  HostBinding
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/finally';

import { WizardStepComponent } from './wizard-step/wizard-step.component';
import { DomUtilities } from '../shared/dom.utilities';

export interface PrepareEvent {
  wait (Observable);
}

export interface CompleteEvent {
  wait (Observable);
}

/**
 * Present the user with a series of steps that must be completed in order.
 */
@Component({
  selector: 'tzf-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements AfterContentInit {
  /**
   * ID of the wizard.
   */
  @Input() id: string;

  /**
   * Text in the navigation strip will be hidden when the screen is narrower than this.
   */
  @Input()
  responsiveWidth: number;

  @ViewChild('nav')
  private wizardNav: ElementRef;

  /**
   * Find all of the steps defined for this wizard.
   */
  @ContentChildren(WizardStepComponent)
  private stepQuery: QueryList<WizardStepComponent>;

  /**
   * Add the class to hide titles.
   */
  @HostBinding('class.hide-titles')
  private hideTitles: boolean;

  /**
   * The current step.
   */
  private activeIndex = 0;

  /**
   * The wizard steps.
   */
  steps: WizardStepComponent[];

  waiting: Subscription;

  constructor (
    private sanitizer: DomSanitizer,
  ) {
  }

  /**
   * Initialize the steps and responsive width.
   */
  ngAfterContentInit () {
    const steps = this.steps = this.stepQuery.toArray();
    if (steps.length) {
      steps.forEach(step => step.wizard = this);
      steps[0].active = true;

      if (!this.responsiveWidth) {
        // Provide a default responsive width based on the number of steps
        this.responsiveWidth = steps.length * 150;
      }
      this.checkSize();
    }
  }

  /**
   * Navigate back to a previously completed step.
   * @param state The history state to navigate to.
   */
  @HostListener('window:popstate', ['$event.state'])
  back (state) {
    if (this.waiting) {
      this.waiting.unsubscribe();
      this.waiting = undefined;
    }

    const index = state ? state.index : 0;
    if (index > this.activeIndex) {
      // Prevent navigating forward
      window.history.go(this.activeIndex - index);
    } else {
      this.activeIndex = index;
      this.steps.forEach((step, i) => step.active = (index === i));
    }
  }

  /**
   * Generate the link to return to a step, marking the URL as safe.
   * @param index The step to generate this for.
   */
  backLink (index: number): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl('javascript:history.go(' + (index - this.activeIndex) + ')');
  }

  /**
   * Move to the next step.
   */
  next () {
    let wait: boolean;
    const activeStep = this.steps[this.activeIndex];
    activeStep.complete.emit({
      wait: (observable: Observable<any>) => {
        wait = true;
        this.waiting = observable
          .subscribe(
            success => {
              this.waiting = undefined;
              this.tryAdvanceStep();
            },
            error => {
              this.waiting = undefined;
            },
          );
      }
    });

    if (!wait) {
      this.tryAdvanceStep();
    }
  }

  tryAdvanceStep () {
    const steps = this.steps;
    const activeIndex = this.activeIndex;
    let wait: boolean;

    if (activeIndex < steps.length - 1) {
      steps[activeIndex + 1].prepare.emit({
        wait: (observable: Observable<any>) => {
          wait = true;
          this.waiting = observable
            .finally(() => this.waiting = undefined)
            .subscribe(
              success => this.advanceStep(),
            );
        }
      });

      if (!wait) {
        this.advanceStep();
      }
    }
  }

  advanceStep () {
    const steps = this.steps;
    let activeIndex = this.activeIndex;

    steps[activeIndex].active = false;
    activeIndex = ++this.activeIndex;
    steps[activeIndex].active = true;

    window.history.pushState({ index: activeIndex }, 'Step ' + activeIndex);

    DomUtilities.scrollTo(this.wizardNav.nativeElement);
  }

  /**
   * Respond to a change in window size.
   */
  @HostListener('window:resize')
  checkSize () {
    this.hideTitles = window.innerWidth < this.responsiveWidth;
  }
}
