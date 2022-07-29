var gecici_mousemove_durumu =""

function create_line(katman_name){
    var sayfamesajlari=document.getElementById('sayfamesajlari')
    document.getElementById("oznitelikpenceresi").innerHTML="";
    var name = katman_name
    document.getElementById('sayfamesajlari').style.backgroundColor  = "black";    
    if ((typeof window[name])!=="object"){
        document.getElementById('sayfamesajlari').innerText="Çizgi Katmanı oluşturuldu\n"+name;//sayfa mesajlarında objenin oluştuğuna dair bilgi
        var noktalar = []
        var asd
        window[name] = new poly_line(class_name=name)
        window[name].menuleriolustur()
        if (noktalar.length===0){
            var stylee = {
                color: window[name].renk,
                weight: 10,
                opacity: .7,
                dashArray: '20,15',
                lineJoin: 'round'
            }
            var koordinatgir = document.createElement("button")
            koordinatgir.innerText="Koordinat Girerek Oluştur"
            koordinatgir.onclick=function koordinat_gir(){
              map.off("click")
              sayfamesajlari.innerHTML=""
              sayfamesajlari.innerText="Koordinat Girerek Çizime Başlayabilirsiniz."
              var bitirbuton = document.createElement("button")
              bitirbuton.innerText="Obje Çizimini Bitir"
              bitirbuton.onclick=async function(){
                  document.getElementById('obje_girdi').innerHTML=""
                  map.off("click")
                  
                  try{
                  map.removeLayer(asd)
                  var name2 = "point"+(new Date()).getMilliseconds()+Math.floor(Math.random()*1000);//benzersiz obje id alma
                  window[name].objeler_ve_ozellikleri(noktalar,name2)
                  window[name].haritayaekle(window[name].tum_ozellikler.objeler["'"+name2+"'"].bicim,name2)
                  sayfamesajlari.innerText=name2+"objesi oluşturuldu."
                  await sleep(500)
                }
                  catch{
                    alert("Çizim Yapmadınız. Tekrar Deneyiniz.")
                  }
                  return koordinat_gir()
              }
              sayfamesajlari.appendChild(document.createElement("br"))
              document.getElementById("sayfamesajlari").appendChild(bitirbuton)
              var kapatbuton = document.createElement("button")
              kapatbuton.innerText="İşlemi Bitir"
              kapatbuton.onclick=function(){
                map.off("click")
                try{
                  map.removeLayer(asd)
                }
                catch{}
                sayfamesajlari.innerHTML="İşlem Tamamlandı"

                bekleme()
                document.getElementById('obje_girdi').innerHTML=""
                return
              }
              sayfamesajlari.appendChild(kapatbuton)
  
              document.getElementById('obje_girdi').style.backgroundColor = "black";
              var e_label = document.createElement("label")
              e_label.innerText="Enlem Giriniz."
              e_label.setAttribute("for","e_gir")
              var e_gir = document.createElement("input")
              e_gir.setAttribute("type","number")
              e_gir.setAttribute("id","e_gir")
              e_gir.setAttribute("min","0")
              e_gir.required=true
              var b_label = document.createElement("label")
              b_label.innerText="Boylam Giriniz."
              b_label.setAttribute("for","b_gir")
              var b_gir = document.createElement("input")
              b_gir.setAttribute("type","number")
              b_gir.setAttribute("id","b_gir")
              b_gir.setAttribute("min","0")
              b_gir.required=true
              var degeral =document.createElement("input")
              degeral.setAttribute("type","submit")
              degeral.innerText="Uygula"
              degeral.onclick = function(){
                var xx = document.getElementById("e_gir").value
                var yy = document.getElementById("b_gir").value
                var nokta1= [parseFloat(yy),parseFloat(xx)]
                noktalar.push(nokta1)
                if (noktalar.length!==0){
                    map.on("mousemove",function onizleme(e){
                        try{
                            map.removeLayer(asd)
                        }
                        catch{
                        }
                        asd =""
                        x = (e.latlng.lat).toFixed(8)
                        y = (e.latlng.lng).toFixed(8)
                        var nokta2= [parseFloat(y),parseFloat(x)]
                        noktalar.push(nokta2)
                        
                        var line = [{
                            "type":"LineString",
                            "coordinates":noktalar
                        }]
                        asd = L.geoJSON(line,{
                            style:stylee
                        }).addTo(map)
                        noktalar.splice(noktalar.indexOf(nokta2),1)
                    })
                }
                document.getElementById('obje_girdi').innerHTML=""
                return koordinat_gir()
              }
              document.getElementById('obje_girdi').appendChild(e_label)
              document.getElementById('obje_girdi').appendChild(e_gir)
              document.getElementById('obje_girdi').appendChild(document.createElement("br"))
              document.getElementById('obje_girdi').appendChild(b_label)
              document.getElementById('obje_girdi').appendChild(b_gir)
              document.getElementById('obje_girdi').appendChild(document.createElement("br"))
              document.getElementById('obje_girdi').appendChild(degeral)
              map.off('click'); //haritadaki tıklama olayı kapatılacak
            }

            /* ------------------------------------------------------------------------------------ */
            var bitirbuton = document.createElement("button")
            bitirbuton.innerText="Obje Çizimini Bitir"
            bitirbuton.onclick=async function(){
                gecici_mousemove_durumu="kapalı"
                try{
                map.removeLayer(asd)
                var name2 = "point"+(new Date()).getMilliseconds()+Math.floor(Math.random()*1000);//benzersiz obje id alma
                window[name].objeler_ve_ozellikleri(noktalar,name2)
                window[name].haritayaekle(window[name].tum_ozellikler.objeler["'"+name2+"'"].bicim,name2)
                sayfamesajlari.innerText=name2+"objesi oluşturuldu."
                await sleep(500)
              }
                catch{
                  alert("Çizim Yapmadınız. Tekrar Deneyiniz.")
                }
                noktalar=[]
                return create_line(name)
            }
            sayfamesajlari.appendChild(document.createElement("br"))
            sayfamesajlari.appendChild(koordinatgir)
            sayfamesajlari.appendChild(document.createElement("br"))

            document.getElementById("sayfamesajlari").appendChild(bitirbuton)
            var kapatbuton = document.createElement("button")
            kapatbuton.innerText="İşlemi Bitir"
            kapatbuton.onclick=function(){
              map.off("click")
              gecici_mousemove_durumu="kapalı"
              try{
                map.removeLayer(asd)
              }
              catch{}
              sayfamesajlari.innerHTML="İşlem Tamamlandı"
              bekleme()
              return
            }
            sayfamesajlari.appendChild(kapatbuton)

            map.on("click",(e)=>{
              gecici_mousemove_durumu="açık"
                x = (e.latlng.lat).toFixed(8)
                y = (e.latlng.lng).toFixed(8)
                var nokta1= [parseFloat(y),parseFloat(x)]
                noktalar.push(nokta1)
                if (noktalar.length!==0){
                    gecici_mousemove= map.on("mousemove",function onizleme(e) {
                        if(gecici_mousemove_durumu==="açık"){
                        try{
                            map.removeLayer(asd)
                        }
                        catch{
                        }
                        asd =""
                        x = (e.latlng.lat).toFixed(8)
                        y = (e.latlng.lng).toFixed(8)
                        var nokta2= [parseFloat(y),parseFloat(x)]
                        noktalar.push(nokta2)
                        
                        var line = [{
                            "type":"LineString",
                            "coordinates":noktalar
                        }]
                        asd = L.geoJSON(line,{
                            style:stylee
                        }).addTo(map)
                        noktalar.splice(noktalar.indexOf(nokta1),1)
                    }
                  else if(gecici_mousemove_durumu==="kapalı"){
                    try{
                      map.removeLayer(asd)
                  }
                  catch{}
                    map.off("mousemove",onizleme)
                  }
                  })
                    
                }

            })
        }
    }
    else{
      sayfamesajlari.innerText="Çizime Devam Edebilirsiniz."

      var noktalar = []
      var asd
      if (noktalar.length===0){
        var stylee = {
            color: window[name].renk,
            weight: 10,
            opacity: .7,
            dashArray: '20,15',
            lineJoin: 'round'
        }
        var bitirbuton = document.createElement("button")
        bitirbuton.innerText="Obje Çizimini Bitir"
        bitirbuton.onclick=async function(){
          gecici_mousemove_durumu="kapalı"
            try{
            map.removeLayer(asd)
            var name2 = "point"+(new Date()).getMilliseconds()+Math.floor(Math.random()*1000);//benzersiz obje id alma
            window[name].objeler_ve_ozellikleri(noktalar,name2)
            window[name].haritayaekle(window[name].tum_ozellikler.objeler["'"+name2+"'"].bicim,name2)
            sayfamesajlari.innerText=name2+"objesi oluşturuldu."
            await sleep(500)
          }
          catch{
            alert("Çizim Yapmadınız. Tekrar Deneyiniz.")
          }
          noktalar=[]
            return create_line(name)
        }
        sayfamesajlari.appendChild(document.createElement("br"))
        document.getElementById("sayfamesajlari").appendChild(bitirbuton)
        var kapatbuton = document.createElement("button")
        kapatbuton.innerText="İşlemi Bitir"
        kapatbuton.onclick=function(){
          map.off("click")
          
          try{
            map.removeLayer(asd)
          }
          catch{}
          sayfamesajlari.innerHTML="İşlem Tamamlandı"
          bekleme()
          return
        }
        sayfamesajlari.appendChild(kapatbuton)
        map.on("click",(e)=>{
            x = (e.latlng.lat).toFixed(8)
            y = (e.latlng.lng).toFixed(8)
            var nokta1= [parseFloat(y),parseFloat(x)]
            noktalar.push(nokta1)
            if (noktalar.length!==0){
              gecici_mousemove= map.on("mousemove",function onizleme(e) {
                if(gecici_mousemove_durumu==="açık"){
                try{
                    map.removeLayer(asd)
                }
                catch{
                }
                asd =""
                x = (e.latlng.lat).toFixed(8)
                y = (e.latlng.lng).toFixed(8)
                var nokta2= [parseFloat(y),parseFloat(x)]
                noktalar.push(nokta2)
                
                var line = [{
                    "type":"LineString",
                    "coordinates":noktalar
                }]
                asd = L.geoJSON(line,{
                    style:stylee
                }).addTo(map)
                noktalar.splice(noktalar.indexOf(nokta1),1)
            }
          else if(gecici_mousemove_durumu==="kapalı"){
            try{
              map.removeLayer(asd)
          }
          catch{}
            map.off("mousemove",onizleme)
          }
          })
            }

        })
    }
    }
}
var sayfamesajlari = document.getElementById("sayfamesajlari")
var satiratla = document.createElement("br")
class poly_line{
    constructor (class_name){
        this.tum_ozellikler = { //çoklu çizgiye ilişkin tüm özellikler bu objede tutulacak
            "id_nosu":class_name, //class a ait isim bu dizede tutulacak
            "objeler":{ //oluşturulan objeler ve özellikleri bu dizede tutulacak
            },
            "objeler_ve_id_nolari":[],  //oluşan objelerin id noları bu listede tutulacak
            "featuregroup":L.featureGroup().addTo(map), //tüm objeler bir grupta olacak ve bu grup haritaya eklencek
            "kolon_ve_tipleri":{"featureid" : "text",
                                "Geometri Tipi" : "text"},
            "coordinats":[],  //yaklaşma işlevi için koordinatlar bu listede tutulacak
          }
            this.renk = renk_listesi[Math.floor(Math.random()*renk_listesi.length)]
    }
    objeler_ve_ozellikleri(coordinates,object_name){  //çoklu point oluşturma kısmında oluşturulacak pointe ilişkin parametreler bu metotta işlenecek ve class a eklenecek
        this.tum_ozellikler.objeler_ve_id_nolari.push(object_name.toString()) //obje id si ilgili yerine eklenecek
        this.tum_ozellikler.objeler["'"+object_name+"'"] ={geometrioznitelik:{  //eklenen objenin id nosu ile bir dize oluşturulacak ve tüm özellikleri eklenecek
          "type":"Feature",
          "properties": {
                          "featureid" : object_name,
                          "Geometri Tipi" : "Çizgi"
                          },
          "geometry":   {
                          "type":"LineString",
                          "coordinates":coordinates
                        }
        },
                                                          bicim:{
                                                            bicim:{
                                                                color: this.renk,
                                                                weight: 3,
                                                                opacity: .7,
                                                            },
                                                              gecerli_bicim:"çizgi"
                                                          },
                                                          feature:null
                                                          }
                                                          /* 
Option	Type	Default	Description
stroke	Boolean	true	Whether to draw stroke along the path. Set it to false to disable borders on polygons or circles.
color	String	'#03f'	Stroke color.
weight	Number	5	Stroke width in pixels.
opacity	Number	0.5	Stroke opacity.
fill	Boolean	depends	Whether to fill the path with color. Set it to false to disable filling on polygons or circles.
fillColor	String	same as color	Fill color.
fillOpacity	Number	0.2	Fill opacity.
fillRule	String	'evenodd'	A string that defines how the inside of a shape is determined.
dashArray	String	null	A string that defines the stroke dash pattern. Doesn't work on canvas-powered layers (e.g. Android 2).
lineCap	String	null	A string that defines shape to be used at the end of the stroke.
lineJoin	String	null	A string that defines shape to be used at the corners of the stroke.
clickable	Boolean	true	If false, the vector will not emit mouse events and will act as a part of the underlying map.
pointerEvents	String	null	Sets the pointer-events attribute on the path if SVG backend is used.
className	String	''	Custom class name set on an element. */
                                                            return
      }
      menuleriolustur(){ // katmana ilişkin menü kısmı ve elemanları oluştuurlacak
        this.details_katman =document.createElement("details");
        this.details_katman.setAttribute("id",this.tum_ozellikler.id_nosu);
        this.details_katman.setAttribute("name",this.tum_ozellikler.id_nosu);
        this.summary_katman = document.createElement("summary");
        this.summary_katman.setAttribute("id",this.tum_ozellikler.id_nosu+"_summary");
        document.getElementById("layers_vektor").appendChild(this.details_katman);
        document.getElementById(this.tum_ozellikler.id_nosu).innerHTML='<button class="haritadagosterme" type="menu" >Haritada Göster</button><button class="haritadagizleme" type="menu" >Haritada Gizle</button><button class="sil" type="menu">Katmanı Sil</button><button class="duzenle" type="menu">Katmanı Düzenle</button><button class="yaklasma" type="menu" >Yaklaş</button><button class="stildegistir" type="menu" >Stil Değiştir</button><button class="oznitelikbilgi" type="menu" >Öznitelikleri Görüntüle ve Düzenle</button>';
        document.getElementById(this.tum_ozellikler.id_nosu).appendChild(this.summary_katman);
        document.getElementById(this.tum_ozellikler.id_nosu+"_summary").innerText=this.tum_ozellikler.id_nosu;
        document.getElementById(this.tum_ozellikler.id_nosu+"_summary").style.listStyle="none";
        document.getElementById(this.tum_ozellikler.id_nosu+"_summary").style.fontSize="medium";
        document.getElementById(this.tum_ozellikler.id_nosu+"_summary").style.fontWeight="bolder";
        document.getElementById(this.tum_ozellikler.id_nosu+"_summary").style.color="black";
        document.getElementById(this.tum_ozellikler.id_nosu+"_summary").style.fontFamily="'Courier New', Courier, monospace";
        document.getElementById(this.tum_ozellikler.id_nosu+"_summary").style.cursor="pointer";
        document.getElementById(this.tum_ozellikler.id_nosu+"_summary").style.listStyle="none";
        document.getElementById(this.tum_ozellikler.id_nosu+"_summary").style.borderStyle="solid";
        document.getElementById(this.tum_ozellikler.id_nosu+"_summary").style.backgroundColor=this.renk;
        document.getElementById(this.tum_ozellikler.id_nosu+"_summary").style.borderColor="white";
        //butonlar ve kullanılacakları işlevler
        
        document.getElementById(this.tum_ozellikler.id_nosu).getElementsByTagName("button")[0].setAttribute('onclick',"window['"+this.tum_ozellikler.id_nosu+"'].objeyiyenile()");
        document.getElementById(this.tum_ozellikler.id_nosu).getElementsByTagName("button")[1].setAttribute('onclick',"window['"+this.tum_ozellikler.id_nosu+"'].haritadagizle()");
        document.getElementById(this.tum_ozellikler.id_nosu).getElementsByTagName("button")[2].setAttribute('onclick',"katman_sil('"+this.tum_ozellikler.id_nosu+"')");
        document.getElementById(this.tum_ozellikler.id_nosu).getElementsByTagName("button")[3].setAttribute('onclick',"window['"+this.tum_ozellikler.id_nosu+"'].katmanduzenle('"+this.tum_ozellikler.id_nosu+"')");
        document.getElementById(this.tum_ozellikler.id_nosu).getElementsByTagName("button")[4].setAttribute('onclick',"window['"+this.tum_ozellikler.id_nosu+"'].objeyeyaklas()");
        document.getElementById(this.tum_ozellikler.id_nosu).getElementsByTagName("button")[5].setAttribute('onclick',"window['"+this.tum_ozellikler.id_nosu+"'].stildegistirme()");
        document.getElementById(this.tum_ozellikler.id_nosu).getElementsByTagName("button")[6].setAttribute('onclick',"window['"+this.tum_ozellikler.id_nosu+"'].oznitelikgoruntulemeveduzenleme()");
        return
      }
      haritayaekle(object_bicim,object_id){
        this.tum_ozellikler.objeler["'"+object_id+"'"].feature = L.geoJSON(this.tum_ozellikler.objeler["'"+object_id+"'"].geometrioznitelik,{
            style:object_bicim.bicim
        })
        this.tum_ozellikler.objeler["'"+object_id+"'"]["feature"] = this.tum_ozellikler.objeler["'"+object_id+"'"].feature //oluşan layer, classtaki dizesine verilecek
        this.tum_ozellikler.objeler["'"+object_id+"'"].feature.addTo(this.tum_ozellikler.featuregroup) //oluşan layer, featuregroupa eklenerek haritaya eklenecek
        map_layers.push(this.tum_ozellikler.featuregroup.getLayerId(this.tum_ozellikler.objeler["'"+object_id+"'"].feature)) //obje id si map_layers listesine eklenecek
        this.tum_ozellikler.objeler["'"+object_id+"'"]["featureid"]=this.tum_ozellikler.featuregroup.getLayerId(this.tum_ozellikler.objeler["'"+object_id+"'"].feature)
        if (map_layers_id_nolari.includes(window[this.tum_ozellikler.id_nosu])===false){  //class ın tüm özellikleri map_layers_id_nolari na iletilecek
        map_layers_id_nolari.push(window[this.tum_ozellikler.id_nosu])
        }
    for (var c in this.tum_ozellikler.objeler["'"+object_id+"'"].geometrioznitelik.geometry.coordinates){
        this.tum_ozellikler.coordinats.push([this.tum_ozellikler.objeler["'"+object_id+"'"].geometrioznitelik.geometry.coordinates[c][1],this.tum_ozellikler.objeler["'"+object_id+"'"].geometrioznitelik.geometry.coordinates[c][0]])
    }
    return
}
    objeyiyenile(){ //bazı durumlarda objelerde değişiklik yaplabilmesi için obje haritadan kaldırılıp tekrar eklenecek
    
        window[this.tum_ozellikler.id_nosu].haritadagizle() //obje haritadan gizlenecek (kaldırılacak)-obje id leri map_layersdan kaldırılacak-class objesi map_layers_id den kaldırılacak
        this.tum_ozellikler.featuregroup.addTo(map) //obje tekrar eklenecek
        var c = Object.keys(this.tum_ozellikler.featuregroup._layers) //layerların id nolari alınacak ve map_layers a tekrar eklenecek
        for (var x in c){
          map_layers.push(parseInt(c[x]))
        }
        if (map_layers_id_nolari.includes(window[this.tum_ozellikler.id_nosu])===false){  //class objesi tekrar map_layers_id_nolarina eklenecek
          map_layers_id_nolari.push(window[this.tum_ozellikler.id_nosu])
        }
        return
      }
      haritadagizle(){  //obje haritadan kaldırılacak
        map.removeLayer(this.tum_ozellikler.featuregroup) //obje haritadan kaldırılacak
        var c = Object.keys(this.tum_ozellikler.featuregroup._layers) //layerların id nolari alınacak
        for (var x in c){
          if (map_layers.includes(parseInt(c[x]))===true){
            var sd = parseInt(c[x])
            map_layers.splice(map_layers.indexOf(sd),1) //layer id leri map_layers dan kaldırılacak
          }
          if (map_layers_id_nolari.includes(window[this.tum_ozellikler.id_nosu])===true){
            map_layers_id_nolari.splice(map_layers_id_nolari.indexOf(window[this.tum_ozellikler.id_nosu]),1)  //class objesi map_layers_id_nolari ndan kaldırılacak
          }
        }
        return
      }
      haritadansil(){ //obje tamamen silinecek
        window[this.tum_ozellikler.id_nosu].haritadagizle()
        return
      }
      objeyeyaklas(){
        if(Object.keys(this.tum_ozellikler.objeler).length>0){
        var koordint_sayisi = this.tum_ozellikler.coordinats.length
        var coordinatlar = []
        for (var l in range(0,koordint_sayisi-1)){
          coordinatlar.push(L.latLng(this.tum_ozellikler.coordinats[l][0],this.tum_ozellikler.coordinats[l][1]))
        }
        var bounds = L.latLngBounds(coordinatlar)
        map.flyToBounds(bounds,9,{
            animate:true
          })
          window[this.tum_ozellikler.id_nosu].objeyiyenile()
          tilelayer_yenile(gecerli_tilelayer)
        }
        else{
          alert("Katmanda Obje Olmadığı İçin Yaklaşma İşlemi Yapamazsınız.")
        }
        return
      }
      katmanduzenle(x){
        var asdfg
        var gecici_cizgi
        sayfamesajlari.innerHTML=""
        sayfamesajlari.style.backgroundColor="black"
        var islem1 = document.createElement("button")
        islem1.innerText="Düzenle"
        islem1.onclick = function objesecmek(){
          var secilen_obje = {obje:null}
          sayfamesajlari.innerHTML=""
          sayfamesajlari.innerText="Düzenlemek İstediğiniz Objeye Tıklayınız."

          window[x].tum_ozellikler.featuregroup.on('click',function objesecmeclick(e){

            window[x].tum_ozellikler.featuregroup.removeLayer(window[x].tum_ozellikler.objeler["'"+e.layer.feature.properties.featureid+"'"].feature)

            gecici_cizgi = L.geoJSON(window[x].tum_ozellikler.objeler["'"+e.layer.feature.properties.featureid+"'"].geometrioznitelik,{
              style:{fillColor:"#56ffff"}
            }).addTo(map)
            secilen_obje.obje = (e.layer.feature.properties.featureid).toString()
            var kose_noktalari = L.featureGroup().addTo(map)
            var ara_noktalar =L.featureGroup().addTo(map)
            var ara_noktalistesi = []
                window[x].tum_ozellikler.featuregroup.off('click')
                for (var o in window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates){
                  var o =parseFloat(o)
                  var koordinat = window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates[o]
                  var gecici_ogee = L.geoJSON({type:"Feature","geometry":{"type":"Point","coordinates":koordinat}},
                  {pointToLayer:function(feature,latlng){
                    return L.circleMarker(latlng,{radius:4,fillColor:"#56ffff",weight:1,fillOpacity:1})
                  }}).addTo(kose_noktalari)
                  
                if (0<= o &&  o < window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates.length-1){
                  ara_noktalistesi.push({
                                    koordinatlar:[(window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates[parseFloat(o)+1][0] + window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates[o][0])/2,(window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates[parseFloat(o)+1][1] + window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates[o][1])/2],
                                    bir_onceki_koordinat : window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates[o],
                                    bir_sonraki_koordinat : window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates[parseFloat(o)+1]} )
                  var gecici_oge = L.geoJSON({type:"Feature","geometry":{"type":"Point","coordinates":[(window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates[parseFloat(o)+1][0] + window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates[o][0])/2,(window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates[parseFloat(o)+1][1] + window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates[o][1])/2]}},
                  {pointToLayer:function(feature,latlng){
                    return L.circleMarker(latlng,{radius:4,fillColor:"#FF0000",weight:1,fillOpacity:1})
                  }}).addTo(ara_noktalar)

                }
                }
            sayfamesajlari.innerHTML=""
            var kose_sil = document.createElement("button")
            kose_sil.innerText="Köşe Sil"

            kose_sil.onclick=function(){

              window[x].tum_ozellikler.featuregroup.off('click')
              kose_noktalari.on("click",function(asd){
                map.removeLayer(gecici_cizgi)
                var secilen_kose = asd.layer.feature.geometry.coordinates
                window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates.splice(window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates.indexOf(secilen_kose),1)
                console.log(window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"])
                window[x].tum_ozellikler.featuregroup.removeLayer(window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"]["feature"])

                window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].feature = L.geoJSON(window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik,{
                  style:window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].bicim.bicim
              })
                
                
              window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"]["feature"] = window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].feature //oluşan layer, classtaki dizesine verilecek
              window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].feature.addTo(window[x].tum_ozellikler.featuregroup) //oluşan layer, featuregroupa eklenerek haritaya eklenecek
              kose_noktalari.off("click")
              map.removeLayer(kose_noktalari)
              map.removeLayer(ara_noktalar)
              return objesecmek()  
            })
            }
            var nokta_ekle = document.createElement("button")
            nokta_ekle.innerText="Ara Noktayı Kaydır"
            nokta_ekle.onclick=function(){
              ara_noktalar.on("click",function(asd){
                map.removeLayer(gecici_cizgi)
                var secilen_kose = asd.layer.feature.geometry.coordinates
                for (var p in ara_noktalistesi){
                  var gecici_ara_nokta
                  if (ara_noktalistesi[p].koordinatlar[0]===secilen_kose[0]&&ara_noktalistesi[p].koordinatlar[1]===secilen_kose[1]){
                    var indexxx= window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates.indexOf(ara_noktalistesi[p].bir_onceki_koordinat)

                    map.on("mousemove",function onizleme(xxx){
                      map.removeLayer(kose_noktalari)
                      map.removeLayer(ara_noktalar)
                      try{
                        map.removeLayer(asdfg)
                        map.removeLayer(gecici_ara_nokta)
                      }
                      catch{}
                      asdfg=""
                      
                      var gecici_koordinatlar=[xxx.latlng.lng ,  xxx.latlng.lat]
                      gecici_ara_nokta = L.geoJSON({type:"Feature","geometry":{"type":"Point","coordinates":gecici_koordinatlar}},
                          {pointToLayer:function(feature,latlng){
                            return L.circleMarker(latlng,{radius:4,fillColor:"#FF0000",weight:1,fillOpacity:1})
                          }}).addTo(map)
                      window[x].tum_ozellikler.featuregroup.removeLayer(window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].feature)
                      window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates.splice(indexxx+1,0,gecici_koordinatlar)
                      var line = [{
                        "type":"LineString",
                        "coordinates":window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates
                      }]
                      asdfg = L.geoJSON(line,{
                        style : window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].bicim.bicim
                    }).addTo(map)
                    window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates.splice(indexxx+1,1)

                    map.on("click", function (xcv){
                      map.removeLayer(gecici_ara_nokta)
                      map.removeLayer(asdfg)
                      window[x].tum_ozellikler.featuregroup.removeLayer(window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].feature)
                      map.removeLayer(ara_noktalar)
                      map.off("mousemove",onizleme)
                      var new_koordinat = [xcv.latlng.lng ,  xcv.latlng.lat]
                      window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik.geometry.coordinates.splice(indexxx+1,0,new_koordinat)
                      window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].feature=L.geoJSON(window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].geometrioznitelik,{
                        style: window[x].tum_ozellikler.objeler["'"+secilen_obje.obje+"'"].bicim.bicim
                    }).addTo( window[x].tum_ozellikler.featuregroup)
                    map.off("click")

                    return objesecmek()
                    })
                    })


                  }
                  else{
                  } 
                }
                
                

            })
            }
            sayfamesajlari.appendChild(satiratla)
            sayfamesajlari.appendChild(kose_sil)
            sayfamesajlari.appendChild(nokta_ekle)
        })
        return
        }
        var islem2 = document.createElement("button")
        islem2.innerText="Sil"
        var islem3 = document.createElement("button")
        islem3.innerText="Ekle"
        sayfamesajlari.appendChild(islem1)
        sayfamesajlari.appendChild(islem2)
        sayfamesajlari.appendChild(islem3)
        sayfamesajlari.appendChild(satiratla)
        var kapatbuton = document.createElement("button")
        kapatbuton.innerText="Kapat"
        kapatbuton.onclick=function(){
          butonlari_etkinlestirme()
          bekleme()
          return
        }
        sayfamesajlari.appendChild(kapatbuton)
        return
      }
      

}

var gecici_mousemove