<template>
  <svg width="590" height="590" viewBox="0 0 590 590" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g opacity="0.5">
      <circle v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, transition: { repeat: Infinity, repeatType: 'mirror', }, }" :delay="600" :duration="1200" cx="295" cy="295"
        r="293.5" stroke="#E8382F" stroke-opacity="0.8" stroke-width="3" />
      <circle v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, transition: { repeat: Infinity, repeatType: 'mirror', }, }" :delay="400" :duration="1200" cx="295" cy="295"
        r="259.151" stroke="black" stroke-opacity="0.25" stroke-width="3" />
      <circle v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, transition: { repeat: Infinity, repeatType: 'mirror', }, }" :delay="200" :duration="1200" cx="295" cy="295"
        r="224.801" stroke="#E8382F" stroke-opacity="0.8" stroke-width="3" />
      <circle v-motion :initial="{ opacity: 0 }" :enter="{ opacity: 1, transition: { repeat: Infinity, repeatType: 'mirror', }, }" :delay="0" :duration="1200" cx="295" cy="295"
        r="190.452" stroke="black" stroke-opacity="0.25" stroke-width="3" />
    </g>
  </svg>
</template>