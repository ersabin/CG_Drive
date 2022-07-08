using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cg_drive.RequestModel
{
    public class DocumentsRequest
    {
        public string DocumentName { get; set; }
        public string ContentType { get; set; }
        public long? Size { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedAt { get; set; }
        public int? FolderId { get; set; }
        public bool? IsDeleted { get; set; }
    }
}
