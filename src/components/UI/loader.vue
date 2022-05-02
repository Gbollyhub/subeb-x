<template>
    <div class="loader-class">
            <fulfilling-bouncing-circle-spinner
                :animation-duration="4000"
                :size="60"
                color="#0093DD"
                />
        </div>
</template>

<script>
import { FulfillingBouncingCircleSpinner } from 'epic-spinners'

export default {
    components:{
        "fulfilling-bouncing-circle-spinner" : FulfillingBouncingCircleSpinner
    }
}
</script>

<style scoped>
.loader-class{
    display: flex;
    background: rgba(255, 255, 255, 0.886);
    position: absolute;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 999999;
}

.loader-img {
 width: 150px;
}
</style>