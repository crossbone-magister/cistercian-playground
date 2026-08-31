<script lang="ts">
	import { currentTheme } from './theme.svelte';
	import { SIZE_UNIT } from './utils';

	const RADIUS = 5;
	let { blink = false } = $props();
	let color = $derived(currentTheme?.color);
	let show = $state(true);
	let id: NodeJS.Timeout;
	$effect(() => {
		if (blink) {
			id = setInterval(() => (show = !show), 1000);
		} else if (!blink && id) {
			clearInterval(id);
			show = true;
		}
	});
</script>

<svg width={RADIUS * 3} height={SIZE_UNIT * 3} fill={show ? color : 'none'} stroke={color}>
	<circle r={RADIUS} cx={RADIUS + 1} cy={SIZE_UNIT} />
	<circle r={RADIUS} cx={RADIUS + 1} cy={SIZE_UNIT * 2} />
</svg>
