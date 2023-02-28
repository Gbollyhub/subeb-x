<template>
  <div class="content-info-box">
    <img
      src="../../../assets/images/Plant.svg"
      loading="lazy"
      width="28"
      alt=""
      class="image"
    />
    <div class="div-block-2">
      <div class="info-box-greeting">Welcome back</div>
      <div class="text-block-4">
        Here's the updated Y{{ allocation.year }} Lasubeb Action Plan overview
      </div>
    </div>
    <div>
      <div class="text-block-5">TOTAL ALLOCATION</div>
      <div class="text-block-6">
        N{{
          allocation.allocation ? allocation.allocation.toLocaleString() : 0
        }}
      </div>
    </div>
    <img
      src="../../../assets/images/cuate.svg"
      loading="lazy"
      width="194"
      alt=""
      class="image-2"
    />
  </div>
</template>

<script>
export default {
  props: ["allocation"],
};
</script>
