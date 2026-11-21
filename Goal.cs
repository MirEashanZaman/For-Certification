using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace CommBank.Models;

public class Goal
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    public string? Name { get; set; }

    public ulong TargetAmount { get; set; }

    public ulong Balance { get; set; }

    public DateTime Created { get; set; } = DateTime.Now;

    public DateTime TargetDate { get; set; }

    public string? Icon { get; set; }
}
