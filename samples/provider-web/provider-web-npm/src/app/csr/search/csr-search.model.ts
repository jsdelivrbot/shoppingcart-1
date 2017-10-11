import { CSRConfigModule as CSR_CONST } from './../csr-constant';

export class CsrSearchForm {

  constructor(
    public firstName = '',
    public lastName = '',
    public userId = '') { }

  transform(actionParam, pageNumber, sortBy) {
    const params = {
      'username' : this.userId,
      'userfirstname' : this.firstName,
      'userlastname' : this.lastName,
      'sortby': sortBy.sortby,
      'orderby': sortBy.orderby,
      'pagenumber': pageNumber,
      'pagesize': CSR_CONST.PAGINATION_PAGE_SIZE

    };
    return params;
  }
}

