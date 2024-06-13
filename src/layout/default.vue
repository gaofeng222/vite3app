<template>
  <div class="common-layout">
    <el-container>
      <el-aside :width="isCollapse? '60px':'200px'">
        <el-menu
          active-text-color="#ffd04b"
          background-color="var(--el-color-primary-dark-2)"
          class="el-menu-vertical-demo"
          default-active="/"
          text-color="#fff"
          router
          :collapse="isCollapse"
        >
          <el-menu-item index="/">
            <el-icon>
              <document />
            </el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-sub-menu index="/comps">
            <template #title>
              <el-icon>
                <location />
              </el-icon>
              <span>组件新功能</span>
            </template>
            <el-menu-item index="/comps">
              <el-icon>
                <Setting />
              </el-icon>
              <span>按钮组件</span>
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="heador">
            <div class="left">
              <el-icon class="folder-icon" @click="handleCollapse">
                <Expand v-if="isCollapse" />
                <Fold v-else />
              </el-icon>
            </div>
            <div class="right">
              <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
            </div>
          </div>
        </el-header>
        <el-main>
          <div class="main-container">
            <router-view />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  Fold,
  Expand
} from "@element-plus/icons-vue";
const isCollapse = ref(false);
const handleCollapse = () => {
  isCollapse.value = !isCollapse.value;
};
</script>
<style lang="scss" scoped>
.common-layout {
  .el-container {
    height: 100vh;
    display: flex;
    .el-aside {
      background: var(--el-color-primary-dark-2);
      .el-menu {
        border-right: none;
        .el-menu-item.is-active {
          background: #1b3677;
        }
      }
    }
    .el-header {
      height: 56px;
      line-height: 56px;
      border-bottom: 1px solid #f1f1f1;
      box-shadow: 0px 2px 4px #f1f1f1;
      .heador {
        display: flex;
        align-items: center;
        .left {
          .folder-icon {
            cursor: pointer;
          }
        }
        .right {
          margin-left: auto;
          .el-avatar {
            vertical-align: middle;
          }
        }
      }
    }
    .main-container {
      overflow: auto;
    }
  }
}
</style>
