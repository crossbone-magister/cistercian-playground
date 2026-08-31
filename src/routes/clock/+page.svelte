<script lang="ts">
	import Digit from '$lib/Digit.svelte';
	import Dots from '$lib/Dots.svelte';
	import { changeTheme, currentTheme, THEMES } from '$lib/theme.svelte';
	import { splitDigits } from '$lib/utils';
	import { Body } from 'svelte-body';

	let now: Date = $state(new Date());
	let showSeconds: boolean = $state(true);
	let mode: string = $state('per-element');
	let selectedTheme = $state('default');

	let isFullScreen = $state(false);

	function goFullScreen() {
		document.documentElement.requestFullscreen();
	}

	setInterval(() => {
		now = new Date();
	}, 1000);

	$effect(() => {
		changeTheme(selectedTheme);
	});

	function capitalize(value: string): string {
		return value.charAt(0).toUpperCase().concat(value.substring(1));
	}
</script>

<svelte:window onresize={() => (isFullScreen = window.innerHeight === screen.height)} />

<Body style={currentTheme} />

{#snippet perElementMode()}
	<Digit value={now.getHours()} />
	<Dots blink={!showSeconds} />
	<Digit value={now.getMinutes()} />
	{#if showSeconds}
		<Dots />
		<Digit value={now.getSeconds()} />
	{/if}
{/snippet}

{#snippet perDigitMode()}
	{let hourDigits = $derived(splitDigits(now.getHours()))}
	{let minuteDigits = $derived(splitDigits(now.getMinutes()))}
	{let secondDigits = $derived(splitDigits(now.getSeconds()))}

	<Digit value={hourDigits[1]} />
	<Digit value={hourDigits[0]} />
	<Dots blink={!showSeconds} />
	<Digit value={minuteDigits[1]} />
	<Digit value={minuteDigits[0]} />
	{#if showSeconds}
		<Dots />
		<Digit value={secondDigits[1]} />
		<Digit value={secondDigits[0]} />
	{/if}
{/snippet}

<main class="flex flex-row center-all min-height-100vh gap-1em">
	{#if mode === 'per-element'}
		{@render perElementMode()}
	{:else}
		{@render perDigitMode()}
	{/if}
</main>

{#if !isFullScreen}
	<footer class="flex flex-row center-all footer">
		{now}
		<label for="show-seconds">
			<input type="checkbox" id="show-seconds" bind:checked={showSeconds} />
			Show seconds
		</label>
		<label for="mode">
			Display mode:
			<select id="mode" bind:value={mode}>
				<option value="per-element">One per element</option>
				<option value="per-digit">One per digit</option>
			</select>
		</label>
		<label for="theme">
			Theme:
			<select id="theme" bind:value={selectedTheme}>
				{#each THEMES as theme (theme.name)}
					<option
						value={theme.name}
						style:color={theme.color}
						style:background={theme.backgroundColor}>{capitalize(theme.name)}</option
					>
				{/each}
			</select>
		</label>
		<button onclick={() => goFullScreen()}>Fullscreen</button>
	</footer>
{/if}

<style>
	.footer {
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 2.5rem;
		column-gap: 2em;
	}
</style>
