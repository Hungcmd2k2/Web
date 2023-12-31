USE [MoneyManager]
GO
/****** Object:  Table [dbo].[Giaodich]    Script Date: 12/21/2023 2:47:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Giaodich](
	[magd] [int] IDENTITY(1,1) NOT NULL,
	[nhomgd] [nvarchar](255) NULL,
	[tengd] [nvarchar](255) NULL,
	[ngaygd] [date] NULL,
	[thoigiangd] [time](7) NULL,
	[sotiengd] [decimal](18, 2) NULL,
	[ghichu] [nvarchar](255) NULL,
	[userid] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[magd] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Money]    Script Date: 12/21/2023 2:47:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Money](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[sodu] [decimal](18, 2) NULL,
	[khoanthu] [decimal](18, 2) NULL,
	[khoanchi] [decimal](18, 2) NULL,
	[userid] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 12/21/2023 2:47:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[username] [varchar](255) NOT NULL,
	[password] [varchar](255) NOT NULL,
	[name] [nvarchar](255) NOT NULL,
	[phonenumber] [varchar](20) NULL,
	[address] [nvarchar](255) NULL,
	[email] [varchar](255) NULL,
	[money] [decimal](18, 2) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Giaodich] ON 

INSERT [dbo].[Giaodich] ([magd], [nhomgd], [tengd], [ngaygd], [thoigiangd], [sotiengd], [ghichu], [userid]) VALUES (100, N'khoanchi', N'anuong', CAST(N'2023-12-19' AS Date), CAST(N'06:00:23' AS Time), CAST(100.00 AS Decimal(18, 2)), N'Khác cc', 1)
INSERT [dbo].[Giaodich] ([magd], [nhomgd], [tengd], [ngaygd], [thoigiangd], [sotiengd], [ghichu], [userid]) VALUES (106, N'Khoản chi', N'Ăn uống', CAST(N'2023-12-20' AS Date), CAST(N'22:46:23' AS Time), CAST(100000.00 AS Decimal(18, 2)), N'hihihh', NULL)
INSERT [dbo].[Giaodich] ([magd], [nhomgd], [tengd], [ngaygd], [thoigiangd], [sotiengd], [ghichu], [userid]) VALUES (107, N'Khoản chi', N'Ăn uống', CAST(N'2023-12-20' AS Date), CAST(N'23:30:41' AS Time), CAST(1000.00 AS Decimal(18, 2)), N'hihihi', 1)
INSERT [dbo].[Giaodich] ([magd], [nhomgd], [tengd], [ngaygd], [thoigiangd], [sotiengd], [ghichu], [userid]) VALUES (108, N'khoanthu', N'luong', CAST(N'2023-12-20' AS Date), CAST(N'23:31:18' AS Time), CAST(100.00 AS Decimal(18, 2)), N'lên cc', 1)
INSERT [dbo].[Giaodich] ([magd], [nhomgd], [tengd], [ngaygd], [thoigiangd], [sotiengd], [ghichu], [userid]) VALUES (109, N'Khoản chi', N'Ăn uống', CAST(N'2023-12-20' AS Date), CAST(N'23:37:10' AS Time), CAST(100.00 AS Decimal(18, 2)), N'1', 4)
INSERT [dbo].[Giaodich] ([magd], [nhomgd], [tengd], [ngaygd], [thoigiangd], [sotiengd], [ghichu], [userid]) VALUES (110, N'Khoản thu', N'Tiền chuyển đến', CAST(N'2023-12-22' AS Date), CAST(N'23:40:40' AS Time), CAST(100.00 AS Decimal(18, 2)), N'thuhuhuu', 1)
SET IDENTITY_INSERT [dbo].[Giaodich] OFF
GO
SET IDENTITY_INSERT [dbo].[Money] ON 

INSERT [dbo].[Money] ([id], [sodu], [khoanthu], [khoanchi], [userid]) VALUES (19, CAST(0.00 AS Decimal(18, 2)), CAST(2400.00 AS Decimal(18, 2)), CAST(2211.00 AS Decimal(18, 2)), 1)
INSERT [dbo].[Money] ([id], [sodu], [khoanthu], [khoanchi], [userid]) VALUES (22, CAST(-100.00 AS Decimal(18, 2)), CAST(0.00 AS Decimal(18, 2)), CAST(100.00 AS Decimal(18, 2)), 4)
SET IDENTITY_INSERT [dbo].[Money] OFF
GO
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([id], [username], [password], [name], [phonenumber], [address], [email], [money]) VALUES (1, N'admin', N'admin', N'Đặng Xuân Hùng', N'0385075202', N'Thái Bình', N'hungdang16042002@gmail.com', NULL)
INSERT [dbo].[Users] ([id], [username], [password], [name], [phonenumber], [address], [email], [money]) VALUES (4, N'admin4', N'admin', N'hung2', N'12323232', N'12121212', N'1212121', NULL)
SET IDENTITY_INSERT [dbo].[Users] OFF
GO
ALTER TABLE [dbo].[Giaodich]  WITH CHECK ADD  CONSTRAINT [FK__Giaodich__userid__4BAC3F29] FOREIGN KEY([userid])
REFERENCES [dbo].[Users] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Giaodich] CHECK CONSTRAINT [FK__Giaodich__userid__4BAC3F29]
GO
ALTER TABLE [dbo].[Money]  WITH CHECK ADD  CONSTRAINT [FK__Money__userid__4E88ABD4] FOREIGN KEY([userid])
REFERENCES [dbo].[Users] ([id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Money] CHECK CONSTRAINT [FK__Money__userid__4E88ABD4]
GO
