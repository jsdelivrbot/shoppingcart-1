export class ObjectUtilities {
  /**
   * A very basic equals implementation. This only checks shallow values of each object and expects them
   * to have the same schema.
   */
  public static equals (obj1: any, obj2: any) {
    if (obj1 === obj2) {
      return true;
    }

    if (obj1 instanceof Object && obj2 instanceof Object) {
      let keyCount = Object.keys(obj2).length;

      for (const p in obj1) { // tslint:disable:forin
        if (obj1[p] !== obj2[p]) {
          return false;
        }
        keyCount--;
      }

      return keyCount === 0;
    }
  }
}
