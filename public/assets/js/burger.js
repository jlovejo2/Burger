// Make sure we wait to attach our handlers until the DOM is fully loaded.
//Document.ready function but for jquery
$(function() {

  const vomit_sound = $("#vomit_sound")[0];
  const eatSound = $("#eat_sound")[0];

  // console.log(eatSound);
  // console.log(audio);
 
    $(".change-eaten").on("click", function(event) {
      console.log(">>>>>>>  begin change-eaten")
      const id = $(this).data("id");
      const newEaten = $(this).data("neweaten");
        console.log($(this));
      const newEatenState = {
        eaten: newEaten,
      };

      console.log(newEaten);
      if(newEaten) {
        console.log("eat");
      eatSound.play();
      } else {
        console.log("throw up");
        vomit_sound.play()
      }

      // Send the PUT request.
      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: newEatenState
      }).then(
        function() {
          console.log("changed eaten to", newEaten);
          // Reload the page to get the updated list
          timeoutReload();
        }
      );
    });
  
    $(".create-form").on("submit", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();

        
      if($("#burger_name").val().trim() === '') {
        $('.order').modal('show');

        //this line of code grabs the modal div and opens it
        $("#orderSomething").modal('open');
      }

      console.log($("#burger_name"));
      const newBurger= {
        name: $("#burger_name").val().trim(),
        eaten: 0,
        vomit_amt: 0,
        // $("[name=eaten]:checked").val().trim()
      }

      // Send the POST request.
      $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
      }).then(
        function() {
          console.log("created new burger");
          // Reload the page to get the updated list
          timeoutReload();
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
          openGrossModal();     
        }
      );
    });

    //This is an on-clik on the modal that shows up when you try to eat vomitted burger
    //It will reload the page so the deleted burger is no longer shown.
    //It was already deleted in earlier step of clicking on eat it button for vomitted burger
    $(".delete-gross").on("click", function (event){
      location.reload();
    })

  });
  

  function openGrossModal() {
    $('.gross-delete').modal('show');

    //this line of code grabs the modal div and opens it
    $("#gross").modal('open');
  }

  function timeoutReload() {
    setTimeout(location.reload(), 3000);
  }