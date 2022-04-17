<script lang="ts">
  import * as utils from '$lib/utils';
  import { onMount } from 'svelte';

  export let text: string;
  export let rows: number;

  let bg: SVGElement;
  let ref: HTMLTextAreaElement;
  
  onMount(() => {
    const ro = new ResizeObserver(() => {
      const styles = window.getComputedStyle(ref);
      const lineHeight = utils.toPixel(styles.getPropertyValue("line-height"));
      const lineWidth = ref.offsetWidth;
      bg = utils.makeLinesSVG(rows, lineWidth, lineHeight);
    });

    ro.observe(ref);
    return () => {
      ro.disconnect();
    }
  });
</script>

<div>
  <svg>{@html bg?.innerHTML}</svg>
  <textarea bind:this={ref} {rows}>{text}</textarea>
</div>

<style lang="scss">
  div {
    position: relative;
  }

  svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  textarea {
    line-height: var(--input-line-height);
    margin: 0;
    font-family: "Arial";
    font-size: 14px;
    padding: 0 10px;
    border: none;
    resize: none;
    border-radius: 0;
    vertical-align: top;
    width: 100%;
  }
</style>


