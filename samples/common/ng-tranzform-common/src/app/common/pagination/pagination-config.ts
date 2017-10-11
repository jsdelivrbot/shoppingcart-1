import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap/pagination/pagination.module';

/**
 * Pagination settings for the common framework.
 */
export class PaginationConfig extends NgbPaginationConfig {
  /**
   * Don't add Next/Previous links, they are added manually.
   */
  directionLinks = false;

  /**
   * Maximum number of pages to display.
   */
  maxSize = 5;

  /**
   * Always show the current page in the middle.
   */
  rotate = true;
}
