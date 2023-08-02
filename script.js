//Hide loder function
let loader = document.getElementById("loader");
function hideLoader() {
  loader.style.display = "none";
}
      const body = document.querySelector('body'),
      sidebar = body.querySelector('nav'),
      toggle = body.querySelector(".toggle"),
      searchBtn = body.querySelector(".search-box"),
      modeSwitch = body.querySelector(".toggle-switch"),
      modeText = body.querySelector(".mode-text");


toggle.addEventListener("click" , () =>{
    sidebar.classList.toggle("close");
})

// searchBtn.addEventListener("click" , () =>{
//     sidebar.classList.remove("close");
// })

modeSwitch.addEventListener("click" , () =>{
    body.classList.toggle("dark");
    
    if(body.classList.contains("dark")){
        modeText.innerText = "Light mode";
    }else{
        modeText.innerText = "Dark mode";
        
    }
});
//myDiv
function hideDiv(e1) {
    var x = document.getElementById(e1);
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
  //remove layer 
  const elements = document.getElementsByClassName("info");
  const divs = document.getElementsByClassName("DIV");
  function hide_other_divs(currDiv) {
    // panel.style.display = "none";
    map.eachLayer(function (layer) {
      if (layer._url != 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}') {
        map.removeLayer(layer);
      }
    });
  
    for (let i = 0; i < divs.length; i++) {
      if (divs[i].id != currDiv) {
        divs[i].style.display = "none";
      }
    }
  
    while (elements.length > 0) elements[0].remove();
  }
  //ACTUALISER LA MAP
  // reset function #to
function reset_all() {
    map.eachLayer(function (layer) {
      if (layer._url != 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}') {
        map.removeLayer(layer);
      }
    });
  
    while (elements.length > 0) elements[0].remove();
  
    for (var i = 0; i < divs.length; i++) {
      divs[i].style.display = "none";
    }
  }
  //RECHARGER LA PAGE
  function refresh() { window.location.reload(false); }
  ////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//données relatif aux différents TOITS
  function showTOIT() {
    geojsontoit = L.geoJson(TOITS2, {
        style: function (feature) {
            return {
                fillColor: 'green',
                fillOpacity: 0.03,
                color: 'green'
            };
        },
        onEachFeature: function (feature, layer) {
            layer.on({
                mouseover: function (e) {
                    const layer = e.target;
                    layer.setStyle({
                        fillColor: 'green',
                        weight: 5,
                        dashArray: '',
                        fillOpacity: 0.7,
                        color: 'green'
                    });
                },
                mouseout: function (e) {
                    const layer = e.target;
                    geojsontoit.resetStyle(layer);
                },
                click: function (e) {
                    const layer = e.target;
                    if (!layer.originalStyle) {
                        layer.originalStyle = layer.options.style;
                    }
                    layer.setStyle({
                        fillColor: 'blue',
                        color: 'blue'
                    });
                }
            });
            
            layer.bindPopup("<b><h2><u>TOIT PROPICE :</h2> </u></font></b>" +
                "<b>Destination du batiment : </b>" + feature.properties.Désignati + "</br>" +"<b>Forme de projet adéquat : </b>" + feature.properties.Projet + "</br>" +
                "<b>Type de système de production : </b>" + feature.properties.Technologi + "</br>" +
                "<b>Type de culture en été : </b>" + feature.properties.Cultures_E + "</br>" +"<b>Type de culture en Printemps : </b>" + feature.properties.Culture_Pr + "</br>"+
                "<b>Type de culture en hiver: </b>" + feature.properties.Cultures_H + "</br>"+
                "<b>Type de culture en automne : </b>" + feature.properties.Cultures_A + "</br>"+
                "<b>Superficie du Toit en (m²) : </b>" + feature.properties.Area + "<b> m². </b>" + "</br>"
                +
                "<b>Degré de potentialité du Toit pour acceuillir l'agriculture verticale : </b>" + feature.properties.Score + "</br>");
        }
    }).addTo(map);
}
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////Definition des styles des diff cartes choropletes 

  /////////////////////////////////////////////les formes de projet
  function showPROJET() {
    if (!info_TOITS2) {
        info_TOITS2 = L.control();
    
        info_TOITS2.onAdd = function (map) {
          this.div = L.DomUtil.create('div', 'info TOITS2'); // create a div with a class "info"
          this.update();
          return this.div;
        };
    
        // method that we will use to update the control based on feature properties passed
        info_TOITS2.update = function (feat) {
          this.div.innerHTML = '<h4>Le type de projet spécifique à ce toit:</h4>' +  (feat ?
              '<b><h3>Le projet adéquat :</h3>' +feat.properties.Projet  + '</b><br/>' +'<h4>Superficie en mètre carré:</h4>' + '<b>' + (turf.area(feat.geometry)).toFixed(2) + ' m² </b>'
              : 'Survoler une zone!');
        };
      }
    
      if (!legend) {
        legend = L.control({position: 'bottomright'});
    
        legend.onAdd = function (map) {
          var div = L.DomUtil.create('div', 'info legend');
          var grades = ['Terrasse comestible', 'Jardin collectif', 'Ferme Urbaine Productive/Microferme Urbaine'];
    
          // Ajout du titre de la légende
          div.innerHTML = '<h4>Légende:</h4>';
    
          // Boucle à travers les catégories et génère une étiquette avec un carré coloré pour chaque catégorie
          for (var i = 0; i < grades.length; i++) {
              div.innerHTML += 
                  '<i style="background:' + getColor_TOITS2(grades[i]) + '"></i> ' +
                  grades[i] + (grades[i + 1] ? ','+ '<br>' : '.');
          }
    
          return div;
        };
      }
    
      if (TOITS21) {
        map.removeLayer(TOITS21);
      }
    function getColor_TOITS2(d) {

        return d == "Terrasse comestible" ? '#e41a1c' : 
               d == "Jardin collectif" ? '#377eb8' : 
               d == "Ferme Urbaie Productive\/Microferme Urbaine" ? '#4daf4a' : 
                             '#FFEDA0';
      }
      
      function style_TOITS2(feature) {
          return {
              fillColor: getColor_TOITS2(feature.properties.Projet),
              weight: 2,
              opacity: 1,
              color: 'white',
              dashArray: '3',
              fillOpacity: 0.7
          };
      }
//ADD INTERACTION WITH CHOROPLETH MAPS

//MouseOver

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
    info_TOITS2.update(layer.feature);
} 
function resetHighlight_TOITS2(e) {
    TOITS21.resetStyle(e.target);
    info_TOITS2.update();
    }
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}
   
    // OnEach feature
    //////////////projet
    function onEachFeature_TOITS2(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight_TOITS2,
            click: zoomToFeature
        })
    }
var info_TOITS2 = L.control();

info_TOITS2.onAdd = function (map) {
    this.div = L.DomUtil.create('div', 'info TOITS2'); // create a div with a class "info"
    this.update();
    return this.div;
};

// method that we will use to update the control based on feature properties passed
info_TOITS2.update = function (feat) {
    this.div.innerHTML = '<h4>Le type de projet spécifique à ce toit:</h4>' +  (feat ?
        '<b><h3>Le projet adéquat :</h3>' +feat.properties.Projet  + '</b><br/>' +'<h4>Superficie en mètre carré:</h4>' + '<b>' + (turf.area(feat.geometry)).toFixed(2) + ' m² </b>'//+ ' people / mi<sup>2</sup>'
        : 'Survoler une zone!');
};
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = ['Terrasse comestible', 'Jardin collectif', 'Ferme Urbaine Productive/Microferme Urbaine'],
        labels = [];
// Ajout du titre de la légende
div.innerHTML = '<h4>Légende:</h4>';

    // Boucle à travers les catégories et génère une étiquette avec un carré coloré pour chaque catégorie
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML += 
            '<i style="background:' + getColor_TOITS2(grades[i]) + '"></i> ' +
            grades[i] + (grades[i + 1] ? ','+ '<br>' : '.');
    }

    return div;
};
TOITS21 = L.geoJson(TOITS2,{
    style: style_TOITS2 , 
    onEachFeature: onEachFeature_TOITS2
    
 }).addTo(map);
 info_TOITS2.addTo(map);legend.addTo(map);
  }
  
  /////////////////////////////////////////////les systèmes de production
  

  function showTEC() { 
   
    function getColor_TOITS2(d) {

        return d == "Bacs" ? '#a6cee3' :  
               d == "Hydroponie\/Aéroponie\/Bacs\/Planches" ? '#1f78b4' : 
               d == "None" ?    '#edf8b1':         
               '#edf8b1';
      }
      
      function style_TOITS2(feature) {
          return {
              fillColor: getColor_TOITS2(feature.properties.Technologi),
              weight: 2,
              opacity: 7,
              color: 'white',
              dashArray: '3',
              fillOpacity: 7
          };
      }
//ADD INTERACTION WITH CHOROPLETH MAPS

//MouseOver

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
    info_TOITS2.update(layer.feature);
} 
function resetHighlight_TOITS2(e) {
    TOITS21.resetStyle(e.target);
    info_TOITS2.update();
    }
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}
   
    // OnEach feature
    //////////////technique
    function onEachFeature_TOITS2(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight_TOITS2,
            click: zoomToFeature
        })
    }
var info_TOITS2 = L.control();

info_TOITS2.onAdd = function (map) {
    this.div = L.DomUtil.create('div', 'info TOITS2'); // create a div with a class "info"
    this.update();
    return this.div;
};

// method that we will use to update the control based on feature properties passed
info_TOITS2.update = function (feat) {
    this.div.innerHTML = '<h4>Le système de production spécifique à ce toit:</h4>' +  (feat ?
        '<b><h3>La technique de production adéquate :</h3>' +feat.properties.Technologi  + '</b><br/>' +'<h4>La superficie en mètre carré:</h4>' + '<b>' + (turf.area(feat.geometry)).toFixed(2) + ' m² </b>'//+ ' people / mi<sup>2</sup>'
        : 'Survoler une zone!');
};
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
    grades = ['Bacs', 'Hydroponie\/Aéroponie\/Bacs\/Planches', "None"],
        labels = [];
// Ajout du titre de la légende
div.innerHTML = '<h4>Légende:</h4>';
    // Boucle à travers les catégories et génère une étiquette avec un carré coloré pour chaque catégorie
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
        '<i style="background:' + getColor_TOITS2(grades[i]) + '"></i> ' +
        grades[i] + (grades[i + 1] ? ','+ '<br>' : '.');
    }

    return div;
};
TOITS21 = L.geoJson(TOITS2,{
    style: style_TOITS2 , 
    onEachFeature: onEachFeature_TOITS2
    
 }).addTo(map);
 info_TOITS2.addTo(map);legend.addTo(map);
 
  }
  /////////////////////////////////////////////les types de culture
  function showcultete() {
    function getColor_TOITS2(d) {

        return d == "Persil, Menthe" ? '#238443' :  
               d == "Persil, Tomates, Tomates cerises, Concombre, Courgette ronde, Choux" ? '#c2e699' :
               d == "Pas d'accès à la toiture" ? '#78c679' : 
                             '#edf8b1';
      }
      
      function style_TOITS2(feature) {
          return {
              fillColor: getColor_TOITS2(feature.properties.Cultures_E),
              weight: 2,
              opacity: 1,
              color: 'white',
              dashArray: '3',
              fillOpacity: 0.7
          };
      }
//ADD INTERACTION WITH CHOROPLETH MAPS

//MouseOver

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
    info_TOITS2.update(layer.feature);
} 
function resetHighlight_TOITS2(e) {
    TOITS21.resetStyle(e.target);
    info_TOITS2.update();
    }
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}
   
    // OnEach feature
    //////////////culture
    function onEachFeature_TOITS2(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight_TOITS2,
            click: zoomToFeature
        })
    }
var info_TOITS2 = L.control();

info_TOITS2.onAdd = function (map) {
    this.div = L.DomUtil.create('div', 'info TOITS2'); // create a div with a class "info"
    this.update();
    return this.div;
};

// method that we will use to update the control based on feature properties passed
info_TOITS2.update = function (feat) {
    this.div.innerHTML = '<h4>Le type de culture spécifique en été à ce toit:</h4>' +  (feat ?
        '<b><h3>La culture adéquate :</h3>' +feat.properties.Cultures_E  + '</b><br/>' +'<h4>La superficie en mètre carré:</h4>' + '<b>' + (turf.area(feat.geometry)).toFixed(2) + ' m² </b>'//+ ' people / mi<sup>2</sup>'
        : 'Survoler une zone!');
};
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
    grades = ['Persil, Menthe', 'Persil, Tomates, Tomates cerises, Concombre, Courgette ronde, Choux', "Pas d'accès à la toiture"],
        labels = [];
// Ajout du titre de la légende
div.innerHTML = '<h4>Légende:</h4>';
    // Boucle à travers les catégories et génère une étiquette avec un carré coloré pour chaque catégorie
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor_TOITS2(grades[i]) + '"></i> ' +
            grades[i] + (grades[i + 1] ? ','  + '<br>' : '.');
    }

    return div;
};
TOITS21 = L.geoJson(TOITS2,{
    style: style_TOITS2 , 
    onEachFeature: onEachFeature_TOITS2
    
 }).addTo(map);
 info_TOITS2.addTo(map);legend.addTo(map);
  }
  
  /////////////////////////////////////////////les types de culture
  function showcultpr() {
    function getColor_TOITS2(d) {

        return d == "Persil, Menthe" ? '#238443' :  
        d == "Persil, Tomates, Tomates cerises, Concombre, Courgette ronde, Choux" ? '#c2e699' :
        d == "Pas d'accès à la toiture" ? '#78c679' : 
                      '#edf8b1';
      }
      
      function style_TOITS2(feature) {
          return {
              fillColor: getColor_TOITS2(feature.properties.Culture_Pr),
              weight: 2,
              opacity: 1,
              color: 'white',
              dashArray: '3',
              fillOpacity: 0.7
          };
      }
//ADD INTERACTION WITH CHOROPLETH MAPS

//MouseOver

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
    info_TOITS2.update(layer.feature);
} 
function resetHighlight_TOITS2(e) {
    TOITS21.resetStyle(e.target);
    info_TOITS2.update();
    }
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}
   
    // OnEach feature
    //////////////culture
    function onEachFeature_TOITS2(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight_TOITS2,
            click: zoomToFeature
        })
    }
var info_TOITS2 = L.control();

info_TOITS2.onAdd = function (map) {
    this.div = L.DomUtil.create('div', 'info TOITS2'); // create a div with a class "info"
    this.update();
    return this.div;
};

// method that we will use to update the control based on feature properties passed
info_TOITS2.update = function (feat) {
    this.div.innerHTML = '<h4>Le type de culture spécifique en printemps à ce toit:</h4>' +  (feat ?
        '<b><h3>La culture adéquate :</h3>' +feat.properties.Culture_Pr  + '</b><br/>' +'<h4>La superficie en mètre carré:</h4>' + '<b>' + (turf.area(feat.geometry)).toFixed(2) + ' m² </b>'//+ ' people / mi<sup>2</sup>'
        : 'Survoler une zone!');
};
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
    grades = ['Persil, Menthe', 'Persil, Tomates, Tomates cerises, Concombre, Courgette ronde, Choux', "Pas d'accès à la toiture"],
        labels = [];
// Ajout du titre de la légende
div.innerHTML = '<h4>Légende:</h4>';
    // Boucle à travers les catégories et génère une étiquette avec un carré coloré pour chaque catégorie
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor_TOITS2(grades[i]) + '"></i> ' +
            grades[i] + (grades[i + 1] ? ','  + '<br>' : '.');
    }

    return div;
};
TOITS21 = L.geoJson(TOITS2,{
    style: style_TOITS2 , 
    onEachFeature: onEachFeature_TOITS2
    
 }).addTo(map);
 info_TOITS2.addTo(map);legend.addTo(map);
  }
  ////////////////////////////////////////////les types de culture
  function showculth() {
    function getColor_TOITS2(d) {

        return d == "Persil, Menthe" ? '#238443' :  
        d == "Persil, Tomates, Tomates cerises, Concombre, Courgette ronde, Choux" ? '#c2e699' :
        d == "Pas d'accès à la toiture" ? '#78c679' : 
                      '#edf8b1';
      }
      
      function style_TOITS2(feature) {
          return {
              fillColor: getColor_TOITS2(feature.properties.Cultures_H),
              weight: 2,
              opacity: 1,
              color: 'white',
              dashArray: '3',
              fillOpacity: 0.7
          };
      }
//ADD INTERACTION WITH CHOROPLETH MAPS

//MouseOver

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
    info_TOITS2.update(layer.feature);
} 
function resetHighlight_TOITS2(e) {
    TOITS21.resetStyle(e.target);
    info_TOITS2.update();
    }
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}
   
    // OnEach feature
    //////////////culture
    function onEachFeature_TOITS2(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight_TOITS2,
            click: zoomToFeature
        })
    }
var info_TOITS2 = L.control();

info_TOITS2.onAdd = function (map) {
    this.div = L.DomUtil.create('div', 'info TOITS2'); // create a div with a class "info"
    this.update();
    return this.div;
};

// method that we will use to update the control based on feature properties passed
info_TOITS2.update = function (feat) {
    this.div.innerHTML = '<h4>Le type de culture spécifique en hiver à ce toit:</h4>' +  (feat ?
        '<b><h3>La culture adéquate :</h3>' +feat.properties.Cultures_H  + '</b><br/>' +'<h4>La superficie en mètre carré:</h4>' + '<b>' + (turf.area(feat.geometry)).toFixed(2) + ' m²</b>'//+ ' people / mi<sup>2</sup>'
        : 'Survoler une zone!');
};
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
    grades = ['Persil, Menthe', 'Persil, Tomates, Tomates cerises, Concombre, Courgette ronde, Choux', "Pas d'accès à la toiture"],
        labels = [];
// Ajout du titre de la légende
div.innerHTML = '<h4>Légende:</h4>';
    // Boucle à travers les catégories et génère une étiquette avec un carré coloré pour chaque catégorie
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor_TOITS2(grades[i]) + '"></i> ' +
            grades[i] + (grades[i + 1] ? ','  + '<br>' : '.');
    }

    return div;
};
TOITS21 = L.geoJson(TOITS2,{
    style: style_TOITS2 , 
    onEachFeature: onEachFeature_TOITS2
    
 }).addTo(map);
 info_TOITS2.addTo(map);legend.addTo(map);
  }
  ////////////////////////////////////////////les types de culture
  function showculta() {
    function getColor_TOITS2(d) {

        return d == "Persil, Menthe" ? '#238443' :  
        d == "Persil, Tomates, Tomates cerises, Concombre, Courgette ronde, Choux" ? '#c2e699' :
        d == "Pas d'accès à la toiture" ? '#78c679' : 
                      '#edf8b1';
      }
      
      function style_TOITS2(feature) {
          return {
              fillColor: getColor_TOITS2(feature.properties.Cultures_A),
              weight: 2,
              opacity: 1,
              color: 'white',
              dashArray: '3',
              fillOpacity: 0.7
          };
      }
//ADD INTERACTION WITH CHOROPLETH MAPS

//MouseOver

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
    info_TOITS2.update(layer.feature);
} 
function resetHighlight_TOITS2(e) {
    TOITS21.resetStyle(e.target);
    info_TOITS2.update();
    }
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}
   
    // OnEach feature
    //////////////culture
    function onEachFeature_TOITS2(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight_TOITS2,
            click: zoomToFeature
        })
    }
var info_TOITS2 = L.control();

info_TOITS2.onAdd = function (map) {
    this.div = L.DomUtil.create('div', 'info TOITS2'); // create a div with a class "info"
    this.update();
    return this.div;
};

// method that we will use to update the control based on feature properties passed
info_TOITS2.update = function (feat) {
    this.div.innerHTML = '<h4>Le type de culture spécifique en automne à ce toit:</h4>' +  (feat ?
        '<b><h3>La culture adéquate :</h3>' +feat.properties.Cultures_A  + '</b><br/>' +'<h4>La superficie en mètre carré:</h4>' + '<b>' + (turf.area(feat.geometry)).toFixed(2) + ' m² </b>'//+ ' people / mi<sup>2</sup>'
        : 'Survoler une zone!');
};
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = ['Persil, Menthe', 'Persil, Tomates, Tomates cerises, Concombre, Courgette ronde, Choux', "Pas d'accès à la toiture"],
        labels = [];
// Ajout du titre de la légende
div.innerHTML = '<h4>Légende:</h4>';
    // Boucle à travers les catégories et génère une étiquette avec un carré coloré pour chaque catégorie
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor_TOITS2(grades[i]) + '"></i> ' +
            grades[i] + (grades[i + 1] ? ','  + '<br>' : '.');
    }

    return div;
};
TOITS21 = L.geoJson(TOITS2,{
    style: style_TOITS2 , 
    onEachFeature: onEachFeature_TOITS2
    
 }).addTo(map);
 info_TOITS2.addTo(map);legend.addTo(map);
  }
/////////////////////////////////////////////score
function showscore () {
    function getColor_TOITS1(d) {

        return d == "Très Faible" ? '#d7191c' :
               d == "Faible" ? '#fdae61' :  
               d == "Moyen" ? '#ffffbf' : 
               d == "Fort" ? '#a6d96a' : 
               d == "Très Fort" ? '#1a9641' : 
                             '#edf8b1';
      }
      
      function style_TOITS1(feature) {
          return {
              fillColor: getColor_TOITS1(feature.properties.Score),
              weight: 2,
              opacity: 1,
              color: 'white',
              dashArray: '3',
              fillOpacity: 0.7
          };
      }
//ADD INTERACTION WITH CHOROPLETH MAPS

//MouseOver

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
    info_TOITS1.update(layer.feature);
} 
function resetHighlight_TOITS1(e) {
    TOITS11.resetStyle(e.target);
    info_TOITS1.update();
    }
function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}
   
    // OnEach feature
    //////////////technique
    function onEachFeature_TOITS1(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight_TOITS1,
            click: zoomToFeature
        })
    }
var info_TOITS1 = L.control();

info_TOITS1.onAdd = function (map) {
    this.div = L.DomUtil.create('div', 'info TOITS1'); // create a div with a class "info"
    this.update();
    return this.div;
};

// method that we will use to update the control based on feature properties passed
info_TOITS1.update = function (feat) {
    this.div.innerHTML = "<h4>Le potentiel de ce toit pour accueillir l'agriculture verticale:</h4>" +  (feat ?
        '<b><h3>Le degré de potentialité :</h3>' +feat.properties.Score  + '</b><br/>' +'<h4>La superficie en mètre carré:</h4>' + '<b>' + (turf.area(feat.geometry)).toFixed(2) + ' m² </b>'//+ ' people / mi<sup>2</sup>'
        : 'Survoler une zone!');
};
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = ['Très Faible', 'Faible', 'Moyen','Fort', 'Très Fort' ],
        labels = [];
// Ajout du titre de la légende
div.innerHTML = '<h4>Légende:</h4>';
    // Boucle à travers les catégories et génère une étiquette avec un carré coloré pour chaque catégorie
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor_TOITS1(grades[i]) + '"></i> ' +
            grades[i] + (grades[i + 1] ? ','  + '<br>' : '.');
    }

    return div;
};
TOITS11 = L.geoJson(TOITS1,{
    style: style_TOITS1 , 
    onEachFeature: onEachFeature_TOITS1
    
 }).addTo(map);
 info_TOITS1.addTo(map);legend.addTo(map);
  }