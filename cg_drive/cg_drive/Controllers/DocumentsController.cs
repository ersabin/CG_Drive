using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using cg_drive.Models;
using cg_drive.RequestModel;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;

namespace cg_drive.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentsController : ControllerBase
    {
        private readonly CgdriveContext _cg;
        private readonly IHostingEnvironment _env;
        public DocumentsController(CgdriveContext data, IHostingEnvironment environment)
        {
            _cg = data;
            _env = environment;
        }

        // GET: api/Documents
        [HttpGet]
        public IActionResult Get()
        {
            var datas = _cg.Documents;
            return Ok(datas);
        }

        // GET: api/Documents/5
        [HttpGet("{id:int}")]
        public IActionResult Get(int id)
        {
            var result = _cg.Documents.Where(o => o.FolderId == id);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpGet("{value},{id:int},{userid:int}")]
        public IActionResult Get(string value, int id, int userid)
        {

            var result = _cg.Documents.Where(e => e.CreatedBy == userid).Where(o => o.FolderId == id).Where(obj => obj.DocumentName.Contains(value) && obj.IsDeleted == false);
            return Ok(result);
        }

        // POST: api/Documents
        [HttpPost]
        public IActionResult Post([FromBody] DocumentsRequest value)
        {
            Documents doc = new Documents
            {
                DocumentName = value.DocumentName,
                ContentType = value.ContentType,
                Size = value.Size,
                CreatedBy = value.CreatedBy,
                CreatedAt = value.CreatedAt,
                FolderId = value.FolderId,
                IsDeleted = value.IsDeleted
            };

            _cg.Documents.Add(doc);
            _cg.SaveChanges();

            return Ok();
        }
        [HttpPost]
        [Route("upload/{createdAt}/{createdBy}/{folderId}")]
        public async Task<ActionResult> Upload(List<IFormFile> files, DateTime createdAt, int createdBy, int folderId)
        {
            long size = files.Sum(f => f.Length);

            var rootPath = Path.Combine(_env.ContentRootPath, "Resources", "Documents");

            if (!Directory.Exists(rootPath))
                Directory.CreateDirectory(rootPath);
            foreach (var file in files)
            {
                var filePath = Path.Combine(rootPath, file.FileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    var document = new Documents
                    {
                        DocumentName = file.FileName,
                        ContentType = file.ContentType,
                        Size = Convert.ToInt32(file.Length),
                        CreatedAt = createdAt,
                        CreatedBy = createdBy,
                        FolderId = folderId,
                        IsDeleted = false
                    };

                    await file.CopyToAsync(stream);
                    _cg.Documents.Add(document);
                    await _cg.SaveChangesAsync();
                }
            }
            return Ok(new { count = files.Count, size });
        }

        [HttpPost]
        [Route("download/{id}")]
        public ActionResult Download(int id)
        {
            int m = 0;
            try
            {
                var provider = new FileExtensionContentTypeProvider();
                var document = _cg.Documents.FirstOrDefault(o => o.DocumentId == id);
                if (document == null)
                    return NotFound();
                var file = Path.Combine(_env.ContentRootPath, "Resources", "Documents", document.DocumentName);
                string contentType;
                if (!provider.TryGetContentType(file, out contentType))
                {
                    contentType = "application/octet-stream";
                }

                byte[] fileBytes;
                if (System.IO.File.Exists(file))
                {
                    fileBytes = System.IO.File.ReadAllBytes(file);
                }
                else
                {
                    return NotFound();
                }
                return File(fileBytes, contentType, document.DocumentName);
            }
            catch (Exception)
            {
                m = 404;
                return StatusCode(m);
            }
        }

        //Soft Delete
        [HttpPut("{id}")]
        public IActionResult Put(int id)
        {
            int m = 0;
            try
            {
                var newobj = _cg.Documents.First(obj => obj.DocumentId == id);
                newobj.IsDeleted = true;
                _cg.Documents.Update(newobj);
                _cg.SaveChanges();
                m = 200;
            }
            catch (Exception)
            {
                m = 404;
            }
            return StatusCode(m);
        }

        //Undelete
        [HttpPut("Undelete/{id}")]
        public IActionResult RemoveDelete(int id)
        {
            int m = 0;
            try
            {
                var newobj = _cg.Documents.First(obj => obj.DocumentId == id);
                newobj.IsDeleted = false;
                _cg.Documents.Update(newobj);
                _cg.SaveChanges();
                m = 200;
            }
            catch (Exception)
            {
                m = 404;
            }
            return StatusCode(m);
        }

        [HttpGet("favourite/{id}")]
        public IActionResult ShowFavourite(int id)
        {
            try
            {
                var result = _cg.Documents.Where(o => o.IsFavorite == true && o.FolderId == id && o.IsDeleted == false);
                return Ok(result);
            }
            catch (Exception)
            {
                return null;
            }
        }

        //Trash
        [HttpGet("Trash/{id}")]
        public IActionResult ShowTrash(int id)
        {
            try
            {
                var result = _cg.Documents.Where(o => o.IsDeleted == true && o.FolderId == id);
                return Ok(result);
            }
            catch (Exception)
            {
                return null;
            }
        }

        //Favorite
        [HttpPut("favourite/{id}")]
        public IActionResult PutFavourite(int id)
        {
            int m = 0;
            try
            {
                var newobj = _cg.Documents.First(obj => obj.DocumentId == id);
                newobj.IsFavorite= true;
                _cg.Documents.Update(newobj);
                _cg.SaveChanges();
                m = 200;
            }
            catch (Exception)
            {
                m = 404;
            }
            return StatusCode(m);
        }

        //Remove Fav
        [HttpPut("Removefav/{id}")]
        public IActionResult RemoveFavourite(int id)
        {
            int m = 0;
            try
            {
                var newobj = _cg.Documents.First(obj => obj.DocumentId == id);
                newobj.IsFavorite = false;
                _cg.Documents.Update(newobj);
                _cg.SaveChanges();
                m = 200;
            }
            catch (Exception)
            {
                m = 404;
            }
            return StatusCode(m);
        }

        //Recents
        [HttpGet("Recent/{userId}/{folderId}/{time}")]
        public IActionResult ShowRecent(int userId, int folderId, int time)
        {
            int m = 0;
            try
            {
                if (time == 1)
                {
                    var createdAt = DateTime.Now.AddMinutes(-60);
                    var res = _cg.Documents.Where(o => o.CreatedAt >= createdAt && o.CreatedBy == userId && o.FolderId == folderId);
                    return Ok(res);
                }
                else if (time == 30)
                {
                    var createdAt = DateTime.Now.AddMinutes(-30);
                    var res = _cg.Documents.Where(o => o.CreatedAt >= createdAt && o.CreatedBy == userId && o.FolderId == folderId);
                    return Ok(res);
                }
                else
                {
                    var createdAt = DateTime.Now.AddMinutes(-15);
                    var res = _cg.Documents.Where(o => o.CreatedAt >= createdAt && o.CreatedBy == userId && o.FolderId == folderId);
                    return Ok(res);
                }

            }
            catch (Exception)
            {
                m = 404;
                return StatusCode(m);
            }
        }
    }
}
