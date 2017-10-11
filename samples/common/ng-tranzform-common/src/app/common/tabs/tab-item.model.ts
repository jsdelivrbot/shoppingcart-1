import { MenuItem } from '../shell';

export interface TabItem {
  id?: string;
  label: string;
  badge?: string | number;
  routerPath: string | { outlets: { [key: string]: string } };
  svgPath: string;
  disabled?: boolean;
}
