export enum CapabilityConstants {
  claimsPage = <any>'Claim.Claims',
  quicklinksPage = <any>'QuickLinks.QuickLinks',
  default = <any>'',
}

export class CapabilityConstantUtil {
  static getCapabilityId (key: string) {
    console.log(key);
    return key ? CapabilityConstants[key] : CapabilityConstants.default;
  }
}
