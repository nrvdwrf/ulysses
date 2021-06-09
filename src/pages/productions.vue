<template lang="pug">
  q-page.q-pa-lg
    list-table(title="productions.list.title", resource="productions", :columns="columns")
</template>

<script>
import ListTable from '../components/ListTable'
export default {
  name: 'productions',
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
