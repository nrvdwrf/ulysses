<template lang="pug">
  q-layout(view="lHh Lpr lFf")
    q-header(elevated)
      q-toolbar
        q-btn-dropdown(icon="menu" flat)
          q-list
            q-item(:to="{ name: 'productions' }" clickable v-ripple v-close-popup
              :active="$route.params.name === 'productions'"
              active-class="text-accent")
              q-item-section
                q-item-label {{ $t('labels.productions') }}
          q-item(:to="{ name: 'buckets' }" clickable v-ripple v-close-popup
            :active="$route.params.name === 'buckets'"
            active-class="text-accent")
            q-item-section
              q-item-label {{ $t('labels.buckets') }}

        q-toolbar-title Ulysses Server

        template(v-if="isAuthenticated")
          q-btn.q-mr-md(flat :label="user.name")
          q-btn(flat :label="$t('buttons.logout')")
        template(v-else)
          q-btn(flat :label="$t('buttons.login')" :to="{ name: 'login' }" tag="a")

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
