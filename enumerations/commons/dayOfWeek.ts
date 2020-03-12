enum DayOfWeek {
    Sunday = 0,
    Monday,
    TuesDay,
    Wednesday,
    ThursDay,
    FriDay,
    Saturday
}

namespace DayOfWeek {

    const japaneseDayOfWeek: string[] = ["日", "月", "火", "水", "木", "金", "土"];

    export function toJapanese(dayOfWeek: DayOfWeek | number): string;

    /**
     * Converts day of week to japanese.
     * @param {DayOfWeek} dayOfWeek
     * @returns {string}
     */
    export function toJapanese(dayOfWeek: DayOfWeek | number): string {
        if (typeof dayOfWeek === "number") {
            dayOfWeek = dayOfWeek as DayOfWeek;
        }
        return japaneseDayOfWeek[dayOfWeek];
    }
}


