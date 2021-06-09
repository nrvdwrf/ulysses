<template lang="pug">
  q-page.flex.flex-center
    .q-pa-md(style="min-width: 400px")
      h3 {{ $t('labels.login') }}
      q-form(@submit="login").q-gutter-md.full-width
        q-input.full-width(v-model="payload.email" :label="$t('fields.email')")
        q-input.full-width(v-model="payload.password" :label="$t('fields.password')" type="password")
        q-btn.float-right.q-mt-lg(:label="$t('buttons.submit')" type="submit" color="primary", size="lg")
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'login',
    data: () => {
      return {
        payload: {
          email: undefined,
          password: undefined,
          strategy: 'local'
        }
      }
    },
    computed: {
      ...mapGetters({
        isAuthenticated: 'auth/isAuthenticated'
      })
    },
    mounted () {
      if (this.isAuthenticated) this.$router.push({ name: 'admin.index' })
    },
    methods: {
      async login () {
        this.$q.loading.show({ delay: 400 })
        try {
          await this.$store.dispatch('auth/authenticate', this.payload)
          this.$q.notify({ message: this.$t('messages.login_success'), color: 'positive' })
          await this.$router.push({ name: 'productions' })
        }
        catch (err) {
          this.$q.notify({ message: err.message, color: 'negative' })
        }
        this.$q.loading.hide()
      }
    }
  }
</script>
