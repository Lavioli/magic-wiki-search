function fetchFromWiki(searchTerm) {
    $.ajax({
            method: 'get',
            url: 'https://en.wikipedia.org/w/api.php',
            data: {
                format: 'json',
                action: 'opensearch',
                search: searchTerm
            },
            dataType: 'jsonp'
        })
        //returns an array


    .done(function(data) {
        $(function() {
        var params = {
            q: 'cat',
            count: 1// Request parameters
        };
      
        $.ajax({
            url: "https://api.cognitive.microsoft.com/bing/v5.0/images/search?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","multipart/form-data");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","4d987553b4a14267861b431e1c2779ef");
            },
            type: "POST",
            // Request body
            // data: "{body}",
        })
        .done(function(data) {
             console.log(data);
              console.log(data.value[0].contentUrl);
        })
        .fail(function() {
            alert("error");
        });
    });
             
    })

    .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });




    /*$.ajax({
      method: 'get',
      url: 'https://en.wikipedia.org/w/api.php',
      data: {
       
          format: 'json',
          action: 'query',
          titles: searchTerm,
          prop: 'images'
        },
        dataType: 'jsonp'
    })
    .then(function(data) {
        console.dir(data);
      }).done(function(data) {
      console.dir(data);
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");

    });*/
    /*

    $.ajax({
      method: 'get',
      url: 'https://commons.wikimedia.org/w/api.php',
      data: {
          action: 'query',
          title: searchTerm,
          prop: 'image',
          iiprop: 'url'

        },
        dataType: 'jsonp'
    })
    .then(function(data) {
        console.dir(data);
      }).done(function(data) {
      console.dir(data);
    })
    .fail(function() {
      console.log("error");
    })
    .always(function() {
      console.log("complete");

    });*/

};






function renderSearchResults(listOfLabels, listOfUrls) {
    var html = "";
    $.each(listOfLabels, function(index, item) {
        var url = listOfUrls[index];
        var img = fetchFromBing(item);
        html += "<li><a target='_blank' href='" + url + "'>" + item + "</a> <img src='" + img + "'></li>";

    });
    $('.search-results').html(html);
}


// EVENT LISTENERS:
$(function() {

    $('#search-term').submit(function(event) {
        event.preventDefault();
        var searchTerm = $('#query').val();
        fetchFromWiki(searchTerm);
    });

});
