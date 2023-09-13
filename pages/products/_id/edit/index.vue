<template>
  <div class="products-detail-edit-page">
    <the-container size="sm">
      <el-form ref="form" :model="form" :rules="rules" label-position="top">
        <el-form-item :label="$t('common.fields.media')" prop="productMedia">
          <the-upload
            ref="upload"
            action="/api/storage/upload/product"
            list-type="picture-card"
            :file-list="form.productMedia"
            :on-error="onUploadError"
            :on-success="onUploadSuccess"
            :on-remove="onMediaRemove"
          >
            <div slot="file" slot-scope="{ file }" class="tw-w-full tw-h-full">
              <video
                v-if="
                  file.status === 'uploading'
                    ? file.raw.type === 'video/mp4'
                    : file.name === 'video/mp4'
                "
                class="tw-w-full tw-h-full"
                :src="file.url"
                alt=""
              />
              <img v-else class="tw-w-full tw-h-full" :src="file.url" alt="" />

              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-delete"
                  @click="onMediaRemove(file)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
            <i slot="default" class="el-icon-plus"></i>
          </the-upload>
        </el-form-item>

        <el-form-item :label="$t('common.fields.title')" prop="title">
          <el-input v-model="form.title" :maxlength="25" show-word-limit />
        </el-form-item>

        <el-form-item :label="$t('common.fields.tags')" prop="tags">
          <el-tag
            v-for="(tag, index) in tags"
            :key="index"
            closable
            class="tw-mr-1"
            @close="handleRemoveTag(index)"
          >
            {{ tag }}
          </el-tag>
          <el-input
            v-if="inputTagVisible"
            ref="saveTagInput"
            v-model="inputTag"
            size="mini"
            class="tw-max-w-[100px]"
            @keyup.enter.native="handleInputTagConfirm"
            @blur="handleInputTagConfirm"
          >
          </el-input>
          <el-button v-else size="small" @click="showInputTag">{{
            $t('common.actions.newTag')
          }}</el-button>
        </el-form-item>

        <el-form-item
          :label="$t('common.fields.description')"
          prop="description"
        >
          <el-input
            v-model="form.description"
            type="textarea"
            :rows="6"
            :maxlength="2000"
            show-word-limit
          />
        </el-form-item>

        <el-form-item :label="$t('common.fields.price')" prop="price">
          <el-input v-model="form.price" v-number>
            <el-select
              slot="append"
              v-model="form.priceUnit"
              class="tw-min-w-[100px]"
            >
              <el-option
                :label="Enums.CurrencyUnit.JPY"
                :value="Enums.CurrencyUnit.JPY"
              ></el-option>
              <el-option
                :label="Enums.CurrencyUnit.USD"
                :value="Enums.CurrencyUnit.USD"
              ></el-option>
            </el-select>
          </el-input>
        </el-form-item>

        <el-form-item :label="$t('common.fields.stock')" prop="stock">
          <el-input v-model="form.stock" v-number @blur="onUpdateStockRemain" />
        </el-form-item>

        <el-form-item
          :label="$t('common.fields.stockRemain')"
          prop="stockRemain"
        >
          <el-input
            v-model="form.stockRemain"
            v-number
            @blur="onUpdateStockRemain"
          />
        </el-form-item>

        <div class="tw-text-center">
          <el-button :loading="loading" type="info" @click="onSubmit">{{
            $t('common.actions.save')
          }}</el-button>
        </div>
      </el-form>
    </the-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { MetaInfo } from 'vue-meta'
import {
  UpdateProductDto,
  UpdateProductMedia,
} from '~/app/product/dto/update-product.dto'
import ProductService from '~/app/product/product.service'
import { CurrencyUnit } from '~/common/enums'

interface MediaProps {
  id?: string
  url: string
  name: 'image/jpg' | 'image/png' | 'video/mp4'
  uid?: string
}

interface DataProps {
  loading: boolean
  form: {
    productMedia: MediaProps[]
    title: string
    tags: string
    description: string
    price: number
    priceUnit: CurrencyUnit
    stock: number
    stockRemain: number
  }
  inputTagVisible: boolean
  inputTag: string
  rules: any
  oldProductMedia: MediaProps[]
}

export default Vue.extend({
  name: 'ProductsDetailEditPage',

  async asyncData({ route, error, Enums, i18n }) {
    try {
      const product = await ProductService.findOne(route.params.id)

      const productMedia = product.product_media.map((media) => ({
        id: media.id,
        url: media.media_url,
        name: media.media_type,
      }))

      return {
        form: {
          productMedia,

          title: product.title,
          tags: product.tags,
          description: product.description,
          price: product.price,
          priceUnit: product.price_unit,
          stock: product.stock,
          stockRemain: product.stock_remain,
        },

        oldProductMedia: productMedia,
      }
    } catch (err) {
      console.log(err)

      error({
        statusCode: Enums.StatusCode.PageNotFound,
        message: i18n.t('common.errors.pageNotFound').toString(),
      })
    }
  },

  data(): DataProps {
    return {
      loading: false,

      form: {
        productMedia: [],
        title: '',
        tags: '',
        description: '',
        price: 0,
        priceUnit: this.Enums.CurrencyUnit.JPY,
        stock: 0,
        stockRemain: 0,
      },

      inputTagVisible: false,
      inputTag: '',

      rules: {
        productMedia: [
          this.Utils.Validate.required({
            field: this.$t('common.fields.media').toString(),
          }),
        ],

        title: [
          this.Utils.Validate.required({
            field: this.$t('common.fields.title').toString(),
          }),
        ],

        price: [
          this.Utils.Validate.required({
            field: this.$t('common.fields.price').toString(),
          }),
        ],

        stock: [
          this.Utils.Validate.required({
            field: this.$t('common.fields.stock').toString(),
          }),
        ],

        stockRemain: [
          this.Utils.Validate.required({
            field: this.$t('common.fields.stockRemain').toString(),
          }),
        ],
      },

      oldProductMedia: [],
    }
  },

  head(): MetaInfo {
    return {
      title: this.$t('productsDetailEditPage.title').toString(),
    }
  },

  computed: {
    tags: {
      get(): Array<string> {
        return this.form.tags.split(',').filter(Boolean)
      },

      set(value: string[]) {
        this.form.tags = value.join(',')
      },
    },
  },

  methods: {
    onUploadSuccess(response: {
      url: string
      status: string
      name: 'image/jpg' | 'image/png' | 'video/mp4'
    }) {
      this.form.productMedia.push(response)
      ;(this.$refs.upload as any).dispatch('ElFormItem', 'el.form.change')
    },

    onUploadError(err: any, file: any, fileList: any) {
      console.log('onUploadError', err, file, fileList)
    },

    onMediaRemove(file: any) {
      const fileList = [...this.form.productMedia]
      const index = fileList.indexOf(file)

      fileList.splice(index, 1)

      this.form.productMedia = [...fileList]
      ;(this.$refs.upload as any).dispatch('ElFormItem', 'el.form.change')
    },

    handleRemoveTag(index: number) {
      const tags = [...this.tags]

      tags.splice(index, 1)

      this.tags = tags
    },

    showInputTag() {
      this.inputTagVisible = true
      this.$nextTick((_) => {
        ;(this.$refs.saveTagInput as any).$refs.input.focus()
      })
    },

    handleInputTagConfirm() {
      if (this.inputTag) {
        const tags = [...this.tags]

        tags.push(this.inputTag)

        this.tags = tags
      }
      this.inputTagVisible = false
      this.inputTag = ''
    },

    onUpdateStockRemain() {
      if (
        Number(this.form.stockRemain || '0') > Number(this.form.stock || '0')
      ) {
        this.form.stockRemain = this.form.stock
      }
    },

    async onSubmit() {
      const refForm = this.$refs.form as any

      try {
        await refForm.validate()

        this.loading = true

        const productMedia: Array<UpdateProductMedia> =
          this.form.productMedia.map((media) => ({
            id: media.id,
            media_url: media.url,
            media_type: media.name,
          }))

        this.oldProductMedia.forEach((media) => {
          if (!productMedia.find((item) => item.id === media.id)) {
            productMedia.push({
              id: media.id,
              media_url: media.url,
              media_type: media.name,
              is_removed: true,
            })
          }
        })

        const payload = new UpdateProductDto({
          product_media: productMedia,
          title: this.form.title,
          tags: this.form.tags,
          description: this.form.description,
          price: this.form.price,
          price_unit: this.form.priceUnit,
          stock: this.form.stock,
          stock_remain: this.form.stockRemain,
        })

        await ProductService.update(this.$route.params.id, payload)

        this.$message.success(this.$t('common.message.editSuccess').toString())

        this.$router.push(this.RoutePage.PRODUCTS)
      } catch (error: any) {
        this.$message.error(error.message)
      } finally {
        this.loading = false
      }
    },
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/pages/products/detail/edit/index.scss';
</style>
