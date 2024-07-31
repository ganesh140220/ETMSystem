using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ETMSdotnet.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EtmsController : ControllerBase
    {
        static List<Emp> list=new List<Emp>() { };


        // GET: Etms/getEmp?id=5
        [HttpGet("getEmp")]
        public IEnumerable<Emp> getAll(int id)
        {
            return list;
        }

        // GET Etms/getEmp/5
        [HttpGet("getEmp/{id}")]
        public string getid(int id)
        {
            return ""+id;
        }

        // POST Etms/setEmp
        [HttpPost("setEmp")]
        public void Post([FromBody] Emp obj)
        {

        }

    }
}
