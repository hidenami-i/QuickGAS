export class ExDate {

    /**
     * Gets last date in this month.
     * @param {Date} date
     * @return {number} last date.
     */
    public static getNumberOfDays(date: Date): number {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    }
}