<script>
	import Form from '$lib/Form.svelte';
	import JSONTree from 'svelte-json-tree';

	let fields = [
		{
			name: 'vin',
			type: 'Input',
			value: '',
			placeholder: 'Enter car VIN code...',
			label: 'VIN code'
		}
	];

	async function fetchApi(formData) {
		const res = await fetch(`//vpic.nhtsa.dot.gov/api/vehicles/DecodeVinExtended/${formData.vin}?format=json`, {
			method: 'GET',
			cache: 'no-cache',
			headers: {
				'Content-Type': 'application/json',
			}
		});
		let result = await res.json();
		let filtered = result.Results.filter(el=>el.Value)

		if (res.ok) {
			return filtered;
		} else {
			throw new Error(res.statusText);
		}
	}

	let promise;

	function handleClick(body) {
		promise = fetchApi(body);
	}
</script>

<main>
	<h1>Simple VIN API!</h1>

	<Form onSubmit={handleClick} {fields} />

	{#if promise}
		{#await promise}
			<p>...waiting</p>
		{:then json}
			<JSONTree value={json} />
		{:catch error}
			<p style="color: red">{error.message}</p>
		{/await}
	{/if}
</main>

<style lang="scss">
	main {
		text-align: justify;
		padding: 1em;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4rem;
		font-weight: 100;
		line-height: 1.1;
		margin: 4rem auto;
		max-width: 14rem;
	}

	p {
		max-width: 14rem;
		margin: 2rem auto;
		line-height: 1.35;
	}

	@media (min-width: 480px) {
		h1 {
			max-width: none;
		}

		p {
			max-width: none;
		}
	}
</style>
