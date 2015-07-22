export class Rule {

  constructor(properties) {
    if (!properties.id) {
      throw new Error(Rule.MISSING_ID_ERROR_MESSAGE);
    }

    this.id = properties.id;
    this.title = properties.title || `Rule ${this.id}`;
    this.body = properties.body || () => true;
    this.trueId = properties.trueId || null;
    this.falseId = properties.falseId || null;
  }

  references(ruleId) {
    return (this.trueId === ruleId) || (this.falseId === ruleId);
  }

  static referenceSameRule(ruleA, ruleB) {
    return ((ruleB.trueId !== null) && ruleA.references(ruleB.trueId))
        || ((ruleB.falseId !== null) && ruleA.references(ruleB.falseId));
  }
}

Rule.MISSING_ID_ERROR_MESSAGE = 'A rule must have an id';

export class Flow {

  constructor(name) {
    this.name = name || 'Flow';
    this._rules = new Map();
    this._firstRule = null;
  }

  getRule(ruleId) {
    return this._rules.get(ruleId);
  }

  getRules() {
    return [...this._rules.values()];
  }

  addRule(rule) {
    if (!this._ruleIsValid(rule)) {
      throw new Error(Flow.INVALID_RULE_ERROR_MESSAGE);
    }

    this._rules.set(rule.id, rule);

    if (this._rules.size === 1) {
      this._firstRule = rule;
    }
  }

  size() {
    return this._rules.size;
  }

  execute(obj) {
    const firstRuleId = this._firstRule
      ? this._firstRule.id
      : null;

    return this._executeRule(firstRuleId, obj);
  }

  _executeRule(ruleId, obj) {
    let rule = this.getRule(ruleId);
    let result;
    let nextRuleId;

    if ((ruleId === null) || (rule === undefined)) {
      return [];
    }

    rule = this.getRule(ruleId);
    result = rule.body(obj);
    nextRuleId = result ? rule.trueId : rule.falseId;

    return [ { rule, result } ].concat(this._executeRule(nextRuleId, obj));
  }

  _ruleIsValid(rule) {
    return !rule.references(rule.id)
        && ((this._firstRule === null) || !rule.references(this._firstRule.id))
        && !this._referencesPreviouslyReferenced(rule);
  }

  _referencesPreviouslyReferenced(inputRule) {
    for (let [, rule] of this._rules) {
      if (Rule.referenceSameRule(inputRule, rule)) {
        return true;
      }
    }

    // For some reason Babel doesn't allow me to use Array.find
    // return [...this._rules.values()].find(rule => {
    //   ...
    // });

    return false;
  }
}

Flow.INVALID_RULE_ERROR_MESSAGE = 'The rule you\'re trying to add is not valid';
