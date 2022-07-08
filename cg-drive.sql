CREATE DATABASE [cg-drive]


CREATE TABLE Users (
	UserID int primary key identity(1, 1) foreign key references Users(UserID),
	Username varchar(100) not null,
	Password varchar(100) not null,
	CreatedAt datetime
)

CREATE TABLE Folders (
	FolderID int primary key identity(1, 1) foreign key references Folders(FolderID),
	FolderName varchar(100),
	CreatedBy int,
	CreatedAt datetime,
	IsDeleted bit,
	IsFavorite bit not null default 'false',
	constraint FK_FoldersUsers foreign key(CreatedBy)
	references Users(UserID)
)


CREATE TABLE Documents (
	DocumentID int primary key identity(1, 1),
	DocumentName varchar(100),
	ContentType varchar(100),
	Size bigint,
	CreatedBy int,
	CreatedAt datetime,
	FolderID int,
	IsDeleted bit,
	IsFavorite bit not null default 'false',
	Constraint FK_UsersDocuments foreign key (CreatedBy) 
	references Users(UserID),
	Constraint FK_FoldersDocuments foreign key (FolderID) 
	references Folders(FolderID) 
)

insert into Users (Username, Password, CreatedAt) values 
('Suyog', 'Hello', '2008-11-11 13:23:44')


insert into Documents (DocumentName, ContentType, Size, CreatedAt, IsDeleted) values 
('Movies', 'mp4', 775808, '2008-11-11 13:23:44', 0 )



insert into Folders ( FolderName, CreatedAt, IsDeleted ) values 
( 'Videos', '2008-11-11 13:23:44', 0 )