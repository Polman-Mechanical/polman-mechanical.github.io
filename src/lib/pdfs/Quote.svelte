<script lang="ts">
  import Lines from "$lib/components/Lines.svelte";
  import dayjs from "$lib/dayjs";
  import { formatMoney } from "$lib/utils";

  const email = "polmanmechanical@gmail.com";

  export let toText: string;
  export let dateText: string;
  export let descriptionText: string;
  export let warrantyText: string;
  export let subtotal: number;
  export let gst: number;
  export let pst: number;
  export let totalPrice: number;

  $: dateFormatted = dayjs(dateText, 'YYYY-MM-DD').format('MMMM D YYYY');
</script>

<section>
  <img src="/images/logo.png" alt="" crossorigin="anonymous" class="logo" />
  <address>
    1421 ERIN STREET
    WINNIPEG, MB R3E 2S9
    (PH) 204-654-4040
    (FAX) 204-654-4411
    {email}
  </address>
  <hr />
  <h6>Quote</h6>
  <div class="to">
    <strong>To:</strong>
    <Lines text={toText} rows={4} />
  </div>
  <div class="date">
    <strong>Date:</strong>
    <Lines text={dateFormatted} rows={1} />
  </div>
  <div class="description">
    <p>
      Dear Sir/Madam,<br />
      Polman Mechanical agrees to supply all materials and labour to complete the project{' '}
      as described below:
    </p>
    <Lines text={descriptionText} rows={10} />
  </div>
  <div class="warranty">
    <p>Warranty</p>
    <Lines text={warrantyText} rows={5} />
  </div>
  <p class="subtotal">
    Upon completion of the project as described, the amount of $ <span>{formatMoney(subtotal)}</span> plus applicable taxes is to be paid in full to Polman Mechanical Ltd.
  </p>
  <p class="return">
    Please return a signed copy to <strong><i>{email}</i></strong> to reserve your installation date and equipment.
  </p>
  <p class="totals">
    {formatMoney(gst)} GST & {formatMoney(pst)} PST<span />Total Cost {formatMoney(totalPrice)}
  </p>
  <p class="validfor">***Quote valid for 30 days***</p>
  <div class="custsig">
    <span />
    <label for="nothing">Customer</label>
  </div>
  <div class="repsig">
    <span />
    <label for="nothing">Polman Mechanical</label>
    <img src="/images/signature.png" alt="" crossorigin="anonymous" />
  </div>
  <p class="thankyou">
    Thank you for considering Polman Mechanical Ltd.
  </p>
  <strong class="payments">
    We accept Cash or Cheque only.
  </strong>
</section>


<style lang="scss">
  section {
    display: grid;
    grid-auto-rows: auto;
    grid-auto-columns: 1fr 1fr;
    grid-auto-flow: row;
    justify-content: space-between;
    gap: 7px 227px;
  }

  address {
    font-family: OpenSans;
    font-weight: bold;
    font-style: normal;
    white-space: pre;
    text-align: right;
    line-height: 1.1em;
  }

  .logo {
    margin-top: -35px;
    width: 252px;
  }

  hr {
    grid-column: span 2;
    height: 4px;
    background-color: #000;
    margin: 15px 0;
  }

  h6 {
    grid-column: span 2;
    font-size: inherit;
    margin: 0;
    text-align: center;
    text-transform: uppercase;
  }

  p {
    font-weight: bold;
    margin: 0 0 5px 0;
    font-size: 16px;
  }

  .to strong,
  .date strong {
    text-transform: uppercase;
  }

  .to {
    display: grid;
    grid: auto / auto 1fr;
    gap: 3px;
  }

  .date {
    display: grid;
    grid: auto / auto 1fr;
    height: min-content;
    gap: 3px;

    :global(textarea) {
      text-align: center;
    }
  }

  .description {
    grid-column: span 2;
  }

  .description :global(div),
  .warranty :global(div) {
    width: 100%;
  }

  .warranty {
    grid-column: span 2;
  }

  .subtotal,
  .return,
  .totals,
  .validfor {
    margin: 0;
  }

  .subtotal {
    grid-column: span 2;

    span {
      display: inline-block;
      width: 10em;
      border-bottom: 1px solid #000;
      font-family: Arial;
      text-align: center;
    }
  }

  .return {
    grid-column: span 2;
    font-size: 15px;
    font-weight: normal;
  }

  .totals {
    grid-column: span 2;
    text-align: center;
  }

  .totals span {
    display: inline-block;
    width: 1em;
  }

  .validfor {
    grid-column: span 2;
    text-align: center;
    margin-top: 7px;
  }

  .custsig {
    width: 100%;
  }

  .custsig span,
  .repsig span {
    border-bottom: 1px solid #000;
    display: block;
    height: 65px;
  }

  .custsig label,
  .repsig label {
    text-align: center;
    display: block;
  }

  .repsig {
    width: 100%;
    position: relative;

    img {
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%) rotate(-1deg);
      height: 80px;
    }
  }

  .thankyou {
    grid-column: span 2;
    font-weight: normal;
    text-align: center;
  }
  
  .payments {
    grid-column: span 2;
    text-align: center;
  }
</style>