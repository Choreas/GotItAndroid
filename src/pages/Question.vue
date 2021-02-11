<template>
  <q-page>
    <div class="question-frame">
      In eigenen Worten:
      {{sessionInfo.question}}
      <q-input class="question-input" type="textarea" v-model="inputContent" />
    </div>
    <q-btn class="send-btn" label="Send" @click="send" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@vue/composition-api';
import { Loading, Notify } from 'quasar';
import { RestHandler } from 'src/rest/rest-handler';

export default defineComponent({
  name: 'Question',
  components: { },
  props: {},
  setup(props, {root}) {
    const inputContent = ref('');
    const sessionInfo = RestHandler.getSessionState();
    let timeoutHandle: NodeJS.Timeout;

    async function send(): Promise<void> {
      if (timeoutHandle) clearTimeout(timeoutHandle);
      Loading.show({
        spinnerColor: 'green',
        message: 'Sending your input...'
      });
      try {
        if (await RestHandler.postAnswer(inputContent.value)) {
          Notify.create({
            message: 'Success!'
          });
          root.$router.replace('idle');
        }
      } catch (e) {
        console.log(JSON.stringify(e));
        Notify.create({
            message: 'Failed. Please try again.'
        });
      } finally {
        Loading.hide();
      }
    }

    async function pollingCallback(): Promise<void> {
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
            root.$router.replace('idle');
            break;
          }
          case 'RATE': {
            break;
          }
          case 'QUESTION': {
            timeoutHandle = setTimeout(pollingCallback, 8000);
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

      }
    }

    onMounted( async () => {
      timeoutHandle = setTimeout(pollingCallback, 8000);
    } );

    return {
      inputContent,
      send,
      sessionInfo
    };
  }
});
</script>

<style>
.question-frame {
  margin-top: 20%;
  text-align: center;
  font-size: 30px;
}
.question-input {
  margin-left: 5%;
  width: 90%;
  min-height: 40%;
}
.send-btn {
  margin-top: 20%;
  margin-left: 40%;
  width: 20%;
}
</style>