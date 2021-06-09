<template lang="pug">
  q-input(filled :value='value', :label="label", :key="label", @input="onInput")
    template(v-slot:prepend)
      q-icon.cursor-pointer(name='event')
        q-popup-proxy(transition-show='scale' transition-hide='scale')
          q-date(:value='value' mask='YYYY-MM-DD HH:mm' @input="onInput")
    template(v-slot:append)
      q-icon.cursor-pointer(name='access_time')
        q-popup-proxy(transition-show='scale' transition-hide='scale')
          q-time(:value='value' mask='YYYY-MM-DD HH:mm' format24h @input="onInput")
</template>

<script>
  export default {
    name: 'InputDateTime',
    props: ['value', 'label'],
    created () {
      this.date = this.value
    },
    methods: {
      onInput (val) {
        this.$emit('input', val)
      }
    }
  }
</script>

<style scoped>

</style>
