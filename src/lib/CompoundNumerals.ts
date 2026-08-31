export class CompoundNumerals {
	private readonly compoundNumeralsComponents: number[][] = [
		[],
		[],
		[],
		[],
		[],
		[1, 4],
		[],
		[1, 6],
		[2, 6],
		[1, 2, 6]
	];

	isCompound(n: number): boolean {
		const isSingleDigit = n < 10;
		const isMultipleOfTen = n % 10 == 0;
		return (isSingleDigit || isMultipleOfTen) && this.compoundNumeralsComponents[n].length > 0;
	}

	getCompoundComponents(n: number): number[] {
		if (this.isCompound(n)) {
			return this.compoundNumeralsComponents[n];
		} else {
			return [];
		}
	}
}

export const COMPOUND_NUMERALS = new CompoundNumerals();
