export class ExDate {

    /**
     * Gets last date in this month.
     * @param {number} year
     * @param {number} month
     * @return {number} last date.
     */
    public static getNumberOfDays(year: number, month: number): number {
        return new Date(year, month, 0).getDate();
    }

    // public static getCurrentLastDay(): number {
    //     return new Date(year, month, 0).getDate();
    // }
}