
$(document).ready(function() {
  console.log("DOM is loaded");
  $("#tweet-text").on("input", function() {
    // this refers to the tweet text area
    // find the length of the value of the string 
    let totalCharlength = $(this).val().length;

    // counter is not a direct child of text area. 
    // traversing up to form and back down to counter
    // so that only the text area counter is adjusted
    $(this)
    .closest("form")
    .find(".counter")
    .text(140 - totalCharlength);
  });
});
