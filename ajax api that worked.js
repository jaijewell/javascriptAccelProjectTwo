dogApp.getDogs = function(query){
  $.ajax({
      url: 'http://api.petfinder.com/pet.find',
      method: 'GET',
      dataType: 'jsonp',
      data: { 
        key: dogApp.apiKey,
        output: 'string',
        format: 'json',
        location: 'M5V 2A9'
      }
  })