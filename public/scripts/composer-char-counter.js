
$(document).ready(function() {
  console.log("DOM is loaded");
  $("#tweet-text").on("input", function() {
    // this refers to the tweet text area
    // find the length of the value of the string 
    let availableChars = 140 - $(this).val().length;

    // counter is not a direct child of text area. 
    // traversing up to form and back down to counter
    // so that only the text area counter is adjusted
    
    let counterElement = 
    $(this)
    .closest("form")
    .find(".counter");

    counterElement.text(availableChars);

    if (availableChars < 0) {
      // add another class so I can select it with CSS
      counterElement.addClass("not-valid");
    } else {
      // remove it if valid char count
      counterElement.removeClass("not-valid");
    }
  });
});
