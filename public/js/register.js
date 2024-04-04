		let login = document.querySelector('.login');
		let create = document.querySelector('.create');
		let container = document.querySelector('.container');
		let email = document.querySelector('.email');
		let password = document.querySelector('.password1');
		let password2 = document.querySelector('.password2');

		password2.style.borderColor = "#<PASSWORD>";
		
		
		function validateForm(){
			
			if(password.value.length<8){
				password.style.borderColor = "#FF0000";
				alert("Password must be at least 8 characters long");
				return false;
			}
			if(password.value.search(/[a-z]/i)<0){
				password.style.borderColor = "#FF0000";
				alert("Password must contain at least one letter");
				return false;
			}
			if(password.value.search(/[0-9]/i)<0){
				password.style.borderColor = "#FF0000";
				alert("Password must contain at least one digit");
				return false;

			}

			if(password.value!=password2.value){
				password.style.borderColor = "#FF0000";
				password2.style.borderColor = "#FF0000";
				alert("Passwords do not match");
				return false;
			}
               
            else{
				password.style.borderColor = "#<PASSWORD>";
				password2.style.borderColor = "#<PASSWORD>";
				return true;	
			}
            
		}
		
        const register = document.getElementById('registerForm');

      register.addEventListener('submit', validateForm);


			login.onclick = function(){
					container.classList.add('signinForm');
					
				}
		
		create.onclick = function(){
			container.classList.remove('signinForm');
		}


