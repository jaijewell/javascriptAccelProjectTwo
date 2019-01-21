//QUESTIONS - 
// if the API is returning several images, how can you manipulate each one? e.g. I tried the 'card flip' because I wanted to show the image / name of dog on one side and a couple details on the other, but whichever class I selected - section / div / class created in JS, it flipped the entire container of images rather than each individual image on hover.
// was also wondering if there are multiple images being fetched per dog profile, how would you select every image per profile to be displayed? e.g. <img src="${dogPic.media.photos.photo[1].$t}"> <- I only selected the second image on each profile. Would you just list for example the same statement as above for each item in the array - <img src="${dogPic.media.photos.photo[2].$t}"> [3], etc. 
const dogApp = {
  apiKey: "12c53eca414adb109474b966eaf741a7"
};

dogApp.getDogs = function(query){
  $.ajax({
      url: 'http://api.petfinder.com/pet.find',
      method: 'GET',
      dataType: 'jsonp',
      data: { 
        key: dogApp.apiKey,
        output: 'string',
        format: 'json',
        location: query,
        animal: 'dog',
        count: 25
      }
  }).then(function(result) {
    console.log(result.petfinder.pets.pet);
    dogApp.displayProfiles(result.petfinder.pets.pet);
  });
}

dogApp.displayProfiles = function(data){
  // console.log("data in displayProfile", data);
  const dogHtml = data.map(function(dogPic) {
    // console.log("dog pic in map", dogPic.name);
    let dogPicHtml = `
        <div class="profile">
          <img src="${dogPic.media.photos.photo[1].$t}">
          <h2>${dogPic.name.$t}</h2>
          <p>${dogPic.age.$t}</p>
          <p>${dogPic.sex.$t}</p>
       </div>`; 
       //stretch goal: each dog has several photos, randomly selected [1] from array. possible to use flickity so each appears as its own slide show? would you run a forEach on each image and run it as a function? not sure how that would be incorporated with the existing plugin.
       // stretch goal: have dogPic.sex.$t if = F return Female v M return Male
       // stretch goal: include breed but many are undefined if(${dogPic.breeds.breed.s$} === undefined, return "Mutt")
    return dogPicHtml;
  }).join('');

  $('#profilePic').append(dogHtml);
};


dogApp.init = function(){
   $('.submit').on('click', function(event){
   event.preventDefault(); 
   const dogArea = $('#userInfo').val();
   // if($('#userInfo').val() !== ''){
    $('html, body').animate({
      scrollTop:$('.flip').offset().top
    }, 1000);
       // console.log(dogArea)
      dogApp.getDogs(dogArea);
    });
 }

 dogApp.clearInput = function(){
  $('.searchAgain').on('click', function(){
    $('#userInfo').val('');
    $('.imgContainer').empty('')
    // console.log('clear')
    $('searchAgain').on('click', function(){
      $('html, body').animate({
          scrollTop: $('#userInfo').offset().top
      }, 2000);
    });
  })
}

//Stretch Goal - flip cards, share details on the back
// dogApp.flipProfiles = function(){
// $('.imgContainer').justFlipIt({ 
//     Click: true,
//     Template:'text',
//     FlipX: true,
//     Style: [
//       "perspective: 1000",
//       rotateduration: 0.5,
//     ]
//   })
// }
//   // CSS perspective property
//   perspective: 1000,
//   // background color
//   background: '#fff',
//   // trigger event
//   trigger: 'click',
//   // duration of rotate animation
//   rotateduration: 0.5,
//   // duration of scale animation
//   scaleduration: 1,
//   // scale level
//   scale: 1.2,
//   // CSS transiton
//   transition: 'ease-out',
//   // or 'horizontal'
//   direction: 'horizontal',
//   // width/height of rotator
//   // width: 300,
//   // height: 150,
//   // selectors
//   front: '.profile',
//   back: '.profileDetails'
// });
// }

$(function(){
  dogApp.init();
  dogApp.clearInput();
  
  $('a').smoothScroll({
        autoFocus: true,
        speed: 600
  }); // closing smooth scroll
// $('.flip').flickity({ 
//     wrapAround: true,
//     autoPlay: 1500,
//     groupCells: true,
//   });

   $('#getDogsButton').on('click', function(){
   if($('#userInfo').val() == ''){
      alert('Enter your postal code to receive alllllll of the dog pics');
   } // closing if statement
 }); //getDogsButton on click
}) //docReady


