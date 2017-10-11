import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {
  /** GlobalService update the service  */
  name: string;
  language: string;
  tenant: string;
  
  constructor() { }

}
