<template lang="pug">
  #q-app
    router-view
</template>
<script>
export default {
  name: 'App',
  created () {
    return this.$store.dispatch('users/find', {})
  }
}
</script>
