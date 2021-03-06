$(document).ready(function () {
  $.getJSON("/articles", function (data) {
    for (var i = 0; i < data.length; i++) {

      var articleLink = data[i].link;
      var articleSummary = data[i].summary;

      $("#articles").append("<h2 data-id='" + data[i]._id + "'>"
        + data[i].title + "<button type='button' class='addNote-btn'>Add a note</button>"
        + "</h2>" + "<br />"
        + "<h6 class='sumPar'><i>" + articleSummary + "</i></h6>"
        + `<a target="blank" href=https://www.bbc.com/${articleLink}><h3>Read more</h3></a>`
        + "<hr>");
    }
  });


  $(document).on("click", "h2", function () {
    $("#notes").empty();
    var thisId = $(this).attr("data-id");

    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      .then(function (data) {
        console.log(data);
        $("#notes").append("<h2>" + data.title + "</h2>");
        $("#notes").append("<input id='titleinput' name='title' >");
        $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
        $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

        if (data.note) {
          $("#titleinput").val(data.note.title);
          $("#bodyinput").val(data.note.body);
        }
      });
  });

  $(document).on("click", "#savenote", function () {
    var thisId = $(this).attr("data-id");
    alert("Note saved")

    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        title: $("#titleinput").val(),
        body: $("#bodyinput").val()
      }
    })
      .then(function (data) {
        $("#notes").empty();
      });

    $("#titleinput").val("");
    $("#bodyinput").val("");

  });
}); // End of document.ready
