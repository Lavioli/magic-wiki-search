function fetchFromWiki(searchTerm){
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
  });

}

//chain ajax to search by image

function renderSearchResults(listOfLabels, listOfUrls){
  var html = "";
  $.each(listOfLabels, function(index, item){
    var url = listOfUrls[index];
    html += "<li><a target='_blank' href='" + url + "'>" + item + "</a></li>";
  });
  $('.search-results').html(html);
}


// EVENT LISTENERS:
$(function(){

  $('#search-term').submit(function(event){
    event.preventDefault();
    var searchTerm = $('#query').val();
    fetchFromWiki(searchTerm);
  });

});