export class Flow {

  constructor(name = 'Flow') {
    this.name = name;
    this._rules = new Map();
    this._firstRule = null;
  }

  getRule(ruleId) {
    return this._rules.get(ruleId);
  }

  addRule(rule) {
    if (!this._ruleIsValid(rule)) {
      throw new Error(Flow.INVALID_RULE_ERROR_MESSAGE);
    }

    this._rules.set(rule.id, rule);

    if (this.size() === 1) {
      this._firstRule = rule;
    }
  }

  size() {
    return this._rules.size;
  }

  _ruleIsValid(rule) {
    return !rule.references(rule.id)
        && ((this._firstRule === null) || !rule.references(this._firstRule.id))
        && !this._referencesPreviouslyReferenced(rule);
  }

  _referencesPreviouslyReferenced(inputRule) {
    // For some reason Babel doesn't allow me to use Array.from
    // or the spread operator :(
    // return (...this._rules.values()).find(rule => {
    //   ...
    // });
    for (let [, rule] of this._rules) {
      if (((inputRule.trueId !== null) && inputRule.references(rule.trueId))
        || (inputRule.falseId !== null) && inputRule.references(rule.falseId)) {
        return true;
      }
    }

    return false;
  }
}

Flow.INVALID_RULE_ERROR_MESSAGE = 'The rule you\'re trying to add is not valid';

export class Rule {

  constructor(properties) {
    if (!properties.id) {
      throw new Error(Flow.MISSING_ID_ERROR_MESSAGE);
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
        || ((ruleB.falseId !== null) && ruleA.references(ruleB.falseId));
  }
}

Rule.MISSING_ID_ERROR_MESSAGE = 'A rule must have an id';
