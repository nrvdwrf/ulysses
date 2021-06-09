<template lang="pug">
  .row
    .col
      slot(name="extra")
    .col.text-right
      q-btn.q-ml-lg(@click="$router.push(cancelTo)" :label="$t('buttons.cancel')" color="grey" size="lg")
      q-btn.q-ml-lg(@click="onSubmit" :label="$t('buttons.submit')" type="submit" color="primary" size="lg")
</template>

<script>
  export default {
    name: 'SubmitButtons',
    props: ['cancelTo'],
    methods: {
      onSubmit (evt) {
        evt.preventDefault()
        this.$emit('submit')
      }
    }
  }
</script>

<style scoped>

</style>
