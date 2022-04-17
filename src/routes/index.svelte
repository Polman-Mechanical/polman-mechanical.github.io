<script lang="ts">
	import { Card, CardBody, CardImg, CardText, CardTitle, Container } from 'sveltestrap';
</script>

<svelte:head>
	<title>PDF Picker</title>
</svelte:head>

<Container sm class="mt-3 mb-3">
	<h2>Available PDF Makers</h2>
	<div>
		<Card>
			<CardImg
				src="/images/quotePDF.png"
				alt="Card image cap"
			/>
			<CardBody>
				<CardTitle>Quote</CardTitle>
				<CardText>
					PDF maker for making quotes. Carrier models are selected from dropdown
					and price is filled in automatically.
				</CardText>
				<a href="/quotes" class="btn btn-primary">Make quote</a>
			</CardBody>
		</Card>
	</div>
</Container>

<style lang="scss">
	h2 {
		text-align: center;
		margin: 0 0 30px 0;
	}

	div {
		display: grid;
		justify-content: center;
		grid-template-columns: repeat(auto-fit, 300px);
		gap: 20px;
		
		:global(.card-img) {
			object-fit: contain;
			width: unset;
			max-height: 150px;
			background-color: rgba(0, 0, 0, 0.05);
		}
	}
</style>