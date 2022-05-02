<template>
             <div class="app-card">
          <div class="div-block-17">
            <div class="project-heading">
              <div class="text-block-15">{{item.title}}</div>
              <router-link  :to="{
           name: 'Project',
           params: {id: item.code}
            }" class="link">Proceed</router-link>
            </div>
            <div class="text-block-16">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporincididunt ut labore et doloremagna aliqua.</div>
          </div><img src="../../../assets/images/spiral.svg" loading="lazy" alt="" class="image-3">
        </div>   

</template>

<script>
export default {
    props:["item"]
}
</script>