<script lang="ts">
	let { id, children, close = () => {} } = $props();
</script>

<dialog {id} onclose={() => close()}>
	<div class="flex flex-row gap-1em modal-header">
		<button commandfor={id} command="close">X</button>
	</div>
	{@render children()}
</dialog>

<style>
	.modal-header {
		justify-content: end;
		align-items: center;
		padding: 0.1em;
	}
</style>
