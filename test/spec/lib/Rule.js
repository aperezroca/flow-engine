import { Rule } from 'lib/FlowLib';

describe('Rule', () => {

  it('should initiate', () => {
    const ruleBody = () => {};
    const rule = new Rule({
      id: 1,
      title: 'title',
      body: ruleBody,
      trueId: 2,
      falseId: 3
    });

    expect(rule.id).toBe(1);
    expect(rule.title).toBe('title');
    expect(rule.body).toBe(ruleBody);
    expect(rule.trueId).toBe(2);
    expect(rule.falseId).toBe(3);
  });

  it('should initialize with defaults', () => {
    const rule = new Rule({ id: 1 });

    expect(rule.id).toBe(1);
    expect(rule.title).toBe('Rule 1');
    expect(rule.body()).toBeTruthy();
    expect(rule.trueId).toBeNull();
    expect(rule.falseId).toBeNull();
  });

  it('should throw an error if id is not provided', () => {
    expect(() => { new Rule() }).toThrow();
  });

  it('should tell when another rule is referenced', () => {
    const ruleA = new Rule({ id: 1 });
    const ruleB = new Rule({ id: 1, trueId: 2 });
    const ruleC = new Rule({ id: 1, falseId: 3 });
    const ruleD = new Rule({ id: 1, trueId: 2, falseId: 4 });

    expect(ruleA.references(1)).toBeFalsy();
    expect(ruleA.references(null)).toBeTruthy();

    expect(ruleB.references(2)).toBeTruthy();
    expect(ruleB.references(null)).toBeTruthy();
    expect(ruleB.references(1)).toBeFalsy();

    expect(ruleC.references(3)).toBeTruthy();
    expect(ruleC.references(null)).toBeTruthy();
    expect(ruleC.references(1)).toBeFalsy();

    expect(ruleD.references(2)).toBeTruthy();
    expect(ruleD.references(4)).toBeTruthy();
    expect(ruleD.references(null)).toBeFalsy();
  });

  it('should tell when two rules reference the same rule', () => {
    const ruleA = new Rule({ id: 1 });
    const ruleB = new Rule({ id: 1, trueId: 2 });
    const ruleC = new Rule({ id: 1, falseId: 3 });
    const ruleD = new Rule({ id: 1, trueId: 2, falseId: 4 });

    expect(Rule.referenceSameRule(ruleA, ruleA)).toBeFalsy();
    expect(Rule.referenceSameRule(ruleA, ruleB)).toBeFalsy();
    expect(Rule.referenceSameRule(ruleA, ruleC)).toBeFalsy();
    expect(Rule.referenceSameRule(ruleA, ruleD)).toBeFalsy();

    expect(Rule.referenceSameRule(ruleB, ruleB)).toBeTruthy();
    expect(Rule.referenceSameRule(ruleB, ruleC)).toBeFalsy();
    expect(Rule.referenceSameRule(ruleB, ruleD)).toBeTruthy();

    expect(Rule.referenceSameRule(ruleC, ruleC)).toBeTruthy();
    expect(Rule.referenceSameRule(ruleC, ruleD)).toBeFalsy();

    expect(Rule.referenceSameRule(ruleD, ruleD)).toBeTruthy();
  });
});
