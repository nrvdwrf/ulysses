<template lang="pug">
  q-form
    q-uploader(:url="url", field-name="file", :headers="headers", :form-fields="fields", @uploaded="onUploaded")
</template>

<script>
  export default {
    name: 'ImageUploader',
    props: ['folder'],
    data () {
      return {
        url: `${process.env.API_HOST}/files`
      }
    },
    computed: {
      headers () {
        return [
          { name: 'Authorization', value: `Bearer ${this.$store.state.auth.accessToken}` }
        ]
      },
      fields () {
        return [{ name: 'folder', value: this.folder }]
      }
    },
    methods: {
      onUploaded ({ xhr }) {
        this.$emit('complete', JSON.parse(xhr.response))
      }
    }
  }
</script>
