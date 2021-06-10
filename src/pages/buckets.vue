<template lang="pug">
  q-page.q-pa-lg
    list-table(title="buckets.list.title", resource="buckets", :columns="columns",
      no-updated, override-created="creationDate")
</template>

<script>
import ListTable from '../components/ListTable'
export default {
  name: 'buckets',
  components: {
    ListTable
  },
  data () {
    return {
      columns: [
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
