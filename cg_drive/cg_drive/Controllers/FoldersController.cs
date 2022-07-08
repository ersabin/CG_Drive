using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using cg_drive.Models;
using cg_drive.RequestModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace cg_drive.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoldersController : ControllerBase
    {
        private readonly CgdriveContext _cg;
        public FoldersController(CgdriveContext data)
        {
            _cg = data;
        }
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var folders = _cg.Folders;
                return Ok(folders);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                "Error retrieving data from the database");
            }
        }
        [HttpGet("{id:int}")]
        public IActionResult Get(int id)
        {
            try
            {
                var result = _cg.Folders.Where(o => o.CreatedBy == id);
                if (result == null) return NotFound();
                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                "Error retrieving data from the database");
            }
        }

        //POST: api/Folders
        [HttpPost]
        public IActionResult PostFolder([FromBody] FoldersRequest value)
        {
            Folders obj = new Folders();

            obj.FolderName = value.FolderName;
            obj.CreatedBy = value.CreatedBy;
            obj.CreatedAt = value.CreatedAt;
            obj.IsDeleted = value.IsDeleted;

            _cg.Folders.Add(obj);
            _cg.SaveChanges();
            return Ok();
        }

        [HttpGet("{id}/{value}")]
        public IActionResult Get(int id, string value)
        {
            var result = _cg.Folders.Where(obj => obj.FolderName.Contains(value));
            return Ok(result);
        }      

        //Soft Delete the Folder
        [HttpPut("SoftDeleted/{id}")]
        public IActionResult Put(int id)
        {
            int m = 0;
            try
            {
                var res = _cg.Documents.Where(o => o.FolderId == id).ToList();
                foreach (var obj in res)
                {
                    obj.IsDeleted = true;
                    _cg.Documents.Update(obj);
                    _cg.SaveChanges();

                }
                var newobj = _cg.Folders.First(obj => obj.FolderId == id);
                newobj.IsDeleted = true;
                _cg.Folders.Update(newobj);
                _cg.SaveChanges();
                m = 200;
            }
            catch (Exception)
            {
                m = 404;
            }
            return StatusCode(m);
        }

        //Undelete the Folder
        [HttpPut("Undelete/{id}")]
        public IActionResult RemoveDelete(int id)
        {
            int m = 0;
            try
            {
                var res = _cg.Documents.Where(o => o.FolderId == id).ToList();
                foreach (var objj in res)
                {
                    objj.IsDeleted = false;
                    _cg.Documents.Update(objj);
                    _cg.SaveChanges();

                }
                var newobj = _cg.Folders.First(obj => obj.FolderId == id);
                newobj.IsDeleted = false;
                _cg.Folders.Update(newobj);
                _cg.SaveChanges();
                m = 200;
            }
            catch (Exception)
            {
                m = 404;
            }
            return StatusCode(m);
        }
        //Add Favorite
        [HttpPut("favourite/{id}")]
        public IActionResult PutFavourite(int id)
        {
            int m = 0;
            try
            {

                var res = _cg.Documents.Where(o => o.FolderId == id).ToList();
                foreach (var obj in res)
                {
                    obj.IsFavorite = true;
                    _cg.Documents.Update(obj);
                    _cg.SaveChanges();

                }
                var newobj = _cg.Folders.First(obj => obj.FolderId == id);
                newobj.IsFavorite = true;
                _cg.Folders.Update(newobj);
                _cg.SaveChanges();
                m = 200;
            }
            catch (Exception)
            {
                m = 404;
            }
            return StatusCode(m);
        }

        //Remove Favorite
        [HttpPut("Removefav/{id}")]
        public IActionResult RemoveFavourite(int id)
        {
            int m = 0;
            try
            {
                var res = _cg.Documents.Where(o => o.FolderId == id).ToList();
                foreach (var objj in res)
                {
                    objj.IsFavorite = false;
                    _cg.Documents.Update(objj);
                    _cg.SaveChanges();

                }
                var newobj = _cg.Folders.First(obj => obj.FolderId == id);
                newobj.IsFavorite = false;
                _cg.Folders.Update(newobj);
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
        [HttpGet("Recent/{userId}/{time}")]
        public IActionResult showRecent(int userId, int time)
        {
            int m = 0;
            try
            {
                if (time == 1)
                {
                    var createdAt = DateTime.Now.AddMinutes(-60);
                    var res = _cg.Folders.Where(o => o.CreatedAt >= createdAt && o.CreatedBy == userId);
                    return Ok(res);
                }
                else if (time == 30)
                {
                    var createdAt = DateTime.Now.AddMinutes(-30);
                    var res = _cg.Folders.Where(o => o.CreatedAt >= createdAt && o.CreatedBy == userId);
                    return Ok(res);
                }
                else
                {
                    var createdAt = DateTime.Now.AddMinutes(-15);
                    var res = _cg.Folders.Where(o => o.CreatedAt >= createdAt && o.CreatedBy == userId);
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
