using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace cg_drive.Models
{
    public partial class CgdriveContext : DbContext
    {
        public CgdriveContext()
        {
        }

        public CgdriveContext(DbContextOptions<CgdriveContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Documents> Documents { get; set; }
        public virtual DbSet<Folders> Folders { get; set; }
        public virtual DbSet<Users> Users { get; set; }

        // Unable to generate entity type for table 'dbo.Anything'. Please see the warning messages.

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=.\\SQLEXPRESS;Database=cg-drive;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Documents>(entity =>
            {
                entity.HasKey(e => e.DocumentId);

                entity.Property(e => e.DocumentId).HasColumnName("DocumentID");

                entity.Property(e => e.ContentType)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedAt).HasColumnType("datetime");

                entity.Property(e => e.DocumentName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.FolderId).HasColumnName("FolderID");

                entity.Property(e => e.IsFavorite).HasDefaultValueSql("((0))");

                entity.Property(e => e.IsDeleted).HasDefaultValueSql("((0))");

                entity.HasOne(d => d.CreatedByNavigation)
                    .WithMany(p => p.Documents)
                    .HasForeignKey(d => d.CreatedBy)
                    .HasConstraintName("FK_DocumentUser");

                entity.HasOne(d => d.Folder)
                    .WithMany(p => p.Documents)
                    .HasForeignKey(d => d.FolderId)
                    .HasConstraintName("FK_DocumentFolder");


            });

            modelBuilder.Entity<Folders>(entity =>
            {
                entity.HasKey(e => e.FolderId);

                entity.Property(e => e.FolderId).HasColumnName("FolderID");

                entity.Property(e => e.CreatedAt).HasColumnType("datetime");

                entity.Property(e => e.IsFavorite).HasDefaultValueSql("((0))");

                entity.Property(e => e.IsDeleted).HasDefaultValueSql("((0))");

                entity.Property(e => e.FolderName)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.CreatedByNavigation)
                    .WithMany(p => p.Folders)
                    .HasForeignKey(d => d.CreatedBy)
                    .HasConstraintName("FK_FolderUser");
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.HasKey(e => e.UserId);

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.Property(e => e.CreatedAt).HasColumnType("datetime");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });
        }
    }
}
