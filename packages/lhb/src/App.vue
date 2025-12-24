<script setup>
import { onLaunch } from "@dcloudio/uni-app";
import dayjs from 'dayjs'
onLaunch(() => {
  console.log('App Launch', dayjs().format('YYYY-MM-DD HH:mm:ss'))
});
</script>

<style>
/*每个页面公共css */
</style>
