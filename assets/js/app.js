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

    .then(function(data) {
        console.dir(data);
        renderSearchResults(data[1], data[3]);
    })

    .done(function(data) {
            console.dir(data);
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });

    $.ajax({
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

        });
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
        html += "<li><a target='_blank' href='" + url + "'>" + item + "</a></li>";
    });
    $('.search-results').html(html);
    $('.search-results a').miniPreview({ prefetch: 'none' });
}


// EVENT LISTENERS:
$(function() {

    $('#search-term').submit(function(event) {
        event.preventDefault();
        $('#search-page').hide();
        $('#results-page').toggle();
        var searchTerm = $('#query').val();
        fetchFromWiki(searchTerm);
    });


});
