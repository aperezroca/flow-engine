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

  it('should execute an empty flow', () => {
    const flow = new Flow();

    expect(flow.execute({})).toEqual([]);
  });

  describe('Flow execution:', () => {
    let flow;
    const rules = [
      { id: 1, body: (obj => obj[1]), trueId: 2, falseId: 5 },
      { id: 2, body: (obj => obj[2]), trueId: 3, falseId: null },
      { id: 3, body: (obj => obj[3]), trueId: 4, falseId: null },
      { id: 4, body: (obj => obj[4]), trueId: 6, falseId: null },
      { id: 5, body: (obj => obj[5]), trueId: null, falseId: 10 },
      { id: 6, body: (obj => obj[6]), trueId: null, falseId: null }
    ];

    beforeEach(() => {
      flow = new Flow();

      for (let rule of rules) {
        flow.addRule(new Rule(rule));
      }
    });

    it('should execute', () => {
      const result = flow.execute({
        1: false, 2: true, 3: true,
        4: true, 5: true, 6: true
      });

      expect(result.length).toBe(2);
      expect(result[0].rule.id).toBe(1);
      expect(result[0].result).toBeFalsy();
      expect(result[1].rule.id).toBe(5);
      expect(result[1].result).toBeTruthy();
    });

    it('should execute', () => {
      const result = flow.execute({
        1: true, 2: false, 3: true,
        4: true, 5: true, 6: true
      });

      expect(result.length).toBe(2);
      expect(result[0].rule.id).toBe(1);
      expect(result[0].result).toBeTruthy();
      expect(result[1].rule.id).toBe(2);
      expect(result[1].result).toBeFalsy();
    });

    it('should execute', () => {
      const result = flow.execute({
        1: true, 2: true, 3: false,
        4: true, 5: true, 6: true
      });

      expect(result.length).toBe(3);
      expect(result[0].rule.id).toBe(1);
      expect(result[0].result).toBeTruthy();
      expect(result[1].rule.id).toBe(2);
      expect(result[1].result).toBeTruthy();
      expect(result[2].rule.id).toBe(3);
      expect(result[2].result).toBeFalsy();
    });

    it('should execute', () => {
      const result = flow.execute({
        1: true, 2: true, 3: true,
        4: false, 5: true, 6: true
      });

      expect(result.length).toBe(4);
      expect(result[0].rule.id).toBe(1);
      expect(result[0].result).toBeTruthy();
      expect(result[1].rule.id).toBe(2);
      expect(result[1].result).toBeTruthy();
      expect(result[2].rule.id).toBe(3);
      expect(result[2].result).toBeTruthy();
      expect(result[3].rule.id).toBe(4);
      expect(result[3].result).toBeFalsy();
    });

    it('should execute with rule referencing non-existing rule', () => {
      const result = flow.execute({
        1: false, 2: true, 3: true,
        4: true, 5: false, 6: true
      });

      expect(result.length).toBe(2);
      expect(result[0].rule.id).toBe(1);
      expect(result[0].result).toBeFalsy();
      expect(result[1].rule.id).toBe(5);
      expect(result[1].result).toBeFalsy();
    });
  });
});
