<template lang="pug">
  q-page.q-pa-md
    .row.q-ma-lg.g.q-col-gutter-lg
      .col
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
      .col-xs-12.col-sm-12.col-md-6.col-lg-4
        q-banner.full-width.q-pa-md.q-mb-lg.text-body1(rounded)
          .text-h5.caption.q-mb-lg App Download
          .row.q-col-gutter-md.q-mb-lg
            .col-6
              a(href="https://apps.apple.com/de/app/ligna-audiowalks/id1573053129")
                q-img(src="~assets/Download_on_the_App_Store_Badge_DE_RGB_blk_092917.svg")
            .col-6
              .text-body2 Google Play Store folgt in Kürze
              //a(href="https://appstoreconnect.apple.com/apps/1573053129/appstore/info")
              //  q-img(src="~assets/Download_on_the_App_Store_Badge_DE_RGB_blk_092917.svg")
          .row
            .col.text-center
              .text-body2.q-mb-sm Android Nutzer können die App auch direkt auf ihr Gerät laden.
              a(href="/LIGNA_Audiowalks.apk") LIGNA Audiowalks laden
        q-btn(type="a" href="http://ligna.org" flat color="secondary") Weitere Informationen zu LIGNA
</template>

<script>
export default {
  name: 'PageIndex'
}
</script>
