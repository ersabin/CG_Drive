using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cg_drive.RequestModel
{
    public class FoldersRequest
    {
        public string FolderName { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedAt { get; set; }
        public bool? IsDeleted { get; set; }
        public int FolderId { get; set; }
    }
}
