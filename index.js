// const fetch = require('node-fetch')
const endpoint = "https://api.wheretheiss.at/v1/satellites"

const createElem = (elem) => document.createElement(elem)
const appendNode =  (parent, node) => parent.appendChild(node)

const title = createElem('h1')
title.innerHTML = 'Where is the International Space Station?'
const titleSectionWrapper = document.getElementById('title-section-wrapper')
appendNode(titleSectionWrapper, title)
const longitudeText = createElem('h3')
appendNode(titleSectionWrapper, longitudeText)
const latitudeText = createElem('h3')
appendNode(titleSectionWrapper, latitudeText)

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
  
  map.setView([latitude, longitude], 3)
  const marker = L.marker([latitude, longitude], {icon: issIcon}).addTo(map)
  
  updateISSMarker(latitude, longitude, marker)
}

const updateISSMarker = (lat, long, marker) => {
  console.log(marker)
  if (marker) {
    map.removeLayer(marker)
    L.marker([lat, long], {icon: issIcon}).addTo(map)
  } 
}

const issIcon = L.icon({
  iconUrl: './assets/images/satellite-icon.svg',
  iconSize: [20, 20],
  iconAnchor: [25, 16]
})

const map = L.map('mapid').setView([0, 0], 0)
const marker = L.marker([0, 0], {icon: issIcon}).addTo(map)

const showMap = () => {
  const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

  const tiles = L.tileLayer(tileUrl, {attribution})
  tiles.addTo(map)
  // const marker = L.marker([0, 0], {icon: issIcon}).addTo(map)
}

showMap();

setInterval(() => {
  getISSData()
}, 2500)
