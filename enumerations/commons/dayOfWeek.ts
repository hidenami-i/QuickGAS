enum DayOfWeek {
    Sunday = 0,
    Monday,
    TuesDay,
    WednesDay,
    ThursDay,
    FriDay,
    SaturDay
}

namespace DayOfWeek {

    const japaneseDayOfWeek: string[] = ["日", "月", "火", "水", "木", "金", "土"];

    /**
     * Converts day of week to japanese.
     * @param {DayOfWeek} dayOfWeek 
     * @returns {string}
     */
    export function toJapanese(dayOfWeek: DayOfWeek): string {
        return japaneseDayOfWeek[dayOfWeek];
    }
}


