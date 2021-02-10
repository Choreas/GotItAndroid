<template>
  <q-page>
    <div class="idle-frame">
      Waiting for next step...
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from '@vue/composition-api';
import { Loading, Notify } from 'quasar';
import { RestHandler } from 'src/rest/rest-handler';

export default defineComponent({
  name: 'Idle',
  components: { },
  props: {},
  setup(props, {root}) {

    async function pollingCallback(): Promise<void> {
      Loading.show({
        spinnerColor: 'blue',
        message: "Polling session's state"
      });

      try {
        if (await RestHandler.poll() === false) {
          Notify.create( {
            message: "Fatal error when polling session's state. Please enter the code again."
          } );
          root.$router.replace('/');
          return;
        }
        
        const newState = RestHandler.getSessionState();
        switch (newState.status) {
          case 'IDLE': {
            setTimeout(pollingCallback, 8000);
            break;
          }
          case 'RATE': {
            break;
          }
          case 'QUESTION': {
            break;
          }
          case 'FINISH': {
            root.$router.replace('finish');
            break;
          }
          default: {
            Notify.create( {
              message: "Unknown session state. This is pretty fatal, please enter the code again."
            } );
            root.$router.replace('/');
          }
        }
      } catch (e) {} 
      finally {
        Loading.hide();
      }
    }

    onMounted( async () => {
      pollingCallback();
    } );

    return {};
  }
});
</script>

<style>
.idle-frame {
  margin-top: 20%;
  text-align: center;
  font-size: 30px;
}
</style>