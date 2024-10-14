namespace Todo
{
    public class MachineIdService
    {
        private readonly Guid machineId;

        public MachineIdService()
        {
            this.machineId = Guid.NewGuid();
            Console.WriteLine(machineId);
        }

        public Guid MachineId {get { return machineId; } }
    }
}