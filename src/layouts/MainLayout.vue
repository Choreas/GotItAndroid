<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>

        <q-toolbar-title>
          <div class="row">
            <span class="col-10">GotItAndroid</span>
            <span class="col version">{{version}}</span>
          </div>
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">

import { defineComponent } from '@vue/composition-api';
import * as versionInfo from '../version.json';

export default defineComponent({
  name: 'MainLayout',
  components: { },
  setup() {
    const version = `v${versionInfo.version}`;
    return {version}
  }
});
</script>

<style>
.version {
  text-align: right;
  font-size: 0.8rem;
}
</style>