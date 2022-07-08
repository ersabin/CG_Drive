const api = "http://localhost:63552/api/folders";

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

var fname = document.getElementById("fname");

var id = sessionStorage["UserID"];

function listTrashFiles() {
  try {
    fetch(
      "http://localhost:63552/api/Documents/" + sessionStorage["FolderID"],
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((documents) => {
        documents.forEach((doc) => {
          if (doc.isDeleted == true) {
            var create = document.getElementById("mainn");
            var createChild = document.createElement("div");
            createChild.classList.add("abc2");
            const docName = doc.documentName;

            var div1 = document.createElement("div");
            div1.classList.add("abc");
            let con = "";
            con += `<div class="col-xl-3 col-md-6"></div>
                              <div class="card bg-light text-dark mb-4 text-center">
                              <div class="card-body">
                                      <img src="/img/folder.png" class="folder" alt="" srcset="" onclick='openfile(${doc.documentId})'>
                                  </div>
                                  <div class='card-body'>${docName}</div>
                                  <div class='icons' style="padding:5px; border:1px solid lightgrey">
                                  <div class='trashIcon'><i class='uil uil-trash-alt fa-lg' style="color:darkred;"
                                  onclick='warning(${doc.documentId})'></i></div>
                                  <div class='infoIcon'><i class='uil uil-info-circle fa-lg' style="color:navyblue;" onclick = 'detailsFolders(${doc.documentId},"${doc.documentName}", "${doc.createdBy}")'></i></div>
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

function warning(id) {
  if (confirm("You sure you want to restore it?")) {
    restore(id);
  }
}

function restore(folderId) {
  var requestOptions = {
    method: "PUT",
    redirect: "follow",
  };
  fetch(
    "http://localhost:63552/api/Folders/Undelete/" + folderId,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      location.reload();
    })
    .catch((error) => console.log("error", error));
}

function listFavorites() {
  try {
    fetch(
      "http://localhost:63552/api/Documents/" + sessionStorage["FolderID"],
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((folders) => {
        console.log(folders);
        var id = sessionStorage["UserID"];
        folders.forEach((folder) => {
          if (folder.isFavorite == true) {
            var id = sessionStorage["UserID"];
            var create = document.getElementById("mainn");
            var createChild = document.createElement("div");
            createChild.classList.add("abc2");
            const fold = folder.folderName;

            var div1 = document.createElement("div");
            div1.classList.add("abc");
            let con = "";
            con += `<div class="col-xl-3 col-md-6"></div>
                              <div class="card bg-light text-dark mb-4 text-center">
                              <div class="card-body">
                                      <img src="/img/folder.png" class="folder" alt="" srcset="" onclick='openfile(${folder.folderId})'>
                                  </div>
                                  <div class='card-body'>${fold}</div>
                                  <div class='icons' style="padding:5px; border:1px solid lightgrey">
                                  <div class='trashIcon'><i class='uil uil-trash-alt fa-2x' style="color:darkred;"
                                  onclick='warning(${folder.folderId})'></i></div>
                                  <div class='infoIcon'><i class='uil uil-info-circle fa-2x' style="color:navyblue;" onclick = 'detailsDocs(${doc.documentId},"${doc.documentName}","${doc.id}", "${doc.contentType}")'></i></div>
                                  <div class='favIcon'><i class='uil uil-star'></i></div>
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
  listFavorites();
}

onLoad();

function detailsDocs(documentId, documentName, createdBy, contentType) {
  swal(
    "Document id: " +
      documentId +
      "\n" +
      "Document name: " +
      documentName +
      "\n" +
      "Document Created by: " +
      createdBy +
      "\n" +
      "Document Content Type: " +
      contentType +
      "\n"
  );
}
