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


function createFolder() {
  var fname = document.getElementById("fname");
  try {
    var request = {
      body: JSON.stringify({
        folderName: fname.value,
        createdBy: id,
        createdAt: curr.toISOString(),
        isDeleted: 0,
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(api, request).then((folderCreateResponse) => {
      location.reload();
    });
  } catch (err) {
    console.log(err);
  }
}

function listFolders() {
  try {
    fetch("http://localhost:63552/api/Folders/" + sessionStorage["UserID"], {
      method: "GET",
    })
      .then((response) => response.json())
      .then((folders) => {
        folders.forEach((folder) => {
          if (folder.isDeleted == false) {
            var create = document.getElementById("mainn");
            var createChild = document.createElement("div");
            createChild.classList.add("abc2");
            const fold = folder.folderName;

            var div1 = document.createElement("div");
            div1.classList.add("abc");
            let con = "";
            con += `<div class="col-lg-3 col-md-6"></div>
                            <div class="card bg-light text-dark mb-4 text-center">
                            <div class="card-body">
                                    <img src="/img/folder.png" class="folder" alt="" srcset="" onclick='openfile(${folder.folderId})'>
                                </div>
                                <div class='card-body'>${fold}</div>
                                <div class='icons' style="padding:5px; border:1px solid lightgrey">
                                <div class='trashIcon'><i class='uil uil-trash-alt fa-lg' style="color:darkred;" onclick='warning(${folder.folderId})'></i></div>
                                <div class='infoIcon'><i class='uil uil-info-circle fa-lg' style="color:navyblue;" onclick = 'detailsFolders(${folder.folderId},"${folder.folderName}", "${folder.createdBy}")'></i></div>
                                <div class='favIcon'><i class='uil uil-star fa-lg' style="color:navyblue;" onclick = 'addToFav(${folder.folderId})'></i></div>
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

function addToFav(folderId) {
  debugger;
  var requestOptions = {
    method: "PUT",
    redirect: "follow",
  };
  fetch(
    "http://localhost:63552/api/Folders/favourite/" + folderId,
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
    fetch("http://localhost:63552/api/Folders/" + sessionStorage["UserID"], {
      method: "GET",
    })
      .then((response) => response.json())
      .then((folders) => {
        folders.forEach((folder) => {
          if (folder.isDeleted == true) {
            var create = document.getElementById("mainn");
            var createChild = document.createElement("div");
            createChild.classList.add("abc2");
            const fold = folder.folderName;

            var div1 = document.createElement("div");
            div1.classList.add("abc");
            let con = "";
            con += `<div class="col-lg-3 col-md-6"></div>
                      <div class="card bg-light text-dark mb-4 text-center">
                        <div class="card-body">
                          <img src="/img/folder.png" class="folder" alt="" srcset="" onclick='openfile(${folder.folderId})'>
                        </div>
                        <div class='card-body'>${fold}</div>
                        <div class='icons' style="padding:5px; border:1px solid lightgrey">
                          <div class='trashIcon'><i class='uil uil-trash-alt fa-2x' style="color:darkred;" onclick='warning(${folder.folderId})'></i></div>
                          <div class='infoIcon'><i class='uil uil-info-circle fa-2x' style="color:navyblue;" onclick = 'detailsFolders(${folder.folderId},"${folder.folderName}", "${folder.createdBy}")'></i></div>
                        <div class='favIcon'><i class='uil uil-star' style="color:navyblue;"></i></div>
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
      "\n"
  );
}

function warning(id) {
  if (confirm("You sure you want to delete it?")) {
    sendToTrash(id);
  }
}

function searchFolder() {
  try {
    var id1 = document.getElementById("search-text");
    if (id1.value == "") {
      location.reload();
    } else {
      var create = document.getElementById("mainn");
      create.innerHTML = "";
      fetch(
        "http://localhost:63552/api/Folders/" +
          sessionStorage.getItem("FolderID") +
          "/" +
          id1.value,
        {
          method: "GET",
        }
      )
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
            con += `<div class="col-lg-3 col-md-6"></div>
                      <div class="card bg-light text-dark mb-4 text-center">
                         <div class="card-body">
                            <img src="/img/folder.png" class="folder" alt="" srcset="" onclick='openfile(${folder.folderId})'>
                          </div>
                          <div class='card-body'>${fold}</div>
                          <div class='icons' style="padding:5px; border:1px solid lightgrey">
                             <div class='trashIcon'><i class='uil uil-trash-alt fa-lg' style="color:darkred;" onclick='warning(${folder.folderId})'></i></div>
                              <div class='infoIcon'><i class='uil uil-info-circle fa-lg' style="color:navyblue;" onclick = 'detailsFolders(${folder.folderId},"${folder.folderName}", "${folder.createdBy}")'></i></div>
                              <div class='favIcon'><i class='uil uil-star fa-lg' style="color:navyblue;" onclick = 'addToFav(${folder.folderId})'></i></div>
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

function listTrash() {
  try {
    fetch("http://localhost:63552/api/Folders/" + sessionStorage["UserID"], {
      method: "GET",
    })
      .then((response) => response.json())
      .then((folders) => {
        folders.forEach((folder) => {
          if (folder.isDeleted == false) {
            var create = document.getElementById("mainn");
            var createChild = document.createElement("div");
            createChild.classList.add("abc2");
            const fold = folder.folderName;

            var div1 = document.createElement("div");
            div1.classList.add("abc");
            let con = "";
            con += `<div class="col-lg-3 col-md-6"></div>
                            <div class="card bg-light text-dark mb-4 text-center">
                            <div class="card-body">
                                    <img src="/img/folder.png" class="folder" alt="" srcset="" onclick='openfile(${folder.folderId})'>
                                </div>
                                <div class='card-body'>${fold}</div>
                                <div class='icons' style="padding:5px; border:1px solid lightgrey">
                                <div class='trashIcon'><i class='uil uil-trash-alt fa-2x' style="color:darkred;" onclick='warning(${folder.folderId})'></i></div>
                                <div class='infoIcon'><i class='uil uil-info-circle fa-2x' style="color:navyblue;" onclick = 'detailsFolders(${folder.folderId},"${folder.folderName}", "${folder.createdBy}")'></i></div>
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

function logout() {
  sessionStorage.clear();
  window.location.href = "Sign_In.html";
}
