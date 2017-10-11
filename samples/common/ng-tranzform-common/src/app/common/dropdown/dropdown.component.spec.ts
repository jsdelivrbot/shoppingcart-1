import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { DropdownComponent } from './dropdown.component';

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        TranslateModule.forRoot(),
      ],
      declarations: [ DropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(inject([TranslateService], (translateService: TranslateService) => {
    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;

    component.options = [{
      value: 1,
      text: 'ONE',
      romanText: 'ROMAN_ONE'
    }, {
      value: 2,
      text: 'TWO',
      romanText: 'ROMAN_TWO'
    }];

    translateService.setDefaultLang('en');
    translateService.setTranslation('en', {
      'ONE': 'One',
      'TWO': 'Two',
      'ROMAN_ONE': 'I',
      'ROMAN_TWO': 'II'
    });

    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default to the first value', () => {
    let changed = false;
    component.registerOnChange(value => {
      expect(value).toEqual(1);
      changed = true;
    });

    fixture.detectChanges();

    expect(component.value).toEqual(1);
    expect(changed).toBeTruthy();
  });

  it('should create option elements using default text field', () => {
    const compiled = fixture.nativeElement;

    const options = compiled.querySelectorAll('option');
    expect(options.length).toEqual(2);
    expect(options[0].innerText).toEqual('One');
    expect(options[0].value).toEqual('1');
    expect(options[1].innerText).toEqual('Two');
    expect(options[1].value).toEqual('2');
  });

  it('should use romanText text field', () => {
    component.textField = 'romanText';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('option').innerText).toEqual('I');
  });

  it('should add and select placeholder option', () => {
    component.placeholder = 'PH';
    fixture.detectChanges();

    const options = fixture.nativeElement.querySelectorAll('option');
    expect(options.length).toEqual(3);
    expect(options[0].innerText).toEqual('PH');
  });
});
