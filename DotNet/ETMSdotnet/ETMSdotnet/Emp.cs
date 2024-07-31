namespace ETMSdotnet
{
    public class Emp
    {
        int id {  get; set; }
        public string name { get; set; }
        public Emp() { 
            id = 0;
            name = "";
        }
       
        public Emp(int id, string name)
        {
            this.id = id;
            this.name = name;
                
        }
    }
}
