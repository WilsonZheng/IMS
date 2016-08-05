export class AdjustExpiryRequest {
    public InternId: number;
    public Adjustment: number;
    public IsExtension: boolean;

    constructor() {
        this.Adjustment = 1;
    }
}