//add text to buttons
//add CSS colors

// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    $(".change-devour").on("click", function(event) {
      var id = $(this).data("id");
      var newdevour = $(this).data("newdevour");
  
      var newdevourState = {
        devoured: newdevour
      };
  
      // Send the PUT request.
      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: newdevourState
      }).then(
        function() {
          console.log("changed devour to", newdevour);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    $(".create-form").on("submit", function(event) {
        console.log("the problem?");
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
  
      var newBurger = {
          //What is #ca in handlebars -> burger name
    burger_name: $("#newburger").val().trim(),
    //    devoured: false 
      };
  
      // Send the POST request.
      $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
      }).then(
        function() {
          console.log("created new burger");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  //instead of deleting, devour
  //post id to backend
  //switch devour from false to true
    $(".devour-burger").on("click", function(event) {
      var id = $(this).data("id");
  
      // Send the DELETE request.
      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: {devoured: true}
      }).then(
        function() {
          console.log("devour burger", id);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  });
  