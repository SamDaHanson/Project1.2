$(document).ready(function () {

    var topics = ["Usher", "Foo Fighters", "Green Day", "Black Sabbath", "Kanye", "Cage The Elephant", "Will Smith", "Beyonce"];

    function displaySpaceStuff() {
        var space = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + space + "&api_key=mePpseQoZWWEY5RregXq0iDwpYlq2U9J&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            $("#space-value").empty();

            for (var i = 0; i < response.data.length; i++) {
                var space = $("<div class='spaceGif'>");
                var rating = response.data[i].rating;
                var picRating = $("<p>").text("Rating: " + rating);
                var picStill = response.data[i].images.fixed_height_still.url;
                var picAnimate = response.data[i].images.fixed_height.url;
                var image = $("<img>").addClass("image").attr("src", picStill).attr("data-still", picStill).attr("data-animate", picAnimate).attr("data-state", "still");

                space.append(image);
                space.append(picRating);

                if (rating === 'pg' || rating === 'g') {
                    space.append(image);
                    $("#space-value").append(space);
                }
            }

            $(".image").on("click", function () {
                var state = $(this).attr("data-state");

                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });
        });
    }

    function myButtons() {
        $("#myButtons").empty();
        for (var i = 0; i < topics.length; i++) {
            var z = $("<button>");
            z.addClass("spaceClass");
            z.attr("data-name", topics[i]);
            z.text(topics[i]);
            $("#myButtons").append(z);
        }
    }

    $("#spaceTheme").on("click", function (event) {
        event.preventDefault();
        var space = $("#space-input").val().trim();
        topics.push(space);
        $("#space-input").val(" ");
        myButtons();
    });

    $(document).on("click", ".spaceClass", displaySpaceStuff);
    myButtons();
});



