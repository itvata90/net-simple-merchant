using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace MerchantAccount.Persistence.Migrations
{
	/// <inheritdoc />
	public partial class InitialCreate : Migration
	{
		/// <inheritdoc />
		protected override void Up(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.CreateTable(
				name: "Members",
				columns: table => new
				{
					Id = table.Column<int>(type: "integer", nullable: false)
						.Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
					Username = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
					FirstName = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
					LastName = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
					MerchantId = table.Column<int>(type: "integer", nullable: true),
					CreatedOnUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
					ModifiedOnUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_Members", x => x.Id);
				});

			migrationBuilder.CreateTable(
				name: "MemberDetails",
				columns: table => new
				{
					Id = table.Column<int>(type: "integer", nullable: false)
						.Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
					BirthDate = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
					Nationality = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
					Province = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
					District = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
					Street = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
					Email = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
					Phone = table.Column<string>(type: "text", nullable: false),
					MemberId = table.Column<int>(type: "integer", nullable: false),
					CreatedOnUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
					ModifiedOnUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_MemberDetails", x => x.Id);
					table.ForeignKey(
						name: "FK_MemberDetails_Members_MemberId",
						column: x => x.MemberId,
						principalTable: "Members",
						principalColumn: "Id",
						onDelete: ReferentialAction.Cascade);
				});

			migrationBuilder.CreateTable(
				name: "Merchants",
				columns: table => new
				{
					Id = table.Column<int>(type: "integer", nullable: false)
						.Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
					Name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
					Province = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
					District = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
					Street = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
					Email = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
					Phone = table.Column<string>(type: "text", nullable: false),
					OwnerId = table.Column<int>(type: "integer", nullable: false),
					Status = table.Column<string>(type: "text", nullable: false),
					CreatedOnUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
					ModifiedOnUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
				},
				constraints: table =>
				{
					table.PrimaryKey("PK_Merchants", x => x.Id);
					table.ForeignKey(
						name: "FK_Merchants_Members_OwnerId",
						column: x => x.OwnerId,
						principalTable: "Members",
						principalColumn: "Id",
						onDelete: ReferentialAction.Cascade);
				});

			migrationBuilder.CreateIndex(
				name: "IX_MemberDetails_MemberId",
				table: "MemberDetails",
				column: "MemberId",
				unique: true);

			migrationBuilder.CreateIndex(
				name: "IX_Merchants_OwnerId",
				table: "Merchants",
				column: "OwnerId",
				unique: true);
		}

		/// <inheritdoc />
		protected override void Down(MigrationBuilder migrationBuilder)
		{
			migrationBuilder.DropTable(
				name: "MemberDetails");

			migrationBuilder.DropTable(
				name: "Merchants");

			migrationBuilder.DropTable(
				name: "Members");
		}
	}
}
