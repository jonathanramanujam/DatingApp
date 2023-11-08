using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities;

// This Attribute allows us to pluralize the table name,
// without creating a dbset, since photos are always tied to a particular user.
[Table("Photos")]
public class Photo
{
    public int Id { get; set; }
    public string Url { get; set; }
    public bool IsMain { get; set; }
    public string PublicId { get; set; }
    public int AppUserId { get; set; }
    public AppUser AppUser { get; set; }
}
