import GoogleCalendar = GoogleAppsScript.Calendar.Calendar;
import {ExError} from "../utility/exError";
import {ExArray} from "../utility/exArray";

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

    /**
     * Deletes all events on date.
     * @param {GoogleCalendar} calendar
     * @param {Date} date
     */
    public static deleteAllEventsForDay(calendar: GoogleCalendar, date: Date): void {
        const calendarEvents = calendar.getEventsForDay(
            new Date(date.getFullYear(), date.getMonth(), date.getDate())
        );

        if (ExArray.isNullOrEmpty(calendarEvents)) {
            return;
        }

        calendarEvents.forEach(event => {
            event.deleteEvent();
        });
    }
}