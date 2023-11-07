using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

// Base API Controller
// Using the ApiController attribute offers functions like validation
[ApiController]
[Route("api/[controller]")]
public class BaseApiController : ControllerBase
{

}
