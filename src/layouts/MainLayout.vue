<template lang="pug">
  q-layout(view="lHh Lpr lFf")
    q-header(elevated)
      q-toolbar
        q-btn(
          flat
          dense
          round
          icon="menu"
          aria-label="Menu")

        q-toolbar-title Quasar App
        div Quasar v{{ $q.version }}

    q-page-container
      router-view
</template>

<script>
export default {
  name: 'MainLayout'
}
</script>
