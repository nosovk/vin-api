<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	export let placeholder;
	export let label;
	export let name;
	export let id;
	export let value;

	onMount(() => {
		if (!value) value = $page.query.get(id);
	});

	function change() {
		value === '' ? $page.query.delete(id) : $page.query.set(id, value);
		window.history.replaceState(null, null, '?' + $page.query.toString());
	}
</script>

<label for={id}>{label}</label>
<input bind:value {placeholder} {id} {name} type="text" on:change={change} />

<style type="text/css">
</style>
