$(document).ready(function () {
  // Grab the articles as a json
  $.getJSON("/articles", function (data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page

      var articleLink = data[i].link;
      var articleSummary = data[i].summary;

      $("#articles").append("<h2 data-id='" + data[i]._id + "'>"
        + data[i].title + "<button type='button' class='addNote-btn'>Add a note</button>"
        + "</h2>" + "<br />"
        + "<h6 class='sumPar'><i>" + articleSummary + "</i></h6>"
        + `<a href=https://www.bbc.com/${articleLink}><h3>Read more</h3></a>`
        + "<hr>");
    }
  });


  // Whenever someone clicks a class btn
  $(document).on("click", "h2", function () {
    // Empty the notes from the note section
    $("#notes").empty();
    // Save the id from the h1 tag
    var thisId = $(this).attr("data-id");

    //   //   // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      // With that done, add the note information to the page
      .then(function (data) {
        console.log(data);
        // The title of the article
        $("#notes").append("<h2>" + data.title + "</h2>");
        // An input to enter a new title
        $("#notes").append("<input id='titleinput' name='title' >");
        // A textarea to add a new note body
        $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
        // A button to submit a new note, with the id of the article saved to it
        $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

        // If there's a note in the article
        if (data.note) {
          // Place the title of the note in the title input
          $("#titleinput").val(data.note.title);
          // Place the body of the note in the body textarea
          $("#bodyinput").val(data.note.body);
        }
      });
  });

  //*************************Testing code for saved articles******************/
  const saveArticle = function () {
    let id = $(this).data('id');

    $.ajax({
      url: `/articles/${id}`,
      method: 'PUT'
    })
      .then((data) => {
        location.reload();
      });
  };

  const removeArticle = function () {
    let id = $(this).data('id');

    $.ajax({
      url: `/articles/remove/${id}`,
      method: 'PUT'
    })
      .then((data) => {
        location.reload();
      });
  };

  //*************************Testing code for saved articles ends******************/

  // When you click the savenote button
  $(document).on("click", "#savenote", function () {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
    alert("Note saved")

    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        title: $("#titleinput").val(),
        // Value taken from note textarea
        body: $("#bodyinput").val()
      }
    })
      // With that done
      .then(function (data) {
        // Log the response
        // console.log(data);
        // Empty the notes section
        $("#notes").empty();
      });

    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");

  });
}); // End of document.ready
