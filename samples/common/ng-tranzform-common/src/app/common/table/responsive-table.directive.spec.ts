import { ResponsiveTableDirective } from './responsive-table.directive';

describe('ResponsiveTableDirective', () => {
  it('should create an instance', () => {
    const mockElementRef = {
      nativeElement: {
        getBoundingClientRect: () => {
          return {
            width: 1000,
          };
        },
      },
    };
    const directive = new ResponsiveTableDirective(mockElementRef);
    expect(directive).toBeTruthy();
  });
});
