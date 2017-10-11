import { Component, OnInit, ViewChild } from '@angular/core';
import { CSRConfigModule as CSR_CONST } from './../csr-constant';
import { CsrSearchForm } from './csr-search.model';
import { Logger } from 'angular2-logger/core';
import { ProviderApi } from '@tranzform/client-msprovider';
import { Headers } from '@angular/http';
import { Router } from '@angular/router';
import { AppStorageService } from '../../app-storage.service';
import { AppService } from '../../app.service';
@Component({
  selector: 'app-csr-search',
  templateUrl: './csr-search.component.html',
  styleUrls: ['./csr-search.component.scss']
})
export class CSRSearchComponent implements OnInit {

  @ViewChild('searchProviderForm') searchProviderForm;
  selectedValue: string;
  resetBtnVisible: boolean = false;
  isSearched: boolean = false;
  searchBtnEnable: boolean = true;
  providerSearchResult: any = [];
  model: CsrSearchForm = new CsrSearchForm();
  private CSR_CONST = CSR_CONST;

  /** Pagination & Sorting */
  public pageSize: number;
  public totalRecordCount: number;
  public totalRecordCountView: number;
  //public PAGINATION_PAGE_SIZE = CSR_CONST.PAGINATION_PAGE_SIZE;
  public sort: any;
  public criteria: any;
  public page: any;

  constructor(
    private log: Logger,
    private providerApi: ProviderApi,
    private appService: AppService,
    private router: Router,
    private storageService:AppStorageService
  ) { }

  ngOnInit() {
    /**
     * Default select 'By Last Name & First Name' radio button
     */
    this.selectedValue = CSR_CONST.SEARCHBY_NAME;

  }

  //reset the search form
  resetSearchForm() {
    this.log.info('reset Search Form started');
    this.model.firstName = '';
    this.model.lastName = '';
    this.model.userId = '';
    this.searchBtnEnable = true;
    this.resetBtnVisible = false;
    this.isSearched = false;
    this.providerSearchResult = [];
    this.log.info('reset Search Form ended');
  }

  public SearchByCriteria(page, sort, text) {
    this.searchProvider(page, sort);
  }

  searchProvider(page?, sort?) {
    this.page = '';
    if (!page && !sort) {
      this.providerSearchResult = undefined;
    }
    if (!page) {
      page = { pagenumber: 1 };
    }
    const pageNumber = page ? page.pagenumber : 1;
    let sortBy = sort ? {
      sortby: sort.sortField,
      orderby: (sort.sortOrder > 0) ? CSR_CONST.ORDERBY_ASC : CSR_CONST.ORDERBY_DESC
    } : undefined;

    if (!sortBy) {
      sortBy = { sortby: CSR_CONST.SORTBY_USERLASTNAME, orderby: CSR_CONST.ORDERBY_ASC }
    }
   // Object.assign(page);
    this.isSearched = true;
    const param = this.model.transform(CSR_CONST.GET, pageNumber, sortBy);
    this.providerApi.usersGet(param, {
      httpHeader: new Headers({
        'Content-Type': 'application/json'
      })
    }).subscribe((result: any) => {
      this.log.info('Results Found');
      this.providerSearchResult = result;
      this.totalRecordCount = result.totalRecordCount;
      this.pageSize = result.totalRecordCount / CSR_CONST.PAGINATION_PAGE_SIZE;
      //console.log(this.providerSearchResult);
    },
      (error => {
        this.log.info('Results not found');
        this.providerSearchResult = [];
      })
      );

  }

  /**enable or disable the search based on userId or firstName or lastName*/
  enableSearch(userId, firstName, lastName) {
    this.log.info('enable Search Form started');
    /**userId is selected */
    if (this.selectedValue == CSR_CONST.SEARCHBY_USERID) {
      this.log.info('Handle UserID method invoked for UserID ::' + userId);
      this.handleUserIdClick(userId);
    } else if (this.selectedValue == CSR_CONST.SEARCHBY_NAME) {
      this.log.info('Handle Name click method invoked for Firstname : ' + firstName + 'and Last NAme :: ' + lastName);
      this.handleNameClick(firstName, lastName);
    }
    this.log.info('enable Search Form ended');
  }
  private handleNameClick(firstName, lastName) {
    /**first name or last name  is provided, need to show the reset button*/

    this.log.info('handle Name Click started');
    if ((firstName.trim().length > 0) ||
      (lastName.trim().length > 0)) {
      this.resetBtnVisible = true;
    } else if ((firstName.trim().length == 0) &&
      (lastName.trim().length == 0) && this.resetBtnVisible) {
      this.resetBtnVisible = false;
    }
    /**first name or last name is provided min 2 characters need to enable the search button*/
    if ((firstName.trim().length > CSR_CONST.NAME_MIN_LENGTH)
      || (lastName.trim().length > CSR_CONST.NAME_MIN_LENGTH)) {
      this.searchBtnEnable = false;
    } else if ((firstName.trim().length <= CSR_CONST.NAME_MIN_LENGTH) &&
      (lastName.trim().length <= CSR_CONST.NAME_MIN_LENGTH) && !this.searchBtnEnable) {
      this.searchBtnEnable = true;
    }
    this.log.info('handle Name Click ended');
  }
  /**handle the userId Clicked*/
  private handleUserIdClick(userId) {
    /**userId is provided, need to show the reset button*/
    this.log.info('handle USER ID Click started');
    if (userId.trim().length > 0) {
      this.resetBtnVisible = true;
    } else {
      this.resetBtnVisible = false;
    }
    /**userId is provided min 3 characters need to enable the search button*/
    if (userId.trim().length > CSR_CONST.USER_ID_MIN_LENGTH) {
      this.searchBtnEnable = false;
    } else {
      this.searchBtnEnable = true;
    }
    this.log.info('handle USER ID Click ended');
  }
  private providerView(selectedProvider) {
    this.log.info('CSR impersonating Provider ' + selectedProvider.EPEnrollmentId);
    if (document.getElementById('user-name')) {
      document.getElementById('user-name').innerHTML = selectedProvider.EPEnrollmentId;
    }
    let provider = {
      userId: selectedProvider.EPEnrollmentId,
      userLastName: selectedProvider.lastName,
      userFirstName: selectedProvider.firstName
    };
    this.appService.setImpersonatorSubject(true, provider);
    /**
     * store values in sessionStorage
     */
    this.storageService.setProviderImpersonatorInSession(true);
    this.storageService.setUserInSession(JSON.stringify(provider));
    this.router.navigate(['dashboard'], { skipLocationChange: true });
    
  }
}
