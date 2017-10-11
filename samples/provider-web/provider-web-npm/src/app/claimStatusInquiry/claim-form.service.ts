import { Injectable } from '@angular/core';

@Injectable()
export class ClaimFormService {
  private data: any;
  constructor() { }

  setFormData(data) {
    this.data = data;
  }

  getFormData() {
    return this.data;
  }
}
