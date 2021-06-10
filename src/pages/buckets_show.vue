<template lang="pug">
  q-page.q-pa-lg
    list-table(title="buckets.show.title", resource="assets", :columns="columns", :query="itemQuery"
      no-created, override-updated="lastModified")
</template>

<script>
import ListTable from '../components/ListTable'
export default {
  name: 'buckets_show',
  components: {
    ListTable
  },
  data () {
    return {
      itemQuery: {
        bucket: this.$route.params.id
      },
      columns: [
        {
          name: 'prefix',
          field: 'prefix',
          label: this.$t('fields.prefix'),
          align: 'left',
          sortable: true,
          filter: true
        },
        {
          name: 'name',
          field: 'name',
          label: this.$t('fields.name'),
          align: 'left',
          sortable: true,
          filter: true
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
