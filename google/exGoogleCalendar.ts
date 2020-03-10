import {ExString} from "../utility/exString";
import GoogleCalendar = GoogleAppsScript.Calendar.Calendar;
import {ExError} from "../utility/exError";

/**
 * Google Calendar extension class.
 */
export class ExGoogleCalendar {

    /**
     * Gets google calendar.
     * @param targetCalendarId
     * @returns {GoogleAppsScript.Calendar.Calendar}
     */
    public static getCalendarById(targetCalendarId: string): GoogleCalendar {
        ExError.throwIfNull(targetCalendarId);
        return CalendarApp.getCalendarById(targetCalendarId);
    }
}