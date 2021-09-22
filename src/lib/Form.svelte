<script>
	import Input from './Input.svelte';
	import Select from './Select.svelte';
	export let onSubmit;
	export let fields;
	// Convert fields from [ { name: 'name', value: 'Value' } ] to { name : Value } which is more useful when submitting a form
	const fieldsToObject = (fields) => fields.reduce((p, c) => ({ ...p, [c.name]: c.value }), {});
	// When submitting, turn our fields representation into a JSON body
	const handleSubmit = () => onSubmit(fieldsToObject(fields));
</script>

<form on:submit|preventDefault={() => handleSubmit(fields)}>
	{#each fields as field}
		<div>
			{#if field.type === 'Input'}
				<Input
					bind:value={field.value}
					label={field.label}
					id={field.name}
					name={field.name}
					placeholder={field.placeholder}
				/>
			{:else if field.type === 'Select'}
				<Select bind:value={field.value} label={field.label} options={field.options} />
			{/if}
		</div>
	{/each}
	<button type="submit">Submit</button>
</form>

<style lang="scss">
	div {
		margin: 5px;
	}
	button {
		font-family: inherit;
		font-size: inherit;
		padding: 1em 2em;
		color: #ff3e00;
		background-color: rgba(255, 62, 0, 0.1);
		border-radius: 2em;
		border: 2px solid #ff3e00;
		outline: none;
		width: 200px;
		height: 60px;
		font-variant-numeric: tabular-nums;
	}

	button:hover {
		border: 3px solid #ff3e00;
	}

	button:active {
		background-color: rgba(255, 62, 0, 0.2);
	}
</style>
