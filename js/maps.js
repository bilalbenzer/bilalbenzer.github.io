/*BELİRLİ BİR SAYIDA FOR DÖNGÜSÜ OLUŞTURMAK İÇİN FONKSİYON
KULLANIM ÖRNEĞİ; for (var i in range(0,15)  */
function range(start, end) {
  return Array.from({ length: end - start + 1 }, (_, i) => i)
};
/* PROJEKSİYON SİSTEMİ TANIMLARKEN KULLANILACAK OLAN ÇÖZÜNÜRLÜK VE ORİJİN DEĞERLERİ */
const origin = [38066.8071289063 ,3842467.31384277];
const resolutions = [(origin[1]-origin[0])/256];
var i;

for (i in range(1,17)){
    var cozunurluk = resolutions[i]/2;
    resolutions.push(cozunurluk);
};

/* KOORDİNAT DEĞİŞİMLERİNDE GEÇERLİ KOORDİNATIN BİLDİRİLDİĞİ DEĞİŞKEN*/
var gecerli_koordinat = "EPSG:3857"
/*KOORDİNAT SİSTEMLERİ VE PARAMETRELERİ*/
const koordinat_donusum_parametre = {
  "EPSG:2319":"+proj=tmerc +lat_0=0 +lon_0=27 +k=1 +x_0=500000 +y_0=0 +ellps=intl +towgs84=-87,-98,-121,0,0,0,0 +units=m +no_defs", 
  "EPSG:2320":"+proj=tmerc +lat_0=0 +lon_0=30 +k=1 +x_0=500000 +y_0=0 +ellps=intl +towgs84=-87,-98,-121,0,0,0,0 +units=m +no_defs ", 
  "EPSG:2321":"+proj=tmerc +lat_0=0 +lon_0=30 +k=1 +x_0=500000 +y_0=0 +ellps=intl +towgs84=-87,-98,-121,0,0,0,0 +units=m +no_defs ", 
  "EPSG:2322":"+proj=tmerc +lat_0=0 +lon_0=36 +k=1 +x_0=500000 +y_0=0 +ellps=intl +towgs84=-87,-98,-121,0,0,0,0 +units=m +no_defs ", 
  "EPSG:2323":"+proj=tmerc +lat_0=0 +lon_0=39 +k=1 +x_0=500000 +y_0=0 +ellps=intl +towgs84=-87,-98,-121,0,0,0,0 +units=m +no_defs", 
  "EPSG:2324":"+proj=tmerc +lat_0=0 +lon_0=42 +k=1 +x_0=500000 +y_0=0 +ellps=intl +towgs84=-87,-98,-121,0,0,0,0 +units=m +no_defs", 
  "EPSG:2325":"+proj=tmerc +lat_0=0 +lon_0=45 +k=1 +x_0=500000 +y_0=0 +ellps=intl +towgs84=-87,-98,-121,0,0,0,0 +units=m +no_defs", 
  "SR-ORG:7931":"+proj=tmerc +lat_0=0 +lon_0=27 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs", 
  "SR-ORG:7932":"+proj=tmerc +lat_0=0 +lon_0=30 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs", 
  "SR-ORG:7933":"+proj=tmerc +lat_0=0 +lon_0=33 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs", 
  "SR-ORG:7934":"+proj=tmerc +lat_0=0 +lon_0=36 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs", 
  "SR-ORG:7935":"+proj=tmerc +lat_0=0 +lon_0=39 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs", 
  "SR-ORG:7936":"+proj=tmerc +lat_0=0 +lon_0=42 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs", 
  "SR-ORG:7937":"+proj=tmerc +lat_0=0 +lon_0=45 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs", 
}
/*KOORDİNAT SİSTEMLERİ DEĞİŞKELERİ*/

const koordinat_sistemleri_isimleri = {
  "EPSG:3857":"EPSG:3857 WGS 84 / Pseudo-Mercator",
  "EPSG:2319":"EPSG:2319 ED50/TM27",
  "EPSG:2320":"EPSG:2320 ED50/TM30",
  "EPSG:2321":"EPSG:2321 ED50/TM33",
  "EPSG:2322":"EPSG:2322 ED50/TM36",
  "EPSG:2323":"EPSG:2323 ED50/TM39",
  "EPSG:2324":"EPSG:2324 ED50/TM42",
  "EPSG:2325":"EPSG:2325 ED50/TM45",
  "SR-ORG:7931":"SR-ORG:7931 ITRF96/TM27",
  "SR-ORG:7932":"SR-ORG:7932 ITRF96/TM30",
  "SR-ORG:7933":"SR-ORG:7933 ITRF96/TM33",
  "SR-ORG:7934":"SR-ORG:7934 ITRF96/TM36",
  "SR-ORG:7935":"SR-ORG:7935 ITRF96/TM39",
  "SR-ORG:7936":"SR-ORG:7936 ITRF96/TM42",
  "SR-ORG:7937":"SR-ORG:7937 ITRF96/TM45",
}

/* MAP TANIMLANIRKEN KULLANILACAK OLAN KOORDİNAT SİSTEMİ PARAMETRELERİ */
const koordinat_sistemleri = {
  "EPSG:3857":L.CRS.EPSG3857,
  "EPSG:2319":new L.Proj.CRS (
            "EPSG:2319",
            "+proj=tmerc +lat_0=0 +lon_0=27 +k=1 +x_0=500000 +y_0=0 +ellps=intl +towgs84=-87,-98,-121,0,0,0,0 +units=m +no_defs", 
            {resolutions: resolutions,
                origin:[38066.8071289063,3842467.31384277],
                }),
  "EPSG:2320":new L.Proj.CRS (
            "EPSG:2320",
            "+proj=tmerc +lat_0=0 +lon_0=30 +k=1 +x_0=500000 +y_0=0 +ellps=intl +towgs84=-87,-98,-121,0,0,0,0 +units=m +no_defs ", 
            {resolutions: resolutions,
                origin:[38066.8071289063,3842467.31384277],
                }),
  "EPSG:2321":new L.Proj.CRS (
            "EPSG:2321",
            "+proj=tmerc +lat_0=0 +lon_0=30 +k=1 +x_0=500000 +y_0=0 +ellps=intl +towgs84=-87,-98,-121,0,0,0,0 +units=m +no_defs ", 
            {resolutions: resolutions,
                origin:[38066.8071289063,3842467.31384277],
                }),
  "EPSG:2322":new L.Proj.CRS (
            "EPSG:2322",
            "+proj=tmerc +lat_0=0 +lon_0=36 +k=1 +x_0=500000 +y_0=0 +ellps=intl +towgs84=-87,-98,-121,0,0,0,0 +units=m +no_defs ", 
            {resolutions: resolutions,
                origin:[38066.8071289063,3842467.31384277],
                }),   
   "EPSG:2323":new L.Proj.CRS (
            "EPSG:2323",
            "+proj=tmerc +lat_0=0 +lon_0=39 +k=1 +x_0=500000 +y_0=0 +ellps=intl +towgs84=-87,-98,-121,0,0,0,0 +units=m +no_defs", 
            {resolutions: resolutions,
                origin:[38066.8071289063,3842467.31384277],
                }),   
   "EPSG:2324":new L.Proj.CRS (
            "EPSG:2324",
            "+proj=tmerc +lat_0=0 +lon_0=42 +k=1 +x_0=500000 +y_0=0 +ellps=intl +towgs84=-87,-98,-121,0,0,0,0 +units=m +no_defs", 
            {resolutions: resolutions,
                origin:[38066.8071289063,3842467.31384277],
                }),       
   "EPSG:2325":new L.Proj.CRS (
            "EPSG:2325",
            "+proj=tmerc +lat_0=0 +lon_0=45 +k=1 +x_0=500000 +y_0=0 +ellps=intl +towgs84=-87,-98,-121,0,0,0,0 +units=m +no_defs", 
            {resolutions: resolutions,
                origin:[38066.8071289063,3842467.31384277],
                }),
    "SR-ORG:7931":new L.Proj.CRS (
            "SR-ORG:7931",
            "+proj=tmerc +lat_0=0 +lon_0=27 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs", 
            {resolutions: resolutions,
            origin:[38066.8071289063,3842467.31384277],
            }),     
    "SR-ORG:7932":new L.Proj.CRS (
            "SR-ORG:7932",
            "+proj=tmerc +lat_0=0 +lon_0=30 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs", 
            {resolutions: resolutions,
            origin:[38066.8071289063,3842467.31384277],
            }),   
    "SR-ORG:7933":new L.Proj.CRS (
            "SR-ORG:7933",
            "+proj=tmerc +lat_0=0 +lon_0=33 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs", 
            {resolutions: resolutions,
            origin:[38066.8071289063,3842467.31384277],
            }),   
    "SR-ORG:7934":new L.Proj.CRS (
            "SR-ORG:7934",
            "+proj=tmerc +lat_0=0 +lon_0=36 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs", 
            {resolutions: resolutions,
            origin:[38066.8071289063,3842467.31384277],
            }),   
    "SR-ORG:7935":new L.Proj.CRS (
            "SR-ORG:7935",
            "+proj=tmerc +lat_0=0 +lon_0=39 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs", 
            {resolutions: resolutions,
            origin:[38066.8071289063,3842467.31384277],
            }),   
    "SR-ORG:7936":new L.Proj.CRS (
            "SR-ORG:7936",
            "+proj=tmerc +lat_0=0 +lon_0=42 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs", 
            {resolutions: resolutions,
            origin:[38066.8071289063,3842467.31384277],
            }),   
    "SR-ORG:7937":new L.Proj.CRS (
            "SR-ORG:7937",
            "+proj=tmerc +lat_0=0 +lon_0=45 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs", 
            {resolutions: resolutions,
            origin:[38066.8071289063,3842467.31384277],
            }),               
}

/* KOORDİNAT DEĞİŞTİRME FONKSİYONU. BU FONKSİYON KULLANILDIĞINDA EĞER GEÇERLİ KOORDİNAT 3857 YANİ WGS84 İSE BU BAZ ALINARAK HARİTA OLUŞTURULUR VE EKRANDAKİ
TÜM OBJELER BUNA GÖRE YENİLENİR
EĞER FARKLI BİR KOODİNAT GELMİŞ İSE GEÇERLİ OLAN TİLELAYER VARSA EĞER KALDIRILIR (HENÜZ WGS84 DIŞINDAKİ KOORDİNATLARDA TİLELAYER DESTEKLENMEMEKTE)
OBJELER HARİTADAN KALDIRILIR VE TEKRAR EKLENİR YANİ YENİLENİR */
function koordinat_degistirme(i){
  var i = i
  for (a in koordinat_sistemleri){
    if (i===a && i==="EPSG:3857"){
      gecerli_koordinat=i
      document.getElementById("crssummary").innerText=koordinat_sistemleri_isimleri[i]
      document.getElementById('coordinat_tab').innerText=""
      map_create(i)
      show_coordints()
      document.getElementById("crsdetails").open=false
      for (j in range(1,map_layers_id_nolari.length)){
        var obje = map_layers_id_nolari[j]
        obje.objeyiyenile(obje)
      }
    }
    else if(i===a && i!=="EPSG:3857"){
      try{
        maps_for_leaflet[gecerli_tilelayer].remove(map)
        gecerli_tilelayer=""
      }
      catch{
      }
      gecerli_koordinat=i
      document.getElementById("crssummary").innerText=koordinat_sistemleri_isimleri[i]
      document.getElementById('coordinat_tab').innerText=""
      map_create(i)
      show_coordints()
      document.getElementById("crsdetails").open=false
      for (j in range(1,map_layers_id_nolari.length)){
        var obje = map_layers_id_nolari[j]
        obje.objeyiyenile(obje)
      }
      haritayi_yenile(gecerli_tilelayer)
    }
  }
}

/* harita ekranının oluşturulması */
// HARİTA AYARLARI
var mapoptions = {  
  center: [38.9637,35.2433],
  zoom: 7,
  zoomControl: false,
  drawControl: true,
  zoomAnimation:false}
  //HARİTANIN OLUŞTURULMASI
var map =L.map('map_screen',
  mapoptions
)
//HARİTANIN OLUŞTURULMASI İÇİN FONKSİYON
/* TANIMLI OLAN KOORDİNAT SİSTEMİNE GÖRE VEYA KOORDİNAT SİSTEMİ DEĞİŞTİRİLDİĞİNDE GEREKLİ PARAMETRELERİ İF DÖNGÜSÜ İLE ALARAK HARİTA OLUŞTURULUR */
function map_create(i){
  var i = i
  for (a in koordinat_sistemleri){
    if (i===a){
      if (i==="EPSG:3857"){
        map.clearAllEventListeners() 
        map.off()
        map.remove()
        mapoptions.crs=L.CRS.EPSG3857
        map = new L.map("map_screen",
        mapoptions)
      }
      else{
        map.clearAllEventListeners() 
        map.off()
        map.remove()
        mapoptions.crs=koordinat_sistemleri[i]
        map = new L.map("map_screen",
        mapoptions)
      }
    }
  }
}


/* // harita çeşitleri

//harita çeşitlerinin nesnede belirtilmesi ( fonksiyonlar için) */
  const maps_for_leaflet = {
    "OpenStreetMap":L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        }),
    "GoogleStreetsMap":L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
                        maxZoom: 20,
                        subdomains:['mt0','mt1','mt2','mt3']
                    }),
    "GoogleSatelliteMap":L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
                        maxZoom: 20,
                        subdomains:['mt0','mt1','mt2','mt3']
                      }),
    "Mapbox Satellite":L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                        maxZoom: 18,
                        id: 'mapbox/satellite-v9',
                        tileSize: 512,
                        zoomOffset: -1,
                        accessToken: 'pk.eyJ1IjoiYmlsYWxiZW56ZXIiLCJhIjoiY2wxM3QwanJwMDk0ZTNwbHFrdXNsc215aiJ9.cpvdEZ1Dv8cmWASBnyvnag'
                    }),
    "Mapbox Streets":L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                        maxZoom: 18,
                        id: 'mapbox/streets-v11',
                        tileSize: 512,
                        zoomOffset: -1,
                        accessToken: 'pk.eyJ1IjoiYmlsYWxiZW56ZXIiLCJhIjoiY2wxM3QwanJwMDk0ZTNwbHFrdXNsc215aiJ9.cpvdEZ1Dv8cmWASBnyvnag'
                    }),
    "CartoDbDarkMatter":L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
                        subdomains: 'abcd',
                            maxZoom: 19
                        }),
    "WatStamenercolor":L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
                        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                        subdomains: 'abcd',
                        minZoom: 1,
                        maxZoom: 16,
                        ext: 'jpg'
                        }),
    "Open Topo Map":L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
                        maxZoom: 20,
                        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
                    }),
    "herev3": L.tileLayer.provider('HEREv3.terrainDay', {
                        apiKey: 'pwF1Xj9Xob7B_oRW2xgQVJ65gC21q0hfaLpbBRWWMnc'
                    }),
    "jawg map":L.tileLayer.provider('Jawg.Streets', {
                        variant: '',
                        accessToken: 'wpnsRT419zEQ9XTokJabanKEDLmSbNI6J3b4suZiYVwQgOQgDUvbj9v7WTMer2aT'
                    })}
/* TİLELAYER EKLEME */
  var gecerli_tilelayer = ""
  var i 
/* WGS84 KOORDİNAT SİSTEMİNDE TİLELAYER EKLEMESİ YAPILABİLİR. DİĞER KOORDİNAT SİSTEMLERİNDE BU ÖZELLİK MEVCUT DEĞİL */
  function add_tilelayer(x){
    if (gecerli_koordinat==="EPSG:3857"){
      maps_for_leaflet[x].addTo(map)
      gecerli_tilelayer=x
        for (i in maps_for_leaflet){
            if (i!==x){
              maps_for_leaflet[i].remove(map)
            }
          }
  }
  else{
    alert("WGS84 Dışındaki Projeksiyonlarda Harita Desteği Henüz Mevcut Değildir.")
  }
  }
/* EKRANDAN GEÇERLİ TİLE LAYERIN KALDIRILMASI FONKSİYONU */
function remove_tile_layer(x){
  console.log(x)
  maps_for_leaflet[x].remove(map)
  gecerli_tilelayer=""
}
/* OBJELERDEKİ DEĞİŞİKLİKLER İÇİN EKRANDAKİ TİLELAYER YENİLENİR */
function tilelayer_yenile(x){
  var x = x
  if (x===""){}
  else{
  remove_tile_layer(x)
  add_tilelayer(x)}
}
  // Haritanın Sol Alt Köşesinde Koordinat Gösterme
function show_coordints() { 
  if (gecerli_koordinat==="EPSG:3857"){
      map.flyTo([38.9637,35.2433],7)  //koordinat sistemi değiştirilirse otomatik olarak Türkiye görünüme harita yenlienir
      map.stop()
      map.clearAllEventListeners()
      map.on('mousemove' , (e) =>{
        document.getElementById('coordinat_tab').innerText ="Enlem:"+(e.latlng.lat).toFixed(8) +"------"+ "Boylam:"+(e.latlng.lng).toFixed(8);
        })
        document.getElementById("crssummary").innerText="EPSG:3857 WGS 84 / Pseudo-Mercator"}
  else{
    for (m in koordinat_sistemleri){
      if (gecerli_koordinat===m){
          map.flyTo([38.9637,35.2433],4)  //koordinat sistemi değiştirilirse otomatik olarak Türkiye görünüme harita yenlienir
          map.stop()
          map.clearAllEventListeners()   
          map.on('mousemove' , (e) =>{
            var latlng = e.latlng;
            var bngcoords = proj4(koordinat_donusum_parametre[gecerli_koordinat], [ latlng.lng,latlng.lat]);
            document.getElementById('coordinat_tab').innerText ="Enlem:"+(e.latlng.lat).toFixed(8) +"------"+ "Boylam:"+(e.latlng.lng).toFixed(8)+"\n"
            + "X:"+bngcoords[0]+"------"+"Y:"+bngcoords[1];
           });
      }
    }
  }
}
/* TİLELAYER DEĞİŞİMİNDE VEYA KOORDİNAT SİSTEMİ DEĞİŞİMİNDE VEYA MERKEZİ AYARLANMIŞ HARİTA GÖRÜNÜMÜNE GEÇMEK İÇİN KULLANILAN HARİTA YENİLEME FONKSİYONU */
async function haritayi_yenile(gecerli_tilelayer){
  var x = gecerli_tilelayer
  console.log(gecerli_tilelayer)

  if (x===""){}
  else{
  remove_tile_layer(x)
  add_tilelayer(x)
}
  if (gecerli_koordinat==="EPSG:3857"){
    map.flyTo([38.9637,35.2433],7)
  }
  else{
    console.log(x,gecerli_koordinat)
    map.flyTo([38.9637,35.2433],4,{
      animate:false
    })
  }

}
const map_layers = []
const map_layers_tum= []
const map_layers_id_nolari = []

var x_noktasi
var y_noktasi





