import { Rule, Flow } from 'lib/FlowLib';

describe('Flow', () => {

  it('should initiate', () => {
    const name = Symbol();
    const flow = new Flow(name);

    expect(flow.size()).toBe(0);
    expect(flow.name).toBe(name);
  });

  it('should add valid rules', () => {
    const flow = new Flow();
    const ruleBody = () => {};

    flow.addRule(new Rule({ id: 1 }));
    flow.addRule(new Rule({ id: 2 }));

    expect(flow.size()).toBe(2);
    expect(flow.getRule(1).id).toBe(1);
    expect(flow.getRule(2).id).toBe(2);
  });

  it('should not add rules that reference themselves', () => {
    const flow = new Flow();
    const invalidRuleA = new Rule({ id: 1, trueId: 1 });
    const invalidRuleB = new Rule({ id: 1, falseId: 1 });

    expect(() => { flow.addRule(invalidRuleA) }).toThrow();
    expect(() => { flow.addRule(invalidRuleB) }).toThrow();
  });

  it('should not add rules that reference the first rule', () => {
    const flow = new Flow();
    const invalidRuleA = new Rule({ id: 2, trueId: 1 });
    const invalidRuleB = new Rule({ id: 2, falseId: 1 });

    flow.addRule(new Rule({ id: 1 }));

    expect(() => { flow.addRule(invalidRuleA) }).toThrow();
    expect(() => { flow.addRule(invalidRuleB) }).toThrow();
  });

  it('should not add rules that reference previously referenced rules', () => {
    const flow = new Flow();
    const invalidRuleA = new Rule({ id: 3, trueId: 2 });
    const invalidRuleB = new Rule({ id: 3, falseId: 4 });

    flow.addRule(new Rule({ id: 1, trueId: 2, falseId: 2 }));
    flow.addRule(new Rule({ id: 2, trueId: 3, falseId: 4 }));

    expect(() => { flow.addRule(invalidRuleA) }).toThrow();
    expect(() => { flow.addRule(invalidRuleB) }).toThrow();
  });
});
