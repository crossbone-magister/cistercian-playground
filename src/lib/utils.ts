export const SIZE_UNIT = 75;
export const STROKE_WIDTH = 6;
export const SVG_WIDTH = SIZE_UNIT * 2;
export const SVG_HEIGHT = SIZE_UNIT * 3;
const HALF_STROKE = Math.floor(STROKE_WIDTH / 2);
const DOUBLE_HALF_STROKE = Math.floor(STROKE_WIDTH / 2) * 2;
export const SVG_VIEWBOX = `-${HALF_STROKE}, -${HALF_STROKE}, ${SVG_WIDTH + DOUBLE_HALF_STROKE}, ${SVG_HEIGHT + DOUBLE_HALF_STROKE}`;

export const MAX = 9999;
export const MAX_DIGITS = calculateNumberOfDigits(MAX);

export function calculateNumberOfDigits(n: number) {
	return (Math.log(n) * Math.LOG10E + 1) | 0;
}

export function splitDigits(input: number): number[] {
	let remaining = input;
	const values = [];
	while (remaining > 0) {
		values.push(remaining % 10);
		remaining = Math.floor(remaining / 10);
	}
	return values;
}

export function pow10(n: number): number {
	return Math.pow(10, n);
}
