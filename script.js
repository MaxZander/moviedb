function movie (){
    const but = document.getElementById("movies").value;
    $("#midle").empty();
    $.ajax({
        type: 'GET',
        url: 'https://api.themoviedb.org/3/search/movie?api_key=c1c9eb628f0908b2e924c69a24920760&language=fr-FR&query='+ but +'&page=1&include_adult=false',
        dataType: "json",
        success: function(datas){
            var nbpages = datas['total_pages'];
            // for(var j = 1; j < nbpages; j++){
                pages(but, 1);
            // }
        },
        error: function(err){
            console.log("Ca plante" + err);
        },
    })
}
function write (datas) {
    var tresults = datas['total_results'];
    if(tresults > 20){
        tresults = 20;
    }
    const urlposter = "https://image.tmdb.org/t/p/original/";
    for(var i = 0; i < tresults ; i++){
        if(datas['results'][i]['poster_path'] != null){
            if("content" in document.createElement("template")){
                var t = document.querySelector("#movie");
                var dv = document.querySelector("#midle");
                var clone = document.importNode(t.content, true);
                var td = clone.querySelector("img");
                var td2 = clone.querySelector("p");
                var td3 = clone.querySelector("h5");
                var td4 = clone.querySelector("small");
                td.src =  urlposter+datas['results'][i]['poster_path'];
                td.alt = datas['results'][i]['title'];
                td3.textContent = datas['results'][i]['title'];
                (datas['results'][i]['overview'] != "")?td2.textContent = datas['results'][i]['overview']:td2.textContent = "Pas de description";
                td4.textContent = "Date de sortie : " + datas['results'][i]['release_date']
                dv.appendChild(clone);
            }
        }
    }
}
function pages(but, nb){
    $.ajax({
        type: 'GET',
        url: 'https://api.themoviedb.org/3/search/movie?api_key=c1c9eb628f0908b2e924c69a24920760&language=fr-FR&query='+ but +'&page='+ nb +'&include_adult=false',
        dataType: "json",
        success: function(datas){
            write(datas);
        }
    })
}