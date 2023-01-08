use Miguel2022;
go

----------------------------------------
---------------- Tablas ----------------
----------------------------------------
create table tblRole(
	Id UNIQUEIDENTIFIER primary key,
	StrName varchar(50) not null
);
go
-- insert into tblRole values ('7EC0690B-F5FA-4B11-84D0-4B8BE28E29B0', 'Alumno');
-- insert into tblRole values ((select NEWID()), 'Maestro');

create table tblTeam(
	Id UNIQUEIDENTIFIER primary key,
	StrName varchar(100) not null,
	StrMeaning varchar(100) not null,
	StrGoals varchar(200) not null
);
go

create table tblUser(
	Id UNIQUEIDENTIFIER primary key,
	RoleFk UNIQUEIDENTIFIER FOREIGN KEY REFERENCES tblRole(Id) not null,
	TeamFk UNIQUEIDENTIFIER FOREIGN KEY REFERENCES tblTeam(Id),
	StrJob varchar(100),
	StrUser varchar(100) not null,
	StrPass VarBinary(256) not null,
	StrName varchar(100) not null
);
go

create table tblGoal(
	Id UNIQUEIDENTIFIER primary key,
	UserFk UNIQUEIDENTIFIER FOREIGN KEY REFERENCES tblUser(Id) not null,
	StrGoal varchar(100) not null,
	StrColor varchar(20) not null,
	BlStatus bit default 0 not null
);
go

----------------------------------------
------ Procedimientos almacenados ------
----------------------------------------
alter procedure sp_CreateUser
	@RoleFk UNIQUEIDENTIFIER,
	@StrUser varchar(100),
	@StrPass varchar(max),
	@StrName varchar(100)
as
begin
	declare @Id uniqueidentifier;
	set @Id = (select NEWID());
	if exists(select Id from tblUser where Id = @Id or StrUser = @StrUser)
		begin
			select -1 as rpta 
			return
		end
	else 
		begin transaction tx
			begin
				insert into tblUser (Id, RoleFk, StrUser, StrPass, StrName) values(@Id, @RoleFk, @StrUser, ENCRYPTBYPASSPHRASE('N4T4L14', @StrPass), @StrName);
			end
			if(@@ERROR > 0)
				begin rollback transaction tx
					select -2 as rpta
					return
				end
			else 
				begin commit transaction tx 
					select @Id as Id
				end
				
end
go 
-- exec sp_CreateUser 'E922AB89-6AA3-4835-BA6A-CE189F0EB74A', 'admin@appescolar.com', 'qwert.12345', 'Miguel Areiza';

create procedure sp_AddTeamUser
	@Id UNIQUEIDENTIFIER,
	@TeamFk UNIQUEIDENTIFIER,
	@StrJob varchar(100)
as
begin 
	if ((select COUNT(Id) from tblUser where TeamFk = @TeamFk) = 4)
		begin 
			select -1 as rpta
			return
		end
	else 
		begin transaction tx
			begin
				update tblUser set TeamFk = @TeamFk, StrJob = @StrJob where Id = @Id;
			end
			if(@@ERROR > 0)
				begin
					rollback transaction tx
					select -1 as rpta
					return 
				end
			else 
				begin 
					commit transaction tx 
					select @Id as rpta
				end				
end
go
-- exec sp_AddTeamUser 'id', 'teamfk', 'Realator';

create procedure sp_ValidateLogin
	@User varchar(100),
	@Pass varchar(max)
as
begin
	if exists (select Id from tblUser where StrUser = @User and CONVERT(varchar(max), DECRYPTBYPASSPHRASE('N4T4L14', StrPass)) = @Pass)
		begin
			select Id, RoleFk, TeamFk, StrJob, StrUser from tblUser 
			where Id =(select Id from tblUser where StrUser = @User and CONVERT(varchar(max), DECRYPTBYPASSPHRASE('N4T4L14', StrPass)) = @Pass)
			return
		end
	else
		begin
			select -1 as rpta
		return
		end
end
go
-- exec sp_ValidateLogin 'admin@appescolar.com', 'qwert.12345';

create procedure sp_ValidateUserById
	@Id UNIQUEIDENTIFIER
as
begin
	if exists (select Id from tblUser where Id = @Id)
		begin
			select Id, RoleFk, TeamFk, StrJob, StrUser from tblUser where Id = @Id;
			return
		end
	else
		begin
			select -1 as rpta
		return
		end
end
go
-- exec sp_ValidateUserById 'E4B3AE7C-39B2-4162-B2A5-876FA9B1973D';


create procedure sp_CreateGoal
	@UserFk UNIQUEIDENTIFIER,
	@StrGoal varchar(100),
	@StrColor varchar(20)
as
begin
	declare @Id uniqueidentifier;
	set @Id = (select NEWID());
	if exists(select Id from tblGoal where StrGoal = @StrGoal and UserFk = @UserFk)
		begin
			select -1 as rpta 
			return
		end
	else 
		begin transaction tx
			begin
				insert into tblGoal values(@Id, @UserFk, @StrGoal, @StrColor, 0);
			end
			if(@@ERROR > 0)
				begin rollback transaction tx
					select -1 as rpta
					return
				end
			else 
				begin commit transaction tx 
					select * from tblGoal where UserFk = @UserFk;
				end
				
end
go 
-- exec sp_CreateGoal 'E4B3AE7C-39B2-4162-B2A5-876FA9B1973D', 'Prueba1', '555';

create procedure sp_GoalByUser
	@UserFk UNIQUEIDENTIFIER
as
begin
	if not exists(select Id from tblUser where Id = @UserFk)
		begin
			select -1 as rpta 
			return
		end
	else 
		begin
			select * from tblGoal where UserFk = @UserFk
		return
		end				
end
go 
-- exec sp_GoalByUser 'E4B3AE7C-39B2-4162-B2A5-876FA9B1973D';

create procedure sp_DeleteGoal
	@Id UNIQUEIDENTIFIER,
	@UserFk UNIQUEIDENTIFIER
as
begin
	begin transaction tx
		begin
			delete from tblGoal where Id = @Id and UserFk = @UserFk
		end
		if(@@ERROR > 0)
			begin rollback transaction tx
				select -1 as rpta
				return
			end
		else 
			begin commit transaction tx 
				select * from tblGoal where UserFk = @UserFk;
			end				
end
go 
-- exec sp_DeleteGoal 'B409C8B5-DD5B-4C9C-8AEE-347A38DF42C0', 'E4B3AE7C-39B2-4162-B2A5-876FA9B1973D';

create procedure sp_ChangeStatus
	@Id UNIQUEIDENTIFIER,
	@UserFk varchar(100)
as
begin
	if not exists(select Id from tblGoal where Id = @Id and UserFk = @UserFk)
		begin
			select -1 as rpta 
			return
		end
	else 
		begin transaction tx
			begin
				update tblGoal set BlStatus = 1  where Id = @Id and UserFk = @UserFk;
			end
			if(@@ERROR > 0)
				begin rollback transaction tx
					select -1 as rpta
					return
				end
			else 
				begin commit transaction tx 
					select * from tblGoal where UserFk = @UserFk;
				end				
end
go 
-- exec sp_ChangeStatus '3D77DBE3-6D5E-42F5-A98D-2152F12ED9B6', 'E4B3AE7C-39B2-4162-B2A5-876FA9B1973D';
