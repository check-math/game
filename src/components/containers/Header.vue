<script setup lang="ts">
import { useLayout } from '@/composables/useLayout'
import { onMounted } from 'vue'

const { isDarkTheme, toggleDarkMode, executeDarkModeAuto } = useLayout()

onMounted(() => {
  if (isDarkTheme.value) {
    executeDarkModeAuto()
  }
})

</script>
<template>
  <div
    class="z-100 bg-background/75 backdrop-blur border-gray-200 dark:border-gray-800 -mb-px sticky top-0 z-50 lg:mb-0 lg:border-0 p-2 flex justify-between"
  >
    <Button as="router-link" variant="text" to="/" size="small" class="font-bold pt-2"
      >CHECK.MATH</Button
    >
    <div>
      <ul class="flex items-center space-x-4">
        <li>
          <Button rounded outlined size="small">v0.0.1</Button>
        </li>
        <li>
          <Button
            rounded
            outlined
            size="small"
            as="a"
            href="https://github.com/heydayle"
            target="_blank"
          >
            Github <i class="pi pi-arrow-up-right !text-xs" />
          </Button>
        </li>
        <li>
          <ToggleSwitch class="inline-block mt-1" v-model="isDarkTheme" @change="toggleDarkMode()">
            <template #handle="{ checked }">
              <i :class="['!text-xs pi', { 'pi-moon': checked, 'pi-sun': !checked }]" />
            </template>
          </ToggleSwitch>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped></style>
