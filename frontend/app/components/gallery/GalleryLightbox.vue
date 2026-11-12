<script setup lang="ts">
import type { GalleryPhoto } from '~/types/gallery'
import { ChevronLeft, ChevronRight, X } from '@lucide/vue'
import { useSwipe } from '@vueuse/core'
import { DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogRoot, DialogTitle } from 'reka-ui'

/** Visionneuse plein écran : flèches du clavier, boutons et balayage tactile. */
const props = defineProps<{
  photos: GalleryPhoto[]
  albumTitle: string
}>()

/** Photo affichée ; `null` ferme la visionneuse. */
const index = defineModel<number | null>('index', { required: true })

const open = computed({
  get: () => index.value !== null,
  set: (value) => {
    if (!value) {
      index.value = null
    }
  },
})

const current = computed(() => (index.value === null ? undefined : props.photos[index.value]))
const hasSeveral = computed(() => props.photos.length > 1)

function step(delta: number) {
  if (index.value === null || !hasSeveral.value) {
    return
  }
  const count = props.photos.length
  index.value = (index.value + delta + count) % count
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowRight') {
    event.preventDefault()
    step(1)
  }
  else if (event.key === 'ArrowLeft') {
    event.preventDefault()
    step(-1)
  }
}

const stage = useTemplateRef<HTMLElement>('stage')
useSwipe(stage, {
  threshold: 40,
  onSwipeEnd(_event, direction) {
    if (direction === 'left') {
      step(1)
    }
    else if (direction === 'right') {
      step(-1)
    }
  },
})

const controlClass = 'text-white hover:bg-white/15 hover:text-white focus-visible:ring-white/60'
</script>

<template>
  <DialogRoot v-model:open="open">
    <DialogPortal>
      <DialogOverlay class="fixed inset-0 z-60 bg-black/90 duration-200 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
      <DialogContent
        class="fixed inset-0 z-60 flex flex-col bg-black text-white outline-none duration-200 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0"
        @keydown="onKeydown"
      >
        <div class="flex h-16 shrink-0 items-center justify-between gap-4 px-4">
          <DialogTitle class="m-0 truncate text-sm font-medium text-white/90">
            {{ albumTitle }}
            <span
              v-if="index !== null"
              class="ml-2 text-white/60 tabular-nums"
            >{{ index + 1 }} / {{ photos.length }}</span>
          </DialogTitle>
          <DialogClose as-child>
            <Button
              variant="ghost"
              size="icon"
              :class="controlClass"
              aria-label="Fermer la visionneuse"
            >
              <X
                class="size-5"
                aria-hidden="true"
              />
            </Button>
          </DialogClose>
        </div>

        <figure
          ref="stage"
          class="relative m-0 flex min-h-0 flex-1 flex-col items-center gap-3 px-4 pb-[calc(1.5rem+env(safe-area-inset-bottom))] sm:px-20"
        >
          <img
            v-if="current"
            :key="current.key"
            :src="gallerySrc(current, 1600)"
            :srcset="gallerySrcset(current)"
            sizes="100vw"
            :alt="current.image.alt"
            :width="current.image.width"
            :height="current.image.height"
            class="min-h-0 w-full flex-1 touch-pan-y object-contain select-none"
            draggable="false"
          >
          <DialogDescription
            as="figcaption"
            class="max-w-2xl text-center text-sm leading-relaxed text-white/80"
          >
            {{ current?.image.alt }}
          </DialogDescription>

          <template v-if="hasSeveral">
            <Button
              variant="ghost"
              size="icon"
              :class="[controlClass, 'absolute top-1/2 left-2 -translate-y-1/2 bg-black/40 sm:bg-transparent']"
              aria-label="Photo précédente"
              @click="step(-1)"
            >
              <ChevronLeft
                class="size-6"
                aria-hidden="true"
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              :class="[controlClass, 'absolute top-1/2 right-2 -translate-y-1/2 bg-black/40 sm:bg-transparent']"
              aria-label="Photo suivante"
              @click="step(1)"
            >
              <ChevronRight
                class="size-6"
                aria-hidden="true"
              />
            </Button>
          </template>
        </figure>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
