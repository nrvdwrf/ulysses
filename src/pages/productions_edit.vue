<template lang="pug">
  q-page.q-pa-lg
    .text-h4.q-ma-md.q-mb-lg.page-title {{ $t('products.edit.title') }}
    q-form.q-gutter-md.full-width(v-if="product")
      // details
      q-input(v-model="product.title", :label="$t('fields.title')")
      q-input(v-model="product.description" :label="$t('fields.description')" type="textarea" filled)

      .row.q-mb-lg(v-if="!$route.params.id")
        q-select.col.q-pr-md(v-model="product.type" :options="types" :label="$t('fields.type')")

      q-select.col.q-pr-md(v-model="product.category" :options="categories"
        :label="$t('fields.category')" emit-value map-options)

      .row.q-mb-lg
        q-input.col(v-model.number="product.price", :label="$t('fields.price')")
        q-select.col.q-pr-md(v-if="!$route.params.id" v-model="product.currency" :options="currencies" :label="$t('fields.currency')")
        q-input.col.q-pr-md(v-else :value="product.currency" :label="$t('fields.currency')" readonly)
        q-input.col(v-model.number="product.vat", :label="$t('fields.vat')", type="number")

      .row.q-mb-lg(v-if="product.type === 'physical'")
        q-input.col(v-model.number="product.amountModifier", :label="$t('fields.amount_modifier')", type="number")
        q-input.col(v-model.number="product.weight", :label="$t('fields.weight')")
        q-select.col.q-pr-md(v-model="product.shippingCategory" :options="shippingCategories"
          :label="$t('fields.shipping_category')" emit-value map-options)

      // constraints
      q-checkbox(v-model="product.restricted" :label="$t('fields.restricted')")
      q-checkbox(v-model="product.requirePersonalisation" :label="$t('fields.require_personalisation')")
      q-checkbox(v-model="product.couponOnly" :label="$t('fields.coupon_only')")
      q-input.col(v-model.number="product.maxItemsPerPerson", :label="$t('fields.max_items_per_person')", type="number")
      .row.q-mb-lg
        input-date-time.col.q-pr-md(v-model="product.valid_from" :label="$t('fields.valid_from')")
        input-date-time.col(v-model="product.valid_thru" :label="$t('fields.valid_thru')")

      // preview image
      .q-mb-lg
        .text-h6.q-mb-md {{ $t('labels.preview_image') }}
        .row
          .col-6.q-pr-md
            q-img(v-if="product.preview_image" :src="getImageSource(product.preview_image)"
              contain native-context-menu style="max-height: 250px")
              .all-pointer-events.absolute
                q-btn(icon="delete" @click="removePreview(product.preview_image)" flat)
          .col-6
            .text-body1.q-mb-md {{ $t('labels.upload_image') }}
            image-uploader(folder="products", @complete="onPreviewImageComplete")

      // detail images
      .q-mb-lg
        .text-h6.q-mb-md {{ $t('labels.detail_images') }}
        .row
          .col-6.q-pr-md
            .q-mb-lg(v-if="product.detail_images" v-for="(image, i) in product.detail_images" :key="image.file")
              q-img(:src="getImageSource(image)" contain style="max-height:250px" native-context-menu)
                .all-pointer-events.absolute
                  q-btn(flat icon="arrow_drop_up" @click="moveDetail(i, -1)")
                  q-btn(flat icon="arrow_drop_down" @click="moveDetail(i, 1)")
                  q-btn(icon="delete" @click="removeDetail(image, i)" flat)
          .col-6
            .text-body1.q-mb-md {{ $t('labels.upload_images') }}
            image-uploader(folder="products", @complete="onDetailImageComplete")

      // ticket templates
      .q-mb-lg(v-if="product.type === 'ticket'")
        .text-h5 {{ $t('labels.ticket_template_layout') }}
        .q-mb-lg
          template-file(v-model="product.template")
        .text-h5 {{ $t('labels.ticket_info') }}
        template-blocks(v-model="product.template_blocks")

      submit-buttons(:cancel-to="{ name: 'products.list' }", @submit="submit")
</template>

<script>
import path from 'path'
import ImageUploader from '../components/ImageUploader'
import InputDateTime from '../components/InputDateTime'
import SubmitButtons from '../components/SubmitButtons'
export default {
  name: 'productions_edit',
  components: {
    ImageUploader,
    InputDateTime,
    SubmitButtons
  },
  data () {
    return {
      loading: false,
      production: {
        title: undefined,
        abstract: undefined,
        description: undefined,
        type: undefined,
        assets: []
      }
    }
  },
  async created () {
    this.$q.loading.show({ delay: 400 })
    const { Production } = this.$FeathersVuex.api
    const production = this.$route.params.id ? await Production.get(this.$route.params.id)
      : new Production(this.product)
    this.production = production.clone()
    this.$q.loading.hide()
  },
  methods: {
    async submit () {
      this.$q.loading.show()
      await this.production.save()
      this.$q.loading.hide()
      await this.$router.push({ name: 'productions' })
    },
    getImageSource (image = {}) {
      return `${process.env.API_HOST}/files/${image.file}`
    },
    onPreviewImageComplete (metadata) {
      const { originalname, folder, filename } = metadata
      const file = {
        title: path.basename(originalname, path.extname(originalname)),
        file: [folder, filename].join('/')
      }
      this.product.preview_image = file
    },
    onDetailImageComplete (metadata) {
      const { originalname, folder, filename } = metadata
      const file = {
        title: path.basename(originalname, path.extname(originalname)),
        file: [folder, filename].join('/')
      }
      this.product.detail_images = this.product.detail_images || []
      this.product.detail_images = this.product.detail_images.concat([file])
    },
    async removePreview (image) {
      await this.removeImage(image)
      this.product.preview_image = undefined
    },
    async removeDetail (image, index) {
      await this.removeImage(image)
      this.product.detail_images.splice(index, 1)
    },
    async removeImage (image) {
      await this.$axios.delete(`${process.env.API_HOST}/files/${image.file}`, {
        headers: { Authorization: `Bearer ${this.$store.state.auth.accessToken}` }
      })
    },
    moveDetail (index, direction) {
      if (index === 0 && direction === -1) return
      if (index === this.product.detail_images.length - 1 && direction === 1) return
      this.product.detail_images.splice(index + direction, 0, this.product.detail_images.splice(index, 1)[0])
    }
  }
}
</script>

<style lang="stylus" scoped>
.preview-img
  max-width 300px
</style>
