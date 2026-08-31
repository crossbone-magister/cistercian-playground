<script lang="ts">
	import Digit from '$lib/Digit.svelte';
	import Modal from '$lib/Modal.svelte';
	import NumberGenerator from '$lib/NumberGenerator.svelte';
	import { MAX_DIGITS, splitDigits, pow10 } from '$lib/utils';

	let value = $state(0);
	let guess = $state(0);
	let maxDigits = $state(MAX_DIGITS);
	let localMax = $derived(pow10(maxDigits) - 1);
	let digits = $derived(splitDigits(value));
	let showHint = $state(false);

	function reset(newValue: number) {
		value = newValue;
		guess = 0;
	}
</script>

<div class="full-width-center-column-container gap-1em">
	<h1>Guess</h1>
	<p>Guess this number:</p>
	<Digit {value} />
	<div>
		<input type="number" bind:value={guess} max={localMax} />
		<button command="show-modal" commandfor="result">Guess</button>
		<button command="show-modal" commandfor="solution">See solution</button>
	</div>
	<div>
		<NumberGenerator generated={reset} />
	</div>
</div>

<Modal id="result" close={() => (showHint = false)}>
	<div class="flex flex-column center-all gap-1em">
		{#if guess === value}
			<span class="font-size-xxl">Correct!</span>
		{:else}
			<span class="font-size-xxl">Incorrect!</span>
			<button onclick={() => (showHint = true)} hidden={showHint}>View hint</button>
			{let guessDigits = $derived(splitDigits(guess).reverse())}
			{let reversedDigits = $derived(digits.reverse())}
			{#if showHint}
				<div class="flex flex-row center-all gap-1em">
					{#each reversedDigits as digit, i (i)}
						{let guess = guessDigits[i] || 0}
						<span class={[guess === digit ? 'correct' : 'wrong', 'chip']}>
							{guess}
						</span>
					{/each}
				</div>
			{/if}
		{/if}
	</div>
</Modal>

<Modal id="solution">
	<div class="flex flex-row center-all gap-1em solution">
		{#each digits as digit, i (i)}
			{let element = digit * pow10(i)}
			<div class="solution-digit">
				<Digit value={element} />
				{element}
			</div>
			{#if i < digits.length - 1}
				<span>+</span>
			{/if}
		{/each}
		<span>=</span>
		<div class="solution-digit">
			<Digit {value} />
			{value}
		</div>
	</div>
</Modal>

<style>
	.solution {
		padding: 1em;
	}

	.solution-digit {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 1em;
		align-items: center;
	}

	.wrong {
		background-color: red;
		color: white;
	}

	.correct {
		background-color: lightgreen;
		color: white;
	}

	.chip {
		color: white;
		font-size: xx-large;
		padding-left: 0.1em;
		padding-right: 0.1em;
	}
</style>
