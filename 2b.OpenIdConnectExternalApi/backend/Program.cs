using Duende.Bff;
using Duende.Bff.DynamicFrontends;
using Duende.Bff.Yarp;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSpaYarp();

builder.Services.AddBff(o => o.ManagementBasePath = "/account")
    .ConfigureCookies(o =>
    {
        o.Cookie.Name = "__Host-spa";
        o.Cookie.SameSite = SameSiteMode.Strict;
        o.Events.OnRedirectToLogin = (context) =>
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            return Task.CompletedTask;
        };        
    })
    .ConfigureOpenIdConnect(o =>
    {
        o.Authority = "https://localhost:5001";

        o.ClientId = "angular";
        //Store in application secrets
        o.ClientSecret = "49C1A7E1-0C79-4A89-A3D6-A37998FB86B0";
        o.ResponseType = "code";
        o.SaveTokens = true;
        o.Scope.Add("globoapi");
        o.Scope.Add("offline_access");
    })
    .AddRemoteApis()
    .AddServerSideSessions();

builder.Services.AddAuthentication(o =>
{
    o.DefaultScheme = BffAuthenticationSchemes.BffCookie;
    o.DefaultChallengeScheme = BffAuthenticationSchemes.BffOpenIdConnect;
    o.DefaultSignOutScheme = BffAuthenticationSchemes.BffOpenIdConnect;
});

var app = builder.Build();

app.UseBff();
app.MapBffManagementEndpoints();
app.MapRemoteBffApiEndpoint("/api", new Uri("https://localhost:7165"))
    .WithAccessToken();
app.UseSpaYarp();

app.Run();