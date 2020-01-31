// Make sure we wait to attach our handlers until the DOM is fully loaded.
//Document.ready function but for jquery
$(function() {
    $(".change-eaten").on("click", function(event) {
      const id = $(this).data("id");
      const newEaten = $(this).data("neweaten");
        console.log($(this));
      const newEatenState = {
        eaten: newEaten,
      };
  
      // Send the PUT request.
      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: newEatenState
      }).then(
        function() {
          console.log("changed eaten to", newEaten);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    $(".create-form").on("submit", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();

        
      if($("#burger_name").val().trim() === '') {
        $('.modal').modal('show');

        //this line of code grabs the modal div and opens it
        $("#myModal").modal('open');
      }

      console.log($("#burger_name"));
      const newBurger= {
        name: $("#burger_name").val().trim(),
        eaten: 0,
        vomit_amt: 0,
        // $("[name=eaten]:checked").val().trim()
      }
    

    //   console.log(newBurger);

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
  
    $(".delete-burger").on("click", function(event) {
      var id = $(this).data("id");
  
      // Send the DELETE request.
      $.ajax("/api/burgers/" + id, {
        type: "DELETE"
      }).then(
        function() {
          console.log("deleted burger", id);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  });
  