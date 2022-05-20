<script lang="ts">
  import dayjs from "$lib/dayjs";
  import { formatMoney } from '$lib/utils';
  import {
    Form,
    Input,
    Label,
    FormGroup,
    InputGroup,
    InputGroupText,
    Button,
  } from "sveltestrap";

  const nowDate = dayjs().format("YYYY-MM-DD");
  const gstRate = 0.05;
  const pstRate = 0.07;
  const unitPrices = new Map([
    ["24ABB318", 3248.00],
    ["24ABB330", 3448.00],
    ["24ABB336", 4034.00],
    ["24ABB342", 4531.00],
    ["24ABB324", 3317.00],
  ]);

  let frameRef: HTMLIFrameElement;

  let dateValue = nowDate;
  let toValue = "";
  let modelValue = "24ABB324";
  let descValue =
    "Install air conditioner complete with evaporator, drains, ductwork modifications, venting modifications, brackets, electrical, and permits.\n" +
    "Unit will be secured to brackets mounted to cement wall of the house. All holes will be sealed in accordance with existing insulation methods.\n" +
    "Furnace airflows will be adjusted for proper operation of both heating and cooling.\n\n" +
    "Carrier Model #24ABB324 or equivalent based availability";
  let warrantyValue =
    "Enhanced warranty - Original Homeowner - 5 years parts and labour from date of installation. Warranty of parts may be extended to 10 years with\n" +
    "timely registration of equipment online. See www.carrier.com. Enhanced warranty is NON_TRANSFERABLE. Transferable warranty is 5 years parts 1 year\n" +
    "labour from date of installation.";
  let priceValue = "";

  // Setting price value when modelValue changes
  $: priceValue = (unitPrices.get(modelValue) ?? 0).toFixed(2);
  $: price = Math.round(parseFloat(priceValue) * 100);
  $: gst = price * gstRate;
  $: pst = price * pstRate;
  $: totalTax = gst + pst;
  $: totalPrice = price + totalTax;

  /**
   * Handles submission of the form. Creates a PDF and asks the user
   * for a name before saving it.
   */
  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    frameRef.contentWindow.postMessage({
      type: "quote",
      payload: {
        to: toValue,
        date: dateValue,
        description: descValue,
        warranty: warrantyValue,
        subtotal: price,
        gst,
        pst,
        totalPrice: totalPrice,
      },
    });
  }
</script>

<svelte:head>
  <title>Quote Maker</title>
</svelte:head>

<div class="root">
  <h2>Quote Maker</h2>
  <Form on:submit={handleSubmit}>
    <FormGroup>
      <Label for="to">To</Label>
      <Input type="textarea" id="to" bind:value={toValue} rows={4} />
    </FormGroup>
    <FormGroup>
      <Label for="date">Date</Label>
      <Input type="date" id="date" bind:value={dateValue} min={nowDate} />
    </FormGroup>
    <FormGroup>
      <Label for="desc">Description</Label>
      <Input
        type="textarea"
        id="desc"
        bind:value={descValue}
        min={nowDate}
        rows={12}
      />
    </FormGroup>
    <FormGroup>
      <Label for="model">Carrier model</Label>
      <Input type="select" bind:value={modelValue}>
        {#each [...unitPrices] as [key]}
          <option value={key}>#{key}</option>
        {/each}
      </Input>
    </FormGroup>
    <FormGroup>
      <Label for="model_price">Model Price</Label>
      <InputGroup>
        <InputGroupText>$</InputGroupText>
        <Input type="number" id="model_price" bind:value={priceValue} min={0} step="0.01" />
      </InputGroup>
    </FormGroup>
    <FormGroup>
      <Label for="warranty">Warranty</Label>
      <Input
        type="textarea"
        id="warranty"
        bind:value={warrantyValue}
        min={nowDate}
        rows={7}
      />
    </FormGroup>
    <div class="summary">
      <div>
        <strong>Subtotal</strong>
        <span>{formatMoney(price)}</span>
      </div>
      <div>
        <strong>GST</strong>
        <span>{formatMoney(gst)}</span>
      </div>
      <div>
        <strong>PST</strong>
        <span>{formatMoney(pst)}</span>
      </div>
      <div>
        <strong>Total Tax</strong>
        <span>{formatMoney(totalTax)}</span>
      </div>
      <div>
        <strong>Total Price</strong>
        <span>{formatMoney(totalPrice)}</span>
      </div>
    </div>
    <div class="button-container">
      <Button type="submit" color="primary">
        Submit
      </Button>
    </div>
  </Form>
</div>

<iframe src="/frame" title="" bind:this={frameRef} tabindex="-1" />

<style lang="scss">
  h2 {
    text-align: center;
  }

  .root {
    --padding: 30px;
    max-width: calc(768px + var(--padding) * 2);
    padding: 100px var(--padding);
    width: 100%;
    margin: 0 auto;

    :global(form) {
      display: grid;
      grid-auto-flow: row;
      row-gap: 1rem;
    }

    :global([type="number"])::-webkit-outer-spin-button,
    :global([type="number"])::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    :global([type="date"]) {
      position: relative;

      &::-webkit-calendar-picker-indicator {
        background: transparent;
        bottom: 0;
        color: transparent;
        cursor: pointer;
        height: auto;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        width: auto;
      }
    }
  }

  .summary > div {
    padding: 0.5em;
    display: flex;
    justify-content: space-between;

    &:nth-child(even) {
      background-color: rgba(0, 0, 0, 0.05);
    }
  }

  .button-container {
    text-align: center;
  }

  iframe {
    visibility: hidden;
    width: 1px;
    height: 1px;
    position: fixed;
    top: -1px;
    left: -1px;
    pointer-events: none;
    
    // visibility: visible;
    // width: 100px;
    // height: 100px;
    // resize: both;
    // top: 0;
    // left: 0;
  }
</style>
