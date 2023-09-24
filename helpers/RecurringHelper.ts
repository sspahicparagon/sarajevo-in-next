import { RRule, RRuleSet } from "rrule";

function createRRuleStringFromForm(recurringFrequency: string | string[], startDate: string | string[]) {
  let rruleSet: RRuleSet = new RRuleSet();
  let rruleSetString = null;
  if (parseInt(recurringFrequency.toString()) > 0) {
    let parsedDate = new Date(startDate.toString());
    rruleSet.rrule(new RRule({
      dtstart: new Date(parsedDate.getTime() - parsedDate.getTimezoneOffset() * 60000),
      freq: parseInt(recurringFrequency.toString()),
      interval: 1
    }));
    rruleSetString = rruleSet.toString();
  }

  return rruleSetString;
};

export { createRRuleStringFromForm }