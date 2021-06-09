<template lang="pug">
  div
    q-dialog(v-model="confirmDelete" persistent)
      q-card(style="min-width:30%")
        q-card-section.row.items-center
          q-avatar(:icon="icon || 'delete'")
          .text-body1.q-ml-sm(v-if="confirmDelete")
            | {{ message || $t('messages.confirm_delete', { title: deleteItem.title || deleteItem.label || 'item' }) }}
        q-card-actions(align="right")
          q-btn(:label="$t('buttons.no')" color="negative" v-close-popup @click="$emit('cancel')")
          q-btn(v-if="confirmDelete" :label="$t('buttons.yes')" color="positive"
            v-close-popup @click="$emit('remove', deleteItem._id)")
</template>

<script>
  export default {
    name: 'ConfirmDelete',
    props: ['deleteItem', 'icon', 'message'],
    data () {
      return {
        confirmDelete: false
      }
    },
    watch: {
      deleteItem (val) {
        this.confirmDelete = !!val
      }
    }
  }
</script>

<style scoped>

</style>
