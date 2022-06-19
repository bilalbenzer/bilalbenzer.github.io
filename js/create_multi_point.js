
function multi_create_point(a){
  document.getElementById("oznitelikpenceresi").innerHTML="";
  var name = a
  document.getElementById('sayfamesajlari').style.backgroundColor  = "black";
  document.getElementById('sayfamesajlari').innerText="Çoklu Point Katmanı oluşturuldu\n"+name;//sayfa mesajlarında objenin oluştuğuna dair bilgi
  //harita üzerinde tıklama olayı ile koordinat almanın etkinleştirilmesi
  map.on('click', (e)=>{
  x = (e.latlng.lat).toFixed(8);
  y = (e.latlng.lng).toFixed(8);
  // oluşturulacak point için benzersiz bir id üretilir ve daha önceden bu id verilmiş mi kontrol edilir
    if ((typeof window[name])!=="object"){  //id in daha önceden var olup olmadığının kontrolü
        document.getElementById("vektor").open = true //katman penceresi sürekli açık olacak
        document.getElementById('sayfamesajlari').style.backgroundColor  = "black"; 
        var name2 = "point"+(new Date()).getMilliseconds()+Math.floor(Math.random()*1000);//benzersiz obje id alma
        window[name]= new multi_point(class_name=name); //alınan koordinat ve alınan rastgele obje adına göre çoklu point sınıfı oluşturulur
        window[name].objeler_ve_ozellikleri(x_coordinats=x,y_coordinats=y,object_name=name2)
        window[name].menuleriolustur()
        window[name].haritayaekle(window[name].tum_ozellikler.objeler["'"+name2+"'"].bicim,name2)
        document.getElementById('sayfamesajlari').innerText="Point oluşturuldu \n"+"E="+x+"   "+"B="+y;//sayfa mesajlarında objenin oluştuğuna dair bilgi
        //window[name].menuleriolustur()
        //window[name].haritayaekle(window[name].object_stil[window[name2].bicim])
      }
    else if ((typeof window[name])=="object" && (window[name].tum_ozellikler.objeler_ve_id_nolari.length > 0)) {  //class yani katmana 1den fazla nokta eklenecekse bu blok devreye girecek
      document.getElementById("vektor").open = true //vektor penceresi açık olacak
      document.getElementById('sayfamesajlari').style.backgroundColor  = "black"; 
      var name2 = "point"+(new Date()).getMilliseconds()+Math.floor(Math.random()*1000);//benzersiz obje id alma  //obje için id alınacak
      if (window[name].tum_ozellikler.objeler_ve_id_nolari.includes(name2)===true){ //bu id eğer mevcutsa tekrar denenmesi istenecek
          alert("tekrar deneyiniz")}
      else{
        window[name].objeler_ve_ozellikleri(x_coordinats=x,y_coordinats=y,object_name=name2)  //obje id si uygun ise obje oluşturulacak
        window[name].haritayaekle(window[name].tum_ozellikler.objeler["'"+name2+"'"].bicim,name2) // oluştuurlan obje haritaya eklenecek
      }
      }
    else{
      alert("Bu İd'ye Sahip Bir Obje Bulunmakta.");   //katman adı eğer daha önce tanımlanmış ise uyarı verilecek
         }});
   // klavye kısayollarının etkinleştirilmesi
  document.addEventListener('keydown', function abc(event)  { //kullanıcı klavye kısayollarını kullanabilecek
  var code = event.code;
    // home tuşunun basılması durumunda elle korodinat girme fonksiyonu çalıştırılır
  if (code==="Home"){ //home tuşuna basılır ise elle koordinat girme özelliği çalışacak
  document.getElementById('obje_girdi').style.backgroundColor = "black";
  document.getElementById('obje_girdi').innerHTML='<label for="xbuton">E :</label><input type="number" maxlength="999999" id="xbuton" step="0.001" value="" required><br><label for="ybuton">B :</label><input type="number" maxlength="999999" id="ybuton" step="0.001" value="" required><input id="koordinatal" type="submit"  value="nokta oluştur">';
  document.getElementById("koordinatal").setAttribute("onclick","koordinatileolustur('"+"olustur"+"')")
  document.removeEventListener("keydown",abc) //klavye kısayolu devre dışı bırakılacak
  map.off('click'); //haritadaki tıklama olayı kapatılacak
  }
  // end tuşuna basılması durumunda nokta oluşturma işlemi tamamlanır
  else if (code==="End") {  //end tuşuna basılır ise  çoklu point oluşturma işlemi sonlanacak
  document.getElementById('sayfamesajlari').style.backgroundColor = "black";  
  document.getElementById('sayfamesajlari').innerText = "İşlem Tamamlandı";
  document.removeEventListener("keydown",abc) // klavye kısayolu işlevi sonlanacak
  bekleme();
  map.off('click'); //haritada tıklama olayı sonlanacak
  }
  });
}

class multi_point {
  constructor(class_name){ //constructor kısmında multi point classına ait boş listeler ve objeler oluşturulacak
      this.tum_ozellikler = { //çoklu pointe ilişkin tüm özellikler bu objede tutulacak
        "id_nosu":class_name, //class a ait isim bu dizede tutulacak
        "objeler":{ //oluşturulan objeler ve özellikleri bu dizede tutulacak
        },
        "objeler_ve_id_nolari":[],  //oluşan objelerin id noları bu listede tutulacak
        "featuregroup":L.featureGroup().addTo(map), //tüm objeler bir grupta olacak ve bu grup haritaya eklencek
        "coordinats":[],  //yaklaşma işlevi için koordinatlar bu listede tutulacak
      }
    }
  objeler_ve_ozellikleri(x_coordinats,y_coordinats,object_name){  //çoklu point oluşturma kısmında oluşturulacak pointe ilişkin parametreler bu metotta işlenecek ve class a eklenecek

    this.tum_ozellikler.objeler_ve_id_nolari.push(object_name.toString()) //obje id si ilgili yerine eklenecek
    this.tum_ozellikler.objeler["'"+object_name+"'"] ={geometrioznitelik:{  //eklenen objenin id nosu ile bir dize oluşturulacak ve tüm özellikleri eklenecek
      "type":"Feature",
      "properties": {
                      "featureid" : object_name,
                      "Geometri Tipi" : "Nokta",
                      "X Koordinatı (Enlem)" : parseFloat(x_coordinats),
                      "Y Koordinatı (Boylam)" : parseFloat(y_coordinats)
                      },
      "geometry":   {
                      "type":"Point",
                      "coordinates":[y_coordinats,x_coordinats]
                    }
    },
                                                      bicim:{
                                                        bicim:{radius: 8,
                                                          fillColor: renk_listesi[Math.floor(Math.random()*renk_listesi.length)], //her oluşan obje bu algoritma ile rastgele bir renk alır
                                                          color: "#000",  //dış çizginin renki
                                                          weight: 1,  //dış çizginin kalınlığı
                                                          opacity: 3, //dış çizginin opaklığı
                                                          fillOpacity: 0.8},

                                                          ikon:{ //objenin sembol ayarları bu nesneye gider
                                                            iconUrl:null,
                                                            iconSize:[50,50],
                                                          }
                                                      }
                                                      }
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
    document.getElementById(this.tum_ozellikler.id_nosu+"_summary").style.backgroundColor=renk_listesi[Math.floor(Math.random()*renk_listesi.length)];
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

  haritayaekle(object_bicim,object_id){  // oluşan obje özelikleri parametrelerle bu metota verilecek ve featuregroupa layer olarak eklenecek
                                        //obje id si map_layers listesine eklenecek
                                        //obje fature objesi map_layers_id_nolari listesine eklenecek

    var asd = L.geoJSON(this.tum_ozellikler.objeler["'"+object_id+"'"].geometrioznitelik,{
      pointToLayer:function(feature,latlng){                              //objeye ait layerin oluşması
        return L.circleMarker(latlng,object_bicim.bicim)
      } 
    })
    this.tum_ozellikler.objeler["'"+object_id+"'"]["feature"] = asd //oluşan layer, classtaki dizesine verilecek
    asd.addTo(this.tum_ozellikler.featuregroup) //oluşan layer, featuregroupa eklenerek haritaya eklenecek
    map_layers.push(this.tum_ozellikler.featuregroup.getLayerId(asd)) //obje id si map_layers listesine eklenecek

    this.tum_ozellikler.coordinats.push([asd._layers[this.tum_ozellikler.featuregroup.getLayerId(asd)-1]._latlng.lat,//objeye ait koordinatlar, class taki coordinates listesine eklenecek
    asd._layers[this.tum_ozellikler.featuregroup.getLayerId(asd)-1]._latlng.lng])  //objeye ait koordinatlar, class taki coordinates listesine eklenecek

    if (map_layers_id_nolari.includes(window[this.tum_ozellikler.id_nosu])===false){  //class ın tüm özellikleri map_layers_id_nolari na iletilecek
      map_layers_id_nolari.push(window[this.tum_ozellikler.id_nosu])
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
  objeyeyaklas(){ //haritada katmana yaklaşmak için metot
    if (this.tum_ozellikler.coordinats.length===1){ //eğer tek nokta varsa bu blok kullanılarak yaklaşılır
      map.flyTo([Object.values(this.tum_ozellikler.coordinats)[0][0],Object.values(this.tum_ozellikler.coordinats)[0][1]],14)
    }
    else{ //birden fazla obje varsa hepsine yaklaşır
      map.fitBounds(this.tum_ozellikler.featuregroup.getBounds())
    }
  }
  katmanduzenle(x){ //katmanda düzenleme işlemleri için metot. haritada click olayı açılarak obje seçilir. seçilen obje açık mavi renk alır ve işlemlere başlanır
    document.getElementById("sayfamesajlari").innerText="Harita Üzerinden Düzenlemek İstediğiniz Katmana Tıklayabilir ve Farklı Bir Koordinata Taşıyabilirsiniz"
    document.getElementById('sayfamesajlari').style.backgroundColor = "black";
    var object_id_ve_renk = {}
    this.tum_ozellikler.featuregroup.on('click',function(e){  //seçme işlemi için featuregroup objesinde click işlevi açılır
      document.getElementById("sayfamesajlari").innerText="Seçim İşlemi Başladı. Harita Üzerinde Objelere Tıklayarak Seçebilir Ve Taşıma-Silme İşlemlerini Gerçekleştirebilirsiniz.\nSeçme İşlemini SOnladırmak İçin 'N' Tuşuna Basınız."
      object_id_ve_renk[e.layer.feature.properties.featureid] = {"renk":window[x].tum_ozellikler.objeler["'"+e.layer.feature.properties.featureid+"'"].bicim.bicim.fillColor}   //seçilen layerın id nosu alınır
  //seçilen layerın mevcut rengi alınır
      window[x].tum_ozellikler.featuregroup.removeLayer(window[x].tum_ozellikler.objeler["'"+e.layer.feature.properties.featureid+"'"]["feature"]) //seçilen obje kaldırılır
      window[x].tum_ozellikler.objeler["'"+e.layer.feature.properties.featureid+"'"].bicim.bicim.fillColor =  "#56ffff"  //seçilen objeye seçi mrengi verilir
      window[x].tum_ozellikler.objeler["'"+e.layer.feature.properties.featureid+"'"]["feature"]= L.geoJSON(window[x].tum_ozellikler.objeler["'"+e.layer.feature.properties.featureid+"'"].geometrioznitelik,{
        pointToLayer:function(feature,latlng){
          return L.circleMarker(latlng,window[x].tum_ozellikler.objeler["'"+e.layer.feature.properties.featureid+"'"].bicim.bicim) //seçilen obje yeni rengiyle tekrar eklenir
        }
      }).addTo(window[x].tum_ozellikler.featuregroup)
      
      document.addEventListener('keydown', function abc(event)  {
      if (event.key==="n"){
        window[x].tum_ozellikler.featuregroup.off("click")
        document.removeEventListener("keydown",abc)
        var secilen_objeler = ""
        for (var c in Object.keys(object_id_ve_renk)){
         secilen_objeler +=  Object.keys(object_id_ve_renk)[c] +"\n"
        }
        document.getElementById("sayfamesajlari").innerText="Seçim İşlemi Sonlandı. Seçilen Objeler:\n"+secilen_objeler
      }
    
    
      })
      //document.getElementById("sayfamesajlari").innerText=e.layer.feature.properties.featureid+" Objesi Şuanda Seçili"
      //window[x].objeduzenle(object_id_ve_renk[e.layer.feature.properties.featureid].renk,e.layer.feature.properties.featureid)
    })
  }
  objeduzenle(mevcut_renk,object_id){
    console.log(mevcut_renk,object_id)
    this.tum_ozellikler.featuregroup.off('click')
    var buton1 = document.createElement("button")
    buton1.innerText="Taşı"
    document.getElementById("sayfamesajlari").appendChild(document.createElement("br"))
    document.getElementById("sayfamesajlari").appendChild(buton1)

  }

  oznitelikpenceresikapat(){}
}
