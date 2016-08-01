# IMS
Internal Internship Management System

Features as following:

	User type:  Applicants, Interns, Admin, Developer/Team Lead 
	
	Applicants: 
		Registration by invitation code and it needs applicants complete details information. (name, address, email, mobile, visa status, medical condition, times available for internship) 
	
		Process of approving internships:
			1.Applicants get invited to register(got invitation code from email) and fill up the details in registration page.
			2.Show auto generated contract online and available preview for user.
			3.users sign the contract online if accept it or cancel.
			4.Once user input all the details, it shows the last confirmation page. When click submit button, the details will be no longer modifiable.
			5.The aplicantions will be sent to admin email and wait for approve, after approved, admin will send created accounts to users.
			6.Then users can login the system as interns.
	
	
	Interns: 
		After approved as official interns
		Have separate table for approved interns and applicants of internship
		Interns can update own task progress by create assigned tasks. Then they can update those tasks progress. (Name of tasks, 			progress percentage, currently learning, problem encountered) Display brief details in list column and have buttons 			showing tasks history solved problem and solution. ( knowledge base)
		Can see list of interns and tasks progress( including contacts)
		Interns can see the list of admin and staff contacts
	
	Admin:
		Can approve or reject internship confirmation. Modify the start date, end date, approved date of internships.
		Can see the list of interns. Search function: search for name, email, phone number, applicants or interns. 
		Notification (displayed in tabs):   email notification
		Notify when someone’s internship going to expire.(1 week before it)
		Internships waiting to be confirmed.
	
	Developer/Team lead:
		Hide the interns’ details (such as visa status, passport details). Only show task progress.
		Contact interns by email(by reading interns detail in the list)




Environment setup:

	Set up Angular js environment and primeNG UI:
	
	1. download node js 6.3.0,node js tools 1.1.1vs2015
	
	2. create a new folder
	
	3. copy the package.json in the project to the above folder:
	
	4. in the new folder, press shift and right click, open window cmd and input: npm install
	
	5. copy the node_modules into project files
	
	6. download typescript by go to nuget and search typescript(shown typescript 1.8.4 for visual studio2015) and then install it
	
	7. in nuget install node js tool and restart
		
	8. http://jameschambers.com/2015/09/upgrading-npm-in-visual-studio-2015/
	
	9. typescript 1.8.6 will work but 1.8.4 does not (after install restart windows)
	
	10. Install PrimeNG: In the project folder(where there is node_modulus folder), press shift+ right click, open cmd and type in npm install primeng --save, after sucessful, type in npm install primeui --save, then sucessfully install PrimeNG
