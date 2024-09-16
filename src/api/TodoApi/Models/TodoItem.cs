using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Todo.Models;
public class TodoItem
{
    [Key, DatabaseGenerated (DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    public required string Text { get; set; }
}