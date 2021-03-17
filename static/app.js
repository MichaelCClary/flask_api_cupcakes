const $cupcakeList = $("#cupcakeList");
const $addCupcakeBtn = $("#addCupcake");
const $addForm = $("#addForm");

async function CreateCupcakes() {
    const cupcakes = await axios.get(`/api/cupcakes`);
    makeEmptyTable()

    for (let cupcake of cupcakes.data.cupcakes) {
        makeTableRow(cupcake)
    }
}

$addCupcakeBtn.on("click", function () {
    updateUI();
})

$addForm.on("submit", function (e) {
    e.preventDefault();
    submitCupcake();
    updateUI();
    $("#addForm")[0].reset();
})

$(document).on("click", ".editBtn", function (e) {
    alert('edit!')
})

$(document).on("click", ".deleteBtn", function () {
    const id = $(this).data('id')
    deleteCupcake(id)
    $(this).parent().remove()
})

async function submitCupcake() {
    data = {
        flavor: $("#flavor").val(),
        size: $("#size").val(),
        image: $("#image").val(),
        rating: $("#rating").val()
    }
    data.rating = "" ? 0 : data.rating
    const cupcake = await axios.post(`/api/cupcakes`, data);
    makeTableRow(cupcake.data.cupcake);

}

function makeEmptyTable() {
    const $table = $("<table></table>").addClass("table table-bordered");
    const $thead = $("<thead></thead>");
    const $headTR = $("<tr></tr>");
    $headTR.append($("<th>Flavor</th>").attr("scope", "col"));
    $headTR.append($("<th>Size</th>").attr("scope", "col"));
    $headTR.append($("<th>Rating</th>").attr("scope", "col"));
    $headTR.append($("<th>Image</th>").attr("scope", "col"));
    $headTR.append($("<th></th>").attr("scope", "col"));
    $thead.append($headTR);
    $table.append($thead);

    const $tbody = $("<tbody></tbody>").attr("id", "tbody");
    $table.append($tbody);
    $cupcakeList.append($table);
}

function makeTableRow(cupcake) {
    const $bodyTR = $("<tr></tr>");
    $bodyTR.append($(`<td>${cupcake.flavor}</td>`).attr("scope", "row"));
    $bodyTR.append($(`<td>${cupcake.size}</td>`));
    $bodyTR.append($(`<td>${cupcake.rating}</td>`));
    $bodyTR.append($(`<td><img src="${cupcake.image}" alt="Picture of ${cupcake.flavor}"></td>`));
    $deleteButton = $(`<button>Delete</button>`).addClass("btn btn-danger tblBtn deleteBtn").attr("data-id", cupcake.id);
    $bodyTR.append($deleteButton);
    $("#tbody").append($bodyTR);
}

function updateUI() {
    const add = "Add Cupcake";
    const cancel = "Cancel";
    $h1 = $("#h1");
    $cupcakeList.toggle();
    $("#addCupcakeDiv").toggle();
    text = $addCupcakeBtn.text();
    if (text == add) {
        $addCupcakeBtn.text(cancel);
        $h1.text("Add Cupcake");
    } else {
        $addCupcakeBtn.text(add);
        $h1.text("Cupcakes");
    }
}

async function deleteCupcake(id) {
    await axios.delete(`/api/cupcakes/${id}`)
}


CreateCupcakes()