var sesUser = sessionStorage.getItem("UserID");

function listFolders() {
  try {
    var create = document.getElementById("doc-main");
    create.innerHTML = "";
    var url = "http://localhost:63552/api/Folders//Recent/" + sesUser + "/1";
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((folders) => {
        folders.forEach((folder) => {
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
                                <div class='trashIcon'><i class='uil uil-trash-alt fa-lg' style="color:darkred;"
                                onclick='warning(${folder.folderId})'></i></div>
                                <div class='infoIcon'><i class='uil uil-info-circle fa-lg' style="color:navyblue;" onclick = 'detailsFolders(${folder.folderId},"${folder.folderName}", "${folder.createdBy}")'></i></div>
                                <div class='favIcon'><i class='uil uil-star'></i></div>
                                </div>
                            </div>
                        </div>`;
          div1.innerHTML = con;
          createChild.appendChild(div1);
          create.append(createChild);
        });
      });
  } catch (err) {
    console.log(err);
  }
}
function onLoad() {
  listFolders();
}

onLoad();

function openfile(folderId) {
  sessionStorage.setItem("FolderID", folderId);
  window.location.href = "file.html";
}

function detailsFolders(folderId, folderName, createdBy) {
  swal(
    "Folder id: " +
      folderId +
      "\n" +
      "Folder name: " +
      folderName +
      "\n" +
      "Folder Created by: " +
      createdBy +
      "\n"
  );
}

function warning(id) {
  if (confirm("You sure you want to delete it?")) {
    sendToTrash(id);
  }
}

function sendToTrash(folderId) {
  var requestOptions = {
    method: "PUT",
    redirect: "follow",
  };

  fetch(
    "http://localhost:63552/api/Folders/SoftDeleted/" + folderId,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      location.reload();
    })
    .catch((error) => console.log("error", error));
}
