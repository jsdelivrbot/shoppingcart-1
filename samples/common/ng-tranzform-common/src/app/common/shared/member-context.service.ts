export class MemberContext {
  private contextCollection = {};

  public setItem (k: string, v: string) {
    this.contextCollection[k] = v;
  }

  public getItem (k: string) {
    return this.contextCollection[k];
  }

  public clear () {
    this.contextCollection = {};
  }
}
