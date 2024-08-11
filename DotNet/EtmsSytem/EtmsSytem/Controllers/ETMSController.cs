
using EtmsSytem.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EtmsSytem.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ETMSController : ControllerBase
    {
      
        [HttpPost("validate")]
        public object validate([FromBody]UidAndPwd obj)
        {
           
            using (var db = new EtmsystemContext())
            {

                Employee EmpLogin = db.Employees.Include(e => e.Login).ThenInclude(e=>e.Role).Include(e => e.Tasks).ThenInclude(e => e.Queries).ThenInclude(e => e.Solutions).Include(e => e.Tasks).ThenInclude(e => e.TaskProgresses).Include(e => e.Login).Include(e => e.Desig).FirstOrDefault(o => o.Login.Username.Equals(obj.uid));

                if (EmpLogin == null) return new Error("Enter valid username");
		        if (EmpLogin.Login.Active != 1) return new Error("This account is currently suspended");
		        if (EmpLogin!=null && EmpLogin.Login.Password.Equals(obj.pwd)) return EmpLogin;
		        return new Error("Enter valid Password"); 

            }

        }
        [HttpGet("team")]
        public List<TeamMember> team( int pid)
        {

            using (var db = new EtmsystemContext())
            {

               List< TeamMember> team = db.TeamMembers.Include(e=>e.Emp).ThenInclude(e=>e.Login).ThenInclude(e=>e.Role).Include(e => e.Emp).ThenInclude(e => e.Desig).Where(e=>e.ProjectId == pid).ToList();
                return team;
            }

        }
        [HttpGet("project")]
        public Project proj(int pid)
        {

            using (var db = new EtmsystemContext())
            {
                Console.WriteLine("proj");
                return db.Projects.Where(e => e.Id == pid).FirstOrDefault();
            }

        }


    }
}
