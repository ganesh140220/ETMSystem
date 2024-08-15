
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

                Employee EmpLogin = db.Employees.Include(e=>e.TeamMembers).Include(e => e.Login).ThenInclude(e=>e.Role).Include(e => e.Tasks).ThenInclude(e => e.Queries).ThenInclude(e => e.Solutions).Include(e => e.Tasks).ThenInclude(e => e.TaskProgresses).Include(e => e.Login).Include(e => e.Desig).FirstOrDefault(o => o.Login.Username.Equals(obj.uid));

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
                return db.Projects.Include(e => e.Tasks).ThenInclude(e=>e.AssignedToNavigation).Include(e=>e.Tasks).ThenInclude(e=>e.TaskProgresses).Where(e => e.Id == pid).FirstOrDefault();
            }

        }


        //view all client 
        [HttpGet("clients")]
        public List<Client> Clients()
        {

            using (var db = new EtmsystemContext())
            {
                return db.Clients.ToList();
            }

        }

        //view all employee
            [HttpGet("employees")]
            public List<Employee> Employees()
            {

                using (var db = new EtmsystemContext())
                {
                    return db.Employees.ToList();
                }

            }
        [HttpGet("teammembers")]
        public List<TeamMember> Team()
        {

            using (var db = new EtmsystemContext())
            {
                return db.TeamMembers.Include(e=>e.Emp).ThenInclude(e=>e.Login).ThenInclude(e=>e.Role).ToList();
            }

        }

        //view all project 
        [HttpGet("projects")]   
        public List<Project> Projects()
        {

            using (var db = new EtmsystemContext())
            {
                return db.Projects.ToList();
            }

        }

        //view all project 
        [HttpGet("queries")]
        public List<Query> Query(int projid)
        {

            using (var db = new EtmsystemContext())
            {
                return db.Queries.Include(q=>q.Task).Where(q=>q.Task.ProjectId==projid).ToList();
            }

        }

        //view all project 
        [HttpGet("unassignedManager")]
        public List<Employee> Manager(int roleid)
        {


            using (var db = new EtmsystemContext())
            {
                List<TeamMember> member =db.TeamMembers.ToList();


                List<Employee>emp= db.Employees.Include(e => e.Login).ThenInclude(l=>l.Role).Where(e => e.Login.Role.Id==roleid).ToList();

                List<Employee> filteredEmployees = emp.Where(e => !member.Any(m => m.EmpId == e.Id)).ToList();


                return filteredEmployees;
            }

        }

    }
}
