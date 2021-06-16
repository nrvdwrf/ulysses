<template lang="pug">
  q-layout(view="lHh Lpr lFf")
    q-footer
      q-toolbar
        q-btn(type="a" href="http://www.ligna.org/impressum/" flat) Impressum
        q-btn(type="a" :to="{ name: 'privacy' }" flat) Datenschutz
    q-page-container
      router-view
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'MainLayout',
  async created () {
    try {
      await this.$store.dispatch('auth/authenticate')
    }
    catch (err) {
      console.error('Auth fail', err.message)
    }
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
      isAuthenticated: 'auth/isAuthenticated'
    })
  }
}
</script>
