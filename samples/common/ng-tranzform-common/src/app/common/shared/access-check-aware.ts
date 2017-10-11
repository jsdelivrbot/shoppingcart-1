export interface AccessCheckAware {
  applyAccessControl (Capabilities);
}

export class AccessCheckProvider implements AccessCheckAware {
  capabilites: Capabilities;

  applyAccessControl (capabilites: Capabilities) { }
}

export interface Capabilities {
  read?: boolean;
  write?: boolean;
  update?: boolean;
  delete?: boolean;
}
