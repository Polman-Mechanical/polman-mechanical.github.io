<script lang="ts" context="module">
  export interface IQuoteMessagePayload {
    to: string;
    date: string;
    description: string;
    warranty: string;
    subtotal: number;
    gst: number;
    pst: number;
    totalPrice: number;
  }

  export interface IQuoteMessage {
    type: 'quote';
    payload: IQuoteMessagePayload;
  }
</script>

<script lang="ts">
  import type { SvelteComponent } from 'svelte';
  import { tick } from 'svelte';
  import Quote from '$lib/pdfs/Quote.svelte';
  import JsPdf from 'jspdf';
  import domtoimage from 'dom-to-image';

  let component: typeof SvelteComponent
  let props: any;
  let ref: HTMLElement;

  const save = async () => {
    try {
      // Waiting for all images in the DOM to load
      const imgs = Array.from(document.images);
      await Promise.all(imgs.map(img =>
        img.complete
          ? Promise.resolve()
          : new Promise(resolve => img.onload = resolve)
      ));
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const imgData = await domtoimage.toPng(ref);
      const pdf = new JsPdf({
        orientation: 'portrait',
        unit: 'mm',
        format: 'letter',
      })
      .addImage(imgData, 'PNG', 0, 0, 215.9, 279.4);
      
      let fileName = prompt('Enter a filename');
      fileName && pdf.save(fileName);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  /**
   * Handles a post message from the parent frame
   */
  const handleMessage = async (e: MessageEvent<IQuoteMessage | any>) => {
    const type: string | undefined = e.data?.type;

    switch (type) {
      case 'quote':
        const payload: IQuoteMessagePayload = e.data.payload;
        props = {
          toText: payload.to,
          dateText: payload.date,
          descriptionText: payload.description,
          warrantyText: payload.warranty,
          subtotal: payload.subtotal,
          gst: payload.gst,
          pst: payload.pst,
          totalPrice: payload.totalPrice,
        };
        component = Quote;

        await tick();
        await save();
    }
  }
</script>

<svelte:window on:message={handleMessage} />

<svelte:head>
  <style>
    :root {
      --margin: 0.46875in;
      --input-line-height: 1.5em;
    }

    @font-face {
      font-family: OpenSans;
      src: url("/fonts/OpenSans-Regular.ttf");
      font-weight: normal;
    }

    @font-face {
      font-family: OpenSans;
      src: url("/fonts/OpenSans-SemiBold.ttf");
      font-weight: 550;
    }

    @font-face {
      font-family: OpenSans;
      src: url("/fonts/OpenSans-Bold.ttf");
      font-weight: bold;
    }

    * {
      box-sizing: border-box;
    }

    body {
      font-family: OpenSans;
      font-size: 15px;
      flex-direction: column;
      align-items: center;
    }
  </style>
</svelte:head>

<main bind:this={ref}>
  {#if component}
    <svelte:component this={component} {...props} />
  {/if}
</main>

<style lang="scss">
  main {
    width: 215.9mm;
    height: 279.4mm;
    padding: var(--margin);
    background-color: #fff;
  }
</style>