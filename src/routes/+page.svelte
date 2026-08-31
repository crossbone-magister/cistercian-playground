<script>
	import { resolve } from '$app/paths';
</script>

<div class="full-width-center-column-container column-gap-1em">
	<h1>Cistercian Playground</h1>
	<p>
		Welcome to the Cistercian Playground, a place where you can play with <a
			href="https://en.wikipedia.org/wiki/Cistercian_numerals"
			rel="external"
			target="_blank"
		>
			Cistercian numerals</a
		>!
	</p>
	<dl>
		<dt><a href={resolve('/display')}>Display</a></dt>
		<dd>View the cistercian numeral for any given number.</dd>
		<dt><a href={resolve('/practice')}>Practice</a></dt>
		<dd>Given a number, try to draw the corrisponding cistercian numeral.</dd>
		<dt><a href={resolve('/guess')}>Guess</a></dt>
		<dd>Given a cirstercian numeral, guess what number it represents.</dd>
		<dt><a href={resolve('/clock')}>Clock</a></dt>
		<dd>A full screen clock using cirstercian numerals for display.</dd>
	</dl>
</div>
