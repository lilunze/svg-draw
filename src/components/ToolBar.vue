<!--
 * @Author: lilunze
 * @LastEditors: lilunze
-->
<template>
  <div class="tool_bar">
    <div
      v-for="item in tools"
      :key="item"
      :class="[
        'tool_icon',
        item ? `icon_${item}` : '',
        active == item ? 'active' : '',
      ]"
      @click="chooseShape(item)"
    ></div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";

@Options({
  components: {},
  emits: {
    chooseTypeEmit(shape: string) {
      return shape;
    },
  },
})
export default class ToolBar extends Vue {
  public tools: Array<string> = [
    "pointer",
    "move",
    "rect",
    "circle",
    "ellipse",
    "text",
    "segment",
    "write",
    "polygon",
    "image",
    "qrcode",
    "barcode",
    "var",
  ];
  public active = "";

  chooseShape(type: string): void {
    this.active = type;
    this.$emit('chooseTypeEmit', this.active)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tool_bar {
  position: absolute;
  top: 20px;
  left: 20px;
  width: 40px;
  height: 460px;
  border-radius: 4px;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 1%), 1px 1px 5px rgb(0 0 0 / 15%);
}
.tool_icon {
  width: 30px;
  height: 30px;
  margin: 2px auto 0;
  cursor: pointer;
  background-size: 20px 20px;
  background-repeat: no-repeat;
  background-position: 5px 5px;
}
.tool_icon.active {
  background-color: #e6e9f0;
}
.icon_pointer {
  background-image: url("~@/assets/images/pointer.png");
}
.icon_move {
  background-image: url("~@/assets/images/move.png");
}
.icon_rect {
  background-image: url("~@/assets/images/rect.png");
}
.icon_circle {
  background-image: url("~@/assets/images/circle.png");
}
.icon_ellipse {
  background-image: url("~@/assets/images/ellipse.png");
}
.icon_text {
  background-image: url("~@/assets/images/text.png");
}
.icon_segment {
  background-image: url("~@/assets/images/segment.png");
}
.icon_write {
  background-image: url("~@/assets/images/write.png");
}
.icon_polygon {
  background-image: url("~@/assets/images/polygon.png");
}
.icon_image {
  background-image: url("~@/assets/images/image.png");
}
.icon_qrcode {
  background-image: url("~@/assets/images/qrcode.png");
}
.icon_barcode {
  background-image: url("~@/assets/images/barcode.png");
}
.icon_var {
  background-image: url("~@/assets/images/var.png");
}
</style>
