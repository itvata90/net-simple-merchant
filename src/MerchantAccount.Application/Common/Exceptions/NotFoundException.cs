namespace MerchantAccount.Application.Common.Exceptions;

public class NotFoundException : Exception
{
	public NotFoundException(string name, object key)
		: base($"Entity \"{name}\n ({key}) was not found.")
	{
	}
}