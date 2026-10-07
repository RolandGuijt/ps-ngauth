namespace Globomantics.AuthApi.Repositories;

public class UserRepository
{
    private List<UserAuthZ> userAuthZs =
    [
        new()
        { ApplicationId = 1, UserId = "1", Type = "applicationrole", 
            Value = "Editor" },
        new()
        { ApplicationId = 1, UserId = "2", Type = "applicationrole", 
            Value = "Contributor" }
    ];

    public IEnumerable<UserAuthZ> GetAuthzData(int applicationId, string userId)
    {
        return userAuthZs
            .Where(us => us.UserId == userId && us.ApplicationId == applicationId);
    }
}