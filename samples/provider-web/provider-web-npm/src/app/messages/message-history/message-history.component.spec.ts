import { MessageHistoryComponent } from './message-history.component';
describe('MessageHistoryComponent', () => {
  let component: MessageHistoryComponent;
  beforeEach(() => {
    component = new MessageHistoryComponent();
  });
 it('should create', () => {
    expect(component).toBeTruthy(true);
  });
  it('should create Date object', () => {
    component.createDate('02/08/2017');
  });
});
