<template>
 <div class="auth-heading">
          <div class="auth-header">{{title}}</div>
          <div class="auth-sub">{{sub}}</div>
        </div>
</template>

<script>
export default {
    props:['title','sub']
}
</script>