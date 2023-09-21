<template>
  <div class="history-page">
    <!-- <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">{{
        $t('common.sidebar.menus.dashboard')
      }}</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/chat-history' }">{{
        $t('common.sidebar.menus.chatHistory')
      }}</el-breadcrumb-item>
    </el-breadcrumb> -->
    <el-row class="wrapper-chat">
      <el-col :span="8" class="wrapper-chat__list-user tw-pb-[20px]">
        <div
          class="tw-pb-[10px] tw-pt-[20px] tw-mt-[-20px] tw-mb-[10px] tw-sticky tw-top-0 tw-bg-white"
        >
          <h1 class="tw-mt-0">Chat History</h1>
          <el-input
            v-model="input2"
            placeholder="Search Messenger"
            prefix-icon="el-icon-search"
            class="tw-mb-[10px]"
          >
          </el-input>
        </div>
        <div class="tw-mt-[20px]">
          <el-card
            v-for="item in chatList"
            :key="item.id"
            :body-style="{ padding: '10px' }"
            class="tw-mb-[10px] tw-shadow-none tw-border-none tw-cursor-pointer tw-rounded-lg"
          >
            <el-avatar :src="item.avatar" @error="errorHandler">
              <img :src="item.avatar" />
            </el-avatar>
            <div class="tw-flex tw-flex-col tw-justify-center">
              <span class="tw-font-semibold">{{ item.name }}</span>
              <span>{{ item.message }}</span>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col
        :span="16"
        class="wrapper-chat__content tw-pb-[20px] tw-sticky tw-top-0 tw-bg-white"
      >
        <div
          class="tw-flex tw-mt-0 tw-pl-[20px] tw-py-[20px] tw-sticky tw-top-0 tw-bg-white avatar"
        >
          <el-avatar
            class="tw-mr-[10px]"
            src="https://empty"
            @error="errorHandler"
          >
            <img
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          /></el-avatar>
          <div class="tw-flex tw-flex-col tw-justify-center">
            <span class="tw-font-semibold">Michael John</span>
            <span>Active 2h ago</span>
          </div>
        </div>
        <div>
          <el-card
            v-for="item in chatDetail"
            :key="item.id"
            :body-style="{ padding: '20px' }"
            class="tw-mb-[10px] tw-shadow-none tw-border-none tw-cursor-pointer tw-rounded-lg"
            :class="{ active: item.id === 2 }"
          >
            <el-avatar
              :src="item.avatar"
              class="tw-w-[79px]"
              @error="errorHandler"
            >
              <img :src="item.avatar" />
            </el-avatar>
            <div>
              <span>{{ item.message }}</span>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { MetaInfo } from 'vue-meta'

interface DataProps {}

export default Vue.extend({
  name: 'HistoryChatpage',

  data(): DataProps {
    return {
      count: 0,
      input2: '',
      chatList: [
        {
          id: 1,
          name: 'Michael John',
          message: 'You: chat content is kaka',
          avatar:
            'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        },
        {
          id: 1,
          name: 'Michael John',
          message: 'You: chat content is kaka',
          avatar:
            'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        },
        {
          id: 1,
          name: 'Michael John',
          message: 'You: chat content is kaka',
          avatar:
            'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        },
        {
          id: 1,
          name: 'Michael John',
          message: 'You: chat content is kaka',
          avatar:
            'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        },
        {
          id: 1,
          name: 'Michael John',
          message: 'You: chat content is kaka',
          avatar:
            'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        },
        {
          id: 1,
          name: 'Michael John',
          message: 'You: chat content is kaka',
          avatar:
            'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        },
        {
          id: 1,
          name: 'Michael John',
          message: 'You: chat content is kaka',
          avatar:
            'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        },
        {
          id: 1,
          name: 'Michael John',
          message: 'You: chat content is kaka',
          avatar:
            'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        },
        {
          id: 1,
          name: 'Michael John',
          message: 'You: chat content is kaka',
          avatar:
            'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        },
        {
          id: 1,
          name: 'Michael John',
          message: 'You: chat content is kaka',
          avatar:
            'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        },
        {
          id: 1,
          name: 'Michael John',
          message: 'You: chat content is kaka',
          avatar:
            'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        },
      ],

      chatDetail: [
        {
          id: 1,
          message:
            'Finding the answers to these questions isn’t difficult, but getting any kind of new tool set up can be time-consuming. And that can be a barrier to moving forward, even if you know it would be beneficial for your business.',

          avatar:
            'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        },
        {
          id: 2,
          message:
            'Finding the answers to these questions isn’t difficult, but getting any kind of new tool set up can be time-consuming. And that can be a barrier to moving forward, even if you know it would be beneficial for your business.',

          avatar:
            'https://static.vecteezy.com/system/resources/previews/021/059/827/non_2x/chatgpt-logo-chat-gpt-icon-on-white-background-free-vector.jpg',
        },
        {
          id: 1,
          message:
            'Finding the answers to these questions isn’t difficult, but getting any kind of new tool set up can be time-consuming. And that can be a barrier to moving forward, even if you know it would be beneficial for your business.',

          avatar:
            'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        },
        {
          id: 2,
          message:
            'Finding the answers to these questions isn’t difficult, but getting any kind of new tool set up can be time-consuming. And that can be a barrier to moving forward, even if you know it would be beneficial for your business.',

          avatar:
            'https://static.vecteezy.com/system/resources/previews/021/059/827/non_2x/chatgpt-logo-chat-gpt-icon-on-white-background-free-vector.jpg',
        },
        {
          id: 1,
          message:
            'Finding the answers to these questions isn’t difficult, but getting any kind of new tool set up can be time-consuming. And that can be a barrier to moving forward, even if you know it would be beneficial for your business.',

          avatar:
            'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        },
        {
          id: 2,
          message:
            'Finding the answers to these questions isn’t difficult, but getting any kind of new tool set up can be time-consuming. And that can be a barrier to moving forward, even if you know it would be beneficial for your business.',

          avatar:
            'https://static.vecteezy.com/system/resources/previews/021/059/827/non_2x/chatgpt-logo-chat-gpt-icon-on-white-background-free-vector.jpg',
        },
        {
          id: 1,
          message:
            'Finding the answers to these questions isn’t difficult, but getting any kind of new tool set up can be time-consuming. And that can be a barrier to moving forward, even if you know it would be beneficial for your business.',

          avatar:
            'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        },
        {
          id: 2,
          message:
            'Finding the answers to these questions isn’t difficult, but getting any kind of new tool set up can be time-consuming. And that can be a barrier to moving forward, even if you know it would be beneficial for your business.',

          avatar:
            'https://static.vecteezy.com/system/resources/previews/021/059/827/non_2x/chatgpt-logo-chat-gpt-icon-on-white-background-free-vector.jpg',
        },
        {
          id: 1,
          message:
            'Finding the answers to these questions isn’t difficult, but getting any kind of new tool set up can be time-consuming. And that can be a barrier to moving forward, even if you know it would be beneficial for your business.',

          avatar:
            'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
        },
        {
          id: 2,
          message:
            'Finding the answers to these questions isn’t difficult, but getting any kind of new tool set up can be time-consuming. And that can be a barrier to moving forward, even if you know it would be beneficial for your business.',

          avatar:
            'https://static.vecteezy.com/system/resources/previews/021/059/827/non_2x/chatgpt-logo-chat-gpt-icon-on-white-background-free-vector.jpg',
        },
      ],
    }
  },

  head(): MetaInfo {
    return {
      title: this.$t('companyPage.title').toString(),
    }
  },

  methods: {
    loadMore() {},

    errorHandler() {},
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/styles/pages/chat-history/index.scss';
</style>
