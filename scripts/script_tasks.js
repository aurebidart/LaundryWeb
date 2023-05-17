document.addEventListener("DOMContentLoaded", function() {
    var rows = document.querySelectorAll(".table-row");
    rows.forEach(function(row) {
        row.addEventListener("click", function() {
            var checkbox = row.querySelector("input[type=checkbox]");
            checkbox.checked = !checkbox.checked;
        });
    });
});