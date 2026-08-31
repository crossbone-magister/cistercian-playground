<script lang="ts">
	import { MAX_DIGITS, pow10 } from './utils';

	type Props = {
		generated: (value: number) => void;
	};
	let { generated }: Props = $props();

	let maxDigits = $state(MAX_DIGITS);

	function generate() {
		const localMax = pow10(maxDigits) - 1;
		generated(Math.floor(Math.random() * localMax) + 1);
	}

	$effect(generate);
</script>

<div>
	<label for="max-digits"
		>Max digits:
		<input type="number" min="1" max={MAX_DIGITS} bind:value={maxDigits} />
	</label>
	<button onclick={() => generate()}>New number</button>
</div>
