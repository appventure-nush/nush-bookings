<template>
  <div class="waste-card-container" @click="$emit('click')">
    <div class="image-container">
      <img :src="imageUrl" />
      <div class="icons">
        <i class="text_bullet_list_ltr s20 regular"></i>
        <i
          :class="isFav ? 'heart s20 filled' : 'heart s20 regular'"
          :style="{ color: isFav ? '#D72786' : 'white' }"
          @click.stop="$emit('favorite')"
        ></i>
      </div>
    </div>
    <div class="bottom">
      <span class="title">{{ title }}</span>
      <span class="description">{{ description }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imageUrl: String,
    title: String,
    description: String,
    isFav: Boolean,
  },
};
</script>

<style lang="scss">
.waste-card-container {
  position: relative;
  width: 200px;
  height: 212px;
  cursor: pointer;
  transition: transform 200ms;

  .image-container {
    position: relative;
    width: 200px;
    height: 140px;
    border-radius: 20px;
    box-shadow: 0 4px 20px rgba(#000, 0.1);
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .icons {
      z-index: 2;
      color: white;
      position: absolute;
      top: 16px;
      right: 16px;
      display: flex;
      gap: 10px;

      i {
        text-shadow: 0px 0px 10px rgba(#000, 0.4);
      }
    }
  }

  .bottom {
    position: absolute;
    width: 170px;
    top: 0;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: -1;
    padding: 156px 20px 16px 20px;
    box-shadow: 0 10px 30px rgba(#000, 0.06);

    background-color: white;
    border-radius: 20px;
    display: flex;
    flex-direction: column;

    .title {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 4px;
    }

    .description {
      color: rgba(#000, 0.4);
      font-size: 12px;
      font-weight: 700;
    }
  }

  &:hover {
    transform: translateY(-4px);
    .bottom {
      box-shadow: 0 14px 30px rgba(#000, 0.1);
    }
  }
}
</style>
