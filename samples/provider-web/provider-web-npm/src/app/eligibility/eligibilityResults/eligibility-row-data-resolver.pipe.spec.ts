import { EligibilityRowDataResolverPipe } from './eligibility-row-data-resolver.pipe';

describe('EligibilityRowDataResolverPipe', () => {
  const translate = jasmine.createSpyObj('translate', ['getInstantText']);
  const currncyPipe = jasmine.createSpyObj('currency', ['transform']);
  it('create an instance', () => {
    const pipe = new EligibilityRowDataResolverPipe(translate, currncyPipe);
    expect(pipe).toBeTruthy();
  });

  it('resolve the networkindicator', () => {
    const pipe = new EligibilityRowDataResolverPipe(translate, currncyPipe);
    translate.getInstantText.and.returnValue('ELIGIBILITY.BENEFITS.INNETWORK');
    expect(pipe.transform('networkIndicator', {networkIndicator: 'IN'})).toEqual('ELIGIBILITY.BENEFITS.INNETWORK');
    translate.getInstantText.and.returnValue('ELIGIBILITY.BENEFITS.OUTNETWORK');
    expect(pipe.transform('networkIndicator', {networkIndicator: 'ON'})).toEqual('ELIGIBILITY.BENEFITS.OUTNETWORK');
  });

  it('resolve the amount', () => {
    const pipe = new EligibilityRowDataResolverPipe(translate, currncyPipe);
    // deductible accordian
    translate.getInstantText.and.returnValue('ELIGIBILITY.BENEFITS.DEDUCTIBLE.AMOUNT');
    expect(pipe.transform('amount', {networkIndicator: 'IN', amount: 300}, 'Deductible')).
    toEqual('ELIGIBILITY.BENEFITS.DEDUCTIBLE.AMOUNT');
    translate.getInstantText.and.returnValue('ELIGIBILITY.BENEFITS.DEDUCTIBLE.AMOUNTREMAINING');
    expect(pipe.transform('amount', {networkIndicator: 'IN', amountRemaining: 300}, 'Deductible')).
    toEqual('ELIGIBILITY.BENEFITS.DEDUCTIBLE.AMOUNTREMAINING');

    // limitation accordian
    translate.getInstantText.and.returnValue('ELIGIBILITY.BENEFITS.LIMITATION.AMOUNT');
    expect(pipe.transform('amount', {networkIndicator: 'IN', amount: 300}, 'Limitations')).
    toEqual('ELIGIBILITY.BENEFITS.LIMITATION.AMOUNT');
    translate.getInstantText.and.returnValue('ELIGIBILITY.BENEFITS.LIMITATION.AMOUNTREMAINING');
    expect(pipe.transform('amount', {networkIndicator: 'IN', amountRemaining: 300}, 'Limitations')).
    toEqual('ELIGIBILITY.BENEFITS.LIMITATION.AMOUNTREMAINING');

    // coinsurance accordian
    translate.getInstantText.and.returnValue('ELIGIBILITY.BENEFITS.COINSURANCE.AMOUNT');
    expect(pipe.transform('amount', {networkIndicator: 'IN', amount: 300}, 'Co-Insurance')).
    toEqual('ELIGIBILITY.BENEFITS.COINSURANCE.AMOUNT');

    // copayment accordian
    translate.getInstantText.and.returnValue('ELIGIBILITY.BENEFITS.COPAYMENT.AMOUNT');
    expect(pipe.transform('amount', {networkIndicator: 'IN', amount: 300}, 'Co-Payment')).
    toEqual('ELIGIBILITY.BENEFITS.COPAYMENT.AMOUNT');
  });

  it('resolve the authorization', () => {
    const pipe = new EligibilityRowDataResolverPipe(translate, currncyPipe);
    translate.getInstantText.and.returnValue('ELIGIBILITY.BENEFITS.AUTHORIZATION.YES');
    expect(pipe.transform('priorAuthRequired', {priorAuthRequired: true})).toEqual('ELIGIBILITY.BENEFITS.AUTHORIZATION.YES');
    translate.getInstantText.and.returnValue('ELIGIBILITY.BENEFITS.AUTHORIZATION.NO');
    expect(pipe.transform('priorAuthRequired', {priorAuthRequired: false})).toEqual('ELIGIBILITY.BENEFITS.AUTHORIZATION.NO');
  });
});
