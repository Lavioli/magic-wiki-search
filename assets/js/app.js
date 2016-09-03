//function takes in the searchTerm, which is the text from the text input #query
function fetchFromWiki(searchTerm) {
    //sends request by GET wit hthe following parameters
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
            //once target data is received, renderSearch results gets invoked
            //data[1] is the array all the search result labels
            //data[3] is the array with all the url to the search result label
            renderSearchResults(data[1], data[3]);
        })
        //the below methods pretty much do nothing unless something is wrong
        .done(function(data) {
            console.log("done");
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
};

//function renders all the labels and url and concatenates to the ul as a li
function renderSearchResults(listOfLabels, listOfUrls) {
    var html = "";
    //each function takes in the label and concatenates the item, which is the listOfLabels to the ul
    $.each(listOfLabels, function(index, item) {
        var url = listOfUrls[index]; //url
        html += "<li><a target='_blank' href='" + url + "'>" + item + "</a></li>";
    });
    //the html variable gets changed
    $('.search-results').html(html);
    //when a is hovered over the search results, a minipreview will load for that result
    $('.search-results a').miniPreview({ prefetch: 'none' });
}


// EVENT LISTENERS:
$(function() {

    $('#search-term').submit(function(event) {
        event.preventDefault();
        $('#search-page').hide();
        $('#results-page, .back-to-search').toggle(); //becomes show;
        var searchTerm = $('#query').val();
        fetchFromWiki(searchTerm);
    });

    $('.back-to-search').on('click', function() {
        $(this).toggle();
        $('#results-page, #search-page').toggle();

    });


});
