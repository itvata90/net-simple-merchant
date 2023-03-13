using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using MerchantAccount.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace MerchantAccount.Persistence.Interceptors;

public sealed class UpdateAuditableEntitiesInterceptor : SaveChangesInterceptor
{
	public override ValueTask<InterceptionResult<int>> SavingChangesAsync(
		DbContextEventData eventData,
		InterceptionResult<int> result,
		CancellationToken cancellationToken = default)

	{
		DbContext? dbContext = eventData.Context;

		if (dbContext == null)
		{
			return base.SavingChangesAsync(eventData, result, cancellationToken);
		}

		IEnumerable<EntityEntry<IAuditableEntity>> entries = dbContext.ChangeTracker.Entries<IAuditableEntity>();

		foreach (EntityEntry<IAuditableEntity> entry in entries)
		{
			if (entry.State == EntityState.Added)
			{
				entry.Property(_ => _.CreatedOnUtc).CurrentValue = DateTime.UtcNow;
			}

			if (entry.State == EntityState.Modified)
			{
				entry.Property(_ => _.ModifiedOnUtc).CurrentValue = DateTime.UtcNow;
			}
		}

		return base.SavingChangesAsync(eventData, result, cancellationToken);
	}
}