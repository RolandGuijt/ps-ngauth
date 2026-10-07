using System.Net.Http.Headers;
using Duende.Bff;
using Duende.Bff.Endpoints;
using Microsoft.AspNetCore.Authentication;

namespace Globomantics.Backend;

public class GloboUserService(IHttpClientFactory httpClientFactory, 
  IHttpContextAccessor httpContextAccessor): 
  IUserEndpointClaimsEnricher {
  private readonly IHttpClientFactory httpClientFactory = httpClientFactory;
  private readonly IHttpContextAccessor httpContextAccessor = httpContextAccessor;

  private async Task<ClaimRecord[]?> GetAuthzData()
  {
      var token = await httpContextAccessor.HttpContext.GetTokenAsync("access_token");
      var http = httpClientFactory.CreateClient();
      http.BaseAddress = new Uri("https://localhost:7280");
      http.DefaultRequestHeaders.Authorization = 
        new AuthenticationHeaderValue("Bearer", token);
      var result = await http.GetAsync("/user/authzdata/1");
      result.EnsureSuccessStatusCode();
      return await result.Content.ReadFromJsonAsync<ClaimRecord[]>();
  }

  public async Task<IReadOnlyList<ClaimRecord>> EnrichClaimsAsync(AuthenticateResult authenticateResult, IReadOnlyList<ClaimRecord> claims,
    CancellationToken ct = new())
  {
    var extraClaims = await GetAuthzData();
    return [.. claims, .. extraClaims];
  }
}