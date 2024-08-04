
using ETMSystem;
using ETMSystem.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ETMS.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ETMSController : ControllerBase
    {
        /*EtmsystemContext eContext;
        
       public ETMSController(EtmsystemContext etmsystemContext)
        {
            this.eContext = etmsystemContext; 
        }
*/
         List<Login> list = new List<Login>() { };


        // GET: Etms/getAllEmpFromLogin
        [HttpGet("getAllEmp")]
        public List<Login> getAllEmp()
        {
            using (var db = new EtmsystemContext())
            {

                //db.logins has Employee and Role but due to cyclic reaction of json we have excluded it
                //for that for once we have to include them for first time to get data
                list = db.Logins.Include(o=>o.Employee).Include(o => o.Role).ToList();

                return list;

            }
           
        }


        
        [HttpPost("validate")]
        public object validate([FromBody]UidAndPwd obj)
        {
           
            using (var db = new EtmsystemContext())
            {
                
                Login EmpLogin=db.Logins.Include(o => o.Role).Include(o=>o.Employee).Where(o=>o.Username.Equals(obj.uid)).FirstOrDefault();
                
                if (EmpLogin == null) return new Error("Enter valid username");
		        if (EmpLogin.Active != 0) return new Error("This account is currently suspended");
		        if (EmpLogin!=null && EmpLogin.Password.Equals(obj.pwd)) return EmpLogin;
		        return new Error("Enter valid Password"); 

            }

        }
       
    }
}
