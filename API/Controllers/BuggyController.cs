using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API;

public class BuggyController : BaseApiController
{
    private readonly DataContext _context;
    public BuggyController(DataContext context)
    {
        _context = context;
    }

    [Authorize]
    [HttpGet("auth")]
    public ActionResult<string> GetSecret()
    {
        return "secret text";
    }

    [HttpGet("not-found")]
    public ActionResult<AppUser> GetNotFound()
    {
        var thing = _context.Users.Find(-1);

        if (thing == null) return NotFound();

        return thing;
    }

    [HttpGet("server-error")]
    public ActionResult<string> GetServerError()
    {

        // Rather than using try catch blocks to manage every exception,
        // We can create our own middleware to do so, at the highest level.
        // try
        // {
        //     var thing = _context.Users.Find(-1);
        //     var thingToReturn = thing.ToString();
        //     return thingToReturn;
        // }
        // catch(Exception ex)
        // {
        //     return StatusCode(500, "Computer Says No!");
        // }

        var thing = _context.Users.Find(-1);

        var thingToReturn = thing.ToString();

        return thingToReturn;
    }

    [HttpGet("bad-request")]
    public ActionResult<string> GetBadRequest()
    {
        return BadRequest("This was not a good request");
    }

}
