$(document).ready(function() {
  // --- our code goes here ---
  $('#tweet-text').keypress(function(event) {
    const counter = this.value.length;
  
    $("output.counter").text(140 - this.value.length);
  
    if (counter > 140) {
      $("output.counter").addClass("error");
    } else {
      $("output.counter").removeClass("error");
    }
  });
});


