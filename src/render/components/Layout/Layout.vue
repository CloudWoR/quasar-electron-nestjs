<template>
  <q-layout view="hHh lpR fFf" class="APP bg-grey-3">
    <q-header elevated class="APP__header" height-hint="50">
      <q-bar class="q-electron-drag bg-white text-cyan-8 fit">
        <!-- <q-btn icon="laptop_chromebook" flat @click="toggleLeftDrawer" /> -->
        <q-space />
        <q-btn dense flat icon="minimize" @click="minimize" />
        <q-btn dense flat :icon="toggleIcon" @click="toggleMaximize" />
        <q-btn dense flat icon="close" @click="closeApp" />
      </q-bar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      behavior="desktop"
      bordered
      :width="150"
    >
      <!-- drawer content -->
    </q-drawer>

    <q-page-container :style-fn="tweak" class="APP__container">
      <q-toolbar inset>
        <q-breadcrumbs active-color="cyan" style="font-size: 16px">
          <q-breadcrumbs-el label="Home" icon="home" />
          <q-breadcrumbs-el label="Components" icon="widgets" />
          <q-breadcrumbs-el label="Toolbar" />
        </q-breadcrumbs>
      </q-toolbar>
      <q-scroll-area class="container_scroll-area q-pa-xs">
        <router-view />
        </q-scroll-area>
    </q-page-container>

    <q-footer class="APP__footer bg-grey-2 text-cyan-8 glossy">
      <q-btn :icon="drawerIcon" flat @click="toggleLeftDrawer" />
    </q-footer>

  </q-layout>
  <!-- <q-layout view="IHh lpR fFf" class="APP bg-grey-3">
    <q-header elevated class="APP__header" height-hint="50">
      <q-bar class="q-electron-drag bg-white text-cyan-8 fit">
        <q-btn icon="laptop_chromebook" flat @click="toggleLeftDrawer" />
        <q-space />
        <q-btn dense flat icon="minimize" @click="minimize" />
        <q-btn dense flat :icon="toggleIcon" @click="toggleMaximize" />
        <q-btn dense flat icon="close" @click="closeApp" />
      </q-bar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="APP__drawer"
      :width="200"
    >
        <Menus />
    </q-drawer>
    <q-footer elevated style="height: 30px;" class="bg-white text-cyan-8">
      footer
    </q-footer>

    <q-page-container class="fit">
      <q-scroll-area class="fit">
        <div class="q-pa-xs">
          <router-view />
        </div>
      </q-scroll-area>
      <ReportDialog />
      <ErrorBox />
    </q-page-container>
  </q-layout> -->
</template>

<script lang='ts' setup>
import { reactive, toRefs, computed } from 'vue';
// import Menus from './Menus.vue';
// import ReportDialog from './dialog/imageDialog/ReportDialog.vue';
// import { WindowZoomInstruct } from '@preload/electron.dto';
import { useQuasar } from 'quasar';
// import ErrorBox from './dialog/errorBox/ErrorBox.vue';

const $q = useQuasar();

// const { toggleWindowZoom } = window.electron;

const state = reactive<{
  leftDrawerOpen: boolean;
  isMaximize: boolean;
}>({
  leftDrawerOpen: true,
  isMaximize: false,
});
const { leftDrawerOpen, isMaximize } = toRefs(state);

const drawerIcon = computed(() => {
  return leftDrawerOpen.value ? 'switch_left' : 'switch_right'
})

const toggleIcon = computed(() => {
  return isMaximize.value ? 'flip_to_front' : 'crop_square';
});

// style-fn
const tweak = (offset, height) => {
  console.log('offset: ', offset, height);
  // return { minHeight: offset ? `calc(100vh - ${offset}px)` : '100vh' }
  return { minHeight: '10px'}
}

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
};

const minimize = () => {
  // toggleWindowZoom(WindowZoomInstruct.Minimize);
}

const toggleMaximize = async () => {
  // isMaximize.value = await toggleWindowZoom(WindowZoomInstruct.Maximize);
}

const closeApp = () => {
  // $q.dialog({
  //   title: '关闭应用',
  //   message: '是否退出该应用？',
  //   ok: '是',
  //   cancel: '否',
  //   color: 'negative',
  // }).onOk(() => toggleWindowZoom(WindowZoomInstruct.CloseApp));
}

</script>

<style lang="scss">
.APP {
  .APP__header {
    height: $header-height;
  }
  .APP__container {
    height: $container-height;
    .container_scroll-area {
      height: $container-height;
    }
  }
  .APP__footer {
    height: $footer-height;
  }
}
</style>
