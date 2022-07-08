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

function listFavorites() {
  try {
    fetch("http://localhost:63552/api/Folders/" + sessionStorage["UserID"], {
      method: "GET",
    })
      .then((response) => response.json())
      .then((folders) => {
        folders.forEach((folder) => {
          if (folder.isFavorite == true) {
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
