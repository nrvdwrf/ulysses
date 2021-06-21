<template lang="pug">
  q-page
    .row.q-ma-lg.g.q-col-gutter-lg
      .col-md-8
        .q-mb-md.text-h3 LIGNA.app
        .q-mb-md.text-h5.caption Audiowalks der Gruppe LIGNA als App-Download.
        q-separator.q-mb-lg
        p.q-mb-lg.text-body1
          | Mit der LIGNA-App lassen sich unsere Audiowalks bequem und coronagerecht durchführen.
          br
          | Das Handy wird zum Abspielgerät für den vom Zufall bestimmten, individuellen Walk durch die Stadt.
        .text-h6.q-mb-md So funktioniert's:
        ul.q-mb-lg.text-body1
          li App installieren und öffnen.
          li Den gewünschten Rundgang auswählen.
          li Dort finden Sie dann Informationen, wie Sie zum Startpunkt des Walks gelangen, sowie weitere Instruktionen.
          li Bitte denken Sie daran, dass Sie für den Walk eigene Kopfhörer benötigen und Ihr Akku vollständig geladen sein sollte.
        .text-h6.q-mb-md Weitere Fragen zur App oder zur Benutzung?
        .text-body1
          a(href="http://ligna.org/kontakt") Kontaktieren Sie uns hier
      .col-md-4
        q-banner.q-mb-lg.text-body1 Sie können diese App für Android- und iOS-Endgeräte in Kürze hier herunterladen.
        q-btn(type="a" href="http://ligna.org" flat color="secondary") Weitere Informationen zu LIGNA
</template>

<script>
export default {
  name: 'PageIndex'
}
</script>
