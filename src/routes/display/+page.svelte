<script lang="ts">
	import Digit from '$lib/Digit.svelte';
	import { MAX } from '$lib/utils';

	let value = $state(0);
</script>

<div class="full-width-center-column-container gap-1em">
	<h1>Display</h1>
	<p>Input a number and see it displayed:</p>
	<input type="number" bind:value min="0" max={MAX} />
	<Digit {value} />
</div>
