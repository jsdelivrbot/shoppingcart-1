export interface CapabilityCollection {
  pageId: string;
  capabilities: string[];
}

export class Capabilities {
  private pageCapabilities: Array<CapabilityCollection> = [{
    pageId: 'AUTH_REFERRAL',
    capabilities: [
      'Dental',
      'Medical',
      'General',
    ],
  }];

  public GetPageCapability(pageId: string): string[] {
    const capability = this.pageCapabilities.find(c => c.pageId === pageId);
    return capability && capability.capabilities;
  }
}
