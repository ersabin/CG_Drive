CREATE DATABASE employeeDB
Go

CREATE TABLE Employee_Project (
	ProjectID int not null primary key identity(200,10),
	ProjectName varchar(15) not null,
	CreatedBy varchar(30) not null,
	CreatedAt datetime not null default(GETDATE()),
	UpdatedBy varchar(30),
	UpdatedAt datetime,
	IsActive bit default 1,
	IsDeleted bit default 0
)
Go

CREATE TABLE EmployeeDetails (
	EmployeeID int not null primary key identity(100,5),
	FirstName varchar(30) not null,
	MiddleName varchar(30),
	LastName varchar(30),
	Date_Of_Birth date not null,
	Age int,
	Phone_Number varchar(12),
	Mobile_Number bigint not null unique,
	Email varchar(319) not null unique,
	CreatedBy varchar(30) not null,
	CreatedAt datetime not null default(GETDATE()),
	UpdatedBy varchar(30),
	UpdatedAt datetime,
	IsActive bit default 1,
	IsDeleted bit default 0,
	ProjectID int not null,
	foreign key (ProjectID) references Employee_Project(ProjectID)
)

use[employeeDB]
go

/* STORED PROCEDURE TO INSERT*/
CREATE PROCEDURE prc_InsertProjectDetails
	@ProjectName varchar(15),
	@CreatedBy varchar(30),
	@UpdatedBy varchar(30)=null,
	@UpdatedAt datetime=null,
	@IsActive bit=1,
	@IsDeleted bit=0
AS
Begin
Set NOCOUNT ON;
INSERT INTO Employee_Project
(
	ProjectName,
	CreatedBy,
	UpdatedBy,
	UpdatedAt,
	IsActive,
	IsDeleted
)
VALUES
(
	@projectname,
	@createdby,
	@updatedby,
	@isactive,
	@isdeleted
)
end
Go

EXEC prc_InsertProjectDetails @ProjectName='Cell Energy',@CreatedBy='M6'
GO

/* STORED PROCEDURE TO GET*/
CREATE PROCEDURE prc_GetEmployeeProject
	@ProjectID int
as
begin
SET NOCOUNT ON;
SELECT 
	ProjectID,	
	ProjectName, 
	IsActive,
	CASE 
	When IsActive != 1 then 'Not Active' 
	When IsActive = 1 then 'Active'
	Else 'Not Active'
	End as IsActive
 
 FROM Employee_Project where ProjectID=@ProjectID
 END
GO

EXEC prc_GetEmployeeProject 
	@ProjectID=210
Go

/* STORED PROCEDURE TO UPDATE*/
CREATE PROCEDURE prc_UpdateEmployeeProjectDetails
	@ProjectID int,
	@ProjectName varchar(30),
	@UpdatedBy varchar(30)
as
begin
set nocount on;
UPDATE Employee_Project 
	SET 
	ProjectName = @ProjectName,		
	UpdatedBy = @UpdatedBy
	WHERE ProjectID=@ProjectID
end
GO
Exec prc_UpdateEmployeeProjectDetails 
	@ProjectName = 'Mediafire',		
	@UpdatedBy='John', @ProjectID=200
Go


/* STORED PROCEDURE TO DELETE*/
CREATE PROCEDURE prc_DeleteProjectDetails
	@ProjectID int,
	@IsActive bit,
	@IsDeleted bit
as
begin
set NOCOUNT on;
Update Employee_Project 
	SET 
	IsActive = @IsActive, 
	IsDeleted = @IsDeleted 
	WHERE ProjectID=@ProjectID
end
go

EXEC prc_DeleteProjectDetails  
	@IsActive = 0, 
	@IsDeleted = 1, 
	@ProjectID=200
Go

/* STORED PROCEDURE To INSERT Record */
CREATE PROCEDURE prc_InsertEmployeeDetails
	@FirstName varchar(30),
	@MiddleName varchar(30)=null,
	@LastName varchar(30)=null,
	@Date_Of_Birth date,
	@Age int=null,
	@Phone_Number varchar(12)=null,
	@Mobile_Number bigint,
	@Email varchar(319),
	@CreatedBy varchar(30),
	@UpdatedBy varchar(30)=null,
	@UpdatedAt datetime=null,
	@IsActive bit=1,
	@IsDeleted bit=0,
	@ProjectID int
AS
Begin
Set NOCOUNT ON;
INSERT EmployeeDetails
(
	FirstName, 
	MiddleName, 
	LastName, 
	Date_Of_Birth,Age, 
	Phone_Number, 
	Mobile_Number, 
	Email, 
	CreatedBy, 
	UpdatedBy,
	UpdatedAt, 
	IsActive,
	IsDeleted, 
	ProjectID
)
VALUES
(
	@FirstName,
	@MiddleName,
	@LastName,
	@Date_Of_Birth,
	@Age,
	@Phone_Number,
	@Mobile_Number,
	@Email,
	@CreatedBy,
	@UpdatedBy,
	@UpdatedAt,
	@IsActive,
	@IsDeleted,
	@ProjectID)
end
Go



EXEC prc_InsertEmployeeDetails 
	@FirstName='Tom',
	@LastName='Cruise',
	@age=30,
	@Date_Of_Birth='2000-03-09',
	@Mobile_Number=123456789,
	@Email='abc@nv.com',
	@CreatedBy='John',
	@ProjectID = 200;
Go


/* STORED PROCEDURE To FETCH Records*/
CREATE PROCEDURE prc_GetEmployeeDetails
@EmployeeID int
as
begin
Set NOCOUNT ON;

select ed.EmployeeID, ed.FirstName, ed.MiddleName, ed.LastName, 
ed.Date_Of_Birth, ed.Age, ed.Phone_Number, ed.Mobile_Number, 
ed.Email, ed.ProjectID ,

CASE 
When ed.IsActive != 1 then 'Not Active' 
When ed.IsActive = 1 then 'ACtive'
Else 'Not Active'
End as IsActive


from EmployeeDetails ed
join Employee_Project ep on ed.ProjectID = ep.ProjectID
where ed.EmployeeID = 100


end
GO

EXEC prc_GetEmployeeDetails @EmployeeID = 100
Go

/* STORED PROCEDURE To UPDATE Record*/
CREATE PROCEDURE prc_UpdateEmployeeDetails
	@EmployeeID int,
	@Mobile_Number bigint,
	@UpdatedBy varchar(30),
	@IsActive bit
As
begin
Set NOCOUNT ON;
Update EmployeeDetails 
SET 
	Mobile_Number = @Mobile_Number,	
	UpdatedBy=@UpdatedBy,
	IsActive=@IsActive 
	where EmployeeID=@EmployeeID
end
Go
EXEC prc_UpdateEmployeeDetails 
	@Mobile_Number=7876487814,
	@UpdatedBy='Harry',
	@IsActive=1, 
	@EmployeeID=100
Go


/* STORED PROCEDURE To DELETE Record */
CREATE PROCEDURE prc_DeleteEmployeeDetails
	@EmployeeID int,
	@IsActive bit,
	@IsDeleted bit
as
begin
Set NOCOUNT ON;
Update EmployeeDetails 
SET 
	IsDeleted = @IsDeleted,		
	IsActive = @IsActive 
	where EmployeeID=@EmployeeID
end
Go
Exec prc_DeleteEmployeeDetails 
	@IsDeleted = 1,
	@IsActive = 0, 
	@EmployeeID=100
Go
