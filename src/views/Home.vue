<!--
 * @Author: lilunze
 * @LastEditors: lilunze
-->
<template>
  <div class="home">
    <div class="canvas">
      <tool-bar @chooseTypeEmit="setShape" />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ToolBar from "@/components/ToolBar.vue"; // @ is an alias to /src
import { Draw } from "@/utils/index"

@Options({
  components: {
    ToolBar,
  },
})

export default class Home extends Vue {
  draw: any = null
  public mounted() {
    this.draw = new Draw('.canvas')
  }

  public setShape(shape: string) {
    this.draw.setShape(shape)
  }
}
</script>
<style scoped>
  .home, .canvas{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
