// const fetch = require('node-fetch')
const endpoint = "https://api.wheretheiss.at/v1/satellites"

const createElem = (elem) => document.createElement(elem)
const appendNode =  (parent, node) => parent.appendChild(node)

const getISS = async () => {
  const resp = await fetch(endpoint)
  const data = await resp.json()
  const spaceStationURL = endpoint + `/${data[0].id.toString()}` 
  return spaceStationURL
}

getISS()

const getISSLocation = async () => {
  const iss = await getISS()
  const resp = await fetch(iss)
  const data = await resp.json()
  const issLatitude = data.latitude
  const issLongitude = data.longitude
  console.log(issLongitude, issLatitude)
  return data
}

getISSLocation()

const issLongitude = async () => {
  const location = await getISSLocation()
  const longitude = location.longitude
  const longitudeText = createElem('h3')
  longitudeText.innerHTML = `${longitude}`
  appendNode(titleSectionWrapper, longitudeText)
}

const issLatitude = async () => {
  const location = await getISSLocation()
  const latitude = location.latitude
  const latitudeText = createElem('h3')
  latitudeText.innerHTML = `${latitude}`
  appendNode(titleSectionWrapper, latitudeText)
}

console.log(issLongitude(), issLatitude())

const title = createElem('h1')
title.innerHTML = 'Where is the International Space Station?'

const titleSectionWrapper = document.getElementById('title-section-wrapper')
appendNode(titleSectionWrapper, title)


const map = L.map('mapid').setView([0, 0], 1);
  // setView(lat, long, and zoom level)

const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileURL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileURL, {attribution})
tiles.addTo(map)

const marker = L.marker([0, 0]).addTo(map);


// From docs
let myIcon = L.icon({
  iconUrl: '',
  iconSize: [38, 95],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
  shadowUrl: '',
  shadowSize: [68, 95],
  shadowAnchor: [22, 94]
});

setInterval(function() {
  L.marker([50.505, 30.57], {icon: myIcon}).addTo(map);
}, 2000)