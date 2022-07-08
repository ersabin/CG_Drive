using System;
using System.Collections.Generic;

namespace cg_drive.Models
{
    public partial class Documents
    {
        public int DocumentId { get; set; }
        public string DocumentName { get; set; }
        public string ContentType { get; set; }
        public long? Size { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedAt { get; set; }
        public int? FolderId { get; set; }
        public bool? IsDeleted { get; set; }
        public bool? IsFavorite { get; set; }
        public Users CreatedByNavigation { get; set; }
        public Folders Folder { get; set; }
    }
}
