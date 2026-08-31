<script lang="ts">
	import { COMPOUND_NUMERALS } from '$lib/CompoundNumerals';
	import Digit from '$lib/Digit.svelte';
	import Modal from '$lib/Modal.svelte';
	import NumberGenerator from '$lib/NumberGenerator.svelte';
	import {
		SIZE_UNIT,
		splitDigits,
		STROKE_WIDTH,
		SVG_HEIGHT,
		SVG_VIEWBOX,
		SVG_WIDTH,
		pow10
	} from '$lib/utils';

	const drawPositions = [
		{ number: 3, x1: SIZE_UNIT, y1: 0, x2: SIZE_UNIT * 2, y2: SIZE_UNIT },
		{ number: 4, x1: SIZE_UNIT, y1: SIZE_UNIT, x2: SIZE_UNIT * 2, y2: 0 },
		{ number: 6, x1: SIZE_UNIT * 2, y1: 0, x2: SIZE_UNIT * 2, y2: SIZE_UNIT },
		{ number: 1, x1: SIZE_UNIT, y1: 0, x2: SIZE_UNIT * 2, y2: 0 },
		{ number: 2, x1: SIZE_UNIT, y1: SIZE_UNIT, x2: SIZE_UNIT * 2, y2: SIZE_UNIT }
	];

	let showSolution = $state(false);
	let showHint = $state(false);

	let selectedNumbers: number[] = $state([]);
	let value = $state(0);
	let guess = $derived(
		selectedNumbers.reduce((accumulator, digit) => {
			return accumulator + digit;
		}, 0)
	);
	let valueNumbers = $derived(
		splitDigits(value)
			.map((digit) =>
				COMPOUND_NUMERALS.isCompound(digit)
					? COMPOUND_NUMERALS.getCompoundComponents(digit)
					: [digit]
			)
			.map((components, i) => components.map((component) => component * pow10(i)))
			.flat()
	);

	function reset(newValue: number = 0) {
		value = newValue;
		guess = 0;
		selectedNumbers = [];
		showSolution = false;
	}

	function updateSelectedNumbers(e: Event) {
		if (e.target !== null && e.target instanceof SVGLineElement) {
			const selectedNumber = Number(e.target.id);
			if (selectedNumbers.includes(selectedNumber)) {
				selectedNumbers = selectedNumbers.filter((number) => number !== selectedNumber);
			} else {
				selectedNumbers.push(selectedNumber);
			}
		}
	}

	function isGuessCorrect(): boolean {
		let correct = guess === value;
		const digits = splitDigits(guess);
		for (let i = 0; i < digits.length; i++) {
			const digit = digits[i];
			const powerOfTen = pow10(i);
			if (COMPOUND_NUMERALS.isCompound(digit)) {
				const components = COMPOUND_NUMERALS.getCompoundComponents(digit);
				components.forEach((component) => {
					correct = correct && selectedNumbers.includes(component * powerOfTen);
				});
			}
		}
		return correct;
	}
</script>

{#snippet line(
	id: string,
	x1: number,
	y1: number,
	x2: number,
	y2: number,
	scaleX: number,
	scaleY: number,
	translateX: number,
	translateY: number,
	stroke = 'lightgrey',
	pointerEvents = 'visiblePainted'
)}
	<line
		{id}
		{x1}
		{y1}
		{x2}
		{y2}
		pointer-events={pointerEvents}
		{stroke}
		transform={`scale(${scaleX}, ${scaleY}) translate(${translateX}, ${translateY})`}
	/>
{/snippet}

{#snippet trunk()}
	{@render line('trunk', SIZE_UNIT, 0, SIZE_UNIT, SIZE_UNIT * 3, 1, 1, 0, 0, 'black', 'none')}
{/snippet}

{#snippet units(id: string, x1: number, y1: number, x2: number, y2: number, stroke = 'lightgrey')}
	{@render line(id, x1, y1, x2, y2, 1, 1, 0, 0, stroke)}
{/snippet}

{#snippet tens(id: string, x1: number, y1: number, x2: number, y2: number, stroke = 'lightgrey')}
	{@render line(id, x1, y1, x2, y2, -1, 1, -2 * SIZE_UNIT, 0, stroke)}
{/snippet}

{#snippet hundreds(
	id: string,
	x1: number,
	y1: number,
	x2: number,
	y2: number,
	stroke = 'lightgrey'
)}
	{@render line(id, x1, y1, x2, y2, 1, -1, 0, -3 * SIZE_UNIT, stroke)}
{/snippet}

{#snippet thousands(
	id: string,
	x1: number,
	y1: number,
	x2: number,
	y2: number,
	stroke = 'lightgrey'
)}
	{@render line(id, x1, y1, x2, y2, -1, -1, -2 * SIZE_UNIT, -3 * SIZE_UNIT, stroke)}
{/snippet}

{#snippet segments(filter: (number: number) => boolean, stroke: string)}
	{#each [units, tens, hundreds, thousands] as snippet, i (i)}
		{const powerOfTen = pow10(i)}
		{#each drawPositions as position, i (i * powerOfTen)}
			{const actualNumber = position.number * powerOfTen}
			{#if filter(actualNumber)}
				{@render snippet(
					(position.number * powerOfTen).toString(),
					position.x1,
					position.y1,
					position.x2,
					position.y2,
					stroke
				)}
			{/if}
		{/each}
	{/each}
{/snippet}

<div class="full-width-center-column-container gap-1em">
	<h1>Practice</h1>
	<p>
		Turn <span class="font-size-xxl">{value}</span> into cirstercian numeral.
		<br /> <span>Click on the grey bars to 'draw' the numeral.</span>
	</p>
	<div class="flex flex-row center-all gap-1em">
		<div onclick={updateSelectedNumbers} onkeypress={() => {}} role="button" tabindex="0">
			<svg
				width={SVG_WIDTH}
				height={SVG_HEIGHT}
				stroke-width={STROKE_WIDTH}
				stroke-linecap="round"
				pointer-events="none"
				viewBox={SVG_VIEWBOX}
			>
				{@render segments((n) => !selectedNumbers.includes(n), 'lightgrey')}
				{@render segments((n) => selectedNumbers.includes(n), 'black')}
				{@render trunk()}
			</svg>
		</div>

		<div hidden={!showSolution}>
			<Digit {value} />
		</div>
	</div>
	<div>
		<button onclick={() => (selectedNumbers = [])} hidden={showSolution}>Clear</button>
		<button commandfor="result" command="show-modal" hidden={showSolution}>Check</button>
		<button onclick={() => (showSolution = true)} hidden={showSolution}>See solution</button>
	</div>
	<NumberGenerator generated={reset} />
</div>

<Modal id="result" close={() => (showHint = false)}>
	<div>
		{let correct = $derived.by(isGuessCorrect)}
		{#if correct}
			<span class="font-size-xxl">Correct!</span>
		{:else}
			<span class="font-size-xxl">Incorrect!</span>
			<p>Make sure you mapped each digit correctly and you're not using non-existing numerals.</p>
			<button onclick={() => (showHint = true)} hidden={showHint}>View Hint</button>
			{#if showHint}
				<div class="flex flex-column center-all">
					<svg
						width={SVG_WIDTH}
						height={SVG_HEIGHT}
						stroke-width={STROKE_WIDTH}
						stroke-linecap="round"
						pointer-events="none"
						viewBox={SVG_VIEWBOX}
					>
						{@render trunk()}
						{@render segments(
							(n) => valueNumbers.includes(n) && selectedNumbers.includes(n),
							'green'
						)}
						{@render segments(
							(n) => !valueNumbers.includes(n) && selectedNumbers.includes(n),
							'red'
						)}
					</svg>
				</div>
			{/if}
		{/if}
	</div>
</Modal>
