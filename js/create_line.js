function create_line(katman_name){
    var sayfamesajlari=document.getElementById('sayfamesajlari')
    document.getElementById("oznitelikpenceresi").innerHTML="";
    var name = katman_name
    document.getElementById('sayfamesajlari').style.backgroundColor  = "black";
    document.getElementById('sayfamesajlari').innerText="Çizgi Katmanı oluşturuldu\n"+name;//sayfa mesajlarında objenin oluştuğuna dair bilgi
    var noktalar = []
    var asd
    if ((typeof window[name])!=="object"){
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
            var bitirbuton = document.createElement("button")
            bitirbuton.innerText="Bitir"
            bitirbuton.onclick=function(){
                map.off("click")
                map.off("mousemove")
                map.removeLayer(asd)
                var name2 = "point"+(new Date()).getMilliseconds()+Math.floor(Math.random()*1000);//benzersiz obje id alma
                window[name].objeler_ve_ozellikleri(noktalar,name2)
                window[name].haritayaekle(window[name].tum_ozellikler.objeler["'"+name2+"'"].bicim,name2)
                sayfamesajlari.innerText=name2+"objesi oluşturuldu."
            }
            document.getElementById("sayfamesajlari").appendChild(bitirbuton)
            map.on("click",(e)=>{
                x = (e.latlng.lat).toFixed(8)
                y = (e.latlng.lng).toFixed(8)
                var nokta1= [parseFloat(y),parseFloat(x)]
                noktalar.push(nokta1)
                if (noktalar.length!==0){
                    map.on("mousemove",async(e)=>{
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
                    })
                }

            })
        }
    }
    
}
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
      }
      haritayaekle(object_bicim,object_id){
        console.log(this.tum_ozellikler)
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
    var obje_koordinat_cevrilmis = []
    for (var c in this.tum_ozellikler.objeler["'"+object_id+"'"].geometrioznitelik.geometry.coordinates){
        this.tum_ozellikler.coordinats.push([this.tum_ozellikler.objeler["'"+object_id+"'"].geometrioznitelik.geometry.coordinates[c][1],this.tum_ozellikler.objeler["'"+object_id+"'"].geometrioznitelik.geometry.coordinates[c][0]])
    }
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
      }
      haritadansil(){ //obje tamamen silinecek
        window[this.tum_ozellikler.id_nosu].haritadagizle()
      }
      objeyeyaklas(){
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
}