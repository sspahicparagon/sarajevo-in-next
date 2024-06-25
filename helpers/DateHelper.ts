import { Value } from "react-calendar/dist/cjs/shared/types";

function convertDateToString2DigitsShortMonth(date: Date, locale: string = 'en') {
    return date.toLocaleDateString(locale == 'bs' ? 'sr-Latn-BA' : locale, { day: '2-digit', month: 'short' })
}

function convertDateToString2DigitsShortMonthYear(date: Date, locale: string = 'en') {
    return date.toLocaleDateString(locale == 'bs' ? 'sr-Latn-BA' : locale, { day: '2-digit', month: 'short', year: 'numeric' });
}

function convertStringToNormalDate(date: string): Date {
    return new Date(date);
}

function normalizeDateToDate(date: string | Date): Date {
    if(typeof(date) === 'string')
        date = convertStringToNormalDate(date);
    
    return date;
}

function convertDateValueToString(date: Value) {
    return date?.toLocaleString() ?? '';
}

function convertDateValueToDate(date: Value) {
    if(!date?.toLocaleString()) return new Date();
    return new Date(date?.toLocaleString());
}

function sortDatesAsc(firstDate: number, secondDate: number) {
    return firstDate > secondDate ? 1 : firstDate < secondDate ? -1 : 0;
}

function timezoneOffsetToSame(date: Date){
     return true;
}

function convertStringToPrettyDate(date: string, locale: string = 'en') {
    return new Date(date).toLocaleDateString(locale == 'bs' ? 'sr-Latn-BA' : locale, { day: '2-digit', month: 'long', 'year': 'numeric' })
}

function addMonthsToDate(date: Date = new Date(), amount: number = 1) {
    return new Date(date.setMonth(date.getMonth() + amount))
}

export {
    convertDateToString2DigitsShortMonth,
    convertStringToNormalDate,
    normalizeDateToDate,
    convertDateValueToString,
    convertDateValueToDate,
    sortDatesAsc,
    timezoneOffsetToSame,
    convertStringToPrettyDate,
    addMonthsToDate,
    convertDateToString2DigitsShortMonthYear
}