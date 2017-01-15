
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
	var $city = $('#city').val();
    var $street = $('#street').val();
    $body.append('<img class="bgimg" src="http://maps.googleapis.com/maps/api/streetview?size=600x300&location='+ $city + $street +'">'); 
    // YOUR CODE GOES HERE!


    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q="+$city+"&sort=newest&api-key=193021b133d241c587de8627cf49d7d2";

    $.getJSON( url, function( data ) {
	  var items = [];
	  var articles = data.response.docs;
	  for (var i = articles.length - 1; i >= 0; i--) {
	  	items.push( "<li id='" + articles[i]._id + "'><a href='"+articles[i].web_url +"'>" + articles[i].snippet + "</a></li>" );
	  	console.log(articles[i]);
	  }
	 
	 console.log(data);
	 	  $( "<ul/>", {
	    "class": "my-new-list",
	    html: items.join( "" )
	  }).appendTo( "body" );
	}).error(function(){
		console.log('err');
	});


	$.ajax({
	  url: "https://en.wikipedia.org/w/api.php?action=opensearch&search="+$city,
    	dataType: "jsonp",
    	success: function(data){
    		console.log(data);
    		var articles = data[1]; 
    		for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            var url = 'http://en.wikipedia.org/wiki/' + article;
            $wikiElem.append('<li><a href="'+url+'">'+
                article+ '</a></li>');
        };
    	},
    	error: function(e) {
    		console.log(e);
    	}
	});

    return false;
};

$('#form-container').submit(loadData);
