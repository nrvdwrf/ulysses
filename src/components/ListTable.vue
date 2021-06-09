<template lang="pug">
  q-table(:title="$t(title)"
    :data="data"
    :columns="columnsData"
    row-key="_id"
    :pagination.sync="pagination"
    :loading="loading"
    :filter="filter"
    @request="onRequest"
    binary-state-sort flat bordered)
    template(v-slot:top-right)
      slot
      confirm-delete(:delete-item="deleteItem" @remove="remove")
      q-input(borderless dense debounce="300" v-model="filter" placeholder="Search")
        template(v-slot:append)
          q-icon(name="search")
      q-btn.q-ml-lg(v-if="!noAdd", @click="$router.push({ name: `${resource}.create` })",
        icon="add", size="md", color="secondary")
    template(v-slot:body-cell-actions="props")
      q-td
        q-btn.float-right(v-if="!noDelete", flat, icon="delete", @click="deleteItem = props.row")
        q-btn.float-right(flat, icon="edit",
          @click="$router.push({ name: `${resource}.edit`, params: { id: props.row._id } })")
</template>

<script>
  import { DateTime } from 'luxon'
  import tableRequest from '../lib/table-request'
  import ConfirmDelete from './ConfirmDelete'

  export default {
    name: 'ListTable',
    components: {
      ConfirmDelete
    },
    props: {
      title: String,
      id: String,
      resource: String,
      query: Object,
      columns: Array,
      noAdd: Boolean,
      noDelete: Boolean
    },
    data () {
      let settings = localStorage.getItem(`ListTable_${this.id || this.$route.name}_settings`)
      if (typeof settings === 'string') {
        settings = JSON.parse(settings)
        if (!settings.updated) {
          settings = {}
          localStorage.removeItem(`ListTable_${this.id || this.$route.name}_settings`)
        }
      }
      else settings = {}
      return {
        deleteItem: null,
        filter: settings.filter || '',
        loading: false,
        data: [],
        pagination: settings.pagination || {
          sortBy: 'created',
          descending: true,
          page: 1,
          rowsPerPage: 10,
          rowsNumber: 0
        }
      }
    },
    created () {
      return this.update()
    },
    computed: {
      columnsData () {
        let columns
        if (Array.isArray(this.columns)) {
          columns = [].concat(this.columns)
        }
        else {
          columns = [{
            name: 'title',
            field: 'title',
            label: this.$t('fields.title'),
            align: 'left',
            sortable: true,
            filter: true
          }]
        }
        columns = columns.concat([
          {
            name: 'updatedAt',
            field: 'updatedAt',
            label: this.$t('fields.updated_at'),
            align: 'right',
            sortable: true,
            format: val => val ? DateTime.fromISO(val).toLocaleString(DateTime.DATETIME_SHORT) : ''
          },
          {
            name: 'createdAt',
            field: 'createdAt',
            required: true,
            label: this.$t('fields.created_at'),
            align: 'right',
            sortable: true,
            format: val => DateTime.fromISO(val).toLocaleString(DateTime.DATETIME_SHORT)
          },
          {
            name: 'actions',
            sortable: false,
            align: 'right'
          }
        ])
        return columns
      },
      filterFields () {
        return this.columnsData.reduce((fields, column) => {
          if (column.filter && typeof column.field === 'string' && fields.indexOf(column.field) === -1) {
            fields.push(column.field)
          }
          return fields
        }, [])
      },
      settingsKey () {
        return `ListTable_${this.id || this.$route.name}_settings`
      }
    },
    methods: {
      update () {
        return this.onRequest({
          pagination: this.pagination,
          filter: this.filter,
          query: this.query
        })
      },
      onRequest (props) {
        if (!props.query) props.query = this.query
        if (props.pagination && props.pagination.rowsPerPage === 0) props.pagination.rowsPerPage = -1
        try {
          return tableRequest(this, `${this.resource}/find`, props, this.filterFields)
        }
        catch (err) {
          this.$q.notify({ message: this.$t('errors.generic', { error: err.message }), color: 'negative' })
        }
      },
      async remove (_id) {
        await this.$store.dispatch(`${this.resource}/remove`, _id)
        this.deleteItem = null
        return this.update()
      }
    },
    watch: {
      query: {
        handler: function () { this.update() },
        deep: true
      },
      pagination: {
        handler: function (val) {
          localStorage.setItem(this.settingsKey, JSON.stringify(Object.assign({ updated: Date.now() }, {
            pagination: val,
            filter: this.filter
          })))
        },
        deep: true
      },
      filter (val) {
        localStorage.setItem(this.settingsKey, JSON.stringify(Object.assign({ updated: Date.now() }, {
          pagination: this.pagination,
          filter: val
        })))
      }
    }
  }
</script>

<style scoped>

</style>
