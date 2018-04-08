<template>
	<map class="map" :longitude="longitude" :latitude="latitude" :scale = "28" :markers = "markers"></map>
</template>

<script>
export default {
  mounted () {
    this.longitude = parseFloat(this.$store.state.longitude)
    this.latitude = parseFloat(this.$store.state.latitude)
    this.markers = [{
      iconPath: '../../static/location.png',
      longitude: this.longitude,
      latitude: this.latitude,
      width: 45,
      height: 45
    }]
  },
  data () {
    return {
      longitude: 0,
      latitude: 0,
      markers: []
    }
  }
}
</script>

<style scoped>
.map {
	width: 100vw;
	height: 100vh;
}
</style>