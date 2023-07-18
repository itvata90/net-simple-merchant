using MerchantAccount.Application.Interfaces;
using MerchantAccount.Persistence;

public class BaseRepository : IBaseRepository
{
	private readonly ApplicationDbContext _context;

	public BaseRepository(IApplicationDbContext context)
	{
		_context = (ApplicationDbContext)context;
	}

	public ApplicationDbContext Context { get => this._context; }

	public async Task<int> SaveChangesAsync(CancellationToken token)
	{
		return await _context.SaveChangesAsync(token);
	}
}