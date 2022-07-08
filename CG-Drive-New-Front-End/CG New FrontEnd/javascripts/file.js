var curr = new Date();
var DateTime =
  curr.getFullYear() +
  "-" +
  curr.getMonth() +
  "-" +
  curr.getDay() +
  " " +
  curr.getHours() +
  ":" +
  curr.getMinutes() +
  ":" +
  curr.getSeconds();

var date = curr.toISOString();

var id = sessionStorage["UserID"];
var folderId = sessionStorage["FolderID"];
function listDocs() {
  try {
    fetch(
      "http://localhost:63552/api/Documents/" + sessionStorage["FolderID"],
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((docs) => {
        console.log(docs);
        docs.forEach((doc) => {
          if (doc.isDeleted == false) {
            var id = sessionStorage["UserID"];
            var create = document.getElementById("doc-main");
            var createChild = document.createElement("div");
            createChild.classList.add("abc2");

            const docName = doc.documentName;

            var div1 = document.createElement("div");
            div1.classList.add("abc");
            let con = "";
            con += `<div class="col-xl-3 col-md-6"></div>
                              <div class="card bg-light text-dark mb-4 text-center">
                              <div class="card-body">
                                      <img src="/img/file.png" class="folder" alt="" srcset="" onclick='openfile(${doc.documentId})'>
                                  </div>
                                  <div class='card-body'>${docName}</div>
                                  <div class='icons' style="padding:5px; border:1px solid lightgrey">
                                  <div class='trashIcon'><i class='uil uil-trash-alt fa-xl' style="color:darkred;"
                                  onclick='warning(${doc.documentId})'></i></div>
                                  <div class='infoIcon'><i class='uil uil-info-circle fa-xl' style="color:navyblue;" onclick = 'detailsDocs(${doc.documentId},"${doc.documentName}","${doc.id}", "${doc.contentType}")'></i></div>
                                  </div>
                              </div>
                          </div>`;
            div1.innerHTML = con;
            createChild.appendChild(div1);
            create.append(createChild);
          }
        });
      });
  } catch (err) {
    console.log(err);
  }
}

function onLoad() {
  listDocs();
}

onLoad();

function searchDocument() {
  try {
    var id1 = document.getElementById("search-text");
    if (id1.value == "") {
      location.reload();
    } else {
      var create = document.getElementById("doc-main");
      create.innerHTML = "";
      fetch(
        "http://localhost:63552/api/Documents/" +
          id1.value +
          "," +
          sessionStorage.getItem("FolderID") +
          "," +
          sessionStorage.getItem("UserID"),
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((docs) => {
          docs.forEach((doc) => {
            var create = document.getElementById("doc-main");
            var createChild = document.createElement("div");
            createChild.classList.add("abc2");
            const docName = doc.documentName;

            var div1 = document.createElement("div");
            div1.classList.add("abc");
            let con = "";
            con += `<div class="col-lg-3 col-md-6"></div>
                      <div class="card bg-light text-dark mb-4 text-center">
                         <div class="card-body">
                            <img src="/img/folder.png" class="folder" alt="" srcset="" onclick='openfile(${doc.documentId})'>
                          </div>
                          <div class='card-body'>${docName}</div>
                          <div class='icons' style="padding:5px; border:1px solid lightgrey">
                             <div class='trashIcon'><i class='uil uil-trash-alt fa-lg' style="color:darkred;" onclick='warning(${doc.documentId})'></i></div>
                              <div class='infoIcon'><i class='uil uil-info-circle fa-lg' style="color:navyblue;" onclick = 'detailsFolders(${doc.documentId},"${doc.documentName}", "${doc.createdBy}")'></i></div>
                              <div class='favIcon'><i class='uil uil-star fa-lg' style="color:navyblue;" onclick = 'addToFav(${doc.documentId})'></i></div>
                           </div>
                          </div>
                        </div>`;
            div1.innerHTML = con;
            createChild.appendChild(div1);
            create.append(createChild);
          });
        });
    }
  } catch (err) {
    console.log(err);
  }
}

const choose = document.getElementById("myFile");
function uploadFiles() {
  let value = choose.files[0];
  var formdata = new FormData();
  formdata.append("files", value);

  var requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };
  console.log(date);
  console.log(id);
  console.log(folderId);
  fetch(
    "http://localhost:63552/api/Documents/upload/" +
      date +
      "/" +
      id +
      "/" +
      folderId,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      location.reload();
    })
    .catch((error) => console.log("error", error));
}

function detailsDocs(documentId, documentName, createdBy, contentType) {
  swal(
      "Document name: " +
      documentName +
      "\n" +
      "Document Content Type: " +
      contentType +
      "\n"
  );
}

function warning(id) {
  if (confirm("You sure you want to delete it?")) {
    softDelete(id);
  }
}
function softDelete(docId) {
  var requestOptions = {
    method: "PUT",
    redirect: "follow",
  };

  fetch("http://localhost:63552/api/Documents/" + docId, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      location.reload();
    })
    .catch((error) => console.log("error", error));
}

var sesTime = sessionStorage.getItem("id");
