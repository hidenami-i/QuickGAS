export class RangeOptions {

    verticalAlignment: VerticalAlignments;
    horizontalAlignment: HorizontalAlignments;

    constructor(
        verticalAlignment: VerticalAlignments = VerticalAlignments.Middle,
        horizontalAlignment: HorizontalAlignments = HorizontalAlignments.Center,
    ) {
        this.verticalAlignment = verticalAlignment;
        this.horizontalAlignment = horizontalAlignment;
    }

}