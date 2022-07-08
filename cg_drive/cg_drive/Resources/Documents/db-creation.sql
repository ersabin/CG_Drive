create database cg-drive;
use [cg-drive]
go

create table Users
(
					UserID int identity(1,1) primary key not null,
					Username nvarchar(100) not null unique,
					Password nvarchar(30) not null,
					CreatedAt datetime default(GetDate())
)

create table Folders
(
					FolderID int identity(1,1) primary key not null,
					FolderName varchar(100),
					CreatedBy int FOREIGN KEY REFERENCES users(UserID),
					CreatedAt smalldatetime default(GETDATE()),
					IsDeleted bit default 'false',
					IsFavourite bit default 'false'
)
create table Documents
(
						DocumentID int identity(1,1) primary key not null,
						DocumentName varchar(100),
						ContentType varchar(100),
						Size bigint,
						CreatedBy int FOREIGN KEY REFERENCES users(UserID),
						FolderId int FOREIGN KEY REFERENCES Folders(FolderId),
						CreatedAt datetime default(GETDATE()),
						IsDeleted bit default 'false',
						FavouriteFiles bit default 'false'
)
insert into Users values
('Suyog','Hello',GETDATE())
insert into Folders values
('Hello','2',GETDATE(),0,0)
insert into Documents values
('File1','text',2019,1,1,GETDATE(),0,0)

select * from Users