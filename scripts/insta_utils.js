var Globals = Globals || {};
//var def_access_token = '12002818.f59def8.8a4fc8e799ff41ca877e0cca2e50180a'
//your_access_token = '12002818.de6d98a.c726609ea8ef47d3b6ce9ca8bfcc3379';

Globals.def_access_token = '12002818.de6d98a.c726609ea8ef47d3b6ce9ca8bfcc3379';
//Globals.your_access_token = '12002818.de6d98a.c726609ea8ef47d3b6ce9ca8bfcc3379';
Globals.your_access_token = null;


function Utils () {}
Utils.intersect = function(a, b) {
    var d = {};
    var results = [];
    for (var i = 0; i < b.length; i++) {
        d[b[i]] = true;
    }
    for (var j = 0; j < a.length; j++) {
        if (d[a[j]])
            results.push(a[j]);
    }
    return results;
}
Utils.template = null

function intializeHandleBar() {
    Handlebars.registerHelper('trim', function(passedString) {
      var string = passedString.substring(0,25);
      return new Handlebars.SafeString(string)
    });

    Utils.template = Handlebars.compile($("#media-block").html());
}

function fetchPetImages(pets, count, token) {
    var access_parameters = {
      access_token:token,
    };

    for (id in pets) {
        console.log("tag : " + pets[id])
        fetchImagesWithTag(access_parameters, count, pets[id]);
    }
}


function fetchImagesWithTag(access_parameters, count, tag) {
    var instagramUrl = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?callback=?&count='+ count;

      $.getJSON(instagramUrl, access_parameters, function(data){
        onDataLoaded(data, 'tag', tag);
        return callback;
      });
}


function fetchPetImages_async(pets, count, token) {
    var access_parameters = {
      access_token:token,
    };

    async.each(pets, function(item, callback){
        console.log("item : " + item);
        fetchImagesWithTag_async(access_parameters, count, item, callback);
      }, function(err) {
        console.log("Finished!");
        $container.isotope('reloadItems');
        $container.imagesLoaded(function(){
              $('#galleryContainer').isotope({
               filter: '*',
               animationOptions: {
                  duration: 750,
                  easing: 'linear',
                  queue: false
               }
             });
        });
    });
}

function fetchImagesWithTag_async(access_parameters, count, tag, callback) {
    var instagramUrl = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?callback=?&count='+ count;

      $.getJSON(instagramUrl, access_parameters, function(data){
            onDataLoaded(data, 'tag', tag);
            return callback(null);
      });
}


function fetchImagesForSelf(count, token) {
    //console.log("tag : " + tag)
    var access_parameters = {
      access_token:token,
    };
    var instagramUrl = 'https://api.instagram.com/v1/users/self/feed?callback=?&count='+ count;
    $.getJSON(instagramUrl, access_parameters, function(data){
          onDataLoaded(data, 'self', 'self')
    });
}

function onDataLoaded(data, type, tag) {
     if(data.meta.code == 200) {
        console.log('data.meta.code : ' + data.meta.code)
        var photos = data.data;
        if(photos.length > 0) {
           console.log("photos.length : " + photos.length)
           for (var key in photos){
              // get tags
              var photo = photos[key];
              var isAppend = false;

              if (type == "tag") {
                var pre_defined_tags = ["pets", "pet", "cute", "adorable", "cutie", tag, tag+'s'];

                //console.log("photo : " + photo)
                var matching_tags = Utils.intersect(photo.tags, pre_defined_tags)

                console.log("tag : " + tag)
                console.log("tags : " + photo.tags)
                console.log("pre_defined_tags : " + pre_defined_tags)
                console.log("matching_tags : " + matching_tags)
                console.log("matching_tags length: " + matching_tags.length)

                if (matching_tags.length >= 2) {
                  isAppend = true;
                }
              } else if (type == "self") {
                isAppend = true;
              } else {
                alert('Unkown request type specified');
              }

              if (isAppend) {
                var data = {
                      tag: tag,
                      owner: photo.user.username,
                      link:photo.link,
                      url: photo.images.low_resolution.url,
                      likes: photo.likes.count
                };
                console.log("Appending item to the galleryContainer!");
                var ele = $('#galleryContainer').append(Utils.template(data));
              }
          }
          // $container.isotope('reloadItems');
          // $container.imagesLoaded(function(){
          //     $('#galleryContainer').isotope({
          //      filter: '*',
          //      animationOptions: {
          //         duration: 750,
          //         easing: 'linear',
          //         queue: false
          //      }
          //    });
          // });

       } else {
         alert('Empty');
       }
    }else{
      alert(data.meta.error_message);
    }
}


//module.exports = Utils;
