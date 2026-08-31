<script lang="ts">
	import { currentTheme } from './theme.svelte';
	import {
		MAX,
		SIZE_UNIT,
		STROKE_WIDTH,
		SVG_HEIGHT,
		SVG_VIEWBOX,
		SVG_WIDTH,
		splitDigits
	} from './utils';

	let { value, scale = 1 } = $props();
	let stroke = $derived(currentTheme?.color);
	let digits = $derived(splitDigits(value));

	$effect(() => {
		if (value === undefined || value === null) {
			value = 0;
		}
	});
</script>

<div>
	{#if value <= MAX}
		<svg
			width={SVG_WIDTH}
			height={SVG_HEIGHT}
			stroke-width={STROKE_WIDTH}
			stroke-linecap="round"
			transform={`scale(${scale})`}
			viewBox={SVG_VIEWBOX}
		>
			<line id="trunk" x1={SIZE_UNIT} y1={0} x2={SIZE_UNIT} y2={SIZE_UNIT * 3} {stroke} />
			<line id="digit-1" x1={SIZE_UNIT} y1={0} x2={SIZE_UNIT * 2} y2={0} />
			<line id="digit-2" x1={SIZE_UNIT} y1={SIZE_UNIT} x2={SIZE_UNIT * 2} y2={SIZE_UNIT} />
			<line id="digit-3" x1={SIZE_UNIT} y1={0} x2={SIZE_UNIT * 2} y2={SIZE_UNIT} />
			<line id="digit-4" x1={SIZE_UNIT} y1={SIZE_UNIT} x2={SIZE_UNIT * 2} y2={0} />
			<g id="digit-5">
				<use href="#digit-1" />
				<use href="#digit-4" />
			</g>
			<line id="digit-6" x1={SIZE_UNIT * 2} y1={0} x2={SIZE_UNIT * 2} y2={SIZE_UNIT} />
			<g id="digit-7">
				<use href="#digit-1" />
				<use href="#digit-6" />
			</g>
			<g id="digit-8">
				<use href="#digit-2" />
				<use href="#digit-6" />
			</g>
			<g id="digit-9">
				<use href="#digit-1" />
				<use href="#digit-2" />
				<use href="#digit-6" />
			</g>
			<use href={`#digit-${digits[0]}`} {stroke} />
			<use
				href={`#digit-${digits[1]}`}
				{stroke}
				transform={`scale(-1,1) translate(${-2 * SIZE_UNIT})`}
			/>
			<use
				href={`#digit-${digits[2]}`}
				{stroke}
				transform={`scale(1,-1) translate(0,${-3 * SIZE_UNIT})`}
			/>
			<use
				href={`#digit-${digits[3]}`}
				{stroke}
				transform={`scale(-1,-1) translate(${-2 * SIZE_UNIT},${-3 * SIZE_UNIT})`}
			/>
		</svg>
	{:else}
		<p>Cannot render {value} which is greater than the max of {MAX}</p>
	{/if}
</div>
