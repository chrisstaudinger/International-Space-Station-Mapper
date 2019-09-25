const endpoint = "https://api.wheretheiss.at/v1/satellites"

const createElem = (elem) => document.createElement(elem)
const appendNode =  (parent, node) => parent.appendChild(node)

const latLongWrapper = document.querySelector('#lat-long-wrapper')

const latHeading = createElem('h3')
latHeading.innerHTML = 'Latitude: '
appendNode(latLongWrapper, latHeading)

const longHeading = createElem('h3')
appendNode(latLongWrapper, longHeading)
longHeading.innerHTML = 'Longitude: '

const latitudeText = createElem('span')
appendNode(latHeading, latitudeText)
const longitudeText = createElem('span')
appendNode(longHeading, longitudeText)

const getISS = async () => {
  const resp = await fetch(endpoint)
  const data = await resp.json()
  const spaceStationURL = endpoint + `/${data[0].id.toString()}` 
  return spaceStationURL
}

const getISSData = async () => {  
  const apiEndpoint = await getISS()
  const response = await fetch(apiEndpoint)
  const data = await response.json()
  const {latitude, longitude} =  data;
  
  console.log(latitude, longitude)
  
  longitudeText.innerHTML = `${longitude}`
  latitudeText.innerHTML = `${latitude}`
  
  map.setView([latitude, longitude], 4)
  const marker = L.marker([latitude, longitude], {icon: issIcon})
  
  updateISSMarker(latitude, longitude)
}

const updateISSMarker = (lat, long) => {
  console.log(markers)
  markers.clearLayers()
  let marker = L.marker([lat, long], {icon: issIcon})
  marker.addTo(markers)
}

const issIcon = L.icon({
  iconUrl: './assets/images/satellite-icon.svg',
  iconSize: [20, 20],
  iconAnchor: [25, 16]
})

const map = L.map('mapid').setView([0, 0], 0)
const markers = L.layerGroup()
markers.addTo(map);

const showMap = () => {
  const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

  const tiles = L.tileLayer(tileUrl, {attribution})
  tiles.addTo(map)
}

showMap();

setInterval(() => {
  getISSData()
}, 3000)
