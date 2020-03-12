/**
 * Date extension class.
 */
export class ExDate {

    /**
     * Gets now date.
     * @return {Date} now Date.
     */
    public static now(): Date {
        return new Date();
    }

    /**
     * Gets last date in this month.
     * @param {Date} date
     * @return {number} last date.
     */
    public static getNumberOfDays(date?: Date): number {
        if (date == null) {
            date = this.now();
        }
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    }
}