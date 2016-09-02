var x;

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
    //["cat", "catherine"]

    .done(function(data) {
        var newData = data[1].splice(0, 5); //limit to only 5 elements because I AM BROKE 😭

        $.each(newData, function(i, v) { //loops each of the elements and request for img from bing
            var params = {
                q: v,
                count: 1 // Request only 1st search result
            };

            $('.search-results').html(""); //clears out search results

            $.ajax({
                    url: "https://api.cognitive.microsoft.com/bing/v5.0/images/search?" + $.param(params),
                    beforeSend: function(xhrObj) {
                        // Request headers
                        xhrObj.setRequestHeader("Content-Type", "multipart/form-data");
                        xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "4d987553b4a14267861b431e1c2779ef");
                    },
                    type: "POST",
                    // Request body
                    data: "{body}",
                })

                .done(function(x) {
                    // x = data.value[0].contentUrl
                    // var search = searchTerm;
                    console.log(data[3][i]);
                    renderSearchResults(v, x.value[0].contentUrl, data[3][i]);

                })
                .fail(function() {
                    alert(".each error");
                });
        });

    })
    .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
};

//renderSearchResult("cat", "link")
function renderSearchResults(listOfLabels, listOfImgUrl, listOfSiteUrl) {
    var html, imghtml, searchResult = listOfLabels, url = listOfSiteUrl;

    html = "<li><a target='_blank' class='html' href='" + url + "'>" + searchResult + "</a></li>";
    $('.search-results').append(html);
    $('.search-results a').miniPreview({ prefetch: 'none' });   
}


// EVENT LISTENERS:
$(function() {

    $('#search-term').submit(function(event) {
        event.preventDefault();
        var searchTerm = $('#query').val();
        fetchFromWiki(searchTerm);
    });
});
